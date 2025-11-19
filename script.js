document.addEventListener("DOMContentLoaded", () => {
    
    // --- CÓDIGO DEL CONTADOR ---
    const counters = document.querySelectorAll(".stat-number[data-to-value]");
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // --- CÓDIGO PARA "CÓMO AYUDAR" (ACORDEÓN) ---
    const ayudarBotones = document.querySelectorAll(".btn-ayudar");
    ayudarBotones.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".ayudar-card");
            card.classList.toggle("is-open");
            button.textContent = card.classList.contains("is-open") ? "Cerrar" : "Ver más";
        });
    });

    // --- CÓDIGO PARA CONTACTO (CARRUSEL Y TABS) ---
    const scrollers = document.querySelectorAll(".testimonial-scroller, .logo-scroller");
    if (scrollers.length > 0) {
        scrollers.forEach(scroller => {
            if (scroller.getAttribute("data-animated")) {
                const scrollerInner = scroller.querySelector(".scroller-inner");
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach(item => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            }
        });
    }

    const tabWrapper = document.querySelector(".form-tabs");
    const tabButtons = document.querySelectorAll(".tab-button");
    const contactForms = document.querySelectorAll(".contact-form");
    if (tabWrapper) {
        tabWrapper.addEventListener("click", (e) => {
            if (!e.target.classList.contains("tab-button")) return;
            const clickedButton = e.target;
            const formId = clickedButton.getAttribute("data-form");
            const targetForm = document.getElementById(`form-${formId}`);
            
            tabButtons.forEach(btn => btn.classList.remove("is-active"));
            contactForms.forEach(form => form.classList.remove("is-active"));
            
            clickedButton.classList.add("is-active");
            targetForm.classList.add("is-active");
        });
    }

    // --- ¡NUEVO! CÓDIGO PARA TARJETAS VOLTEABLES ---
    const flipButtons = document.querySelectorAll('.btn-ver-mas-flip');
    const backButtons = document.querySelectorAll('.btn-regresar-flip');

    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = button.closest('.servicio-card');
            if (card) {
                card.classList.add('flipped');
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = button.closest('.servicio-card');
            if (card) {
                card.classList.remove('flipped');
            }
        });
    });

}); // <-- FIN DEL ÚNICO DOMContentLoaded


// --- FUNCIÓN DEL CONTADOR (DEBE ESTAR FUERA) ---
function animateCounter(counter) {
    const target = +counter.getAttribute("data-to-value");
    const duration = 2500;
    const startValue = +counter.getAttribute("data-from-value") || 0;
    const increment = (target - startValue) / (duration / 16);
    let current = startValue;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.innerText = Math.ceil(current).toLocaleString('es-MX');
    }, 16);
}