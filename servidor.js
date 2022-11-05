const http = require('http');

const tratarRespostaDaRequisicao = function(req,res){
    res.writeHead(200,{'content-type':'text/html'});
    res.write(
    "<h1>Meu Servidor HTTP</h1><h2>Weslley de Andrade Rosario</h2>"
    );
    res.write(
        '<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com">'
    )
    res.end();
}

const server = http.createServer(tratarRespostaDaRequisicao);

server.listen(3000, () => {
    console.log('servidor no ar na porta 3000');
})