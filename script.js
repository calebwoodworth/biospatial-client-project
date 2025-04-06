// Load external components like header and footer
document.addEventListener("DOMContentLoaded", () => {
    const includeElements = document.querySelectorAll('[data-include]');

    includeElements.forEach(el => {
        const file = el.getAttribute("data-include");
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}`);
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;

                // If header is loaded, reattach nav listeners
                if (file.includes("header.html")) {
                    attachNavListeners();
                }
            })
            .catch(error => {
                console.error("Include error:", error);
                el.innerHTML = "<p>Content failed to load.</p>";
            });
    });
});

// Navigation logic (called after header is loaded)
function attachNavListeners() {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
}
