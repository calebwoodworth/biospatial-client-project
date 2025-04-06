document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });
 });
 
 
 const menuToggle = document.getElementById("menu-toggle");
 const navMenu = document.querySelector("nav ul");
 
 
 if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
 }
 