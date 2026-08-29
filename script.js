/* ============================================================
   BANU PRAKASH REDDY — PORTFOLIO
   PREMIUM DATA / AI PORTFOLIO SYSTEM
   script.js
   ============================================================ */


/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initPageLoader();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initActiveNavigation();
    initBackToTop();
    initHeroParallax();
    initCardTilt();
    initCurrentYear();
    initCopyEmail();
    initKeyboardAccessibility();

});


/* ============================================================
   02. PAGE LOADER
   ============================================================ */

function initPageLoader() {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    const hideLoader = () => {

        setTimeout(() => {
            loader.classList.add("loaded");
        }, 450);

    };

    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener("load", hideLoader, {
            once: true
        });

    }

}


/* ============================================================
   03. HEADER SCROLL EFFECT
   ============================================================ */

function initHeaderScroll() {

    const header = document.querySelector(".site-header");

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* ============================================================
   04. MOBILE NAVIGATION
   ============================================================ */

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) return;


    const openMenu = () => {

        menuToggle.classList.add("active");
        navMenu.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    };


    const closeMenu = () => {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    };


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.contains("open");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    const navLinks =
        navMenu.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

            closeMenu();

        }

    });

}


/* ============================================================
   05. SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (!links.length) return;


    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();


            const header =
                document.querySelector(
                    ".site-header"
                );

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* ============================================================
   06. SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");

    if (!revealElements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   07. ACTIVE NAVIGATION
   ============================================================ */

function initActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if (!navLinks.length) return;


    const sections = [];


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            !href.startsWith("#")
        ) {
            return;
        }


        const section =
            document.querySelector(href);

        if (section) {

            sections.push({

                section,
                link

            });

        }

    });


    if (!sections.length) return;


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        let currentSection = null;


        sections.forEach(item => {

            const sectionTop =
                item.section.offsetTop;

            const sectionHeight =
                item.section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection = item;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

        });


        if (currentSection) {

            currentSection.link.classList.add(
                "active"
            );

        }

    };


    updateActiveLink();


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );

}


