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
            
            // Efecto de suavizado (Ease Out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * target);

            // Formatear con signo + y separador de miles
            counter.innerText = "+" + currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = "+" + target.toLocaleString();
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
function toggleCard(element) {
    const card = element.parentElement;
    
    // Cierra otras tarjetas para que solo una esté abierta
    document.querySelectorAll('.modelo-card-circular').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });

    // Alterna la clase activa en la tarjeta seleccionada
    card.classList.toggle('active');
}
// 1. Configuración de la imagen
const urlImagen = 'TDC F-8.png'; // Asegúrate de que el nombre sea exacto
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
const img = new Image();

img.src = urlImagen;

img.onload = function() {
    // Ajustamos el canvas al tamaño real de la imagen
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Dibujamos la imagen en el canvas
    ctx.drawImage(img, 0, 0);

    // 2. Inicializar Panzoom sobre el canvas
    const panzoom = Panzoom(canvas, {
        maxScale: 5,
        minScale: 0.5,
        contain: 'outside',
        startScale: 1
    });

    // 3. Hacer que los botones funcionen
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset');

    zoomInBtn.addEventListener('click', () => panzoom.zoomIn());
    zoomOutBtn.addEventListener('click', () => panzoom.zoomOut());
    resetBtn.addEventListener('click', () => panzoom.reset());

    // 4. Habilitar zoom con la rueda del ratón
    canvas.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
};
