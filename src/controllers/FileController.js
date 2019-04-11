const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
  async store(req, res) {
    const box = await Box.findById(req.params.id);
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    box.files.push(file);
    await box.save();

    //todos dentro do box receber notificação que algo foi adicionado
    req.io.sockets.in(box._id).emit('file', file); // seleciona todos os usuarios (sockets) e envia os dados do novo arquivo

    //criar um arquivo
    return res.json(file);
  }
}

module.exports = new FileController();  // usa o NEW para acessar os metodos da classe
