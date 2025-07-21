particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 140,
            "density": {
                "enable": true,
                "value_area": 900
            }
        },
        "color": {
            "value": "#8100f9"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": true
        },
        "size": {
            "value": 1.5,
            "random": true
        },
        "move": {
            "enable": true,
            "speed": 0.5,
            "direction": "none",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "repulse": {
                "distance": 150,
                "duration": 0.8
            },
            "push": {
                "particles_nb": 9
            }
        }
    },
    "retina_detect": true
}); document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");

    const isMobile = () => window.innerWidth <= 1024;

    // Inicializa escondendo o menu em mobile/tablet
    if (isMobile()) {
        navbar.classList.remove("show");
        navbar.style.display = "none";
    }

    hamburger.addEventListener("click", () => {
        if (!isMobile()) return;

        const isOpen = navbar.classList.contains("show");

        if (isOpen) {
            navbar.classList.remove("show");
            hamburger.textContent = "☰";
            navbar.style.display = "none";
        } else {
            navbar.classList.add("show");
            hamburger.textContent = "✖";
            navbar.style.display = "flex";
        }
    });

    // Quando a tela for redimensionada
    window.addEventListener("resize", () => {
        if (isMobile()) {
            if (!navbar.classList.contains("show")) {
                navbar.style.display = "none";
            }
            hamburger.style.display = "block";
        } else {
            navbar.style.display = "flex";
            navbar.classList.remove("show");
            hamburger.style.display = "none";
            hamburger.textContent = "☰";

            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll(".navbar");

            window.addEventListener("scroll", () => {
                let current = "";
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (scrollY >= sectionTop) {
                        current = section.getAttribute("id");
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + current) {
                        link.classList.add("active");
                    }
                });
            });
        }
    });
});

// Função para digitar suavemente o texto
const text = 'Olá, sou Gustavo Ferreira!';
const japaneseChars = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ',
                      'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と',
                      'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
                      'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り',
                      'る', 'れ', 'ろ', 'わ', 'を', 'ん', 'カ', 'キ', 'ク', 'ケ',
                      'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ',
                      'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ',
                      'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ',
                      'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];

const output = document.getElementById('japones');

let currentIndex = 0;
let phase = 'typing'; // typing, hold, deleting
let holdFrames = 60; // segurar texto completo (~1s)
let holdCounter = 0;
let frameCount = 0;
const framesPerStep = 4; // quantos frames para avançar uma letra

function getRandomJapaneseChar() {
  return japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
}

function generateText(idx) {
  let displayed = '';
  for (let i = 0; i < text.length; i++) {
    if (i < idx) {
      displayed += text[i];
    } else if (text[i] === ' ') {
      displayed += ' ';
    } else {
      displayed += getRandomJapaneseChar();
    }
  }
  return displayed;
}

function animate() {
  frameCount++;

  if (frameCount % framesPerStep === 0) {
    if (phase === 'typing') {
      output.textContent = generateText(currentIndex);
      if (currentIndex < text.length) {
        currentIndex++;
      } else {
        phase = 'hold';
        holdCounter = 0;
      }
    } else if (phase === 'hold') {
      holdCounter++;
      if (holdCounter > holdFrames) {
        phase = 'deleting';
        currentIndex = text.length;
      }
    } else if (phase === 'deleting') {
      output.textContent = generateText(currentIndex);
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        phase = 'typing';
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
