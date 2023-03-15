const multer = require("multer");
const Datauri = require("datauri");
const path = require('path');
// import path from 'path';

// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads")
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "__" + file.originalname);
//     }
// });

// const upload = multer({storage: fileStorageEngine});

// const storage = multer.memoryStorage();

// const upload = multer({storage}).single('image');

// const dUri = new Datauri();
// const dataUri = req => 
//     dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        // console.log(ext);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    }
}).single('image');


module.exports = {upload};