let counter = 0;

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const form = this;
    const formData = new FormData(this);

    // Make an AJAX request to send the form data to the Flask backend
    fetch("/send_telegram", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Successful")
            console.log("Succesfully to opoen website!")
            form.reset();
            counter += 1;
            alert("Message sent successfully! Please wait patienly while someone review your requests.");
        } else {
            console.log("Error");
            alert("Error1: " + data.message);
        }
    })
    .catch(error => alert("Error2: " + error));
});

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show")
}