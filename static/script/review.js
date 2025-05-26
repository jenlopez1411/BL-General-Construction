let db;
const ADMIN_PASSWORD = "secret123"; // Change this to a secure password
let isAdmin = false;

window.onload = function () {

  const request = indexedDB.open("ReviewsDB", 1);

  request.onerror = function (event) {
    console.error("Database error:", event.target.error);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    loadReviews();
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    const store = db.createObjectStore("reviews", {
      keyPath: "id",
      autoIncrement: true
    });
    store.createIndex("name", "name", { unique: false });
  };
};

function addReview() {
  const name = document.getElementById("reviewerName").value;
  const text = document.getElementById("reviewText").value;
  const rating = document.getElementById("rating").value;

  const photoInput = document.getElementById("reviewPhoto");
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const review = {
      name: name,
      text: text,
      rating: rating,
      photo: event.target.result || null,
      date: new Date().toISOString()
    };

    const transaction = db.transaction(["reviews"], "readwrite");
    const store = transaction.objectStore("reviews");
    store.add(review);

    transaction.oncomplete = () => {
      loadReviews();
      document.querySelector(".submit-review").reset();
      document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('selected');
      });
      
    };
  };

  if (file) {
    reader.readAsDataURL(file); // Convert image to base64
  } else {
    reader.onload({ target: { result: null } }); // fallback
  }

}

function loadReviews() {
  const container = document.getElementById("reviews-submission");
  container.innerHTML = "<h3>Reviews</h3>";

  const transaction = db.transaction(["reviews"], "readonly");
  const store = transaction.objectStore("reviews");
  const request = store.openCursor();

  request.onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      const review = cursor.value;
      const div = document.createElement("div");
      div.classList.add("review-box");

      let starRatingHTML = "";
      for (let star = 1; star <= 5; star++) {
        starRatingHTML += star <= review.rating ? "&#9733;" : "&#9734;";
      }
      let html = `
        <h4>${review.name}</h4>
        <p><strong>Rating:</strong> ${starRatingHTML}</p>
        <p>${review.text}</p>
        ${review.photo ? `<img src="${review.photo}" alt="review photo" style="max-width:350px;"/>` : ""}
        <hr/>
      `;
      
      if(isAdmin) {
        html += `<button onclick="deleteReview(${review.id})">Delete Review</button>`;

      }
      html += "<hr/>"
      div.innerHTML = html;

      container.appendChild(div);
      cursor.continue();

    }
  };
}

function deleteReview(id) {
  if (!isAdmin) {
    const input = prompt("Enter admin password:");
    if (input !== ADMIN_PASSWORD) {
      alert("Incorrect password.");
      return;
    }
    isAdmin = true;
  }

  const transaction = db.transaction(["reviews"], "readwrite");
  const store = transaction.objectStore("reviews");
  const request = store.delete(id);

  request.onsuccess = function () {
    console.log("Review deleted:", id);
    loadReviews(); // Refresh UI
  };

  request.onerror = function (event) {
    console.error("Error deleting review:", event.target.error);
  };
}

document.getElementById("adminLoginBtn").addEventListener("click", () => {
  const input = prompt("Enter admin password:");
  if (input === ADMIN_PASSWORD) {
    isAdmin = true;
    alert("Admin mode enabled.");
    document.getElementById("adminLogoutBtn").style.display = "inline";
    loadReviews(); // reload to show delete buttons
  } else {
    alert("Incorrect password.");
  }
});

document.getElementById("adminLogoutBtn").addEventListener("click", () => {
  isAdmin = false;
  alert("Logged out of admin mode.");
  document.getElementById("adminLogoutBtn").style.display = "none";
  loadReviews(); // will hide delete buttons
});

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    stars.forEach((star) => {
      star.addEventListener('click', () => {
        const rating = star.getAttribute('data-value');
        ratingInput.value = rating;
        stars.forEach((s) => {
          if (s.getAttribute('data-value') <= rating) {
            s.classList.add('selected');
          } else {
            s.classList.remove('selected');
          }
        });
      });
    });

});