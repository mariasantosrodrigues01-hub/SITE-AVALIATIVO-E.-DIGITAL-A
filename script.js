// 1. GESTÃO DE DADOS (ARRAY DE OBJETOS)
const statisticsData = [
    { title: "Mercado de Trabalho", text: "Diferença salarial média entre negros e brancos chega a 45%." },
    { title: "Educação", text: "O acesso ao ensino superior cresceu, mas a evasão por motivos financeiros é maior entre jovens negros." },
    { title: "Representatividade", text: "Apenas 5% dos cargos executivos no Brasil são ocupados por pessoas negras." }
];

const faqData = [
    { q: "O que é racismo estrutural?", a: "É o conjunto de práticas e hábitos que privilegiam uma raça em detrimento de outra, enraizados nas instituições." },
    { q: "Como ser um aliado?", a: "Eduque-se, escute pessoas negras e questione privilégios em seu ambiente de trabalho." }
];

// 2. RENDERIZAÇÃO DINÂMICA
function initDynamicContent() {
    const container = document.getElementById('cards-container');
    statisticsData.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
        container.appendChild(card);
    });

    const accordionContainer = document.getElementById('accordion-container');
    faqData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'accordion-item';
        div.innerHTML = `
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                ${item.q}
            </button>
            <div class="accordion-content">${item.a}</div>
        `;
        accordionContainer.appendChild(div);
    });

    // Slides do Carrossel (Exemplo simples)
    const track = document.getElementById('carousel-track');
    statisticsData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<h3>${item.title}</h3>`;
        track.appendChild(slide);
    });
}

// 3. ACESSIBILIDADE: TAMANHO DA FONTE
let currentFontSize = 16;
document.getElementById('increase-font').addEventListener('click', () => {
    currentFontSize += 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
});

document.getElementById('decrease-font').addEventListener('click', () => {
    if(currentFontSize > 12) currentFontSize -= 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
});

// 4. ACESSIBILIDADE: ALTO CONTRASTE
document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// 5. CARROSSEL FUNCIONAL
let currentSlide = 0;
document.getElementById('next-slide').addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
});

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// 6. ACORDEÃO LOGIC
function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const isExpanded = element.getAttribute('aria-expanded') === 'true';
    element.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('active');
}

// 7. SCROLL REVEAL (INTERSECTION OBSERVER)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    initDynamicContent();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
