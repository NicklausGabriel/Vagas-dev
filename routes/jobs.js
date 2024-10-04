const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { where } = require('sequelize');


//detalhe da vaga
router.get('/view/:id',async(req,res)=> {
    try{
        const job = await Job.findOne({
            where:{id: req.params.id}
        });
        if(job){
            res.render('view',{job});
        }else{
            res.status(404).send('Job not found');
        }
    }catch(err){
        console.log(err);
        res.statis(500).send('Server Error')
    }
})


// Rota para exibir o formulário de adicionar vaga
router.get('/add', (req, res) => {
    res.render('add'); 
});

// Rota para adicionar uma vaga via POST
router.post('/add', async (req, res) => {
    let { title, salary, company, description, email, new_job } = req.body;
    try{
        await Job.create({
            title,
            description,
            salary,
            company,
            email,
            new_job,
        })
        res.redirect('/')
    }catch(err){
        console.log(err);
        res.status(500).send('Erro ao adcionar a vaga');
    }
});

router.post('/delete/:id', async (req,res) => {
    const jobId = req.params.id

    try{
        Job.destroy({
            where:{id:jobId}
        });
        res.redirect('/');
    }catch(err){
        console.log('Erro ao tentar excluir a vaga:', err);
        res.status(500).send('Erro ao excluir a vaga');
    }
});

module.exports = router;
