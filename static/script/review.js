function addReview() {
    const name = document.getElementById("reviewerName").value;
    const review = document.getElementById("reviewText").value;
    const photoInput = document.getElementById("reviewPhoto");
    const file = photoInput.files[0];

    if (name && review) {
      const reviewContainer = document.getElementById("reviews-submission");
      const newReview = document.createElement("div");
      newReview.style.marginTop = "15px";
      newReview.style.padding = "15px";
      newReview.style.border = "1px solid #ccc";
      newReview.style.borderRadius = "8px";
      newReview.style.backgroundColor = "rgb(245, 245, 245)";

      let imageTag = "";
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imageTag = `<img src="${e.target.result}" alt="Review Photo" style="max-width: 300px; margin-top: 10px; border-radius: 5px;">`;
          newReview.innerHTML = `<strong>${name}</strong><p>${review}</p>${imageTag}`;
          reviewContainer.appendChild(newReview);
        };
        reader.readAsDataURL(file);
      } else {
        newReview.innerHTML = `<strong>${name}</strong><p>${review}</p>`;
        reviewContainer.appendChild(newReview);
      }

      document.getElementById("reviewerName").value = "";
      document.getElementById("reviewText").value = "";
      document.getElementById("reviewPhoto").value = "";
    }
  }