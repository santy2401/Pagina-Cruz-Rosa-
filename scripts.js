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


// modelo de intervencion 
const urlImagen = 'TDC.png'; // Cambia la ruta larga por solo el nombre del archivo
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
const img = new Image();

img.src = urlImagen;

img.onload = function() {
    // El resto del código que ya tienes para el renderizado...
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // Si usas Panzoom, asegúrate de que se inicialice aquí
    const panzoom = Panzoom(canvas, {
        maxScale: 5,
        minScale: 0.5,
        contain: 'outside',
        startScale: 1
    });
    // ... rest of your logic
};
