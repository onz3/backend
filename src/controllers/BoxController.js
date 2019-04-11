const Box = require('../models/Box');

class BoxController {
  async store(req,res){  //permite q usuario crie novas pastas no app
   const box = await Box.create({ title: req.body.title });
    return res.json(box);
  }

  async show(req, res){
    const box = await Box.findById(req.params.id).populate({ //deixar em ordem de postagem o mais recente primeiro
      path: 'files',
      options: { sort: { createdAt: -1 } }   //ordenando por data (createdAt: -1) decrescente, crescente é 1
    });
    return res.json(box);
  }
}





module.exports = new BoxController();  // usa o NEW para acessar os metodos da classe
