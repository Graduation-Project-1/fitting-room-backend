const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniquePrifix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrifix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if ((file.mimetype).includes('octet-stream')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;