// 1. Lógica del Contador de Impacto
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter-value');
    
    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        const initialText = counter.innerText;
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * target);

            if (initialText.includes('$')) {
                counter.innerText = "$" + currentValue.toLocaleString() + "M";
            } else {
                counter.innerText = "+" + currentValue.toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = initialText.includes('$') 
                    ? "$" + target.toLocaleString() + "M" 
                    : "+" + target.toLocaleString();
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
// Cambia el nombre por el de tu nuevo archivo
const urlImagenNueva = 'TDC F-8.png'; 

const img = new Image();
img.src = urlImagenNueva;
img.onload = function() {
    const canvas = document.getElementById('pdf-render'); // Reutilizamos el id del canvas
    const ctx = canvas.getContext('2d');
    
    // Ajustamos el canvas al tamaño de la nueva imagen
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Inicializamos el Panzoom con la nueva imagen
    const panzoom = Panzoom(canvas, {
        maxScale: 5,
        contain: 'outside'
    });
    
    canvas.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
};