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

// 3. Lógica de Testimonios Dinámicos
const testimoniosData = [
    { eje: "EJE 1 – ALBERGUE", author: "Alicia Flores", img: "Testimonios/EJE 1.JPG", text: "“Durante mi estancia en su albergue, me sentí arropada por un ambiente de calidez y esperanza. La atención integral que ofrecen es fundamental.”" },
    { eje: "EJE 2 – APOYO EN EL PROCESO", author: "Flora Hernández", img: "Testimonios/EJE 2.png", text: "“Mi más sincero agradecimiento por el apoyo con los medicamentos mi quimioterapia. Su ayuda y comprensión han sido fundamentales.”" },
    { eje: "EJE 3 – EDUCATIVO INFORMATIVO", author: "Elida Perales", img: "Testimonios/EJE 3.jpeg", text: "“Las pláticas de Cruz Rosa siempre nos dejan algo motivante en medio de la preocupación del tratamiento. Agradecemos todo lo que hacen.”" },
    { eje: "EJE 4 – DESARROLLO INTEGRAL", author: "Esther Diaz López", img: "Testimonios/EJE 4.JPG", text: "“Me siento muy agradecida por todo el apoyo, me salvaron tanto física como emocionalmente. Gracias a Cruz Rosa puedo decir que lo estoy logrando.”" },
    { eje: "EJE 1 – ALBERGUE", author: "Leticia", img: "Testimonios/eje 1 gdl.jpg", text: "“El albergue se volvió un refugio en medio de todo el tratamiento, un lugar donde pude descansar, agarrar fuerzas para seguir y sentir que no estaba sola.”" },
    { eje: "EJE 2 – APOYO EN EL PROCESO", author: "María Elena", img: "Testimonios/eje 2 gdl.JPG", text: "“Me apoyaron con la manga y los vendajes, pero lo más valioso ha sido el cariño y la confianza de las fisios. He visto una gran mejoría.”" },
    { eje: "EJE 3 – EDUCATIVO INFORMATIVO", author: "Ma. Teresa", img: "Testimonios/eje 3 gdl.jpg", text: "“En el módulo encontré orientación y mucha calma. Me explicaron los pasos a seguir y me dieron información clara. No estás sola.”" },
    { eje: "EJE 4 – DESARROLLO INTEGRAL", author: "Margarita", img: "Testimonios/eje 4 gdl.jpg", text: "“Los talleres ocupacionales se volvieron un espacio para distraerme, convivir y despejar la mente. En Cruz Rosa encontré un lugar donde mi bienestar importa.”" }
];

let currentPos = 0;

function updateTestimonio() {
    const data = testimoniosData[currentPos];
    const imgDisplay = document.getElementById('img-display');
    const badge = document.getElementById('eje-display');
    const text = document.getElementById('text-display');
    const author = document.getElementById('author-display');
    const card = document.getElementById('carousel-card');

    if (!imgDisplay || !badge || !text || !author || !card) return;

    card.style.opacity = "0";
    
    setTimeout(() => {
        badge.innerText = data.eje;
        text.innerText = data.text;
        author.innerText = "— " + data.author;
        imgDisplay.src = data.img;

        imgDisplay.onload = () => {
            card.style.opacity = "1";
        };
        
        imgDisplay.onerror = () => {
            console.error("Error cargando imagen: " + data.img);
            card.style.opacity = "1";
        };
    }, 300);
}

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