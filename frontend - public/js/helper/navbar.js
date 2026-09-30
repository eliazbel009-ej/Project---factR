/**
 * PROJECTFACTR Navbar
 * -------------------
 * Injects the navbar into the page and automatically
 * highlights the navigation item for the current page.
 */
function getNavPath(path) {
    return `${getRootPrefix()}pages/${path}`;
}


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
        >
            <i class="fa-solid fa-bars"></i>
        </button>

        <nav aria-label="Main Navigation">

            <ul class="nav-links" id="navLinksList">

                <!-- Homepage -->
                <li>
                    <a
                        href="${homePath}"
                        class="nav-link"
                        data-page="home"
                    >
                        Homepage
                    </a>
                </li>


                <!-- About ProjectFactr -->
                <li>
                    <a
                        href="${getNavPath("aboutUs/aboutUs.html")}"
                        class="nav-link"
                        data-page="about"
                    >
                        About ProjectFactr
                    </a>
                </li>


                <!-- Grade 7 -->
                <li class="nav-item dropdown">

                    <div
                        class="nav-btn-toggle"
                        data-page="grade7"
                    >
                        Grade 7

                        <i
                            class="fa-solid fa-chevron-down"
                            style="font-size: 0.7rem; margin-left: auto;"
                        ></i>
                    </div>

                    <ul class="dropdown-menu">

                        <li>
                            <a
                                href="${getNavPath("grade7/grade7L1.html")}#lesson1"
                                class="dropdown-item"
                            >
                                Operations on Integers
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade7/Grade7L2.html")}#lesson2"
                                class="dropdown-item"
                            >
                                Square & Cube Roots
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade7/Grade7L3.html")}#lesson3"
                                class="dropdown-item"
                            >
                                Comparing Irrationals
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade7/Grade7L3.html")}#lesson4"
                                class="dropdown-item"
                            >
                                Arranging Irrationals
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade7/Grade7L5.html")}#lesson5"
                                class="dropdown-item"
                            >
                                Operations on Fractions
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade7/Grade7L6.html")}#lesson6"
                                class="dropdown-item"
                            >
                                Unit Conversion
                            </a>
                        </li>

                    </ul>
                </li>


                <!-- Grade 8 -->
                <li class="nav-item dropdown">

                    <div
                        class="nav-btn-toggle"
                        data-page="grade8"
                    >
                        Grade 8

                        <i
                            class="fa-solid fa-chevron-down"
                            style="font-size: 0.7rem; margin-left: auto;"
                        ></i>
                    </div>

                    <ul class="dropdown-menu">

                        <li>
                            <a
                                href="${getNavPath("grade8/grade8L1.html")}#lesson1"
                                class="dropdown-item"
                            >
                                Simple Monomial Ops
                            </a>
                        </li>
                        <li>
                            <a
                                href="${getNavPath("grade8/grade8L2.html")}#lesson3"
                                class="dropdown-item"
                            >
                                Midpoint of Line Segment
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade8/grade8L3.html")}#lesson2"
                                class="dropdown-item"
                            >
                                Factoring Quadratics
                            </a>
                        </li>

                        
                        <li>
                            <a
                                href="${getNavPath("grade8/grade8L4.html")}#lesson4"
                                class="dropdown-item"
                            >
                                Distance Between Points
                            </a>
                        </li>

                    </ul>
                </li>


                <!-- Grade 9 -->
                <li class="nav-item dropdown">

                    <div
                        class="nav-btn-toggle"
                        data-page="grade9"
                    >
                        Grade 9

                        <i
                            class="fa-solid fa-chevron-down"
                            style="font-size: 0.7rem; margin-left: auto;"
                        ></i>
                    </div>

                    <ul class="dropdown-menu">


                     <li>
                            <a
                                href="${getNavPath("grade9/grade9L1.html")}#lesson2"
                                class="dropdown-item"
                            >
                                Sides of Parallelograms
                            </a>
                        </li>
                        <li>
                            <a
                                href="${getNavPath("grade9/grade9L2.html")}#lesson1"
                                class="dropdown-item"
                            >
                                Linear Function Problems
                            </a>
                        </li>

                       

                        <li>
                            <a
                                href="${getNavPath("grade9/grade9L1.html")}#lesson3"
                                class="dropdown-item"
                            >
                                Angles of Parallelograms
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade9/grade9L2.html")}#lesson4"
                                class="dropdown-item"
                            >
                                Height & Diagonals
                            </a>
                        </li>

                    </ul>
                </li>


                <!-- Grade 10 -->
                <li class="nav-item dropdown">

                    <div
                        class="nav-btn-toggle"
                        data-page="grade10"
                    >
                        Grade 10

                        <i
                            class="fa-solid fa-chevron-down"
                            style="font-size: 0.7rem; margin-left: auto;"
                        ></i>
                    </div>

                    <ul class="dropdown-menu">

                        <li>
                            <a
                                href="${getNavPath("grade10/grade10L1.html")}#lesson1"
                                class="dropdown-item"
                            >
                                Absolute Value Equations
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade10/grade10L2.html")}#lesson2"
                                class="dropdown-item"
                            >
                                Quadratic Inequalities
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade10/grade10L3.html")}#lesson3"
                                class="dropdown-item"
                            >
                                Quartiles, Deciles, Percentiles
                            </a>
                        </li>

                    </ul>
                </li>


                <!-- Grade 11 -->
                <li class="nav-item dropdown">

                    <div
                        class="nav-btn-toggle"
                        data-page="grade11"
                    >
                        Grade 11

                        <i
                            class="fa-solid fa-chevron-down"
                            style="font-size: 0.7rem; margin-left: auto;"
                        ></i>
                    </div>

                    <ul class="dropdown-menu">

                        <li>
                            <a
                                href="${getNavPath("grade11/index.html")}#lesson1"
                                class="dropdown-item"
                            >
                                Graphing Functions
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade11/peacewise.html")}#lesson2"
                                class="dropdown-item"
                            >
                                Piecewise Functions
                            </a>
                        </li>

                        <li>
                            <a
                                href="${getNavPath("grade11/Measures_of_Central_Tendency.html")}#lesson3"
                                class="dropdown-item"
                            >
                                Central Tendency & Variability
                            </a>
                        </li>

                    </ul>
                </li>

            </ul>

        </nav>

    </div>
    `;
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

    // Not inside /pages/ -> we are at the root (index.html or "/")
    if (idx === -1) {
        return "";
    }

    const afterPages = path.slice(idx + marker.length); // "grade7/grade7l1.html"
    const folderDepth = afterPages.split("/").length - 1; // folders below /pages/

    // +1 to climb out of "pages" itself
    return "../".repeat(folderDepth + 1);
}

function getCurrentPage() {

    const path = window.location.pathname
        .replace(/\\/g, "/")
        .toLowerCase();


    if (path.endsWith("/index.html")) {
        return "home";
    }


    if (path.includes("/pages/aboutus/aboutus.html")) {
        return "about";
    }


    if (path.includes("/pages/grade7/grade7.html")) {
        return "grade7";
    }


    if (path.includes("/pages/grade8/grade8.html")) {
        return "grade8";
    }


    if (path.includes("/pages/grade9/grade9.html")) {
        return "grade9";
    }


    if (path.includes("/pages/grade10/grade10.html")) {
        return "grade10";
    }


    if (path.includes("/pages/grade11/grade11.html")) {
        return "grade11";
    }


    return null;
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


/* =========================================================
   APPLY ACTIVE PAGE
   ========================================================= */

function applyNavbarPageStyle() {

    const page = getCurrentPage();

    if (!page) {
        return;
    }

    /*
     * Find the navbar element belonging
     * to the current page.
     */
    const activeElement = document.querySelector(
        `[data-page="${page}"]`
    );

    if (!activeElement) {
        return;
    }

    /*
     * Add the active class.
     *
     * The CSS already existing on the page
     * determines what .active looks like.
     */
    activeElement.classList.add("active");
}


/* =========================================================
   NAVBAR INTERACTION
   ========================================================= */

function setupNavbar() {

    const hamburgerToggle =
        document.getElementById("hamburgerToggle");

    const navLinksList =
        document.getElementById("navLinksList");


    if (!hamburgerToggle || !navLinksList) {
        return;
    }


    /* ==============================
       HAMBURGER MENU
       ============================== */

    hamburgerToggle.addEventListener("click", () => {

        navLinksList.classList.toggle("mobile-open");

        const icon =
            hamburgerToggle.querySelector("i");


        if (navLinksList.classList.contains("mobile-open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

    /* ==============================
       GRADE DROPDOWN
       ============================== */

    const navButtons =
        document.querySelectorAll(".nav-btn-toggle");


    navButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();


            if (window.innerWidth <= 768) {

                const item =
                    button.closest(".nav-item.dropdown");


                if (item) {
                    item.classList.toggle(
                        "mobile-dropdown-active"
                    );
                }

            }

        });

    });

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    injectNavbar
);