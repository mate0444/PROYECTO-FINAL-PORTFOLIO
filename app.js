document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("nav a");

  function scrollToSection(event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    const headerHeight = document.querySelector("header").offsetHeight;
    let scrollPosition = targetSection.offsetTop - headerHeight;

    if (targetId === 'contacto') {
      const footerHeight = document.querySelector("footer").offsetHeight;
      const windowHeight = window.innerHeight;
      const contactSectionHeight = targetSection.offsetHeight;
      scrollPosition = Math.max(0, targetSection.offsetTop - windowHeight + contactSectionHeight + footerHeight);
    }

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });
  }

  links.forEach(function(link) {
    link.addEventListener("click", scrollToSection);
  });

  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const button = document.getElementById('boton');
    button.disabled = true;
    const data = new FormData(form);
    const apiKey = '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';
    const body = {
      "sender": {
        "name": "Portafolio",
        "email": "portafolio@gmail.com"
      },
      "to": [
        {
          "email": "matup2004@gmail.com", 
          "name": "Mateo"
        }
      ],
      "subject": "Solicitud para portafolio",
      "htmlContent": `
        <h1>ALGUIEN SE CONTACTO CONTIGO</h1>
        <p>nombre : ${data.get('nombre')}</p>
        <p>email : ${data.get('email')}</p>
        <p>mensaje : ${data.get('mensaje')}</p>
      `
    };
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      form.reset();
    })
    .finally(data=>{
      button.disabled = false;
    });
  });
});
