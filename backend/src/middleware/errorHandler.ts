import { NextFunction, Request, Response } from "express";
import { FromDbError } from "./FromDbError";

export function errorHandler (err : any , req : Request, res : Response,  next : NextFunction){
    console.error(`[ERROR] ${err.name} : ${err.message}`);

    if (err instanceof FromDbError){
        return res.status(err.status).json({error : err.message})
    }
    return res.status(500).json({
        error : 'internal sever error'
    })
}