// 1. Lógica del Contador de Impacto
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter-value');
    
    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * target);
            counter.innerText = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

// 2. Lógica del Logo (Desaparece al bajar)
window.addEventListener('scroll', () => {
    const logo = document.getElementById('main-large-logo');
    if (logo) {
        if (window.scrollY > 100) {
            logo.classList.add('logo-hidden');
        } else {
            logo.classList.remove('logo-hidden');
        }
    }
});

// 3. Lógica de Carrusel Infinito (Estilo Comunidad)
// Eliminamos moveSlide() y autoPlayInterval porque ahora la animación es por CSS
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('testimonios-track');
    if (track) {
        // Clonamos los testimonios para crear el efecto infinito sin saltos
        const slides = Array.from(track.children);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    }
});

// Inicialización de botones
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn && prevBtn) {
        nextBtn.onclick = () => {
            currentPos = (currentPos + 1) % testimoniosData.length;
            updateTestimonio();
        };
        prevBtn.onclick = () => {
            currentPos = (currentPos - 1 + testimoniosData.length) % testimoniosData.length;
            updateTestimonio();
        };
        updateTestimonio(); // Carga el primero
    }
});
// --- LÓGICA MODELO DE INTERVENCIÓN (IMAGEN CON ZOOM) ---
document.addEventListener("DOMContentLoaded", () => {
    const imagen = document.getElementById('modelo-imagen');
    
    if (imagen) {
        // Inicializamos Panzoom sobre la imagen
        const panzoom = Panzoom(imagen, {
            maxScale: 4,
            minScale: 1,
            contain: 'outside',
            startScale: 1
        });

        // Vincular los botones que ya tienes en el HTML
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const resetBtn = document.getElementById('reset');

        if (zoomInBtn) zoomInBtn.addEventListener('click', panzoom.zoomIn);
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', panzoom.zoomOut);
        if (resetBtn) resetBtn.addEventListener('click', panzoom.reset);

        // Habilitar el zoom con la rueda del ratón
        imagen.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
    }
});