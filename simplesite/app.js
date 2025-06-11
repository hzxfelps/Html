document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-theme");
    const body = document.body;
  
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.classList.remove("darkmode", "lightmode");
      body.classList.add(savedTheme);
    }
  
    btn.addEventListener("click", () => {
      body.classList.toggle("lightmode");
      body.classList.toggle("darkmode");
  
      const currentTheme = body.classList.contains("lightmode") ? "lightmode" : "darkmode";
      localStorage.setItem("theme", currentTheme);
    });
  });
  let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
setInterval(() => {
  plusSlides(1);
}, 5000);