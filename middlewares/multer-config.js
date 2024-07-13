const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve('./static'));
  },
  filename: (req, file, callback) => {
    const name = path.parse(file.originalname).name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const _name = name + Date.now() + '.' + extension
    file.originalname = _name;
    callback(null, _name);
  }
});

module.exports = multer({storage: storage}).single('photo');