let tentativas = 0;
let listaDeNumerosSorteados = [];
const range = 50;
let possibilidades = 10;
let numeroAletorio = gerarNumeroAleatorio();
iniciar();

function gerarNumeroAleatorio() {
  let numeroSorteado = parseInt(Math.random() * range + 1);
  if (listaDeNumerosSorteados.length == possibilidades) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroSorteado)) {
    gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroSorteado);
    return numeroSorteado;
  }
}

function iniciar() {
  exibirTexto("h1", "Jogo do número secreto!");
  exibirTexto("p", `Escolha um número entre 1 e ${range}!`);
  tentativas = 1;
  focaCampo();
}

function exibirTexto(tag, texto) {
  let elemento = document.querySelector(tag);
  elemento.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function focaCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
  chute.placeholder = "Digite seu chute aqui!";
  chute.focus();
}

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == "") {
    exibirTexto("p", "Você não digitou nada! Tente novamente!");
    focaCampo();
    return;
  }

  if (chute < 1 || chute > range) {
    exibirTexto(
      "p",
      `O número deve estar entre 1 e ${range}. Tente novamente!`
    );
    focaCampo();
    return;
  }

  if (numeroAletorio == chute) {
    let mensagem = `Você acertou após ${tentativas} ${
      tentativas > 1 ? "tentativas" : "tentativa"
    }! O número era ${numeroAletorio}`;
    exibirTexto("h1", mensagem);
    exibirTexto("p", "Clique em 'Novo Jogo' para jogar novamente!");
    document.getElementById("reiniciar").disabled = false;
  } else {
    if (numeroAletorio > chute) {
      exibirTexto(
        "p",
        "O número secreto é maior que " + chute + " tente novamente!"
      );
      tentativas++;
      focaCampo();
    } else {
      exibirTexto(
        "p",
        "O número secreto é menor que " + chute + " tente novamente!"
      );
      tentativas++;
      focaCampo();
    }
  }
}

function novoJogo() {
  numeroAletorio = gerarNumeroAleatorio();
  iniciar();
  document.getElementById("reiniciar").disabled = true;
}
