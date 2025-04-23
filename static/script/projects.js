let slideIndex = 0;

function showSlide(n) {
    let slides = document.querySelectorAll(".slide")

    if (n>=slides.length) 
    {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex].style.display = "block"
}

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function autoSlide() {
    changeSlide(1);
    setTimeout(autoSlide, 5000);
}

showSlide(slideIndex);
setTimeout(autoSlide, 3000);
