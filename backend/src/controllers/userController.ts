import { Request, Response } from 'express';
import db from '../db/database';
import { User, JwtPayload } from "../../../shared/types";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


////////////////////////////////////GET USER BY SEARCHING /////////////////////////////////////
const getBySearch = (req : Request<{},{},{search : string}> , res : Response<Omit<User,'password'>[]|null>)=>{
    try{
        const userId = (req as any).user.userId;
        const arrayOfFriend = db.prepare(`
            SELECT id, name, userName, mail, accountType, userColor, friendList, notif FROM users
            WHERE (
            name LIKE ?
            OR userName LIKE ?
            OR mail LIKE ?)
            AND id != ?
            `).all(`%${req.body.search}%`,`%${req.body.search}%`,`%${req.body.search}%`,userId) as Omit<User,'password'>[]|null;
        return res.json(arrayOfFriend);
    }catch(error){
        // gonna fill this later
    }
}


////////////////////////////////////GET USER BY ID WITHOU PASSWORD /////////////////////////////////////
const getById = (req: Request<{id: string}>, res: Response<Omit<User,'password'> | null>) => {
    try{
        let user = db.prepare(`
            SELECT * FROM users
            WHERE id = ?
            `).get(req.params.id) as User;
        const {password,...userWithoutPassword} = user;
        return res.json(userWithoutPassword);
    }catch(error){
        return res.status(500).json(null);
    }
};

////////////////////////////////////GET ALL USERS WITHOUT PASSWORD /////////////////////////////////////
const getAll = (req : Request, res : Response<(Omit<User,'password'>)[] | null>) =>{
    try{
        let arrayOfUser = db.prepare(`
        SELECT * FROM users
        `).all() as User[];
        const safeUsers = arrayOfUser.map(({password,...safeUser})=> {return safeUser}); // Get used to this pattern as it is so usefull
        return res.json(safeUsers);
    }catch(error){
        return res.status(500).json(null);
    }
}

////////////////////////////////////CREATE USER /////////////////////////////////////
const createUser =async (req : Request<{},{},User>,res: Response<Omit<User,'password'>|null>)=>{
    try{
        const id = crypto.randomUUID();
        db.prepare(`
            INSERT INTO users
            (id,name,userName,mail,password)
            VALUES
            (?,?,?,?,?)
            `).run(id,req.body.name,req.body.userName,req.body.mail,await bcrypt.hash(req.body.password,10));
            const user = db.prepare(`
                SELECT * FROM users
                WHERE id=?
                `).get(id) as User;
            const {password,... userWithoutPassword} =user
            console.log(userWithoutPassword);
            return res.json(userWithoutPassword);
    }catch(error){
        console.log(error) ;
        return res.status(409).json(null);
    }
}

///////////////////////////////////////////  UPDATE USER /////////////////////////////////////
const updateUser =(req : Request<{id :string},{},Omit<User,'password'>>,res: Response<{message:string}|{error:string}>)=>{
    try{
        db.prepare(`
            UPDATE users 
            SET name = ?,
            userName = ?,
            mail = ?,
            accountType = ?,
            friendList = ?,
            notif = ?,
            userColor = ?
            WHERE id = ?
            `).run(req.body.name,req.body.userName,req.body.mail,req.body.accountType,JSON.stringify(req.body.friendList),JSON.stringify(req.body.notif),req.body.userColor,req.params.id)
            return res.status(200).json({ message: 'User updated' });
        }catch(error){
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
    ////////////////////////////////////  DELETE USER  /////////////////////////////////////
const deleteUserById = (req : Request,res : Response<{message:string}|{error:string}>)=>{
    try{
        const userId = (req as any).user.userId
        db.prepare(`
            DELETE FROM users
            WHERE id = ?
            `).run(userId);
            res.status(200).json({ message: 'User got deleted' });
    }catch(error){
        res.status(500).json({ error: 'Failed to delete user, no user with this id' });
    }
}

////////////////////////////////////GET USER BY USERNAME /////////////////////////////////////
const getUserByUserName = (req : Request<{userName : string}> , res : Response< Omit<User,'password'> |null>)=>{
    try{
        let result = db.prepare(`
            SELECT * FROM users
            WHERE userName = ?
            `).get(req.params.userName) as User ;
            const {password,...safeUser} = result;
        return res.json(safeUser) ;

    }catch(error){
        res.status(500).json(null)
    }
}

//////////////////////////////////////// LOGIN /////////////////////////////////////
const login = async (req : Request <{},{},{mail : string,password:string}> , res : Response)=>{
    try{
        let user = db.prepare(`
            SELECT * FROM users
            WHERE mail = ? 
            `).get(req.body.mail) as User;
        if(!user){
            return res.status(404).json({error : 'wrong adressmail'})
        }
        else{
            console.log('checking password')
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            console.log(validPassword);
            if(!validPassword){return res.status(404).json({error:'wrong password'})} 
            const payload: JwtPayload = {
                userId: user.id,
                userName: user.userName,
                accountType: user.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '24h' });
            const {password,...userWithoutPassword } = user;
            return res.json({user : userWithoutPassword,token : token});
        }
    }catch(error){
        res.status(404).json(null);
    }
}



export default { getById, getAll, createUser,updateUser,deleteUserById,getUserByUserName,login,getBySearch }