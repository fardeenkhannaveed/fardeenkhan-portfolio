/* ==========================================
   1. Skill bars
   The bar fills when it comes on the screen
   ========================================== */
const fills = document.querySelectorAll(".fill");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            // Take the number from data-level and set it as width
            entry.target.style.width = entry.target.dataset.level + "%";
            observer.unobserve(entry.target); // do it only once
        }
    });
}, { threshold: 0.4 });

fills.forEach(function (bar) {
    observer.observe(bar);
});


/* ==========================================
   2. Contact form
   ========================================== */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const sendBtn = document.getElementById("send-btn");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    sendBtn.disabled = true; // stop double clicks
    formStatus.className = "";
    formStatus.textContent = "Sending...";

    // Send the form data to Web3Forms
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(contactForm)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.success) {
                formStatus.className = "success";
                formStatus.textContent = "Message Sent";
                contactForm.reset(); // clear the form

                // Hide the message after 3 seconds
                setTimeout(function () {
                    formStatus.textContent = "";
                }, 3000);
            } else {
                formStatus.className = "error";
                formStatus.textContent = "Something went wrong. Try again.";
            }
        })
        .catch(function () {
            // No internet or other problem
            formStatus.className = "error";
            formStatus.textContent = "Something went wrong. Try again.";
        })
        .finally(function () {
            sendBtn.disabled = false; // enable the button again
        });
});