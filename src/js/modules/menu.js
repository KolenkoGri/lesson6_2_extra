const menu = document.querySelector('.menu');
const header = document.querySelector('.header');

const headerButton = document.querySelector('.header__button');

headerButton.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
})