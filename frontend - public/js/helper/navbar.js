
/* =========================================================
   NAVIGATION PATH
========================================================= */

function getNavPath(path) {
    return `${getRootPrefix()}pages/${path}`;
}

function getHomePath() {
    return `${getRootPrefix()}index.html`;
}

/* =========================================================
   PAGE DETECTION
========================================================= */

function getNormalizedPath() {
    return window.location.pathname
        .replace(/\\/g, "/")
        .toLowerCase();
}

function getRootPrefix() {
    const path = getNormalizedPath();
    const marker = "/pages/";
    const idx = path.lastIndexOf(marker);

    if (idx === -1) return "";

    const afterPages = path.slice(idx + marker.length);
    const folderDepth = afterPages.split("/").length - 1;

    return "../".repeat(folderDepth + 1);
}

/* =========================================================
   CREATE NAVBAR
========================================================= */

function createNavbarHTML() {
    const homePath = getHomePath();

    return `
    <div class="nav-container">

        <div class="nav-brand">
            <a href="${homePath}" class="nav-logo">
                PROJECTFACTR
            </a>

            <span class="nav-tagline">
                LLIS MATHEMATICS
            </span>
        </div>

        <button
            class="hamburger-btn"
            id="hamburgerToggle"
            aria-label="Toggle Navigation"
            aria-expanded="false"
            aria-controls="navLinksList"
            type="button"
        >
            <i class="fa-solid fa-bars"></i>
        </button>

        <nav aria-label="Main Navigation">
            <ul class="nav-links" id="navLinksList">

                <li class="nav-item">
                    <a href="${homePath}"
                       class="nav-link"
                       data-page="home">
                        Home
                    </a>
                </li>

                <li class="nav-item">
                    <a href="${getNavPath("aboutUs/aboutUs.html")}"
                       class="nav-link"
                       data-page="about">
                        About ProjectFactr
                    </a>
                </li>

                <!-- GRADE 7 -->
                <li class="nav-item dropdown">
                    <button type="button"
                            class="nav-btn-toggle"
                            data-page="grade7"
                            aria-expanded="false">
                        Grade 7
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li><a href="${getNavPath("grade7/grade7L1.html")}#lesson1" class="dropdown-item">Operations on Integers</a></li>
                        <li><a href="${getNavPath("grade7/Grade7L2.html")}#lesson2" class="dropdown-item">Square Roots and Cube Roots</a></li>
                        <li><a href="${getNavPath("grade7/Grade7L3.html")}#lesson3" class="dropdown-item">Comparing & Arranging Irrationals</a></li>
                        <li><a href="${getNavPath("grade7/Grade7L4.html")}#lesson5" class="dropdown-item">Operations on Fractions</a></li>
                        <li><a href="${getNavPath("grade7/Grade7L5.html")}#lesson6" class="dropdown-item">Unit Conversion</a></li>
                    </ul>
                </li>

                <!-- GRADE 8 -->
                <li class="nav-item dropdown">
                    <button type="button"
                            class="nav-btn-toggle"
                            data-page="grade8"
                            aria-expanded="false">
                        Grade 8
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li><a href="${getNavPath("grade8/grade8L1.html")}#lesson1" class="dropdown-item">Simple Monomial Operations</a></li>
                        <li><a href="${getNavPath("grade8/grade8L2.html")}#lesson3" class="dropdown-item">Midpoint of Line Segment</a></li>
                        <li><a href="${getNavPath("grade8/grade8L3.html")}#lesson2" class="dropdown-item">Factoring Quadratics Expressions</a></li>
                        <li><a href="${getNavPath("grade8/grade8L4.html")}#lesson4" class="dropdown-item">Distance Between Two Points</a></li>
                    </ul>
                </li>

                <!-- GRADE 9 -->
                <li class="nav-item dropdown">
                    <button type="button"
                            class="nav-btn-toggle"
                            data-page="grade9"
                            aria-expanded="false">
                        Grade 9
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li><a href="${getNavPath("grade9/grade9L2.html")}#lesson1" class="dropdown-item">Linear Function Problems</a></li>
                        <li><a href="${getNavPath("grade9/grade9L1.html")}#lesson2" class="dropdown-item">Sides of Parallelograms</a></li>
                        <li><a href="${getNavPath("grade9/grade9L3.html")}#lesson3" class="dropdown-item">Angles of Parallelograms</a></li>
                        <li><a href="${getNavPath("grade9/grade9L4.html")}#lesson4" class="dropdown-item">Height & Diagonals of Parallelograms</a></li>
                    </ul>
                </li>

                <!-- GRADE 10 -->
                <li class="nav-item dropdown">
                    <button type="button"
                            class="nav-btn-toggle"
                            data-page="grade10"
                            aria-expanded="false">
                        Grade 10
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li><a href="${getNavPath("grade10/grade10L1.html")}#lesson1" class="dropdown-item">Absolute Value Equations</a></li>
                        <li><a href="${getNavPath("grade10/grade10L2.html")}#lesson2" class="dropdown-item">Quadratic Inequalities</a></li>
                        <li><a href="${getNavPath("grade10/grade10L3.html")}#lesson3" class="dropdown-item">Quartiles, Deciles, and Percentiles</a></li>
                    </ul>
                </li>

                <!-- GRADE 11 -->
                <li class="nav-item dropdown">
                    <button type="button"
                            class="nav-btn-toggle"
                            data-page="grade11"
                            aria-expanded="false">
                        Grade 11
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li><a href="${getNavPath("grade11/grade11L1.html")}#lesson1" class="dropdown-item">Plotting Points & Graphing Functions</a></li>
                        <li><a href="${getNavPath("grade11/grade11L2.html")}#lesson2" class="dropdown-item">Applying of Piecewise Functions</a></li>
                        <li><a href="${getNavPath("grade11/grade11L3.html")}#lesson3" class="dropdown-item">Central Tendency & Variability</a></li>
                    </ul>
                </li>

            </ul>
        </nav>

    </div>
    `;
}

