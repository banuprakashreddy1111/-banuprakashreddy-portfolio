/* ============================================================
   BANU PRAKASH REDDY — DATA / AI PORTFOLIO
   SCRIPT SYSTEM v2
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initActiveNavigation();
    initBackToTop();
    initHeroInteraction();
    initCardInteraction();
    initEmailCopy();
    initCurrentYear();
    initExternalLinks();
});

/* 01. PAGE LOADER */
function initLoader() {
    const loader = document.querySelector(".page-loader");
    if (!loader) return;

    const hideLoader = () => {
        setTimeout(() => loader.classList.add("loaded"), 400);
    };

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, { once: true });
    }
}

/* 02. HEADER */
function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 35);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}

/* 03. MOBILE MENU */
function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");
    if (!toggle || !menu) return;

    const closeMenu = () => {
        toggle.classList.remove("active");
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        toggle.classList.add("active");
        menu.classList.add("open");
        document.body.classList.add("menu-open");
        toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
        menu.classList.contains("open") ? closeMenu() : openMenu();
    });

    menu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) closeMenu();
    });
}

/* 04. SMOOTH SCROLL */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;

            const target = document.querySelector(id);
            if (!target) return;

            event.preventDefault();

            const header = document.querySelector(".site-header");
            const headerHeight = header ? header.offsetHeight : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;

            window.scrollTo({ top: position, behavior: "smooth" });
        });
    });
}

/* 05. SCROLL REVEAL */
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
        elements.forEach(el => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(el => observer.observe(el));
}

/* 06. ACTIVE NAVIGATION */
function initActiveNavigation() {
    const links = document.querySelectorAll(".nav-link");
    const sections = [];

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const section = document.querySelector(href);
        if (section) sections.push({ link, section });
    });

    if (!sections.length) return;

    const updateActive = () => {
        const position = window.scrollY + window.innerHeight * 0.3;
        let current = null;

        sections.forEach(item => {
            const top = item.section.offsetTop;
            const bottom = top + item.section.offsetHeight;
            if (position >= top && position < bottom) current = item;
        });

        links.forEach(link => link.classList.remove("active"));
        if (current) current.link.classList.add("active");
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
}

/* 07. BACK TO TOP */
function initBackToTop() {
    const button = document.querySelector(".back-to-top");
    if (!button) return;

    const update = () => {
        button.classList.toggle("visible", window.scrollY > 600);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* 08. HERO INTERACTION (subtle tilt on the orbit) */
function initHeroInteraction() {
    const visual = document.querySelector(".hero-visual");
    const orbit = document.querySelector(".data-orbit");
    if (!visual || !orbit) return;

    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    visual.addEventListener("mousemove", event => {
        const rect = visual.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        orbit.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    visual.addEventListener("mouseleave", () => {
        orbit.style.transform = "";
    });
}

/* 09. CARD INTERACTION (skill / cert tilt) */
function initCardInteraction() {
    const cards = document.querySelectorAll(".skill-card, .cert-card");
    if (!cards.length) return;

    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    cards.forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* 10. EMAIL COPY (right-click to copy) */
function initEmailCopy() {
    const emailBox = document.querySelector(".email-display");
    if (!emailBox) return;

    const emailElement = emailBox.querySelector(".email-address");
    if (!emailElement) return;

    const email = emailElement.textContent.trim();
    if (!email) return;

    emailBox.addEventListener("contextmenu", () => copyEmail(email));
}

async function copyEmail(email) {
    try {
        await navigator.clipboard.writeText(email);
    } catch (error) {
        console.warn("Unable to copy email.", error);
    }
}

/* 12. CURRENT YEAR */
function initCurrentYear() {
    const elements = document.querySelectorAll("[data-current-year]");
    const year = new Date().getFullYear();
    elements.forEach(el => (el.textContent = year));
}

/* 13. EXTERNAL LINK SECURITY */
function initExternalLinks() {
    const links = document.querySelectorAll('a[target="_blank"]');

    links.forEach(link => {
        const existing = link.getAttribute("rel") || "";
        const values = new Set(existing.split(" ").filter(Boolean));
        values.add("noopener");
        values.add("noreferrer");
        link.setAttribute("rel", [...values].join(" "));
    });
}

/* 14. CONSOLE BRANDING */
console.log(
    "%c BANU PRAKASH REDDY ",
    "background:#69e7c8;color:#06110e;font-size:15px;font-weight:bold;padding:8px 12px;border-radius:6px;"
);
console.log("%c Data • Analytics • AI • Engineering ", "color:#69e7c8;font-size:12px;");
