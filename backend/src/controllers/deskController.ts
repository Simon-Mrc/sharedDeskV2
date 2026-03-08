//////////////////////////////////////////////////////////////////////
//////////////////////////    IMPORT HERE     ////////////////////////
//////////////////////////////////////////////////////////////////////
import { Request, Response } from 'express';
import db from '../db/database';
import { Desk } from "../../../shared/types";
import * as bcrypt from 'bcrypt';


//////////////////////////////////////////////////////////////////////
//////////////////////////    ROUTE FUNCTIONS     ////////////////////////
//////////////////////////////////////////////////////////////////////

/////////////////////////////// CREATE DESK FUNCTION ////////////////////
const createDesk =async (req : Request<{},{},Desk>,res : Response<{message :string}|{error:string}>)=>{
    try{
        const userId = (req as any).user.userId;
        if(req.body.accessPassword){
            db.prepare(`
                INSERT INTO desks
                (id,name,ownerId,urlLink,accessPassword,createdAt)
                VALUES
                (?,?,?,?,?,?)
                `).run(req.body.id,req.body.name,userId,req.body.urlLink,await bcrypt.hash(req.body.accessPassword,10),req.body.createdAt);
            db.prepare(`
                INSERT INTO deskAccess
                (deskId,userId,accessType)
                VALUES(?,?,?)
                `).run(req.body.id,userId,'admin');
        }else{
            db.prepare(`
                INSERT INTO desks
                (id,name,ownerId,urlLink,accessPassword,createdAt)
                VALUES
                (?,?,?,?,?,?)
                `).run(req.body.id,req.body.name,userId,req.body.urlLink,req.body.accessPassword,req.body.createdAt);
                db.prepare(`
                    INSERT INTO deskAccess
                    (deskId,userId,accessType)
                    VALUES(?,?,?)
                    `).run(req.body.id,userId,'admin');
        }
            res.json({message : 'desk got Created !'});
    }catch(error){
        res.status(500).json({ error: 'Failed to create desk' });
    }
}

////////////////////////////////////GET DESK BY ID /////////////////////////////////////
const getDeskById = (req : Request<{id : string}>, res : Response<Desk |{error : string}>)=>{
    try{
        let getDatDesk = db.prepare(`
            SELECT * FROM desks 
            WHERE id = ?
            `).get(req.params.id) as Desk;
            if(!getDatDesk) return res.status(404).json({ error: 'Desk not found' });
            return res.json(getDatDesk);
    }catch(error){
        res.status(404).json({error : 'Desk not found'});
    }
}

////////////////////////////////////GET ALL DESK BY userId /////////////////////////////////////
const getAllDesksByUserId = (req: Request, res: Response<Desk[] | {error: string}>) => {
    try {
        const userId = (req as any).user.userId;
        let desks = db.prepare(`
            SELECT * FROM desks
            WHERE ownerId = ?
        `).all(userId) as Desk[];
        return res.json(desks);
    } catch(error) {
        return res.status(500).json({ error: 'Failed to get desks' });
    }
}

////////////////////////////////////UPDATE DESK /////////////////////////////////////
const updateDesk = (req : Request<{id:string},{},Omit<Desk,'id'>> , res : Response<{message : string}|{error : string}>)=>{
    try{
        const userId = (req as any).user.userId;
        db.prepare(`
            UPDATE desks SET
            name = ?,
            ownerId = ?,
            urlLink = ?
            WHERE id = ?
            `).run(req.body.name,userId,req.body.urlLink,req.params.id)
            res.json({message : 'Desk update successfull'});
    }catch(error){
        res.status(404).json({error : 'Desk not Found '});
    }
}


////////////////////////////////////DELETE  DESK /////////////////////////////////////
const deleteDeskById = (req : Request<{id : string}>,res : Response<{message : string}|{error : string}>)=>{
    try{
        const userId = (req as any).user.userId;
        db.prepare(`
            DELETE FROM desks
            WHERE id = ?
            AND ownerId = ?
            `).run(req.params.id,userId);
            res.json({message : 'Desk successfully deleted'});
        }catch(error){
            res.json({error : 'You don t have permission my boy'})
        }
}

//////////////// GET DESK BY ID /////////// PASSWORD NEEDED ///////////////// KEEPING IT FOR SCIENCE ////////////
const getDeskByIdAndPasswordUselessFunctionTooLongToPreventAnyoneFromEverUsingIt =async (req : Request<{id : string},{},{accessPassword : string | null}>, res : Response<Desk|{error : string}>)=>{
    try{
        let getDatDesk = db.prepare(`
            SELECT * FROM desks
            WHERE id = ?
            `).get(req.params.id) as Desk;
        if(!getDatDesk){
            res.status(404).json({error : 'Desk Not Found'});
        }else{
            if(req.body.accessPassword!=null && getDatDesk.accessPassword!=null){
                const validPassword = await bcrypt.compare(req.body.accessPassword,getDatDesk.accessPassword);
                if(validPassword){res.json(getDatDesk)}else{
                    res.status(404).json({error:'wrong password'})
                }          
            }else{
                res.json(getDatDesk);
            }
        }
    }catch(error){
        res.status(404).json({error:'Desk not found'})
    }
}

export default {deleteDeskById,createDesk,getAllDesksByUserId,getDeskById,updateDesk}