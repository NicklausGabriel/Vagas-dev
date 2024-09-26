const express       = require('express');
const {engine}       =require('express-handlebars');
const app           = express();
const path          =require('path');
const db            = require('./db/connection');
const bodyParser    = require('body-parser');
const Job =         require('./models/Job');


const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O Express está rodando na porta ${PORT}`);
});

//body Parser
app.use(bodyParser.urlencoded({extends:false}));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db
    .authenticate()
    .then(()=>{
        console.log("conectou ao banco com sucesso");
    })
    .catch(
        err =>{
            console.log("Ocorreu um erro ao conectar", err)
        });


//routes
app.get('/',(req, res)=>{
    res.render("index");
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));