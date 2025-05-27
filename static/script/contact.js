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
            form.reset();
            alert("Message sent successfully!");
        } else {
            console.log("Error");
            alert("Error1: " + data.message);
        }
    })
    .catch(error => alert("Error2: " + error));
});