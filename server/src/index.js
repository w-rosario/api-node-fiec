const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Produto = require('./models/produto');



app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

//rotas

app.get('/', (req, res) => {
    res.render('home'); 
});

app.get('/produto', (req, res) => {
    Produto.findAll().then((produtos) => {
        res.render('produto', {produtos:produtos});
    })
});

app.get("/cadastra_produto", (req, res) => {
    res.render('cadastra_produto');
    });

app.get("/cadastra_cliente", (req, res) => {
    res.render('cadastra_cliente');
    });

app.get("/cadastra_funcionario", (req, res) => {
    res.render('cadastra_funcionario');
    });

app.post("/add_cliente", (req, res) => {
    res.send("id: " + req.body.id + "<br>cliente:" + req.body.nome + "<br>Telefone: " + req.body.telefone);
    }); //

app.post("/add_funcionario", (req, res) => {
    res.send("id: " + req.body.id + "funcionario: " + req.body.nome + "<br>Telefone: " + req.body.telefone);
    }); //

app.post("/add_produto", (req, res) => {
    //res.send("produto: "+ req.body.nome + "<br>Qtd: " + req.body.qtd);
    Produto.create({
        nome: req.body.nome,
        valor: req.body.valor,
        quantidade: req.body.qtd
    }).then(() => {
        res.send("Produto cadastrado com sucesso!")
    }).catch((erro) => {
        res.send("Erro: Produto não foi encontrado com sucesso!"+erro)
    })


});

app.get('/del-produto/:idproduto', (req, res) => {
    Produto.destroy({
        where: {'idproduto':req.params.idproduto}
    }).then(() => {
        res.send("Produto apagado com sucesso!")
    }).catch((erro) => {
        res.send("Erro:Produto não apagado.")
    })
});

app.get('/pegar_produto', (req, res) => {
    Produto.findByPk(req.params.idproduto)
        .then((produtos) => {
            res.render('alterar_produto',{
                id:produtos.idproduto,
                nome:produtos.nome,
                valor:produtos.valor,
                qtd:produtos.quantidade
            });
        });
});

app.post('/alterar_produto', (req, res) => {
    var array_erros=[];
    if(req.body.nome.length < 4)
    array_erros.push({texto: "Campo nome com menos de 4 caracteres"});

    if(!req.body.nome)
    array_erros.push({texto: "Campo nome não preechido"});

    if(!req.body.valor)
    array_erros.push({texto: "Campo valor não preechido"});

    if(!req.body.qtd)
    array_erros.push({texto: "Campo quantidade não preechido"});

    console.log(array_erros);

    if(array_erros.length > 0){
        res.render("cadastrar_produto",{erro:array_erros})
    }
    else{
        Produto.update({
            nome: req.body.nome,
            valor: req.body.valor,
            quantidade: req.body.qtd},
            {where: {'idproduto':req.body.id}  
        }).then(() => {
            res.send("produto cadastrado com sucesso!")
        }).catch((err) => {
            res.send("Erro: Produto não cadastrado!" + err)
        })
    }
});

app.listen(8080, () => {console.log('listening on port 8080');});