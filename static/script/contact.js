document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Make an AJAX request to send the form data to the Flask backend
    fetch("/send_telegram", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Message sent successfully!");
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => alert("Error: " + error));
});