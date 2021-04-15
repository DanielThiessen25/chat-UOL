
var infoNome = { name: "" };

function entrar() {
    var nomeUsuario = prompt("Escolha um nome de usuário:");
    infoNome = { name: nomeUsuario };
    const requisicaoNome = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', infoNome);
    requisicaoNome.then(nomeSucesso);
    requisicaoNome.catch(nomeErro);
}

entrar();

function nomeErro(erro) {
    const statusCode = erro.response.status;
    if(statusCode != 200){
        alert("Esse nome de usuário já foi escolhido! Tente novamente");
        entrar();
    }
}

function nomeSucesso(sucesso) {
    alert("Bem-Vindo " + infoNome.name + "!!!");
}

const conexao = setInterval(manterConexao, 5000);

function manterConexao(){
        const status = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', infoNome);
}

function buscar() {
    const buscar = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    buscar.then(atualizar);
}

function atualizar(conteudo){
    console.log(conteudo.data[1]);
    for(let i=0; i<conteudo.data.length; i++){
        var elemento = document.querySelector(".mensagens");
        elemento.innerHTML += 
        `<div class="item ${conteudo.data[i].type}">
            <h3>(${conteudo.data[i].time})</h3> <h2>${conteudo.data[i].from}</h2> ${conteudo.data[i].text}
        </div>`;    
        var visivel = elemento.lastChild;
        visivel.scrollIntoView();
    }
   
}

const atualizador = setInterval(buscar, 3000);

