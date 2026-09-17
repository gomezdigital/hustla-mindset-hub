/* =========================================================
   HUSTLA MINDSET HUB V1
   MAIN JAVASCRIPT
   Compatible with the current index.html + style.css
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        var siteHeader = document.getElementById("siteHeader");
        var menuToggle = document.getElementById("menuToggle");
        var navigation = document.getElementById("navigation");

        var navLinks = document.querySelectorAll(
            ".navigation a"
        );

        var yearElement = document.getElementById("year");

        var toolButtons = document.querySelectorAll(
            ".tool-button"
        );

        var categoryCards = document.querySelectorAll(
            ".category-card"
        );

        var contentCards = document.querySelectorAll(
            ".content-card"
        );

        var heroCards = document.querySelectorAll(
            ".hero-card"
        );


        /* =================================================
           MOBILE NAVIGATION
        ================================================= */

        if (menuToggle && navigation) {

            menuToggle.addEventListener("click", function () {

                navigation.classList.toggle("active");

                var menuOpen =
                    navigation.classList.contains("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    menuOpen ? "true" : "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    menuOpen
                        ? "Close navigation"
                        : "Open navigation"
                );

                menuToggle.classList.toggle(
                    "active",
                    menuOpen
                );

            });

        }


        /* =================================================
           CLOSE MOBILE MENU AFTER NAVIGATION CLICK
        ================================================= */

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (!navigation || !menuToggle) {
                    return;
                }

                navigation.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });


        /* =================================================
           HEADER SCROLL EFFECT
        ================================================= */

        function updateHeader() {

            if (!siteHeader) {
                return;
            }

            if (window.scrollY > 30) {

                siteHeader.classList.add("scrolled");

            } else {

                siteHeader.classList.remove("scrolled");

            }

        }

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();


        /* =================================================
           CURRENT YEAR
        ================================================= */

        if (yearElement) {

            yearElement.textContent =
                new Date().getFullYear();

        }


        /* =================================================
           SMOOTH SCROLLING
        ================================================= */

        var anchorLinks = document.querySelectorAll(
            'a[href^="#"]'
        );

        anchorLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    var targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    var target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


        /* =================================================
           CATEGORY CARD INTERACTION
        ================================================= */

        categoryCards.forEach(function (card) {

            card.addEventListener(
                "click",
                function (event) {

                    var href =
                        card.getAttribute("href");

                    /*
                     * The current category cards use href="#".
                     * Prevent the page from jumping to the top.
                     */

                    if (!href || href === "#") {

                        event.preventDefault();

                        var title =
                            card.querySelector("h3");

                        if (title) {

                            showNotification(
                                title.textContent +
                                " section coming soon."
                            );

                        }

                    }

                }
            );

        });


        /* =================================================
           FEATURED CONTENT LINKS
        ================================================= */

        var contentLinks =
            document.querySelectorAll(
                ".content-card .text-link"
            );

        contentLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    var href =
                        this.getAttribute("href");

                    if (!href || href === "#") {

                        event.preventDefault();

                        showNotification(
                            "More Hustla Mindset content is coming soon."
                        );

                    }

                }
            );

        });


        /* =================================================
           TOOL BUTTONS
        ================================================= */

        toolButtons.forEach(function (button, index) {

            button.addEventListener(
                "click",
                function () {

                    launchTool(index);

                }
            );

        });


        /* =================================================
           COMMUNITY BUTTON
        ================================================= */

        var communityButtons =
            document.querySelectorAll(
                'a[href="#community"]'
            );

        communityButtons.forEach(function (button) {

            /*
             * These already point to the community section,
             * so we leave their normal navigation behavior.
             */

            button.addEventListener(
                "click",
                function () {

                    if (navigation) {
                        navigation.classList.remove("active");
                    }

                }
            );

        });


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        var revealElements =
            document.querySelectorAll(
                ".category-card, " +
                ".content-card, " +
                ".tool-card, " +
                ".community-section, " +
                ".about-grid, " +
                ".agency-section"
            );


        if ("IntersectionObserver" in window) {

            var revealObserver =
                new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "reveal-visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "reveal-ready"
                    );

                    revealObserver.observe(
                        element
                    );

                }
            );

        }


        /* =================================================
           HERO CARD HOVER INTERACTION
        ================================================= */

        heroCards.forEach(function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.style.zIndex = "10";

                }
            );

            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.zIndex = "";

                }
            );

        });


        /* =================================================
           ESCAPE KEY
           CLOSE MOBILE MENU
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    if (navigation) {
                        navigation.classList.remove(
                            "active"
                        );
                    }

                    if (menuToggle) {

                        menuToggle.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation"
                        );

                    }

                }

            }
        );


        /* =================================================
           TOOL SYSTEM
        ================================================= */

        function launchTool(index) {

            if (index === 0) {

                businessIdeaGenerator();

            } else if (index === 1) {

                contentIdeaGenerator();

            } else if (index === 2) {

                hustleRoadmap();

            } else if (index === 3) {

                aiToolFinder();

            }

        }


        /* =================================================
           BUSINESS IDEA GENERATOR
        ================================================= */

        function businessIdeaGenerator() {

            var ideas = [

                "AI-powered social media content service",

                "Local business website creation service",

                "Student digital skills platform",

                "Short-form video editing service",

                "AI automation service for small businesses",

                "Personal branding service for creators",

                "Digital CV and portfolio creation service",

                "Online tutoring and study-resource platform"

            ];

            var idea =
                randomItem(ideas);

            showToolResult(
                "BUSINESS IDEA GENERATOR",
                idea
            );

        }


        /* =================================================
           CONTENT IDEA GENERATOR
        ================================================= */

        function contentIdeaGenerator() {

            var ideas = [

                "3 skills every young entrepreneur should learn",

                "What I would do if I had zero money",

                "5 free AI tools students should know",

                "Why consistency beats motivation",

                "How to start learning a digital skill",

                "3 mistakes beginners make when starting online",

                "How to turn one skill into multiple income streams",

                "What nobody tells you about starting a business"

            ];

            var idea =
                randomItem(ideas);

            showToolResult(
                "CONTENT IDEA GENERATOR",
                idea
            );

        }


        /* =================================================
           HUSTLE ROADMAP
        ================================================= */

        function hustleRoadmap() {

            var roadmap =
                "STEP 1 — Choose one valuable skill.\n\n" +
                "STEP 2 — Learn the fundamentals.\n\n" +
                "STEP 3 — Build 2–3 real projects.\n\n" +
                "STEP 4 — Share your work publicly.\n\n" +
                "STEP 5 — Find people who need the skill.\n\n" +
                "STEP 6 — Offer a simple service.\n\n" +
                "STEP 7 — Improve using feedback.";

            showToolResult(
                "YOUR HUSTLE ROADMAP",
                roadmap
            );

        }


        /* =================================================
           AI TOOL FINDER
        ================================================= */

        function aiToolFinder() {

            var tools = [

                "Writing → AI writing assistants",

                "Design → AI image and design tools",

                "Coding → AI coding assistants",

                "Research → AI research tools",

                "Marketing → AI content and marketing tools",

                "Study → AI learning assistants",

                "Automation → AI workflow automation tools"

            ];

            var tool =
                randomItem(tools);

            showToolResult(
                "AI TOOL FINDER",
                tool
            );

        }


        /* =================================================
           RANDOM ITEM
        ================================================= */

        function randomItem(array) {

            return array[
                Math.floor(
                    Math.random() * array.length
                )
            ];

        }


        /* =================================================
           TOOL RESULT MODAL
        ================================================= */

        function showToolResult(title, text) {

            var existing =
                document.getElementById(
                    "toolResultModal"
                );

            if (existing) {
                existing.remove();
            }


            var modal =
                document.createElement("div");

            modal.id = "toolResultModal";

            modal.innerHTML =

                '<div class="tool-modal-overlay">' +

                    '<div class="tool-modal">' +

                        '<button ' +
                        'class="tool-modal-close" ' +
                        'aria-label="Close">' +
                        '&times;' +
                        '</button>' +

                        '<p class="eyebrow">' +
                        title +
                        '</p>' +

                        '<div class="tool-result">' +
                        escapeHTML(text).replace(
                            /\n/g,
                            "<br>"
                        ) +
                        '</div>' +

                        '<button class="primary-button tool-modal-action">' +
                        'Generate Another' +
                        '</button>' +

                    '</div>' +

                '</div>';


            document.body.appendChild(modal);


            var closeButton =
                modal.querySelector(
                    ".tool-modal-close"
                );

            var actionButton =
                modal.querySelector(
                    ".tool-modal-action"
                );


            closeButton.addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );


            actionButton.addEventListener(
                "click",
                function () {

                    modal.remove();

                    /*
                     * Small delay makes the second
                     * generation feel intentional.
                     */

                    setTimeout(
                        function () {

                            if (
                                title ===
                                "BUSINESS IDEA GENERATOR"
                            ) {

                                businessIdeaGenerator();

                            } else if (
                                title ===
                                "CONTENT IDEA GENERATOR"
                            ) {

                                contentIdeaGenerator();

                            } else if (
                                title ===
                                "YOUR HUSTLE ROADMAP"
                            ) {

                                hustleRoadmap();

                            } else if (
                                title ===
                                "AI TOOL FINDER"
                            ) {

                                aiToolFinder();

                            }

                        },
                        150
                    );

                }
            );


            modal
                .querySelector(
                    ".tool-modal-overlay"
                )
                .addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target ===
                            this
                        ) {

                            modal.remove();

                        }

                    }
                );

        }


        /* =================================================
           NOTIFICATION
        ================================================= */

        function showNotification(message) {

            var notification =
                document.createElement("div");

            notification.className =
                "hustla-notification";

            notification.textContent =
                message;

            document.body.appendChild(
                notification
            );


            setTimeout(
                function () {

                    notification.classList.add(
                        "show"
                    );

                },
                20
            );


            setTimeout(
                function () {

                    notification.classList.remove(
                        "show"
                    );

                    setTimeout(
                        function () {

                            notification.remove();

                        },
                        300
                    );

                },
                2800
            );

        }


        /* =================================================
           ESCAPE HTML
        ================================================= */

        function escapeHTML(text) {

            var div =
                document.createElement("div");

            div.textContent = text;

            return div.innerHTML;

        }


        /* =================================================
           FINAL LOAD MESSAGE
        ================================================= */

        console.log(
            "%cHUSTLA MINDSET HUB V1",
            "font-size:18px;font-weight:900;"
        );

        console.log(
            "Learn. Build. Execute."
        );

    });

})();
