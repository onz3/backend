const mongoose = require('mongoose');

const File = new mongoose.Schema({ // schema seria uma tabela do banco
  title: {
    type: String, //titulo obrigatorio
    required : true,
  },
  path: { //caminho do arquivo  armazenado
    type: String,
    required: true,
  }
}, {
  timestamps : true,
  toObject: { virtuals: true},
  toJSON: { virtuals: true}
});

File.virtual("url").get(function(){
  const url = process.env.URL || 'http://localhost:3333'

  return `${url}/files/${encodeURIComponent(this.path)}`;
});




module.exports = mongoose.model('File', File);
