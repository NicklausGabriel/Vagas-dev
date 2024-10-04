const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    //Aplicando o trabalho em sqlite
    dialect: 'sqlite',
    //Rota para o arquivo do banco, coso não esxista sera criado um novo
    storage: './db/app.db'
});

module.exports = sequelize;