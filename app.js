const express       =require('express');
const {engine}      =require('express-handlebars');
const app           =express();
const path          =require('path');
const db            =require('./db/connection');
const bodyParser    =require('body-parser');
const Job           =require('./models/Job');
const Sequelize     =require('sequelize');
const methodOverride = require('method-override');
const Op            =Sequelize.Op;

require('dotenv').config(); 

const PORT = process.env.PORT;

app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(methodOverride('_method'));
//body Parser
app.use(bodyParser.urlencoded({extends:false}));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
async function conectarBanco() {
    try{
        await db.authenticate();
        console.log("Conectou ao banco com sucesso");
    }catch(err){
        console.log("Ocorreu erro ao conectar ao banco de dados")
    }
}
conectarBanco();
//routes
app.get('/',(req, res)=>{

    let search = req.query.job;
    let query = '%'+search+'%';

    if(!search){

        Job.findAll({order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs =>{
            res.render("index",{
                jobs
            });
        })
        .catch(err=> console.log(err));
    }else{
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs =>{
            res.render("index",{
                jobs, search
            });
        });
    }
   
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));