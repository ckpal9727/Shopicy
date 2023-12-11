import path from 'path'
import  express from 'express'
import multer from 'multer'

const router=express.Router();

const storage   =multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },

})

function checkFileType(file,cb){
    const fileTypes=/jpg|Jpeg|png/;
    const extname=fileTypes.test(file.extname(file.originalname).toLowerCase());
    const memetype=fileTypes.test(file.memetype(file.memetype))
    if(memetype && extname){
        cb(null,true);
    }else{
        cb("Image only")
    }
}

const uploads =multer({
    storage,
})

router.post('/',uploads.single('image'),(req,res)=>{
    res.send({message:"Image Uploaded",image:`/${req.file.path}`});
})
export default router;