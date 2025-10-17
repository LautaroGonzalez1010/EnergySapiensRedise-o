gsap.registerPlugin(ScrollTrigger);

// Navbar reactiva
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// Wipe inicial (si GSAP no carga, el CSS ya lo oculta)


// Mostrar imagen fallback si no hay video
const video = document.querySelector(".hero-media");
if (video && video.tagName === "VIDEO") {
  video.addEventListener("error", () => document.querySelector(".fallback")?.classList.remove("fallback"));
  video.addEventListener("loadeddata", () => {/* ok */});
} else {
  document.querySelector(".fallback")?.classList.remove("fallback");
}

// Reveal general
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 80%" }
  });
});

// Zoom cards
gsap.utils.toArray(".reveal-zoom").forEach(card => {
  gsap.fromTo(card, { opacity: 0, scale: 0.96 }, {
    opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 85%" }
  });
});

// Mascara proyectos
gsap.utils.toArray(".reveal-mask").forEach(fig => {
  ScrollTrigger.create({ trigger: fig, start: "top 80%", onEnter: () => fig.style.setProperty("--reveal","100%") });
});

// Contadores
const counters = document.querySelectorAll(".num");
const fmt = n => n.toLocaleString("es-AR");
counters.forEach(el => {
  const end = +el.dataset.count || 0;
  ScrollTrigger.create({
    trigger: el, start: "top 85%", once: true,
    onEnter: () => {
      let n = 0, inc = Math.max(1, Math.ceil(end/40));
      (function step(){ n+=inc; if(n>=end){ el.textContent=fmt(end); return; } el.textContent=fmt(n); setTimeout(step, 28); })();
    }
  });
});

// Anchor smooth + micro wipe
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    gsap.fromTo(".page-wipe", { yPercent:-100 }, {
      yPercent:0, duration:.35, ease:"power2.inOut",
      onComplete: () => {
        target.scrollIntoView({ behavior:"smooth", block:"start" });
        gsap.to(".page-wipe", { yPercent:-100, duration:.45, ease:"power3.out", delay:.08 });
      }
    });
  });
});

// Cursor glow
const cursor = document.getElementById("cursor");
window.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Año footer
document.getElementById("year").textContent = new Date().getFullYear();


const verMasBtn = document.getElementById("verMasBtn");
const extraGrid = document.querySelector(".proyectos-extra");
let open = false;

if (verMasBtn && extraGrid) {
  verMasBtn.addEventListener("click", () => {
    open = !open;
    extraGrid.classList.toggle("active", open);
    verMasBtn.textContent = open ? "Ver menos" : "Ver más proyectos";
    verMasBtn.style.background = open
      ? "linear-gradient(135deg, var(--green), var(--orange))"
      : "linear-gradient(135deg, var(--orange), var(--green))";

    if (open) {
      setTimeout(() => {
        extraGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  });
}


// 🔧 FIX iOS fade-up que no aparecen hasta hacer zoom
window.addEventListener('load', () => {
  // Fuerza un pequeño scroll al cargar para disparar las animaciones
  window.scrollTo(0, 1);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
});

// 🩹 Fix para iOS que ignora triggers hasta el primer toque
ScrollTrigger.refresh();
window.addEventListener("orientationchange", () => ScrollTrigger.refresh());
window.addEventListener("resize", () => ScrollTrigger.refresh());
