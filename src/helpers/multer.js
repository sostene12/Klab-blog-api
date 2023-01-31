import multer from "multer";
import path from "path";

export const upload = multer({
    storage:multer.diskStorage({}),
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
    },
    fileFilter:(req,file,cb) =>{
        const extension = path.extname(file.originalname);
        if(!extension === '.jpg' && !extension === '.jpeg' && !extension === '.png'){
            cb(new Error('Unsupported file!'),false);
            return;
        }
        cb(null,true);
    }
});