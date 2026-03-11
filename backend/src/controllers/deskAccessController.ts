//////////////////////////////////////////////////////////////////////
//////////////////////////    IMPORT HERE     ////////////////////////
//////////////////////////////////////////////////////////////////////
import { Request, Response } from 'express';
import db from '../db/database';
import { Desk,User,DeskAccess } from "../../../shared/types";
import * as bcrypt from 'bcrypt';


//////////////////////////////////////////////////////////////////////
//////////////////////////    ROUTE FUNCTIONS     ////////////////////////
//////////////////////////////////////////////////////////////////////

/////////////////////////////// INVITE FRIEND //////////////////////////
const inviteToDeskByUserId = (req : Request<{deskId : string},{},{userId : string}> , res : Response<{message : string}|{error:string}>)=>{
    try {
        const currentUserId = (req as any).user.userId;
        const inDesk = db.prepare(`
            SELECT * FROM deskAccess
            WHERE deskId = ? AND  userId = ?
            `).get(req.params.deskId,currentUserId);
            if(inDesk){
                db.prepare(`
                    INSERT INTO deskAccess
                    (deskId,userId,accessType)
                    VALUES
                    (?,?,?)
                    `).run(req.params.deskId,req.body.userId,'read');
                return res.json({message : 'invite sent !'})
            }
           return  res.json({message:'You are no part of this desk'})
    }catch(error){
    res.status(404).json({error:'Desk not found or user already in desk'});
    }
}

/////////////////////////////// GET ACCESSTYPE //////////////////////////
const getAccessType = (req : Request<{deskId:string}>,res : Response<{accessType:string}|null>)=>{
    try{
        const currentUserId = (req as any).user.userId;
        const accessType = db.prepare(`
            SELECT accessType FROM deskAccess
            WHERE deskId = ? AND  userId = ?
            `).get(req.params.deskId,currentUserId) as {accessType : string};
            res.json(accessType);
    }catch(error){
        res.status(404).json(null)
    }
}

/////////////////////////////// GET ALL DESK USER HAS ACCESS TO //////////////////////////
const getAllSharedDeskIdByUserId = (req : Request,res : Response<Desk[]|null>)=>{
    try{
        const userId = (req as any).user.userId;
        const arrayOfDeskId = db.prepare(`
            SELECT desks.* FROM desks
            JOIN deskAccess ON deskAccess.deskId = desks.id
            AND deskAccess.userId = ?
            `).all(userId) as Desk[];
        res.json(arrayOfDeskId);
    }catch(error){
        res.status(404).json(null)
    }
}

/////////////////////////////// GET ALL USER OF GIVEN DESK //////////////////////////
const getAllUsersByDeskId = (req : Request<{deskId : string}>,res: Response<{userId : string}[]|null>)=>{
    try{
        let arrayOfId = db.prepare(`
            SELECT userId FROM deskAccess
            WHERE deskId = ?
            `).all(req.params.deskId) as {userId : string}[];
        res.json(arrayOfId)
    }catch(error){
        res.status(404).json(null);
    }
}

/////////////////////////////// CHANGE ACCESSTYPE BY USERID //////////////////////////
const changeAccessTypeByUserId = (req : Request<{deskId : string},{},{userId : string,accessType : string}>,res: Response<{message : string}|{error:string}>)=>{
    try{
        const currentUserId = (req as any).user.userId;
        const inDeskAndAdmni = db.prepare(`
            SELECT * FROM deskAccess
            WHERE deskId = ? AND  userId = ? AND accessType = 'admin'
            `).get(req.params.deskId,currentUserId);
            if(inDeskAndAdmni){
                db.prepare(`
                    UPDATE deskAccess SET
                    accessType = ?
                    WHERE userId = ? AND deskId = ?
                    `).run(req.body.accessType,req.body.userId,req.params.deskId);
                return res.json({message : `user accessType modified to ${req.body.accessType}`});
            }
            return res.json({message : 'you have no right'});
        }catch(error){
            res.status(404).json({error:'User not in selected desk'})
            }
    }


/////////////////////////////// QUIT DESK BY DESKID //////////////////////////
const quitSharedByDeskId = (req:Request<{deskId : string}>,res:Response<{message : string}|{error : string}>)=>{
    try{
        const userId = (req as any).user.userId;
        db.prepare(`
            DELETE FROM deskAccess
            WHERE deskId = ? AND userId = ?
            `).run(req.params.deskId,userId);
        res.json({message : 'Quit Desk Done'})
    }catch(error){
        res.status(404).json({error:'Not in selected Desk'})
    }
}

export default{inviteToDeskByUserId,getAccessType,getAllSharedDeskIdByUserId,getAllUsersByDeskId,changeAccessTypeByUserId,quitSharedByDeskId}