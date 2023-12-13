const path = require("path");
const multer = require('multer');
// const upload = multer({ dest:  });
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext === '.xlsx') {
            cb(null, "client/static/assets/file");
        } else {
            cb(null, "client/static/assets/img");
        }
    }
    ,
    filename: (req, file, cb) => {
        cb(null,
            `${file.fieldname}-${Date.now()}-${Math.random() * 1000}${path.extname(file.originalname)}`
        );
    },
});

// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/jpg" ||
//         file.mimetype === "image/jpeg"
//     ) {
//         cb(null, true);
//     } else {
//         cb(new Error("File format should be PNG,JPG,JPEG"), false);
//     }
// };
const upload = multer({ storage:storage });
module.exports = upload;
