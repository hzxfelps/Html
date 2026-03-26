//painel do caralho
function toggleAulas() {
    const box = document.getElementById('aulasBox');
    box.classList.toggle('hidden');
}

function toggle(id) {
    const dasdadsad = document.getElementById(id);
    dasdadsad.classList.toggle('hidden');
}

function abrir() {
  const abudhabi = document.getElementById("abudhabi");
  abudhabi.classList.remove("hidden");
}

function fechar() {
  const abudhabi = document.getElementById("abudhabi");
  abudhabi.classList.add("hidden");
}
const icons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
];

function trocarTech(index) {
  const icon = document.getElementById("techIcon");

  icon.style.opacity = 0;

  setTimeout(() => {
    icon.src = icons[index];
    icon.style.opacity = 1;
  }, 200);
}