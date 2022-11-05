const bd = require('./bd');

const Produto = bd.sequelize.define('produto',{
    idproduto: {
        type: bd.Sequelize.INTEGER,primaryKey: true
    },
    nome: {
        type: bd.Sequelize.STRING
    },
    valor: {
        type: bd.Sequelize.DOUBLE
    },
    quantidade: {
        type: bd.Sequelize.INTEGER
    },
},{
    tableName: 'produto'
    }
    );
Produto.sync({force:true})

module.exports = Produto