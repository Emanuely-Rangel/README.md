const perguntas = [
  {
    pergunta: "Qual cantora é conhecida como a 'Rainha do Pop'?",
    opcoes: ["Beyoncé", "Madonna", "Adele", "Rihanna"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual cantor lançou a música 'Thriller'?",
    opcoes: ["Elvis Presley", "Bruno Mars", "Michael Jackson", "Justin Bieber"],
    respostaCorreta: 2
  },
  {
    pergunta: "Qual banda brasileira gravou a música 'Tempo Perdido'?",
    opcoes: ["Legião Urbana", "Skank", "Titãs", "Capital Inicial"],
    respostaCorreta: 0
  },
  {
    pergunta: "Quem canta a música 'Rolling in the Deep'?",
    opcoes: ["Adele", "Lady Gaga", "Taylor Swift", "Katy Perry"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual artista brasileiro ficou conhecido como o 'Rei do Rock Brasileiro'?",
    opcoes: ["Raul Seixas", "Cazuza", "Renato Russo", "Chico Buarque"],
    respostaCorreta: 0
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostasUsuario = new Array(perguntas.length).fill(null);

const contadorPerguntas = document.querySelector("#contador-perguntas");
const placarAtual = document.querySelector("#placar-atual");
const preenchimentoProgresso = document.querySelector("#preenchimento-progresso");
const tituloPergunta = document.querySelector("#titulo-pergunta");
const opcoes = document.querySelector("#opcoes");
const mensagem = document.querySelector("#mensagem");
const botaoAnterior = document.querySelector("#botao-anterior");
const botaoProximo = document.querySelector("#botao-proximo");
const quiz = document.querySelector(".quiz");
const resultado = document.querySelector("#resultado");
const pontuacaoFinal = document.querySelector("#pontuacao-final");
const mensagemFinal = document.querySelector("#mensagem-final");
const botaoReiniciar = document.querySelector("#botao-reiniciar");

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  const respostaSalva = respostasUsuario[perguntaAtual];

  contadorPerguntas.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  placarAtual.textContent = `Pontos: ${pontuacao}`;

  preenchimentoProgresso.style.width =
    `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

  tituloPergunta.textContent = pergunta.pergunta;
  opcoes.innerHTML = "";
  mensagem.textContent = "";
  mensagem.className = "mensagem";

  pergunta.opcoes.forEach((opcao, indice) => {
    const botaoOpcao = document.createElement("button");

    botaoOpcao.type = "button";
    botaoOpcao.classList.add("opcao");
    botaoOpcao.textContent = opcao;
    botaoOpcao.setAttribute("role", "radio");
    botaoOpcao.setAttribute("aria-checked", "false");

    if (respostaSalva !== null) {
      botaoOpcao.disabled = true;

      if (indice === pergunta.respostaCorreta) {
        botaoOpcao.classList.add("correta");
      }

      if (indice === respostaSalva && indice !== pergunta.respostaCorreta) {
        botaoOpcao.classList.add("incorreta");
      }

      if (respostaSalva === pergunta.respostaCorreta) {
        mensagem.textContent = "Resposta correta!";
        mensagem.classList.add("correta");
      } else {
        mensagem.textContent =
          `Resposta incorreta. A correta é: ${pergunta.opcoes[pergunta.respostaCorreta]}.`;
        mensagem.classList.add("incorreta");
      }
    } else {
      botaoOpcao.addEventListener("click", () => validarResposta(indice));
    }

    opcoes.appendChild(botaoOpcao);
  });

  botaoAnterior.disabled = perguntaAtual === 0;
  botaoProximo.disabled = respostasUsuario[perguntaAtual] === null;

  botaoProximo.textContent =
    perguntaAtual === perguntas.length - 1 ? "Finalizar" : "Próxima";
}

function validarResposta(indiceSelecionado) {
  const pergunta = perguntas[perguntaAtual];
  const botoes = document.querySelectorAll(".opcao");

  respostasUsuario[perguntaAtual] = indiceSelecionado;

  botoes.forEach((botao, indice) => {
    botao.disabled = true;

    if (indice === pergunta.respostaCorreta) {
      botao.classList.add("correta");
    }

    if (indice === indiceSelecionado && indice !== pergunta.respostaCorreta) {
      botao.classList.add("incorreta");
    }
  });

  if (indiceSelecionado === pergunta.respostaCorreta) {
    pontuacao++;
    mensagem.textContent = "Resposta correta!";
    mensagem.className = "mensagem correta";
  } else {
    mensagem.textContent =
      `Resposta incorreta. A correta é: ${pergunta.opcoes[pergunta.respostaCorreta]}.`;
    mensagem.className = "mensagem incorreta";
  }

  placarAtual.textContent = `Pontos: ${pontuacao}`;
  botaoProximo.disabled = false;
}

function avancarPergunta() {
  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function voltarPergunta() {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    mostrarPergunta();
  }
}

function mostrarResultado() {
  quiz.classList.add("escondido");
  resultado.classList.remove("escondido");

  pontuacaoFinal.textContent =
    `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;

  const percentual = (pontuacao / perguntas.length) * 100;

  if (percentual === 100) {
    mensagemFinal.textContent = "Excelente! Você domina muito bem o mundo da música.";
  } else if (percentual >= 60) {
    mensagemFinal.textContent = "Muito bom! Você tem bons conhecimentos musicais.";
  } else {
    mensagemFinal.textContent = "Continue praticando e tente novamente para melhorar sua pontuação.";
  }
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  respostasUsuario = new Array(perguntas.length).fill(null);

  resultado.classList.add("escondido");
  quiz.classList.remove("escondido");

  mostrarPergunta();
}

botaoProximo.addEventListener("click", avancarPergunta);
botaoAnterior.addEventListener("click", voltarPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);

mostrarPergunta();