/* =========================================================
   CURRENT PAGE
========================================================= */

function getCurrentPage() {
    const path = getNormalizedPath();

    if (path.includes("/pages/aboutus/aboutus.html")) return "about";

    if (path.includes("/pages/grade7/")) return "grade7";
    if (path.includes("/pages/grade8/")) return "grade8";
    if (path.includes("/pages/grade9/")) return "grade9";
    if (path.includes("/pages/grade10/")) return "grade10";
    if (path.includes("/pages/grade11/")) return "grade11";

    if (path.endsWith("/index.html") || path.endsWith("/")) {
        return "home";
    }

    return null;
}

/* =========================================================
   ACTIVE PAGE
========================================================= */

function applyNavbarPageStyle() {
    const page = getCurrentPage();

    if (!page) return;

    const activeElement = document.querySelector(
        `[data-page="${page}"]`
    );

    if (activeElement) {
        activeElement.classList.add("active");
    }
}

/* =========================================================
   NAVBAR INTERACTION
========================================================= */

function setupNavbar() {
    const hamburgerToggle = document.getElementById("hamburgerToggle");
    const navLinksList = document.getElementById("navLinksList");

    if (!hamburgerToggle || !navLinksList) return;

    const mobileBreakpoint = 900;

    /* HAMBURGER */

    hamburgerToggle.addEventListener("click", () => {
        const isOpen = navLinksList.classList.toggle("mobile-open");

        hamburgerToggle.setAttribute("aria-expanded", String(isOpen));

        const icon = hamburgerToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    });

    /* GRADE DROPDOWNS */

    document.querySelectorAll(".nav-btn-toggle").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".nav-item.dropdown");

            if (!item) return;

            if (window.innerWidth <= mobileBreakpoint) {

                const isOpen = item.classList.toggle(
                    "mobile-dropdown-active"
                );

                button.setAttribute("aria-expanded", String(isOpen));

            } else {

                item.classList.toggle("desktop-dropdown-active");

            }
        });
    });

    /* CLOSE MENU AFTER SELECTING A LINK */

    navLinksList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {

            if (window.innerWidth <= mobileBreakpoint) {

                navLinksList.classList.remove("mobile-open");

                hamburgerToggle.setAttribute("aria-expanded", "false");

                const icon = hamburgerToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

                document.querySelectorAll(".mobile-dropdown-active")
                    .forEach(item => {
                        item.classList.remove("mobile-dropdown-active");

                        const toggle = item.querySelector(".nav-btn-toggle");

                        if (toggle) {
                            toggle.setAttribute("aria-expanded", "false");
                        }
                    });
            }
        });
    });

    /* CLOSE MENU WHEN CLICKING OUTSIDE */

    document.addEventListener("click", event => {
        if (
            window.innerWidth <= mobileBreakpoint &&
            !event.target.closest(".nav-container")
        ) {
            navLinksList.classList.remove("mobile-open");

            hamburgerToggle.setAttribute("aria-expanded", "false");

            const icon = hamburgerToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

    /* RESET MOBILE MENU WHEN RESIZED */

    window.addEventListener("resize", () => {

        if (window.innerWidth > mobileBreakpoint) {

            navLinksList.classList.remove("mobile-open");

            document.querySelectorAll(".mobile-dropdown-active")
                .forEach(item => {
                    item.classList.remove("mobile-dropdown-active");
                });

            hamburgerToggle.setAttribute("aria-expanded", "false");

            const icon = hamburgerToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });
}

/* =========================================================
   INJECT NAVBAR
========================================================= */

function injectNavbar() {
    const navbarContainer = document.querySelector("#navbar");

    if (!navbarContainer) {
        console.warn("Navbar container #navbar was not found.");
        return;
    }

    navbarContainer.innerHTML = createNavbarHTML();

    applyNavbarPageStyle();
    setupNavbar();
}

document.addEventListener("DOMContentLoaded", injectNavbar);