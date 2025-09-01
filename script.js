    document.addEventListener('DOMContentLoaded', () => {
        // --- MATRIX BACKGROUND Y TYPEWRITER (Sin cambios)---
        const canvas = document.getElementById('matrix-bg');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = Array(Math.floor(columns)).fill(1);
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) { rainDrops[i] = 0; }
                rainDrops[i]++;
            }
        }
        setInterval(drawMatrix, 33);
        function typeWriter(element, text, speed = 50, callback = () => {}) {
            let i = 0;
            element.innerHTML = "";
            const type = () => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i); i++;
                    setTimeout(type, speed);
                } else { callback(); }
            };
            type();
        }

        // --- DOM ELEMENTS (con nuevos elementos modales) ---
        const elements = {
            title: document.getElementById('title'),
            wordContainer: document.getElementById("word-container"),
            hintContainer: document.getElementById("hint-container"),
            messageContainer: document.getElementById("message-container"),
            keyboardContainer: document.getElementById("keyboard"),
            restartButton: document.getElementById("restart-button"),
            musicButton: document.getElementById("music-button"),
            asciiHangman: document.getElementById('hangman-ascii'),
            // MODAL
            modalOverlay: document.getElementById('modal-overlay'),
            modalTitle: document.getElementById('modal-title'),
            modalMessage: document.getElementById('modal-message'),
            modalCloseButton: document.getElementById('modal-close-button')
        };
        const sounds = {
            audioPlayer: document.getElementById("audio-player"),
            keyPress: document.getElementById("key-press-sound"),
            correct: document.getElementById("correct-sound"),
            wrong: document.getElementById("wrong-sound"),
            win: document.getElementById('win-sound'),
            lose: document.getElementById('lose-sound')
        };
        
        // --- GAME DATA (con los nuevos mensajes motivadores) ---
        const palabrasSecretas = [ /* Lista de palabras sin cambios */ { palabra: "javascript", pista: "Lenguaje de scripting para la web" }, { palabra: "python", pista: "Sintaxis limpia y versátil" }, { palabra: "html", pista: "La estructura de la web" }, { palabra: "css", pista: "Estilos para la web" }, { palabra: "java", pista: "Se ejecuta en 'VMs'" }, { palabra: "php", pista: "Común en servidores web" }, { palabra: "ruby", pista: "Conocido por su framework 'Rails'" }, { palabra: "csharp", pista: "'C#' de Microsoft" }, { palabra: "swift", pista: "Para aplicaciones de Apple" }, { palabra: "typescript", pista: "JS con tipos estáticos" },{ palabra: "rust", pista: "Lenguaje enfocado en seguridad y rendimiento" },{ palabra: "kotlin", pista: "Lenguaje moderno para desarrollo en Android" },{ palabra: "golang", pista: "Lenguaje concurrente creado por Google" },{ palabra: "scala", pista: "Lenguaje funcional y orientado a objetos en la JVM" },{ palabra: "bash", pista: "El shell por defecto en muchas distros Linux" },{ palabra: "react", pista: "Librería UI de Meta" }, { palabra: "angular", pista: "Framework UI de Google" },{ palabra: "vue", pista: "Framework progresivo de JS" },{ palabra: "svelte", pista: "Compilador que escribe código para desaparecer" },{ palabra: "django", pista: "Framework de Python con baterías incluidas" },{ palabra: "flask", pista: "Microframework de Python para web" },{ palabra: "express", pista: "Framework minimalista para NodeJS" },{ palabra: "jquery", pista: "La librería de JS que dominó una era" },{ palabra: "mysql", pista: "Base de datos relacional popular" }, { palabra: "mongodb", pista: "Base de datos NoSQL orientada a documentos" }, { palabra: "docker", pista: "Plataforma de contenedores" }, { palabra: "git", pista: "Control de versiones distribuido" }, { palabra: "api", pista: "Interfaz entre programas" }, { palabra: "nodejs", pista: "JS en el lado del servidor" },{ palabra: "postgresql", pista: "Base de datos relacional open-source avanzada" },{ palabra: "redis", pista: "Almacén en memoria, usado para caché" },{ palabra: "graphql", pista: "Lenguaje de consulta para APIs" },{ palabra: "webpack", pista: "Empaquetador de módulos para JS moderno" },{ palabra: "kubernetes", pista: "Orquestador de contenedores (K8s)" },{ palabra: "github", pista: "La plataforma más popular para alojar repositorios Git" },{ palabra: "jenkins", pista: "Servidor de automatización para CI/CD" },{ palabra: "algorithm", pista: "Conjunto de pasos para resolver un problema" },{ palabra: "variable", pista: "Contenedor para almacenar un valor" },{ palabra: "function", pista: "Bloque de código reutilizable que realiza una tarea" },{ palabra: "compiler", pista: "Traduce código fuente a código máquina" },{ palabra: "debugger", pista: "Herramienta para encontrar y corregir errores" },{ palabra: "boolean", pista: "Tipo de dato que solo puede ser verdadero o falso" },{ palabra: "object", pista: "Colección de propiedades y métodos" },{ palabra: "class", pista: "Plantilla para crear objetos" },{ palabra: "array", pista: "Estructura de datos que almacena una lista de elementos" } ];
        const asciiHangmanStages = [ '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========', '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========', '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========', '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========', '  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========', '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========', '  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========' ];
        
        const mensajesGanar = ["¡Tu código compiló a la perfección: Éxito!", "Has deployado la victoria en producción.", "¡Error 404: Rival no encontrado! Ganaste.", "Tu lógica fue impecable. ¡Sin bugs!", "¡Commit 'Victoria' pusheado a la rama master!", "Eres el Admin. Has obtenido acceso root a la victoria.", "¡El algoritmo de la victoria se ejecutó correctamente!", "Estado de la tarea: Resuelta. ¡Felicitaciones!", "La API devolvió un 200 OK. ¡Ganaste!", "Tu stack está completo: HTML, CSS, JS y Victoria.", "Pasaste todos los tests de unidad. ¡Eres un campeón!", "Resolviste la dependencia más difícil: ¡Ganar!", "El sistema te reconoce. Bienvenido, Ganador.", "Has superado el firewall de la derrota.", "¡Tu eficiencia es O(1)! Victoria instantánea.", "Fusionaste tu rama de esfuerzo con la de la victoria.", "No hubo excepciones. Un try-catch perfecto.", "Has optimizado tu estrategia hasta la victoria.", "La base de datos de ganadores tiene un nuevo registro: Tú.", "¡Tu nivel de abstracción es legendario! Ganaste."];
        const mensajesPerder = ["La compilación falló, pero tu espíritu no. ¡Inténtalo de nuevo!", "Error de sintaxis en la línea final. Revisa y vuelve a intentarlo.", "Se ha producido una excepción no controlada. ¡El debugging continúa!", "No te preocupes. Todo programador pasa más tiempo debuggeando que codeando.", "Cada bug eliminado te acerca a la perfección. ¡Sigue adelante!", "Un 'commit' fallido no es el fin del 'repo'. ¡Vamos!", "Denegado. Código de error 500: error interno del servidor... de juego.", "La ruta a la victoria dio 404. Prueba otro endpoint.", "Esto no es un bug, es una feature inesperada. ¡Siguiente intento!", "Recuerda: 'rm -rf /' no es una solución. ¡Reintenta!", "Tu stack overflowed. Tómate un respiro y vuelve a la carga.", "No has fallado, solo encontraste una forma de no ganar.", "La recursividad falló. Vuelve al caso base e inténtalo.", "El recolector de basura se llevó tus intentos. ¡Genera nuevos!", "Incluso las IAs más avanzadas necesitan reentrenamiento. ¡Tú también!", "Se agotó el tiempo de espera de la solicitud. ¡La próxima será más rápida!", "El sistema necesita un reinicio. Y tú, una nueva oportunidad.", "Dependencia no resuelta. Falta un poco más de práctica.", "Merge conflict! Tu estrategia chocó con la realidad. ¡A resolverlo!", "Comenta esta partida y refactoriza tu estrategia para la próxima."];

        let palabraActual, letrasAdivinadas, intentosFallidos, juegoTerminado, keyMap;

        // --- FUNCIONES DEL JUEGO (MODIFICADAS PARA EL MODAL) ---

        function iniciarJuego() {
            // (Función sin cambios, reinicia el estado del juego)
            const juegoActual = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
            palabraActual = juegoActual.palabra;
            letrasAdivinadas = [];
            intentosFallidos = 0;
            juegoTerminado = false;
            
            typeWriter(elements.hintContainer, `> HINT: ${juegoActual.pista}`);
            typeWriter(elements.messageContainer, "> STATUS: ESPERANDO INPUT...");
            elements.messageContainer.style.color = "var(--text-color)";
            elements.restartButton.classList.remove('visible');
            
            elements.wordContainer.innerHTML = "";
            palabraActual.split('').forEach(() => {
                const letterEl = document.createElement('span');
                letterEl.classList.add('letter-placeholder', 'empty');
                elements.wordContainer.appendChild(letterEl);
            });
            
            crearTeclado();
            elements.asciiHangman.textContent = asciiHangmanStages[0];
        }

        function manejarIntento(letra) {
            // (Función sin cambios, gestiona cada intento)
            if (juegoTerminado) return;
            
            letra = letra.toLowerCase();
            const keyButton = keyMap[letra];
            
            if (!keyButton || keyButton.disabled) return;
            
            sounds.keyPress.currentTime = 0;
            sounds.keyPress.play();
            keyButton.disabled = true;
            letrasAdivinadas.push(letra);

            if (palabraActual.includes(letra)) {
                sounds.correct.currentTime = 0;
                sounds.correct.play();
                keyButton.classList.add('correct');
                
                palabraActual.split('').forEach((char, index) => {
                    if (char === letra) {
                        const letterElements = elements.wordContainer.children;
                        letterElements[index].textContent = letra.toUpperCase();
                        letterElements[index].classList.remove('empty');
                    }
                });

                if ([...elements.wordContainer.children].every(el => el.textContent !== '')) {
                    finalizarJuego(true);
                }
            } else {
                sounds.wrong.currentTime = 0;
                sounds.wrong.play();
                keyButton.classList.add('incorrect');
                intentosFallidos++;
                elements.asciiHangman.textContent = asciiHangmanStages[intentosFallidos];
                
                if (intentosFallidos >= asciiHangmanStages.length - 1) {
                    finalizarJuego(false);
                } else {
                     typeWriter(elements.messageContainer, `> STATUS: ERROR. INTENTOS RESTANTES: ${asciiHangmanStages.length - 1 - intentosFallidos}`);
                }
            }
        }
        
        function finalizarJuego(haGanado) {
            juegoTerminado = true;
            setTimeout(() => { // Pequeño retraso para ver el último movimiento
                if (haGanado) {
                    sounds.win.play();
                    lanzarConfeti();
                    mostrarModal(true);
                } else {
                    sounds.lose.play();
                    mostrarModal(false);
                }
                elements.restartButton.classList.add('visible');
            }, 500);
        }

        function mostrarModal(esVictoria) {
            const titulo = esVictoria ? 'GANASTE!!!' : 'PERDISTE...';
            const claseTitulo = esVictoria ? 'win-title' : 'lose-title';
            const mensaje = esVictoria 
                ? mensajesGanar[Math.floor(Math.random() * mensajesGanar.length)] 
                : mensajesPerder[Math.floor(Math.random() * mensajesPerder.length)];
            
            elements.modalTitle.textContent = titulo;
            elements.modalTitle.className = ''; // Limpia clases previas
            elements.modalTitle.classList.add(claseTitulo);
            typeWriter(elements.modalMessage, `> ${mensaje}`, 40);

            elements.modalOverlay.classList.remove('hidden');
        }

        function ocultarModal() {
            elements.modalOverlay.classList.add('hidden');
        }

        // --- FUNCIONES AUXILIARES Y EVENT LISTENERS (con nuevos listeners para el modal) ---
        function crearTeclado() {
            elements.keyboardContainer.innerHTML = ''; keyMap = {};
            'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letra => {
                const button = document.createElement('button');
                button.textContent = letra; button.classList.add('key');
                button.addEventListener('click', () => manejarIntento(letra));
                elements.keyboardContainer.appendChild(button); keyMap[letra] = button;
            });
        }
        function lanzarConfeti() { confetti({ particleCount: 150, spread: 180, origin: { y: 0.6 } }); }
        function alternarMusica() {
            if (sounds.audioPlayer.paused) { sounds.audioPlayer.play(); elements.musicButton.textContent = "[ Stop Music ]"; } 
            else { sounds.audioPlayer.pause(); elements.musicButton.textContent = "[ Play Music ]"; }
        }
        
        elements.restartButton.addEventListener('click', iniciarJuego);
        elements.musicButton.addEventListener('click', alternarMusica);
        elements.modalCloseButton.addEventListener('click', ocultarModal);
        
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !elements.modalOverlay.classList.contains('hidden')) {
                ocultarModal();
            } else if (e.key.match(/^[a-z]$/i)) {
                manejarIntento(e.key);
            }
        });

        // --- INICIAR EL JUEGO ---
        typeWriter(elements.title, "> Executing program 'Programador_Ahorcado.exe'...", 70, iniciarJuego);
    });
