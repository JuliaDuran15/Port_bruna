document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const toggleMenu = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;
  const logoImg = document.querySelector('.logo img');

  const setLogo = (theme) => {
    logoImg.src = theme === 'light' ? 'img/logo_black.png' : 'img/logo_white.png';
  };

  // Carrega o tema salvo
  if (localStorage.getItem('theme') === 'light') {
    html.classList.add('light-mode');
    themeIcon.classList.replace('bx-moon', 'bx-sun');
    setLogo('light');
  } else {
    setLogo('dark'); // tema padrão escuro
  }

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('light-mode');
    const isLight = html.classList.contains('light-mode');
    themeIcon.classList.replace(isLight ? 'bx-moon' : 'bx-sun', isLight ? 'bx-sun' : 'bx-moon');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    setLogo(isLight ? 'light' : 'dark');

  });

  const updateActiveLink = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const offsetTop = section.offsetTop - 150;
      const offsetBottom = offsetTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= offsetTop && scrollY < offsetBottom) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`header nav a[href*="${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", toggleMenu);
  }

  window.addEventListener("scroll", updateActiveLink);

  // Form submission
  const form = document.getElementById("gform");
  const msgStatus = document.getElementById("msg-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value,
      };

      fetch("https://script.google.com/macros/s/AKfycbwxAtb0dxTdpv3F_xlQTQHFpqu-UqG_3d7E2upjOzXoqgIrKRxDXBV-7sEthpGjT9J-TA/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

        .then((res) => res.json())
        .then((data) => {
          msgStatus.textContent = "Mensagem enviada com sucesso!";
          form.reset();
        })
        .catch((error) => {
          msgStatus.textContent = "Erro ao enviar a mensagem. Tente novamente.";
          console.error("Erro:", error);
        });
    });
  }
});
