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

document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const menuItems = document.querySelectorAll("ul li");

    menuItems.forEach((item) => {
        item.classList.remove("active");
    });

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
            const id = section.getAttribute("id");
            const navItem = document.querySelector(`li a[href="#${id}"]`);
            if (navItem) {
                navItem.parentElement.classList.add("active");
            }
        }
    });
});
