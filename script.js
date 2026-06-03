// Mobile Menu

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}

// Close menu on click

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Active Navigation

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.getAttribute("href") ===
            `#${current}`
        ) {
            item.classList.add("active");
        }

    });

});

// Typing Animation

const textArray = [
    "Data Analyst",
    "Machine Learning Engineer",
    "Power BI Developer",
    "Python Developer"
];

let textIndex = 0;
let charIndex = 0;

const typingElement =
document.getElementById("typing-text");

function typeEffect() {

    if (!typingElement) return;

    if (
        charIndex <
        textArray[textIndex].length
    ) {

        typingElement.textContent +=
        textArray[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 100);

    } else {

        setTimeout(eraseEffect, 1500);

    }
}

function eraseEffect() {

    if (
        charIndex > 0
    ) {

        typingElement.textContent =
        textArray[textIndex].substring(
            0,
            charIndex - 1
        );

        charIndex--;

        setTimeout(eraseEffect, 50);

    } else {

        textIndex++;

        if (
            textIndex >= textArray.length
        ) {
            textIndex = 0;
        }

        setTimeout(typeEffect, 500);
    }
}

window.onload = () => {
    typeEffect();
};

// Back To Top

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
