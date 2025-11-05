document.addEventListener("DOMContentLoaded", () => {
    
    // --- CÓDIGO DEL CONTADOR ---
    const counters = document.querySelectorAll(".stat-number[data-to-value]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Para que la animación solo ocurra una vez
            }
        });
    }, {
        threshold: 0.5 
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
    // --- FIN DEL CÓDIGO DEL CONTADOR ---


    // --- CÓDIGO PARA "CÓMO AYUDAR" (ACORDEÓN) ---
    const ayudarBotones = document.querySelectorAll(".btn-ayudar");

    ayudarBotones.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".ayudar-card");
            
            // Alterna la clase 'is-open' en la tarjeta
            card.classList.toggle("is-open");
            
            // Cambia el texto del botón
            if (card.classList.contains("is-open")) {
                button.textContent = "Cerrar";
            } else {
                button.textContent = "Ver más";
            }
        });
    });
    // --- FIN CÓDIGO CÓMO AYUDAR ---


    // --- CÓDIGO PARA CONTACTO (CARRUSEL Y TABS) ---
    
    // Lógica para el carrusel continuo
    const scrollers = document.querySelectorAll(".testimonial-scroller, .logo-scroller");

    if (scrollers.length > 0) {
        // Duplicamos el contenido para el efecto infinito
        scrollers.forEach(scroller => {
            const scrollerInner = scroller.querySelector(".scroller-inner");
            const scrollerContent = Array.from(scrollerInner.children);
            
            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    // Lógica para las pestañas (tabs) del formulario
    const tabWrapper = document.querySelector(".form-tabs");
    const tabButtons = document.querySelectorAll(".tab-button");
    const contactForms = document.querySelectorAll(".contact-form");

    if (tabWrapper) {
        tabWrapper.addEventListener("click", (e) => {
            // Si el clic no es en un botón, no hagas nada
            if (!e.target.classList.contains("tab-button")) return;

            const clickedButton = e.target;
            const formId = clickedButton.getAttribute("data-form"); 
            const targetForm = document.getElementById(`form-${formId}`); 

            // Quitar clase activa de todos los botones y formularios
            tabButtons.forEach(btn => btn.classList.remove("is-active"));
            contactForms.forEach(form => form.classList.remove("is-active"));

            // Añadir clase activa al botón y formulario correctos
            clickedButton.classList.add("is-active");
            targetForm.classList.add("is-active");
        });
    }
    // --- FIN CÓDIGO CONTACTO ---

});


// --- FUNCIÓN DEL CONTADOR (DEBE ESTAR FUERA DEL DOMContentLoaded) ---
function animateCounter(counter) {
    const target = +counter.getAttribute("data-to-value");
    const duration = 2500; // Duración de la animación en milisegundos (2.5 segundos)
    const startValue = +counter.getAttribute("data-from-value") || 0; // Inicia desde un valor si existe, o 0
    const increment = (target - startValue) / (duration / 16); // 16ms ~ 60fps
    
    let current = startValue;

    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatea el número con comas (1000000 -> 1,000,000)
        counter.innerText = Math.ceil(current).toLocaleString('es-MX');

    }, 16);
}