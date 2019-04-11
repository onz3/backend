const multer  = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (req,file,cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
    },
    filename: (req,file,cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        file.key = `${hash.toString('hex')}-${file.originalname}`;  //isso vai gerar o "id" do dado por ex: 2ljnlksndl34n-nome do arquivo
        cb(null, file.key);
      })
    }
  })
};
