const router = require('express').Router();
const UserModel = require('../Model/user.model');
const multer = require('multer');
const path = require('path');
const { uploadErrors } = require('../utils/errors.utils');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.join() to get the absolute path
    cb(null, path.join(__dirname, '..', 'client', 'public', 'uploads', 'profil'));
   
  },
  filename: function (req, file, cb) {
    // Use string concatenation to convert the timestamp to a string
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random()) ;
    cb(null, uniqueSuffix + path.extname(file.originalname) );
  }
});

const upload = multer({ storage: storage });

const uploadProfile = async (req, res) => {
    try {
      const allowedExtensions = ['.png', '.jpg', '.jpeg'];
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Invalid file format. Only PNG, JPG, and JPEG files are allowed.');
      }

      const maxFileSize = 500000; // 500 KB
      if (req.file.size > maxFileSize) {
        throw new Error('File size exceeds the maximum limit (500 KB).');
      }
    } catch (err) {
      console.log(err);
      const errors = uploadErrors(err);
      return res.send({ errors });
    }
  

  try {
    console.log(req.file.filename);
     await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture:` ./uploads/profil/` + req.file.filename } },
      { new: true }
    )
    .then((data) => res.send(data))
  } catch (err) {
     res.status(500).send(err);
  }
};

router.post('/', upload.single('file'), uploadProfile);

module.exports.uploadRoute = router;
