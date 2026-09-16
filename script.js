const formBusca = document.getElementById("formBusca");
const campoCep = document.getElementById("campoCep");
const botaoBuscar = formBusca.querySelector("button");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

formBusca.addEventListener("submit", function (evento) {
  evento.preventDefault(); 

  const cepLimpo = campoCep.value.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    mostrarErro("O CEP precisa ter 8 números. Exemplo: 89201-000.");
    return;
  }

  buscarCep(cepLimpo);
});

async function buscarCep(cep) {
  mostrarCarregando();

  const url = "https://viacep.com.br/ws/" + cep + "/json/";

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      mostrarErro("O serviço de CEP respondeu com erro " + resposta.status + ". Tente de novo em instantes.");
      return;
    }

    const dados = await resposta.json();

    if (dados.erro) {
      mostrarErro("Nenhum endereço encontrado para o CEP " + formatarCep(cep) + ".");
      return;
    }

    exibirEndereco(dados);

  } catch (falha) {
    mostrarErro("Não foi possível conectar ao serviço de CEP. Verifique sua internet.");
  } finally {
    botaoBuscar.disabled = false;
    botaoBuscar.textContent = "Buscar endereço";
  }
}

function exibirEndereco(dados) {
  document.getElementById("saidaLogradouro").textContent = dados.logradouro || "Não informado";
  document.getElementById("saidaBairro").textContent = dados.bairro || "Não informado";
  document.getElementById("saidaCidade").textContent = dados.localidade;
  document.getElementById("saidaEstado").textContent = dados.uf;
  document.getElementById("saidaDdd").textContent = dados.ddd;
  document.getElementById("saidaCep").textContent = dados.cep;

  mensagem.textContent = "";
  mensagem.classList.remove("erro");
  resultado.classList.remove("oculto");
}

function mostrarCarregando() {
  mensagem.textContent = "Buscando endereço...";
  mensagem.classList.remove("erro");
  resultado.classList.add("oculto");
  botaoBuscar.disabled = true;
  botaoBuscar.textContent = "Buscando...";
}

function mostrarErro(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add("erro");
  resultado.classList.add("oculto");
}

function formatarCep(cep) {
  return cep.slice(0, 5) + "-" + cep.slice(5);
}