/* ============================================================
   08. BACK TO TOP
   ============================================================ */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) return;


    const updateVisibility = () => {

        if (window.scrollY > 600) {

            button.classList.add("visible");

        } else {

            button.classList.remove(
                "visible"
            );

        }

    };


    updateVisibility();


    window.addEventListener(
        "scroll",
        updateVisibility,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ============================================================
   09. HERO PARALLAX
   ============================================================ */

function initHeroParallax() {

    const visual =
        document.querySelector(
            ".hero-visual"
        );

    if (!visual) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    if (window.innerWidth <= 800) {
        return;
    }


    let ticking = false;


    const updateParallax = () => {

        const scrollY =
            window.scrollY;


        const hero =
            document.querySelector(
                ".hero"
            );


        if (!hero) return;


        const heroBottom =
            hero.offsetTop +
            hero.offsetHeight;


        if (scrollY > heroBottom) {

            ticking = false;

            return;

        }


        const movement =
            Math.min(scrollY * 0.12, 60);


        visual.style.transform =
            `translateY(${movement}px)`;


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );

}


/* ============================================================
   10. PREMIUM CARD TILT
   ============================================================ */

function initCardTilt() {

    const cards =
        document.querySelectorAll(
            ".skill-card, .cert-card"
        );

    if (!cards.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }


    cards.forEach(card => {


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                card.style.transform =
                    `translateY(-6px)
                     perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* ============================================================
   11. CURRENT YEAR
   ============================================================ */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) return;


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            currentYear;

    });

}


/* ============================================================
   12. COPY EMAIL
   ============================================================ */

function initCopyEmail() {

    const emailDisplay =
        document.querySelector(
            ".email-display"
        );


    if (!emailDisplay) return;


    const emailAddress =
        emailDisplay.querySelector(
            ".email-address"
        );


    if (!emailAddress) return;


    const email =
        emailAddress.textContent.trim();


    if (!email) return;


    emailDisplay.style.cursor = "pointer";


    emailDisplay.setAttribute(
        "role",
        "button"
    );


    emailDisplay.setAttribute(
        "tabindex",
        "0"
    );


    const copyEmail = async () => {

        try {

            await navigator.clipboard.writeText(
                email
            );


            showCopyFeedback(
                emailDisplay
            );

        } catch (error) {

            fallbackCopyEmail(
                email,
                emailDisplay
            );

        }

    };


    emailDisplay.addEventListener(
        "click",
        copyEmail
    );


    emailDisplay.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                copyEmail();

            }

        }
    );

}


/* ============================================================
   13. COPY FEEDBACK
   ============================================================ */

function showCopyFeedback(element) {

    const originalHTML =
        element.innerHTML;


    element.classList.add(
        "email-copied"
    );


    const icon =
        element.querySelector("i");


    if (icon) {

        icon.className =
            "fa-solid fa-check";

    }


    setTimeout(() => {

        element.innerHTML =
            originalHTML;

        element.classList.remove(
            "email-copied"
        );

    }, 1600);

}


/* ============================================================
   14. FALLBACK COPY
   ============================================================ */

function fallbackCopyEmail(
    email,
    element
) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value = email;

    textarea.style.position =
        "fixed";

    textarea.style.opacity = "0";


    document.body.appendChild(
        textarea
    );


    textarea.select();


    try {

        document.execCommand("copy");

        showCopyFeedback(element);

    } catch (error) {

        console.warn(
            "Unable to copy email.",
            error
        );

    }


    document.body.removeChild(
        textarea
    );

}


/* ============================================================
   15. KEYBOARD ACCESSIBILITY
   ============================================================ */

function initKeyboardAccessibility() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    if (
        menuToggle &&
        !menuToggle.hasAttribute(
            "aria-label"
        )
    ) {

        menuToggle.setAttribute(
            "aria-label",
            "Toggle navigation menu"
        );

    }


    if (
        menuToggle &&
        !menuToggle.hasAttribute(
            "aria-expanded"
        )
    ) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* ============================================================
   16. MOUSE GLOW EFFECT
   ============================================================ */

function initMouseGlow() {

    const background =
        document.querySelector(
            ".background"
        );


    if (!background) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    let glow =
        document.querySelector(
            ".mouse-glow"
        );


    if (!glow) {

        glow =
            document.createElement(
                "div"
            );

        glow.className =
            "mouse-glow";


        Object.assign(
            glow.style,
            {

                position: "fixed",

                width: "280px",

                height: "280px",

                borderRadius: "50%",

                pointerEvents: "none",

                zIndex: "-5",

                background:
                    "radial-gradient(circle, rgba(105,231,200,0.045), transparent 70%)",

                transform:
                    "translate(-50%, -50%)",

                transition:
                    "left 120ms ease-out, top 120ms ease-out"

            }
        );


        background.appendChild(
            glow
        );

    }


    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* ============================================================
   17. PROJECT HOVER INTERACTION
   ============================================================ */

function initProjectInteraction() {

    const projects =
        document.querySelectorAll(
            ".project-card"
        );


    if (!projects.length) return;


    projects.forEach(project => {

        project.addEventListener(
            "mouseenter",
            () => {

                project.classList.add(
                    "project-active"
                );

            }
        );


        project.addEventListener(
            "mouseleave",
            () => {

                project.classList.remove(
                    "project-active"
                );

            }
        );

    });

}


/* ============================================================
   18. EXPERIENCE TIMELINE EFFECT
   ============================================================ */

function initExperienceAnimation() {

    const experience =
        document.querySelector(
            ".experience-card"
        );


    if (!experience) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        experience.classList.add(
                            "experience-visible"
                        );

                        observer.unobserve(
                            experience
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    observer.observe(
        experience
    );

}


/* ============================================================
   19. STAT COUNTER ANIMATION
   ============================================================ */

function initStatCounters() {

    const counters =
        document.querySelectorAll(
            ".stat-number[data-count]"
        );


    if (!counters.length) return;


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        counters.forEach(counter => {

            counter.textContent =
                counter.dataset.count;

        });

        return;

    }


    const animateCounter = counter => {

        const target =
            parseFloat(
                counter.dataset.count
            );


        if (Number.isNaN(target)) return;


        const suffix =
            counter.dataset.suffix || "";


        const prefix =
            counter.dataset.prefix || "";


        const duration = 1300;

        const startTime =
            performance.now();


        const update = currentTime => {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                target * eased;


            counter.textContent =
                `${prefix}${formatNumber(value)}${suffix}`;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    `${prefix}${formatNumber(target)}${suffix}`;

            }

        };


        requestAnimationFrame(
            update
        );

    };


    const formatNumber = value => {

        if (
            Number.isInteger(value)
        ) {

            return value.toString();

        }


        return value
            .toFixed(1)
            .replace(
                /\.0$/,
                ""
            );

    };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* ============================================================
   20. EXTERNAL LINK SAFETY
   ============================================================ */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    links.forEach(link => {

        const currentRel =
            link.getAttribute("rel") || "";


        const relValues =
            new Set(
                currentRel
                    .split(" ")
                    .filter(Boolean)
            );


        relValues.add("noopener");
        relValues.add("noreferrer");


        link.setAttribute(
            "rel",
            Array.from(relValues).join(" ")
        );

    });

}


/* ============================================================
   21. LAZY LOAD SUPPORT
   ============================================================ */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (!images.length) return;


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const image =
                            entry.target;


                        image.src =
                            image.dataset.src;


                        image.removeAttribute(
                            "data-src"
                        );


                        observer.unobserve(
                            image
                        );

                    });

                },
                {
                    rootMargin:
                        "200px 0px"
                }
            );


        images.forEach(image => {

            observer.observe(image);

        });

    } else {

        images.forEach(image => {

            image.src =
                image.dataset.src;

            image.removeAttribute(
                "data-src"
            );

        });

    }

}


/* ============================================================
   22. INITIALIZE OPTIONAL FEATURES
   ============================================================ */

initMouseGlow();
initProjectInteraction();
initExperienceAnimation();
initStatCounters();
initExternalLinks();
initLazyImages();


/* ============================================================
   23. CONSOLE BRANDING
   ============================================================ */

console.log(
    "%c BANU PRAKASH REDDY ",
    "background:#69e7c8;color:#06110e;font-size:16px;font-weight:bold;padding:8px 12px;border-radius:6px;"
);

console.log(
    "%c Data • Analytics • AI • Engineering ",
    "color:#69e7c8;font-size:12px;"
);

console.log(
    "%c Portfolio system initialized successfully.",
    "color:#717c8b;font-size:11px;"
);


/* ============================================================
   END OF SCRIPT
   ============================================================ */
