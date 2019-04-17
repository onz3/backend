const express = require("express"); //exportando express do node modules
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();  //criando variavel do nosso app
app.use(cors()); //define que todos podem utilizar a aplicação mesmo em outro ip


const server = require('http').Server(app); //socket para utilizar em tempo real o app
const io = require('socket.io')(server); // " linha 25"


//conectar usuario numa sala especifica, sem aparecer notificação que alguem postou algo novo
io.on("connection", socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});


mongoose.connect('mongodb+srv://onz3:Aguia019$$$@cluster0-xhl8h.mongodb.net/onz3?retryWrites=true', {
  useNewUrlParser: true,
});

app.use((req, res, next) =>{
  req.io = io;
  return next(); // tem que ter o return para passar em diante, senao fica parado por ser um middleware
});

//exemplo
//app.get('/teste', (req, res) => {  criando uma rota para o usuario acessar no navegador
//  return res.send("Hello world");   o req e res fazem um  interceptação para mostrar o hello world testando o app
//})

app.use(express.json());  //serve para requisições rest, usando json
//app.use(function (req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});
app.use(express.urlencoded({ extended: true })); //permite que vc envie arquivos nas requisiçoes
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp"))); //toda vez que acessar essa rota busca os arquivos fisicos da pasta tmp
app.use(require("./routes")); //utilizar arquivo de rota separado

// process.env para o servidor Heroku poder escolher a porta na hora de rodar o app
server.listen(process.env.PORT || 3333);  //passando uma porta para rodar o servidor node, usando SERVER  para aceitar requisião http e socket
