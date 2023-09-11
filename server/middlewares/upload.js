const path = require("path");
const multer = require('multer');
// const upload = multer({ dest:  });
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
       // console.log(file)
        cb(null, "client/static/assets/img/apps");
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
