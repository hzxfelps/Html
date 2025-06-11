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