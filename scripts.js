
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
    if (statusCode != 200) {
        alert("Esse nome de usuário já foi escolhido! Tente novamente");
        entrar();
    }
}

function nomeSucesso(sucesso) {
    alert("Bem-Vindo " + infoNome.name + "!!!");
}

const conexao = setInterval(manterConexao, 5000);

function manterConexao() {
    const status = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', infoNome);
}

function buscar() {
    const buscar = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    buscar.then(atualizar);
}

function atualizar(conteudo) {
    var resetar = document.querySelector(".mensagens");
    resetar.innerHTML = '';


    console.log(conteudo.data[1]);
    for (let i = conteudo.data.length - 11; i < conteudo.data.length; i++) {
        if (conteudo.data[i].type == "private_message" && conteudo.data[i].to == infoNome.name) {
            var elemento = document.querySelector(".mensagens");
            elemento.innerHTML +=
                `<div class="item ${conteudo.data[i].type}">
            <h3>(${conteudo.data[i].time})</h3> <h2>${conteudo.data[i].from}</h2> ${conteudo.data[i].text}
        </div>`;
            var visivel = elemento.lastChild;
            visivel.scrollIntoView();
        }
        else {
            var elemento = document.querySelector(".mensagens");
            elemento.innerHTML +=
                `<div class="item ${conteudo.data[i].type}">
                <h3>(${conteudo.data[i].time})</h3> <h2>${conteudo.data[i].from}</h2> ${conteudo.data[i].text}
            </div>`;
            var visivel = elemento.lastChild;
            visivel.scrollIntoView();
        }

    }

}

const atualizador = setInterval(buscar, 3000);

// CONFIGURAR O ENTER PARA ENVIAR MENSAGEM

var inputEnter = document.querySelector(".rodape").firstElementChild;

inputEnter.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".rodape").lastElementChild.click();
    }
}
);


function enviar() {
    const mensagemInput = document.querySelector(".mensagem");

    const mensagemConteudo = mensagemInput.value;

    const mensagemobj = {
        from: infoNome.name,
        to: "Todos",
        text: mensagemConteudo,
        type: "message" // ou "private_message" para o bônus
    };

    const Enviarmensagem = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages', mensagemobj);
    Enviarmensagem.then(mensagemSucesso);
    Enviarmensagem.catch(mensagemErro);

    const limpador = document.querySelector(".mensagem");
    limpador.value = '';


}

function mensagemSucesso(sucesso) {
    const statusCode = sucesso.status;
    console.log(statusCode);
    buscar();
}

function mensagemErro(erro) {
    const statusCode = erro.response.status;
    console.log(statusCode);
    alert("ERRO! USUÁRIO DESCONECTADO");
    window.location.reload();

}

function participantes() {
    const fundo = document.querySelector(".pelicula");
    fundo.classList.add("sombreado");

    const mostrar = document.querySelector(".lateral");
    mostrar.classList.add("mostrar");

    const listaUsuarios = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants');

    listaUsuarios.then(addParticipantes);
}

function addParticipantes(conteudo) {
    for (let i = 0; i < conteudo.data.length; i++) {
        var elemento = document.querySelector(".pessoas");
        elemento.innerHTML +=
            `<div class="opcao" onclick="escolherUsuario(this)">
        <div class="seletor">
            <ion-icon name="person-circle"></ion-icon>
            <h3>${conteudo.data[i].name}</h3>
        </div>
        <ion-icon name="checkmark-sharp" class="check alvo"></ion-icon>
    </div>`;

    }
}

function escolherUsuario(elemento) {

    const resetar = document.querySelector(".selecionado.alvo");
    resetar.classList.remove("selecionado");

    const ultimofilho = elemento.lastElementChild;
    ultimofilho.classList.add("selecionado");

}

function escolherTipo(elemento) {

    const resetar = document.querySelector(".selecionado.tipo");
    resetar.classList.remove("selecionado");

    const ultimofilho = elemento.lastElementChild;
    ultimofilho.classList.add("selecionado");

}


function esconderLateral() {
    const fundo = document.querySelector(".pelicula");
    fundo.classList.remove("sombreado");

    const mostrar = document.querySelector(".lateral");
    mostrar.classList.remove("mostrar");

    var limpar = document.querySelector(".pessoas");
    limpar.innerHTML =
        `<div class="opcao" onclick="escolherUsuario(this)">
    <div class="seletor">
        <ion-icon name="people"></ion-icon>
        <h3>Todos</h3>
    </div>
    <ion-icon name="checkmark-sharp" class="check"></ion-icon>
</div>`;
}


