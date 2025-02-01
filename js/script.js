document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("ul li");

    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            menuItems.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
