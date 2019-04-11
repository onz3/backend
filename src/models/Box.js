const mongoose = require('mongoose');

const Box = new mongoose.Schema({ // schema seria uma tabela do banco
  title: {
    type: String, //titulo obrigatorio
    required : true,
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, {
  timestamps : true
});


module.exports = mongoose.model('Box', Box);
