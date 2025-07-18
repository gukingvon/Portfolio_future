particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 150,
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
            "value": 0.9,
            "random": true
        },
        "size": {
            "value": 1.9,
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
