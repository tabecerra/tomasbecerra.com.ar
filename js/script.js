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

    toggleBtn.onclick = function() {
        dropBoxMenu.classList.toggle('open')
        const isOpen = dropBoxMenu.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
    }
});
