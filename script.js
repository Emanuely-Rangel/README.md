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
  }, // <--- VÍRGULA ADICIONADA AQUI
  {
    pergunta: "Qual cantora brasileira lançou a música 'Anunciação'?",
    opcoes: ["Marisa Monte", "Elba Ramalho", "Cássia Eller", "Gal Costa"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual grupo musical lançou a canção 'Bohemian Rhapsody'?",
    opcoes: ["The Beatles", "Queen", "Nirvana", "Coldplay"],
    respostaCorreta: 1
  },
  {
    pergunta: "Quem interpreta a música 'Evidências' em sua versão mais conhecida?",
    opcoes: ["Zezé Di Camargo e Luciano", "Chitãozinho e Xororó", "Jorge e Mateus", "Henrique e Juliano"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual cantora é conhecida pelo álbum '1989'?",
    opcoes: ["Taylor Swift", "Billie Eilish", "Ariana Grande", "Dua Lipa"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual artista é conhecido como 'Rei do Pop'?",
    opcoes: ["Freddie Mercury", "Michael Jackson", "Elvis Presley", "Prince"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual banda brasileira gravou a música 'Pro Dia Nascer Feliz'?",
    opcoes: ["Barão Vermelho", "Legião Urbana", "Paralamas do Sucesso", "Engenheiros do Hawaii"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual cantora lançou a música 'Bad Romance'?",
    opcoes: ["Lady Gaga", "Katy Perry", "Beyoncé", "Shakira"],
    respostaCorreta: 0
  },
  {
    pergunta: "Quem canta a música 'Garota de Ipanema' em uma das gravações internacionais mais famosas?",
    opcoes: ["Elis Regina", "Astrud Gilberto", "Ivete Sangalo", "Maria Bethânia"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual cantor brasileiro é conhecido por sucessos como 'Detalhes' e 'Como É Grande o Meu Amor por Você'?",
    opcoes: ["Caetano Veloso", "Roberto Carlos", "Djavan", "Milton Nascimento"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual banda lançou a música 'Smells Like Teen Spirit'?",
    opcoes: ["Green Day", "Nirvana", "Linkin Park", "Imagine Dragons"],
    respostaCorreta: 1
  }
];

let perguntaAtual = 0;
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

// Função utilitária para calcular pontuação com base nos acertos salvos
function calcularPontuacao() {
  return respostasUsuario.reduce((total, resposta, idx) => {
    return resposta === perguntas[idx].respostaCorreta ? total + 1 : total;
  }, 0);
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  const respostaSalva = respostasUsuario[perguntaAtual];
  const pontuacao = calcularPontuacao();

  contadorPerguntas.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
  placarAtual.textContent = `Pontos: ${pontuacao}`;
  preenchimentoProgresso.style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

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
    botaoOpcao.setAttribute("aria-checked", respostaSalva === indice ? "true" : "false");

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
        mensagem.textContent = `Resposta incorreta. A correta é: ${pergunta.opcoes[pergunta.respostaCorreta]}.`;
        mensagem.classList.add("incorreta");
      }
    } else {
      botaoOpcao.addEventListener("click", () => validarResposta(indice));
    }

    opcoes.appendChild(botaoOpcao);
  });

  botaoAnterior.disabled = perguntaAtual === 0;
  botaoProximo.disabled = respostasUsuario[perguntaAtual] === null;
  botaoProximo.textContent = perguntaAtual === perguntas.length - 1 ? "Finalizar" : "Próxima";
}

function validarResposta(indiceSelecionado) {
  respostasUsuario[perguntaAtual] = indiceSelecionado;
  mostrarPergunta(); // Recarrega a pergunta atual com os estados salvos e pontuação atualizada
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
  const pontuacao = calcularPontuacao();
  quiz.classList.add("escondido");
  resultado.classList.remove("escondido");

  pontuacaoFinal.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;

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
  respostasUsuario = new Array(perguntas.length).fill(null);

  resultado.classList.add("escondido");
  quiz.classList.remove("escondido");

  mostrarPergunta();
}

botaoProximo.addEventListener("click", avancarPergunta);
botaoAnterior.addEventListener("click", voltarPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);

mostrarPergunta();
