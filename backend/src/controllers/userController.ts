import { Request, Response } from 'express';
import db from '../db/database';
import { User, JwtPayload } from "../../../shared/types";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

////////////////////////////////////GET USER BY ID WITHOU PASSWORD /////////////////////////////////////
const getById = (req: Request<{id: string}>, res: Response<Omit<User,'password'> | {error : string}>) => {
    try{
        let user = db.prepare(`
            SELECT * FROM users
            WHERE id = ?
            `).get(req.params.id) as User;
        const {password,...userWithoutPassword} = user;
        return res.json(userWithoutPassword);
    }catch(error){
        return res.status(500).json({ error: 'Failed to get users' });
    }
};

////////////////////////////////////GET ALL USERS WITHOUT PASSWORD /////////////////////////////////////
const getAll = (req : Request, res : Response<(Omit<User,'password'>)[] | {error : string}>) =>{
    try{
        let arrayOfUser = db.prepare(`
        SELECT * FROM users
        `).all() as User[];
        const safeUsers = arrayOfUser.map(({password,...safeUser})=> {return safeUser});
        return res.json(safeUsers);
    }catch(error){
        return res.status(500).json({ error: 'Failed to get users' });
    }
}

////////////////////////////////////CREATE USER /////////////////////////////////////
const createUser =async (req : Request<{},{},User>,res: Response<{message : string}|{error:string}>)=>{
    try{
        const id = crypto.randomUUID();
        db.prepare(`
            INSERT INTO users
            (id,name,userName,mail,accountType,friendList,notif,userColor,password)
            VALUES
            (?,?,?,?,?,?,?,?,?)
            `).run(id,req.body.name,req.body.userName,req.body.mail,req.body.accountType,req.body.friendList,req.body.notif,req.body.userColor,await bcrypt.hash(req.body.password,10));
            return res.status(201).json({ message: 'User created' });
    }catch(error){
        console.log(error) ;
        res.status(500).json({ error: 'Failed to create user' });
    }
}

///////////////////////////////////////////  UPDATE USER /////////////////////////////////////
const updateUser =(req : Request<{id :string},{},User>,res: Response<{message:string}|{error:string}>)=>{
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
            `).run(req.body.name,req.body.userName,req.body.mail,req.body.accountType,req.body.friendList,req.body.notif,req.body.userColor,req.params.id)
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
const getUserByUserName = (req : Request<{userName : string}> , res : Response< Omit<User,'password'> |{error : string}>)=>{
    try{
        let result = db.prepare(`
            SELECT * FROM users
            WHERE userName = ?
            `).get(req.params.userName) as User ;
            const {password,...safeUser} = result;
        return res.json(safeUser) ;

    }catch(error){
        res.status(500).json({error : 'no user with this userName'})
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
            const validPassword = await bcrypt.compare(req.body.password, user.password);
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
        res.status(404).json({error : 'wrong password buddy'});
    }
}



export default { getById, getAll, createUser,updateUser,deleteUserById,getUserByUserName,login }