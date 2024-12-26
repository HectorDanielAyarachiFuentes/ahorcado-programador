// Palabras para adivinar y sus pistas
const palabrasSecretas = [
  { palabra: "javascript", pista: "Lenguaje de programación web" },
  { palabra: "python", pista: "Lenguaje de programación versátil" },
  { palabra: "html", pista: "Lenguaje de marcado para páginas web" },
  { palabra: "css", pista: "Lenguaje de estilos para páginas web" },
  { palabra: "java", pista: "Lenguaje de programación orientado a objetos" },
  { palabra: "php", pista: "Lenguaje de programación para desarrollo web" },
  { palabra: "ruby", pista: "Lenguaje de programación interpretado" },
  { palabra: "csharp", pista: "Lenguaje de programación de Microsoft" },
  { palabra: "swift", pista: "Lenguaje de programación para aplicaciones iOS" },
  { palabra: "android", pista: "Sistema operativo móvil de Google" },
  { palabra: "mysql", pista: "Sistema de gestión de bases de datos relacional" },
  { palabra: "mongodb", pista: "Base de datos NoSQL orientada a documentos" },
  { palabra: "react", pista: "Biblioteca de JavaScript para construir interfaces de usuario" },
  { palabra: "angular", pista: "Framework de JavaScript para desarrollo web" },
  { palabra: "typescript", pista: "Lenguaje de programación basado en JavaScript" },
  { palabra: "docker", pista: "Plataforma de contenedorización" },
  { palabra: "linux", pista: "Sistema operativo de código abierto" },
  { palabra: "git", pista: "Sistema de control de versiones" },
  { palabra: "api", pista: "Interfaz de programación de aplicaciones" },
  { palabra: "nodejs", pista: "Entorno de ejecución de JavaScript del lado del servidor" },
  // Agrega más palabras y pistas aquí
];
// Palabra y pista actual
let palabraActual = palabrasSecretas[0];
let letrasAdivinadas = [];
let intentosRestantes = 6;
let juegoTerminado = false;
// Elementos del DOM
const wordContainer = document.getElementById("word-container");
const guessesContainer = document.getElementById("guesses-container");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");
// Inicializar la palabra oculta con guiones bajos
let palabraOculta = "_".repeat(palabraActual.palabra.length);
wordContainer.textContent = palabraOculta;
// Mostrar la pista
hint.textContent = `Pista: ${palabraActual.pista}`;
// Frases de felicitación cuando el jugador gana
const frasesGanar = [
  "¡Felicitaciones! Eres un genio, ¡ganaste!",
  "¡Eres increíble! Ganaste el juego del ahorcado.",
  "¡Ganaste! Eres un maestro en esto.",
  "Excelente trabajo, ¡ganaste!",
  "¡Eres un adivino experto! Ganaste el juego.",
  "¡Ganador absoluto! Felicidades.",
  "¡Eres un verdadero campeón! Ganaste.",
  "¡Triunfaste brillantemente! Eres el ganador.",
  "¡Enhorabuena! Eres el vencedor indiscutible.",
  "¡Bravo! Has demostrado tu destreza ganadora.",
  "¡Victoria total! Eres un crack en esto.",
  "¡Ganaste con estilo! Felicidades.",
  "¡Eres el rey del ahorcado! Ganaste.",
  "¡Increíble! Has conquistado el juego.",
  "¡Dominaste el ahorcado! Eres el ganador.",
  "¡Triunfaste con honor! Ganaste el juego.",
  "¡Eres un ganador nato! Felicidades.",
  "¡Victoria merecida! Eres un campeón.",
  "¡Ganar es tu segundo nombre! Felicidades.",
  "¡Eres un experto en esto! Ganaste.",
  // Agrega más frases de felicitación aquí
];
// Frases de ánimo cuando el jugador pierde
const frasesPerder = [
  "No te preocupes, ¡la próxima vez lo harás mejor!",
  "Cada error es una oportunidad para aprender. ¡Sigue intentando!",
  "No hay derrotas, solo lecciones. ¡Sigue adelante!",
  "La perseverancia es la clave del éxito. ¡No te rindas!",
  "Recuerda, los campeones se levantan después de caer. ¡Sigue adelante!",
  "Tus habilidades mejorarán con cada intento. ¡Sigue practicando!",
  "¡La victoria es dulce, pero la derrota te hace más fuerte!",
  "¡La próxima vez lo conseguirás! Mantén la determinación.",
  "Cada intento te acerca más a la victoria. ¡No te desanimes!",
  "El fracaso es solo un paso en el camino hacia el éxito. ¡Sigue adelante!",
  "Tus esfuerzos no se desperdician. ¡Sigue intentando!",
  "La persistencia es la madre del éxito. ¡No pares!",
  "Cada derrota te acerca un paso más a la victoria final. ¡Sigue luchando!",
  "Tienes el potencial para lograr grandes cosas. ¡Sigue esforzándote!",
  "No importa cuántas veces caigas, lo importante es levantarse. ¡Sigue adelante!",
  "Tu determinación es admirable. ¡No te rindas ahora!",
  "¡El ahorcado no tiene oportunidad contra tu determinación!",
  "Las derrotas temporales no definen tu futuro. ¡Sigue perseverando!",
  "Tus esfuerzos te llevarán a la victoria. ¡Sigue intentando!",
  "La paciencia y la práctica te llevarán al éxito. ¡Sigue adelante!",
  // Agrega más frases de ánimo aquí
];
// Función para actualizar la palabra oculta con las letras adivinadas
function actualizarPalabraOculta() {
  let palabraMostrada = "";
  for (let i = 0; i < palabraActual.palabra.length; i++) {
    if (letrasAdivinadas.includes(palabraActual.palabra[i])) {
      palabraMostrada += palabraActual.palabra[i];
    } else {
      palabraMostrada += "_";
    }
  }
  palabraOculta = palabraMostrada;
  wordContainer.textContent = palabraOculta;
}
// Función para manejar los intentos del jugador y verificar la victoria
function manejarIntento(letra) {
  if (juegoTerminado) {
    message.textContent =
      "El juego ha terminado. Pulsa Reiniciar Juego para jugar de nuevo.";
    return;
  }
  letra = letra.toLowerCase();
  if (letrasAdivinadas.includes(letra)) {
    message.textContent = "Ya has adivinado esa letra.";
    return;
  }
  letrasAdivinadas.push(letra);
  if (palabraActual.palabra.includes(letra)) {
    actualizarPalabraOculta();
    if (palabraOculta === palabraActual.palabra) {
      juegoTerminado = true;
      const mensajeGanar =
        frasesGanar[Math.floor(Math.random() * frasesGanar.length)];
      message.textContent = "¡Ganaste! " + mensajeGanar;
      guessButton.disabled = true;
      restartButton.style.display = "block";
      mostrarMensajeFinal();
      if (juegoTerminado) {
        startConfetiCascada();
      }
    } else {
      message.textContent = "¡Correcto! Has adivinado una letra.";
    }
  } else {
    intentosRestantes--;
    if (intentosRestantes === 0) {
      juegoTerminado = true;
      const mensajePerder =
        frasesPerder[Math.floor(Math.random() * frasesPerder.length)];
      message.textContent =
        "¡Perdiste! La palabra era: " +
        palabraActual.palabra +
        " " +
        mensajePerder;
      guessButton.disabled = true;
      restartButton.style.display = "block";
    } else {
      message.textContent = `Intentos restantes: ${intentosRestantes}`;
    }
  }
  guessesContainer.textContent = `Letras adivinadas: ${letrasAdivinadas.join(
    ", "
  )}`;
}

