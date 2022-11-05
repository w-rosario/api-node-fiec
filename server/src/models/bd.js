const Sequelize = require('sequelize');
const sequelize = new Sequelize('site', 'root', '1234',
{
    host: 'localhost',
    dialect:'mysql'
});

sequelize.authenticate().then(() =>{
    console.log('Conexão realizada com sucesso');
}).catch((err) => {
    console.log('Erro ao realizar a conexão com o BD: ' + err);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}