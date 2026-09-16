const formBusca = document.getElementById("formBusca");
const campoCep = document.getElementById("campoCep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

formBusca.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const cepDigitado = campoCep.value;
  buscarCep(cepDigitado);
});

async function buscarCep(cep) {
  mensagem.textContent = "Buscando...";
  resultado.classList.add("oculto");

  const url = "https://viacep.com.br/ws/" + cep + "/json/";

  const resposta = await fetch(url);
  const dados = await resposta.json();

  exibirEndereco(dados);
}

function exibirEndereco(dados) {
  document.getElementById("saidaLogradouro").textContent = dados.logradouro;
  document.getElementById("saidaBairro").textContent = dados.bairro;
  document.getElementById("saidaCidade").textContent = dados.localidade;
  document.getElementById("saidaEstado").textContent = dados.uf;
  document.getElementById("saidaDdd").textContent = dados.ddd;
  document.getElementById("saidaCep").textContent = dados.cep;

  mensagem.textContent = "";
  resultado.classList.remove("oculto");
}
