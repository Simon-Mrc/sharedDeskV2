import {existsSync} from "fs";
import {join} from "path";
import fs from 'fs';

const uploadPath = join(__dirname, '../../uploads');

export async function saveFile(file : Express.Multer.File  ,deskId : string) : Promise<string> {
    const deskPath = join(uploadPath,deskId);
    !existsSync(deskPath) && fs.mkdirSync(deskPath);
    if(file){
        const newName = `${crypto.randomUUID()}-${file.originalname}`
        fs.writeFileSync(join(deskPath,newName), file.buffer) 
        return join('uploads', deskId , newName);
    }else{
        throw new Error('file is corrupted');
    }
}

export async function deleteFile(filePath : string) : Promise<void>{
    const absolutePath = join(__dirname, '../../', filePath)
    if (existsSync(absolutePath)){
        fs.rmSync(absolutePath);
    }else{
        throw new Error('file already deleted');
    }
}