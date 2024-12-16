// Скрипты для навигации и взаимодействия

// Показать выбранную секцию
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`#${sectionId}`).classList.add('active');
}

// Установить обработчики кликов для ссылок в навбаре
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Обновление времени сервера
function updateServerTime() {
    const now = new Date();
    document.getElementById('server-time').textContent = now.toLocaleTimeString();
}
setInterval(updateServerTime, 1000);

// Пример данных для счетчика посещений и новостей
let visitCounter = 0;
function incrementVisitCounter() {
    visitCounter++;
    document.getElementById('visit-counter').textContent = visitCounter;
}
incrementVisitCounter();

// Обработка формы добавления новостей
document.getElementById('news-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    const newsList = document.getElementById('news-list');
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `<h4>${title}</h4><p>${content}</p>`;
    newsList.appendChild(newsItem);

    document.getElementById('news-form').reset();
});

// Обработка загрузки изображения профиля
document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Изображение успешно загружено!');
});

document.addEventListener('DOMContentLoaded', () => {
    // Выбираем все ссылки навигации
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    // Добавляем обработчик клика для каждой ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки

            // Получаем ID целевой секции из атрибута href
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Прокручиваем страницу к целевой секции с плавным эффектом
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Плавная прокрутка
                    block: 'start' // Прокрутка к началу секции
                });
            }
        });
    });
});

// Добавление в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert('Книга добавлена в корзину!');
    });
});