// Generar el abecedario
const abecedario = "abcdefghijklmnopqrstuvwxyz";
const alphabetContainer = document.getElementById("alphabet-container");
for (let letra of abecedario) {
  const letterButton = document.createElement("button");
  letterButton.textContent = letra;
  letterButton.classList.add("alphabet-letter");
  letterButton.addEventListener("click", () => {
    manejarIntento(letra); // Llama a manejarIntento con la letra correspondiente
  });
  alphabetContainer.appendChild(letterButton);
}
// Función para reiniciar el juego
function reiniciarJuego() {
  palabraActual = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
  letrasAdivinadas = [];
  intentosRestantes = 6;
  juegoTerminado = false;
  // Reinicia los elementos en el DOM
  palabraOculta = "_".repeat(palabraActual.palabra.length);
  wordContainer.textContent = palabraOculta;
  guessesContainer.textContent = "Letras adivinadas:";
  message.textContent = `Intentos restantes: ${intentosRestantes}`;
  hint.textContent = `Pista: ${palabraActual.pista}`;
  guessButton.disabled = false;
  restartButton.style.display = "none";
}
restartButton.addEventListener("click", reiniciarJuego);
// Función para mostrar un mensaje final cuando el jugador gane
function mostrarMensajeFinal() {
  if (!juegoTerminado || palabraOculta === palabraActual.palabra) {
    return; // No muestra el mensaje si el juego no ha terminado o si el jugador ha ganado
  }
  setTimeout(() => {
    const mensajeFinal = document.createElement("div");
    mensajeFinal.textContent = "¡Felicidades! Has adivinado la palabra secreta.";
    mensajeFinal.classList.add("mensaje-final");
    document.body.appendChild(mensajeFinal);
  }, 1000);
}
//// MUSICA DE BABASONICOS PLAYER
const audioPlayer = document.getElementById("audio-player");
function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    document.getElementById("guess-button").innerHTML = "¡Vive con Babasónicos! 🎶🤘";
  } else {
    audioPlayer.pause();
    document.getElementById("guess-button").innerHTML = "Vive con alegría";
  }
}
document.getElementById("guess-button").addEventListener("click", playPause);
// Inicialización del juego
actualizarPalabraOculta();


//Efecto cascada

var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

// Función para generar una dirección de viento aleatoria
function randomWindDirection() {
  return Math.random() > 0.5 ? -1 : 1;
}

// Función para iniciar el efecto de cascada
function startConfetiCascada() {
  var cascadeCount = 5; // Número de cascadas
  var cascadeDuration = 1000; // Duración de cada cascada en milisegundos

  function launchCascade(index) {
    setTimeout(function() {
      var windDirection = index % 2 === 0 ? 1 : -1; // Cambiar dirección del viento en cada cascada
      fire(1, {
        spread: Math.random() * 100 + 26,
        startVelocity: Math.random() * 100 + 25,
        decay: Math.random() * 0.2 + 0.7,
        scalar: Math.random() + 0.5,
        gravity: Math.random() * 0.5 + 0.2, // Gravedad aleatoria
        wind: windDirection * Math.random() * 10 // Dirección y velocidad del viento aleatoria
      });

      if (index < cascadeCount - 1) {
        launchCascade(index + 1); // Iniciar la siguiente cascada
      }
    }, cascadeDuration);
  }

  // Iniciar la primera cascada
  launchCascade(0);
}

// Agregar un controlador de clic al botón
document.getElementById('guess-button').addEventListener('click', startConfetiCascada);

