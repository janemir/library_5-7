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

// Данные корзины
let cart = [];

// Элементы страницы
const cartContainer = document.getElementById('cart-container');
const totalPriceEl = document.getElementById('total-price');
const cartSummary = document.getElementById('cart-summary');

// Добавление товара в корзину
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseInt(productCard.querySelector('p').textContent.replace(/\D/g, ''), 10);

        // Проверяем, есть ли товар уже в корзине
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
        alert(`${productName} добавлена в корзину!`);
    });
});

// Обновление корзины
function updateCart() {
    // Очистка содержимого корзины
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
        cartSummary.style.display = 'none';
        return;
    }

    // Добавление товаров в корзину
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <h4>${item.name} (x${item.quantity})</h4>
            <p>${item.price * item.quantity} руб.</p>
            <button class="remove-item" data-index="${index}">Удалить</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Сумма корзины
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceEl.textContent = totalPrice;
    cartSummary.style.display = 'block';

    // Добавление обработчиков для кнопок удаления
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const itemIndex = parseInt(button.getAttribute('data-index'), 10);
            cart.splice(itemIndex, 1);
            updateCart();
        });
    });
}

// Очистка корзины
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
    alert('Корзина очищена!');
});

