// Data Translasi
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About Me",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_greeting: "Hello, I'm",
        hero_role: "Informatics Student at UAD, Mechanical & Robotics Programmer at Al Jazari Team.",
        btn_view_projects: "View Projects",
        btn_contact: "Contact Me",
        about_title: "About Me",
        about_desc: "Informatics student at Ahmad Dahlan University (Semester 2) specializing in Mechanical and Robotics Programming as well as Web Development. Possesses technical expertise in developing hardware logic control using Arduino Nano and integrated robotics systems. Currently active in robotics development research with the Al Jazari Team and UAD Robotic Development Community (RDC), with a deep interest in AI (RAG) integration and UI/UX Design.",
        skills_title: "Technical Skills",
        projects_title: "Featured Projects",
        proj2_desc: "An interactive web platform focused on ecosystem conservation and the digitalization of Nusantara's nature.",
        proj3_desc: "A digital registration form system specifically designed for student organizations.",
        btn_visit: "Visit Site",
        contact_title: "Let's Connect",
        contact_desc: "I am always open to discussing product development work or partnership opportunities.",
        footer_rights: "All Rights Reserved."
    },
    id: {
        nav_home: "Beranda",
        nav_about: "Tentang Saya",
        nav_skills: "Keahlian",
        nav_projects: "Proyek",
        nav_contact: "Kontak",
        hero_greeting: "Halo, Saya",
        hero_role: "Mahasiswa Informatika UAD, Mechanical & Robotics Programmer di Tim Al Jazari.",
        btn_view_projects: "Lihat Proyek",
        btn_contact: "Hubungi Saya",
        about_title: "Tentang Saya",
        about_desc: "Mahasiswa Informatika di Universitas Ahmad Dahlan Semester dua dengan spesialisasi pada Mechanical and Robotics Programming serta Web Development. Memiliki keahlian teknis dalam pengembangan kontrol logika perangkat keras menggunakan Arduino Nano dan sistem robotika terintegrasi. Saat ini aktif dalam riset pengembangan robot bersama Tim Al Jazari dan Robotic Development Community (RDC) UAD, dengan minat mendalam pada integrasi AI (RAG) dan UI/UX Design.",
        skills_title: "Keahlian Teknis",
        projects_title: "Proyek Unggulan",
        proj2_desc: "Platform web interaktif yang berfokus pada pelestarian ekosistem dan digitalisasi alam Nusantara.",
        proj3_desc: "Sistem formulir pendaftaran digital khusus untuk organisasi mahasiswa.",
        btn_visit: "Kunjungi Situs",
        contact_title: "Mari Terhubung",
        contact_desc: "Saya selalu terbuka untuk mendiskusikan pekerjaan pengembangan produk atau peluang kemitraan.",
        footer_rights: "Hak Cipta Dilindungi."
    }
};

// Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const htmlElement = document.documentElement;

// State
let currentLang = 'id'; // Default language

// Init Theme
function initTheme() {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Toggle Theme
themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    updateParticlesTheme();
});

// Update Language
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Safe approach to preserve specific child elements (like icons)
            if (key === 'btn_visit') {
                element.innerHTML = `${translations[lang][key]} <i class="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>`;
            } else if (element.classList.contains('cinematic-text')) {
                const text = translations[lang][key];
                element.innerHTML = '';
                [...text].forEach((char, idx) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.animationDelay = `${idx * 0.02}s`;
                    element.appendChild(span);
                });
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // update html lang attribute
    htmlElement.lang = lang;
}

// Toggle Language
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    langText.textContent = currentLang === 'id' ? 'EN' : 'ID';
    updateLanguage(currentLang);
});

// Init
initTheme();
updateLanguage(currentLang);
if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        offset: 50, // offset (in px) from the original trigger point
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-out-cubic',
    });
}

// Particles JS Configuration
function initParticles() {
    const isDark = htmlElement.classList.contains('dark');
    const color = isDark ? "#38bdf8" : "#0284c7"; // Tailwind primary-400 and primary-600

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": color },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": color,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
}

function updateParticlesTheme() {
    // Destroy existing particles if needed and re-init
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    initParticles();
}

// Ensure particles are loaded after DOM
window.addEventListener('DOMContentLoaded', () => {
    // delay to ensure particlesJS is loaded from CDN
    setTimeout(initParticles, 300);
});

// Preloader and Sequence
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    // Give it a minimum of 1.2 seconds to show off the animation
    setTimeout(() => {
        if (preloader) preloader.classList.add('preloader-hidden');

        // Start cinematic text after preloader fades (700ms transition)
        setTimeout(startCinematicText, 600);
    }, 1200);
});

function startCinematicText() {
    // Cinematic Text Splitter for all target elements
    const cinematicElements = document.querySelectorAll('.cinematic-text');
    let globalDelay = 0; // Starts immediately after preloader

    cinematicElements.forEach((element) => {
        const text = element.textContent.trim();
        element.innerHTML = '';

        [...text].forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.style.animationDelay = `${globalDelay}s`;
            element.appendChild(span);
            globalDelay += 0.03; // 30ms per char
        });
        globalDelay += 0.15; // Pause between text blocks
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});
