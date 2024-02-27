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
        scrollPosition = Math.max(0, targetSection.offsetTop + contactSectionHeight - windowHeight);
      }
  
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }
  
    links.forEach(function(link) {
      link.addEventListener("click", scrollToSection);
    });
  });
  