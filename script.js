// Load external components like header and footer after the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the data-include attribute
    const includeElements = document.querySelectorAll('[data-include]');

    includeElements.forEach(el => {
        const file = el.getAttribute("data-include");  // Get the file name from the data-include attribute
        fetch(file)  // Fetch the external file
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}`);  // Handle failed fetch
                }
                return response.text();  // Convert response to text
            })
            .then(data => {
                el.innerHTML = data;  // Inject the fetched content into the element

                // If header is loaded, reattach navigation listeners
                if (file.includes("header.html")) {
                    attachNavListeners();  // Attach navigation logic to header
                }
            })
            .catch(error => {
                console.error("Include error:", error);  // Log error if content fails to load
                el.innerHTML = "<p>Content failed to load.</p>";  // Display fallback message
            });
    });
});

// Navigation logic (called after the header is loaded)
function attachNavListeners() {
    // Select all navigation links
    const navLinks = document.querySelectorAll("nav ul li a");

    // Add click event listeners to each navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove("active"));
            // Add 'active' class to the clicked link
            this.classList.add("active");
        });
    });

    // Toggle mobile navigation menu visibility
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {
        // Toggle the 'active' class on the navigation menu for mobile views
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
}
