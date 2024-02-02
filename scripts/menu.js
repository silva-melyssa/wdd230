document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu');
    const nav = document.querySelector('nav');

    menuButton.addEventListener('click', function () {
        nav.classList.toggle('open');
    });
});