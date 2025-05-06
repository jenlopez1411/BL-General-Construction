let translations = {};
      //   "services": "Remodelación | Renovaciones de Garaje | Estructuras | Paneles de Yeso | Aislamiento y Pintura | ADUs | Casa Nueva",
fetch('/static/json/translations.json')
.then(response => response.json())
.then(data=> {
    translations = data;
    updateLanguage('en');    
});

document.getElementById('languageSelector').addEventListener('change', function() {
    const selectedLang = this.value;
    updateLanguage(selectedLang);
    console.log("adasdas")
});

function updateLanguage(lang) {
    console.log(lang)
    document.querySelector('a[href="#projects"]').textContent = translations[lang].projects;
    document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;
    document.querySelector('a[href="#review"]').textContent = translations[lang].review;
  
    document.querySelector('.slogan').textContent = translations[lang].slogan;
    document.querySelector('.service1').textContent = translations[lang].service1;
    document.querySelector('.service2').textContent = translations[lang].service2;
    document.querySelector('.service3').textContent = translations[lang].service3;
    document.querySelector('.service4').textContent = translations[lang].service4;
    document.querySelector('.service5').textContent = translations[lang].service5;
    document.querySelector('.service6').textContent = translations[lang].service6;

    // document.querySelector('.hero p').textContent = translations[lang].services;
    document.querySelector('.projectTitle').textContent = translations[lang].slogan;
    document.querySelector('.projectDescription1').textContent = translations[lang].projectDescription1;
    document.querySelector('.projectDescription2').textContent = translations[lang].projectDescription2;


    document.querySelector('#contactForm h3').textContent = translations[lang].contactUs;
    document.querySelector('label[for="name"]').textContent = translations[lang].firstName;
    document.querySelector('label[for="last"]').textContent = translations[lang].lastName;
    document.querySelector('label[for="phone"]').textContent = translations[lang].phoneNumber;
    document.querySelector('label[for="email"]').textContent = translations[lang].email;
    document.querySelector('label[for="message"]').textContent = translations[lang].message;
    document.querySelector('input[type="submit"]').value = translations[lang].sendMessage;
    document.querySelector('.location').textContent = translations[lang].location;
    document.querySelector('.locationMsg').textContent = translations[lang].locationMsg;
    document.querySelector('.descriptionContact').textContent = translations[lang].descriptionContact;


    document.querySelector('.submit-review h3').textContent = translations[lang].leaveReview;
    document.querySelector('.star-rating p').textContent = translations[lang].rateUs;
    document.querySelector('.yourName').textContent = translations[lang].yourName;
    document.querySelector('.yourReview').textContent = translations[lang].yourReview;
    document.querySelector('.uploadPhoto').textContent = translations[lang].uploadPhoto;
    document.querySelector('#submitBtn').textContent = translations[lang].submitReview;
  
    document.querySelector('#reviews-submission h3').textContent = translations[lang].userReviews;
}
