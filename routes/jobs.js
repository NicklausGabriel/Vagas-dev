const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Rota de teste
router.get('/test', (req, res) => {
    res.send('deu certo');
});

// Rota para exibir o formulário de adicionar vaga
router.get('/add', (req, res) => {
    res.render('add');  // Renderiza a view 'add.handlebars'
});

// Rota para adicionar uma vaga via POST
router.post('/add', (req, res) => {
    let { title, salary, company, description, email, new_job } = req.body;
    // Insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;
