import multer from "multer";

const pdfUploadConfig = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "public/resources/resumes/");
    },
    filename: (req,file,cb) =>{
        const name = Date.now()+file.originalname;
        cb(null, name);
    }
})

const photoUploadConfig = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"public/resources/logos/");
    },
    filename : (req,file,cb)=>{
        const name = Date.now()+file.originalname;
        cb(null, name);
    }
})

export const uploadResume = multer({
    storage:pdfUploadConfig,
});

export const uploadLogo = multer({
    storage : photoUploadConfig,
});
