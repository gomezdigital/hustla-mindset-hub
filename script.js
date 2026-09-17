/* =========================================================
   HUSTLA MINDSET HUB V1
   Main JavaScript
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

        var header = document.getElementById("siteHeader");
        var menuToggle = document.getElementById("menuToggle");
        var navigation = document.getElementById("navigation");
        var year = document.getElementById("year");


        /* =================================================
           FOOTER YEAR
           ================================================= */

        if (year) {
            year.textContent = new Date().getFullYear();
        }


        /* =================================================
           HEADER SCROLL EFFECT
           ================================================= */

        function updateHeader() {

            if (!header) {
                return;
            }

            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });


        /* =================================================
           MOBILE MENU
           ================================================= */

        if (menuToggle && navigation) {

            menuToggle.addEventListener("click", function () {

                var isOpen =
                    navigation.classList.toggle("active");

                menuToggle.classList.toggle("active", isOpen);

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation"
                        : "Open navigation"
                );
            });


            /* Close menu after clicking a navigation link */

            var navigationLinks =
                navigation.querySelectorAll("a");

            navigationLinks.forEach(function (link) {

                link.addEventListener("click", function () {

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
        }


        /* =================================================
           SMOOTH ANCHOR BEHAVIOUR
           ================================================= */

        var anchorLinks =
            document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function (link) {

            link.addEventListener("click", function (event) {

                var targetId =
                    link.getAttribute("href");

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

            });

        });


        /* =================================================
           SCROLL REVEAL
           ================================================= */

        var revealElements = document.querySelectorAll(
            ".section-heading, " +
            ".category-card, " +
            ".content-card, " +
            ".tool-card, " +
            ".community-section, " +
            ".about-grid, " +
            ".agency-section"
        );


        revealElements.forEach(function (element) {

            element.classList.add("reveal-ready");

        });


        if ("IntersectionObserver" in window) {

            var revealObserver =
                new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(function (element) {

                revealObserver.observe(element);

            });

        } else {

            revealElements.forEach(function (element) {

                element.classList.add("reveal-visible");

            });

        }


        /* =================================================
           CATEGORY CARD FEEDBACK
           ================================================= */

        var categoryCards =
            document.querySelectorAll(".category-card");

        categoryCards.forEach(function (card) {

            card.addEventListener("click", function (event) {

                var href =
                    card.getAttribute("href");

                if (href === "#") {

                    event.preventDefault();

                    showNotification(
                        "This Hustla Mindset section is coming soon."
                    );
                }

            });

        });


        /* =================================================
           CONTENT CARD FEEDBACK
           ================================================= */

        var contentLinks =
            document.querySelectorAll(
                ".content-card .text-link"
            );

        contentLinks.forEach(function (link) {

            link.addEventListener("click", function (event) {

                var href =
                    link.getAttribute("href");

                if (href === "#") {

                    event.preventDefault();

                    showNotification(
                        "More Hustla Mindset content is coming soon."
                    );
                }

            });

        });


        /* =================================================
           TOOL BUTTONS
           ================================================= */

        var toolButtons =
            document.querySelectorAll(".tool-button");

        toolButtons.forEach(function (button, index) {

            button.addEventListener("click", function () {

                launchTool(index);

            });

        });


        /* =================================================
           KEYBOARD ACCESS
           ================================================= */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeToolModal();

            }

        });


    });


    /* =====================================================
       TOOL SYSTEM
       ===================================================== */

    function launchTool(index) {

        var tools = [

            {
                title: "Business Idea Generator",
                description:
                    "Tell Hustla Mindset what you are interested in and generate a practical business idea.",
                type: "business"
            },

            {
                title: "Content Idea Generator",
                description:
                    "Choose a topic and generate content ideas for TikTok, Instagram, YouTube or other platforms.",
                type: "content"
            },

            {
                title: "Hustle Roadmap",
                description:
                    "Build a simple action roadmap based on your current skill or interest.",
                type: "roadmap"
            },

            {
                title: "AI Tool Finder",
                description:
                    "Choose what you want AI to help you with and discover useful tool categories.",
                type: "ai"
            }

        ];


        var tool = tools[index];

        if (!tool) {
            return;
        }


        var overlay =
            document.createElement("div");

        overlay.className =
            "tool-modal-overlay";


        var modal =
            document.createElement("div");

        modal.className =
            "tool-modal";


        var closeButton =
            document.createElement("button");

        closeButton.className =
            "tool-modal-close";

        closeButton.innerHTML = "×";

        closeButton.setAttribute(
            "aria-label",
            "Close tool"
        );


        var content =
            document.createElement("div");


        content.innerHTML =
            getToolHTML(tool);


        modal.appendChild(closeButton);
        modal.appendChild(content);

        overlay.appendChild(modal);

        document.body.appendChild(overlay);


        /* Open animation */

        requestAnimationFrame(function () {

            overlay.classList.add("active");

        });


        /* Close button */

        closeButton.addEventListener(
            "click",
            function () {

                closeToolModal();

            }
        );


        /* Click outside */

        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {

                    closeToolModal();

                }

            }
        );


        /* Tool form */

        var actionButton =
            modal.querySelector(
                ".tool-modal-action"
            );


        if (actionButton) {

            actionButton.addEventListener(
                "click",
                function () {

                    processTool(
                        tool.type,
                        modal
                    );

                }
            );

        }


        /* Focus first field */

        var firstInput =
            modal.querySelector(
                "input, select, textarea"
            );

        if (firstInput) {

            setTimeout(function () {

                firstInput.focus();

            }, 250);

        }

    }


    /* =====================================================
       TOOL HTML
       ===================================================== */

    function getToolHTML(tool) {

        var html =
            "<h3>" +
            tool.title +
            "</h3>" +

            "<p>" +
            tool.description +
            "</p>";


        if (tool.type === "business") {

            html +=

                '<input id="toolInput" ' +
                'type="text" ' +
                'placeholder="Example: fashion, coding, fitness">' +

                '<button class="tool-modal-action">' +
                "Generate Business Idea →" +
                "</button>" +

                '<div class="tool-result"></div>';

        }


        if (tool.type === "content") {

            html +=

                '<input id="toolInput" ' +
                'type="text" ' +
                'placeholder="Example: motivation, AI, business">' +

                '<select id="contentPlatform">' +

                '<option value="TikTok">TikTok</option>' +
                '<option value="Instagram">Instagram</option>' +
                '<option value="YouTube">YouTube</option>' +
                '<option value="Blog">Blog</option>' +

                "</select>" +

                '<button class="tool-modal-action">' +
                "Generate Content Ideas →" +
                "</button>" +

                '<div class="tool-result"></div>';

        }


        if (tool.type === "roadmap") {

            html +=

                '<input id="toolInput" ' +
                'type="text" ' +
                'placeholder="Example: coding, marketing, design">' +

                '<button class="tool-modal-action">' +
                "Build My Roadmap →" +
                "</button>" +

                '<div class="tool-result"></div>';

        }


        if (tool.type === "ai") {

            html +=

                '<select id="toolInput">' +

                '<option value="Study">Study & Research</option>' +
                '<option value="Business">Business</option>' +
                '<option value="Content">Content Creation</option>' +
                '<option value="Design">Design</option>' +
                '<option value="Coding">Coding</option>' +
                '<option value="Marketing">Marketing</option>' +

                "</select>" +

                '<button class="tool-modal-action">' +
                "Find AI Tools →" +
                "</button>" +

                '<div class="tool-result"></div>';

        }


        return html;

    }


    /* =====================================================
       PROCESS TOOLS
       ===================================================== */

    function processTool(type, modal) {

        var input =
            modal.querySelector("#toolInput");

        var result =
            modal.querySelector(".tool-result");


        if (!input || !result) {
            return;
        }


        var value =
            input.value.trim();


        if (!value) {

            result.innerHTML =
                "<strong>Enter something first.</strong><br>" +
                "Give the tool a topic, skill or interest.";

            result.classList.add("show");

            return;
        }


        /* ================================================
           BUSINESS
           ================================================ */

        if (type === "business") {

            var businessIdeas = [

                "Create a niche digital service around " +
                value + " for small businesses.",

                "Build a content page teaching beginners " +
                "about " + value + ".",

                "Create a simple digital product that helps " +
                "people improve their " + value + " skills.",

                "Offer freelance services related to " +
                value + " through social media.",

                "Build a community focused on learning and " +
                "sharing resources about " + value + "."

            ];


            var businessIdea =
                randomItem(businessIdeas);


            result.innerHTML =
                "<strong>Your Hustle Idea</strong><br><br>" +
                businessIdea +
                "<br><br>" +
                "<strong>First move:</strong> Find 5 people " +
                "who have the problem your idea solves and " +
                "learn what they actually need.";


            result.classList.add("show");

        }


        /* ================================================
           CONTENT
           ================================================ */

        if (type === "content") {

            var platform =
                modal.querySelector(
                    "#contentPlatform"
                ).value;


            var contentIdeas = [

                "3 things beginners should know about " +
                value,

                "I wish I knew this about " +
                value + " earlier.",

                "5 mistakes people make when learning " +
                value,

                "How I would start learning " +
                value + " from zero.",

                "The truth about making progress in " +
                value,

                "One simple way to improve your " +
                value + " skills."

            ];


            result.innerHTML =
                "<strong>" +
                platform +
                " Content Ideas</strong><br><br>" +

                "1. " + contentIdeas[0] + "<br><br>" +

                "2. " + contentIdeas[1] + "<br><br>" +

                "3. " + contentIdeas[2] + "<br><br>" +

                "4. " + contentIdeas[3] + "<br><br>" +

                "5. " + contentIdeas[4] + "<br><br>" +

                "6. " + contentIdeas[5];


            result.classList.add("show");

        }


        /* ================================================
           ROADMAP
           ================================================ */

        if (type === "roadmap") {

            result.innerHTML =

                "<strong>Hustle Roadmap: " +
                value +
                "</strong><br><br>" +

                "<strong>STEP 1 — Learn</strong><br>" +
                "Spend the first stage understanding the " +
                "fundamentals of " + value + ".<br><br>" +

                "<strong>STEP 2 — Practice</strong><br>" +
                "Build small projects instead of only " +
                "watching tutorials.<br><br>" +

                "<strong>STEP 3 — Document</strong><br>" +
                "Share your progress publicly and create " +
                "evidence of your skills.<br><br>" +

                "<strong>STEP 4 — Offer</strong><br>" +
                "Find people or businesses who could benefit " +
                "from your skill.<br><br>" +

                "<strong>STEP 5 — Improve</strong><br>" +
                "Use feedback to improve your skill and " +
                "increase the value you provide.";


            result.classList.add("show");

        }


        /* ================================================
           AI TOOL FINDER
           ================================================ */

        if (type === "ai") {

            var recommendations = {

                Study:
                    "AI writing assistants, research tools, " +
                    "study assistants and note-taking tools.",

                Business:
                    "AI business idea tools, automation platforms, " +
                    "customer-support assistants and analytics tools.",

                Content:
                    "AI writing tools, video assistants, image " +
                    "generators, caption tools and content planners.",

                Design:
                    "AI image generators, design assistants, " +
                    "presentation builders and branding tools.",

                Coding:
                    "AI coding assistants, debugging tools, " +
                    "code explainers and development copilots.",

                Marketing:
                    "AI copywriting tools, SEO assistants, " +
                    "social-media tools and campaign helpers."

            };


            result.innerHTML =

                "<strong>AI Toolkit Category</strong><br><br>" +

                recommendations[value] +

                "<br><br>" +

                "<strong>Next move:</strong> Compare
