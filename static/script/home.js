window.addEventListener('scroll', function(){
    const homeImg = document.querySelectorAll(".main img");
    let scrollY = window.scrollY;
    homeImg.forEach(img => {
        img.style.transform = `scale(${1 + scrollY * 0.0005})`
    });
})