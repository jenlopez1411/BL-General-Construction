let slideIndex = 0;
let videoSlideIndex = 0;
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
    setTimeout(autoSlide, 9000);
}


function showVideoSlide(n) {
    let slides = document.querySelectorAll(".videoSlide")

    if (n>= slides.length) {
        videoSlideIndex = 0;
    }
    if (n < 0 ) {
        videoSlideIndex = slides.length - 1;
    }

    slides.forEach(videoSlide => videoSlide.style.display = "none");
    slides[videoSlideIndex].style.display = "block"
}
function changeVideoSlide(n) {
    showVideoSlide(videoSlideIndex += n);
}

function autoVideoSlide() {
    changeVideoSlide(1);
    setTimeout(autoVideoSlide, 5000);
}
showSlide(slideIndex);
setTimeout(autoSlide, 3000);

showVideoSlide(videoSlideIndex);
setTimeout(autoVideoSlide, 3000);

const gallery = document.getElementById("slide fade");
for (let i = 0; i < 32; i++) {
    const img = document.createElement("img");
    img.src = `pic${i}.jpeg`;
    img.alt = `Image ${i}`;
    img.style.width = "200px";
    img.style.margin = "10px";
    gallery.appendChild(img);
}