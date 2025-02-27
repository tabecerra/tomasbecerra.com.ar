document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("ul li");
    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            menuItems.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const toggleBtn = document.querySelector('.toggle-btn')
    const toggleBtnIcon = document.querySelector('.toggle-btn i')
    const dropBoxMenu = document.querySelector('.dropbox-menu')

    menuItems[0].classList.add('active');

    toggleBtn.onclick = function() {
        dropBoxMenu.classList.toggle('open')
        const isOpen = dropBoxMenu.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
    }
});

document.addEventListener('scroll', function () {
    const menuItems = document.querySelectorAll("ul li");
    const home = document.getElementById('home'); // Selecciona la sección home
    const about = document.getElementById('about'); // Selecciona la sección about
    const projects = document.getElementById('projects'); // Selecciona la sección projects
    const changelog = document.getElementById('changelog'); // Selecciona la sección changelog

    // Obtén las posiciones de las secciones (relativas a la sección home)
    const homePosition = home.offsetTop - home.offsetTop; // Siempre 0
    const aboutPosition = about.offsetTop - home.offsetTop;
    const projectsPosition = projects.offsetTop - home.offsetTop;
    const changelogPosition = changelog.offsetTop - home.offsetTop;

    // Obtén la posición actual del scroll (relativa a la sección home)
    const scrollPosition = window.scrollY - home.offsetTop;

    // Margen de error para el cambio de sección
    const margin = 100;

    // Remover la clase 'active' de todos los <li>
    menuItems.forEach((item) => {
        item.classList.remove('active');
    });

    // Agregar la clase 'active' al <li> correspondiente
    if (scrollPosition >= homePosition && scrollPosition < aboutPosition - margin) {
        document.querySelector('li a[href="#home"]').parentElement.classList.add('active');
    } else if (scrollPosition >= aboutPosition - margin && scrollPosition < projectsPosition - margin) {
        document.querySelector('li a[href="#about"]').parentElement.classList.add('active');
    } else if (scrollPosition >= projectsPosition - margin && scrollPosition < changelogPosition - margin) {
        document.querySelector('li a[href="#projects"]').parentElement.classList.add('active');
    } else if (scrollPosition >= changelogPosition - margin) {
        document.querySelector('li a[href="#changelog"]').parentElement.classList.add('active');
    }
    if (window.scrollY <= home.offsetTop) {
        menuItems.forEach((item) => {
            item.classList.remove('active');
        });
        document.querySelector('li a[href="#home"]').parentElement.classList.add('active');
    }
});