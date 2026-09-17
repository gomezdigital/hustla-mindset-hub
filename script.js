/* =========================================================
   HUSTLA MINDSET V2
   MAIN JAVASCRIPT
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

        var loader =
            document.getElementById("pageLoader");

        var header =
            document.getElementById("siteHeader");

        var menuToggle =
            document.getElementById("menuToggle");

        var navigation =
            document.getElementById("navigation");

        var year =
            document.getElementById("year");

        var toolModal =
            document.getElementById("toolModal");

        var modalClose =
            document.getElementById("modalClose");

        var modalTitle =
            document.getElementById("modalTitle");

        var modalDescription =
            document.getElementById("modalDescription");

        var modalContent =
            document.getElementById("modalContent");

        var notification =
            document.getElementById("notification");

        var notificationText =
            document.getElementById("notificationText");


        /* =================================================
           FOOTER YEAR
        ================================================= */

        if (year) {

            year.textContent =
                new Date().getFullYear();

        }


        /* =================================================
           PAGE LOADER
        ================================================= */

        function hideLoader() {

            if (!loader) {
                return;
            }

            loader.classList.add("hidden");

        }


        window.setTimeout(
            hideLoader,
            1200
        );


        window.addEventListener(
            "load",
            function () {

                window.setTimeout(
                    hideLoader,
                    250
                );

            }
        );


        /* Emergency loader removal */

        window.setTimeout(
            hideLoader,
            3000
        );


        /* =================================================
           HEADER SCROLL
        ================================================= */

        function updateHeader() {

            if (!header) {
                return;
            }

            if (window.scrollY > 30) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        /* =================================================
           MOBILE MENU
        ================================================= */

        function closeMenu() {

            if (!menuToggle || !navigation) {
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

        }


        function openMenu() {

            if (!menuToggle || !navigation) {
                return;
            }

            navigation.classList.add("active");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );

        }


        function toggleMenu() {

            if (!navigation) {
                return;
            }

            var isOpen =
                navigation.classList.contains("active");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        if (menuToggle) {

            menuToggle.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    toggleMenu();

                }
            );

        }


        /* Close menu after navigation */

        if (navigation) {

            var navigationLinks =
                navigation.querySelectorAll("a");

            navigationLinks.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            closeMenu();

                        }
                    );

                }
            );

        }


        /* Close menu if user taps outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navigation ||
                    !menuToggle
                ) {
                    return;
                }


                var clickedInsideNavigation =
                    navigation.contains(event.target);

                var clickedMenuButton =
                    menuToggle.contains(event.target);


                if (
                    navigation.classList.contains("active") &&
                    !clickedInsideNavigation &&
                    !clickedMenuButton
                ) {

                    closeMenu();

                }

            }
        );


        /* Escape closes menu */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                    closeToolModal();

                }

            }
        );


        /* =================================================
           SMOOTH SCROLL
        ================================================= */

        var anchors =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        anchors.forEach(
            function (anchor) {

                anchor.addEventListener(
                    "click",
                    function (event) {

                        var targetID =
                            anchor.getAttribute("href");


                        if (
                            !targetID ||
                            targetID === "#"
                        ) {

                            return;

                        }


                        var target =
                            document.querySelector(
                                targetID
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        var headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        var targetPosition =
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });


                        closeMenu();

                    }
                );

            }
        );


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        var revealElements =
            document.querySelectorAll(
                ".section-intro, " +
                ".section-heading, " +
                ".movement-text, " +
                ".stat-card, " +
                ".explore-card, " +
                ".tool-card, " +
                ".community-copy, " +
                ".community-mark, " +
                ".agency-content"
            );


        revealElements.forEach(
            function (element) {

                element.classList.add("reveal");

            }
        );


        if (
            "IntersectionObserver"
            in window
        ) {

            var revealObserver =
                new IntersectionObserver(
                    function (
                        entries,
                        observer
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
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

                    revealObserver.observe(
                        element
                    );

                }
            );


        } else {

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =================================================
           NOTIFICATION
        ================================================= */

        var notificationTimer = null;


        function showNotification(message) {

            if (
                !notification ||
                !notificationText
            ) {
                return;
            }


            notificationText.textContent =
                message;


            notification.classList.add(
                "show"
            );


            if (notificationTimer) {

                window.clearTimeout(
                    notificationTimer
                );

            }


            notificationTimer =
                window.setTimeout(
                    function () {

                        notification.classList.remove(
                            "show"
                        );

                    },
                    3000
                );

        }


        /* =================================================
           EXPLORE CARDS
        ================================================= */

        var exploreCards =
            document.querySelectorAll(
                ".explore-card"
            );


        exploreCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        var category =
                            card.getAttribute(
                                "data-category"
                            );


                        var messages = {

                            mindset:
                                "Mindset content is coming soon.",

                            money:
                                "Money resources are coming soon.",

                            business:
                                "Business resources are coming soon.",

                            ai:
                                "AI resources are coming soon.",

                            digital:
                                "Digital skills resources are coming soon.",

                            opportunities:
                                "Opportunity resources are coming soon."

                        };


                        showNotification(
                            messages[category] ||
                            "More Hustla resources are coming soon."
                        );

                    }
                );

            }
        );


        /* =================================================
           COMMUNITY BUTTON
        ================================================= */

        var communityButton =
            document.getElementById(
                "communityButton"
            );


        if (communityButton) {

            communityButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    showNotification(
                        "The Hustla Mindset community is being built. Stay tuned."
                    );

                }
            );

        }


        /* =================================================
           TOOL SYSTEM
        ================================================= */

        var toolCards =
            document.querySelectorAll(
                ".tool-card"
            );


        var toolData = {

            business: {

                title:
                    "Business Idea Generator",

                description:
                    "Tell us what you are interested in and generate a simple business direction.",

                type:
                    "business"

            },


            content: {

                title:
                    "Content Idea Generator",

                description:
                    "Choose your platform and topic to generate a content direction.",

                type:
                    "content"

            },


            roadmap: {

                title:
                    "Hustle Roadmap",

                description:
                    "Turn an idea or skill into a practical action roadmap.",

                type:
                    "roadmap"

            },


            ai: {

                title:
                    "AI Tool Finder",

                description:
                    "Choose what you want AI to help you with.",

                type:
                    "ai"

            }

        };


        function openToolModal(
            toolType
        ) {

            if (
                !toolModal ||
                !modalTitle ||
                !modalDescription ||
                !modalContent
            ) {
                return;
            }


            var tool =
                toolData[toolType];


            if (!tool) {
                return;
            }


            modalTitle.textContent =
                tool.title;


            modalDescription.textContent =
                tool.description;


            modalContent.innerHTML =
                getToolForm(toolType);


            toolModal.classList.add(
                "active"
            );


            toolModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );


            var firstInput =
                modalContent.querySelector(
                    "input, select, textarea"
                );


            if (firstInput) {

                window.setTimeout(
                    function () {

                        firstInput.focus();

                    },
                    100
                );

            }

        }


        function closeToolModal() {

            if (!toolModal) {
                return;
            }


            toolModal.classList.remove(
                "active"
            );


            toolModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "modal-open"
            );

        }


        function getToolForm(
            toolType
        ) {


            if (
                toolType === "business"
            ) {

                return `

                    <form
                        class="tool-form"
                        data-tool-form="business"
                    >

                        <label>
                            WHAT ARE YOU INTERESTED IN?
                        </label>

                        <input
                            type="text"
                            name="interest"
                            placeholder="e.g. fitness, fashion, AI"
                            required
                        >

                        <label>
                            WHAT SKILL DO YOU HAVE?
                        </label>

                        <input
                            type="text"
                            name="skill"
                            placeholder="e.g. design, coding, sales"
                            required
                        >

                        <button
                            type="submit"
                        >
                            Generate Idea →
                        </button>

                    </form>

                `;

            }


            if (
                toolType === "content"
            ) {

                return `

                    <form
                        class="tool-form"
                        data-tool-form="content"
                    >

                        <label>
                            PLATFORM
                        </label>

                        <select
                            name="platform"
                            required
                        >

                            <option value="">
                                Choose platform
                            </option>

                            <option value="TikTok">
                                TikTok
                            </option>

                            <option value="Instagram">
                                Instagram
                            </option>

                            <option value="YouTube">
                                YouTube
                            </option>

                            <option value="Facebook">
                                Facebook
                            </option>

                        </select>


                        <label>
                            TOPIC
                        </label>

                        <input
                            type="text"
                            name="topic"
                            placeholder="e.g. money, fitness, AI"
                            required
                        >


                        <button
                            type="submit"
                        >
                            Generate Content →
                        </button>

                    </form>

                `;

            }


            if (
                toolType === "roadmap"
            ) {

                return `

                    <form
                        class="tool-form"
                        data-tool-form="roadmap"
                    >

                        <label>
                            WHAT DO YOU WANT TO BUILD?
                        </label>

                        <input
                            type="text"
                            name="goal"
                            placeholder="e.g. online business"
                            required
                        >


                        <label>
                            YOUR MAIN SKILL
                        </label>

                        <input
                            type="text"
                            name="skill"
                            placeholder="e.g. video editing"
                            required
                        >


                        <button
                            type="submit"
                        >
                            Build Roadmap →
                        </button>

                    </form>

                `;

            }


            if (
                toolType === "ai"
            ) {

                return `

                    <form
                        class="tool-form"
                        data-tool-form="ai"
                    >

                        <label>
                            WHAT DO YOU NEED AI FOR?
                        </label>

                        <select
                            name="purpose"
                            required
                        >

                            <option value="">
                                Choose one
                            </option>

                            <option value="school">
                                School
                            </option>

                            <option value="business">
                                Business
                            </option>

                            <option value="content">
                                Content Creation
                            </option>

                            <option value="design">
                                Design
                            </option>

                            <option value="coding">
                                Coding
                            </option>

                        </select>


                        <button
                            type="submit"
                        >
                            Find Tools →
                        </button>

                    </form>

                `;

            }


            return "";

        }


        /* =================================================
           TOOL CARD BUTTONS
        ================================================= */

        toolCards.forEach(
            function (card) {

                var button =
                    card.querySelector(
                        ".tool-launch"
                    );


                if (!button) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function () {

                        var toolType =
                            card.getAttribute(
                                "data-tool"
                            );


                        openToolModal(
                            toolType
                        );

                    }
                );

            }
        );


        /* =================================================
           TOOL FORM PROCESSING
        ================================================= */

        if (modalContent) {

            modalContent.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    var form =
                        event.target;


                    var formType =
                        form.getAttribute(
                            "data-tool-form"
                        );


                    var result =
                        generateToolResult(
                            formType,
                            form
                        );


                    var oldResult =
                        modalContent.querySelector(
                            ".tool-result"
                        );


                    if (oldResult) {

                        oldResult.remove();

                    }


                    var resultBox =
                        document.createElement(
                            "div"
                        );


                    resultBox.className =
                        "tool-result";


                    resultBox.innerHTML =
                        result;


                    modalContent.appendChild(
                        resultBox
                    );

                }
            );

        }


        /* =================================================
           TOOL RESULTS
        ================================================= */

        function generateToolResult(
            type,
            form
        ) {


            if (
                type === "business"
            ) {

                var interest =
                    form.elements.interest.value.trim();

                var skill =
                    form.elements.skill.value.trim();


                return `

                    <strong>
                        YOUR DIRECTION
                    </strong>

                    <br><br>

                    Build a small
                    <strong>
                        ${escapeHTML(interest)}
                    </strong>
                    focused service or content business
                    using your
                    <strong>
                        ${escapeHTML(skill)}
                    </strong>
                    skill.

                    <br><br>

                    <strong>
                        FIRST MOVE:
                    </strong>

                    Create one simple offer,
                    show the result publicly,
                    and talk to potential customers.

                `;

            }


            if (
                type === "content"
            ) {

                var platform =
                    form.elements.platform.value;

                var topic =
                    form.elements.topic.value.trim();


                return `

                    <strong>
                        CONTENT DIRECTION
                    </strong>

                    <br><br>

                    On
                    <strong>
                        ${escapeHTML(platform)}
                    </strong>,
                    create a short piece of content around:

                    <br><br>

                    <strong>
                        "${escapeHTML(topic)}"
                    </strong>

                    <br><br>

                    Try this structure:

                    <br>

                    <strong>
                        HOOK → VALUE → EXAMPLE → ACTION
                    </strong>

                `;

            }


            if (
                type === "roadmap"
            ) {

                var goal =
                    form.elements.goal.value.trim();

                var skill =
                    form.elements.skill.value.trim();


                return `

                    <strong>
                        YOUR HUSTLE ROADMAP
                    </strong>

                    <br><br>

                    <strong>
                        STEP 1:
                    </strong>
                    Define your
                    ${escapeHTML(goal)}
                    clearly.

                    <br><br>

                    <strong>
                        STEP 2:
                    </strong>
                    Improve your
                    ${escapeHTML(skill)}
                    skill.

                    <br><br>

                    <strong>
                        STEP 3:
                    </strong>
                    Build a small project.

                    <br><br>

                    <strong>
                        STEP 4:
                    </strong>
                    Put it in front of real people.

                    <br><br>

                    <strong>
                        STEP 5:
                    </strong>
                    Improve based on feedback.

                `;

            }


            if (
                type === "ai"
            ) {

                var purpose =
                    form.elements.purpose.value;


                var suggestions = {

                    school:
                        "ChatGPT, Gemini, NotebookLM and Perplexity",

                    business:
                        "ChatGPT, Claude, Gemini and Perplexity",

                    content:
                        "ChatGPT, Claude, Canva AI and CapCut AI",

                    design:
                        "Canva AI, Adobe Firefly and ChatGPT",

                    coding:
                        "ChatGPT, GitHub Copilot, Claude and Gemini"

                };


                return `

                    <strong>
                        AI STARTING POINT
                    </strong>

                    <br><br>

                    For
                    <strong>
                        ${escapeHTML(purpose)}
                    </strong>,
                    explore:

                    <br><br>

                    ${escapeHTML(
                        suggestions[purpose] ||
                        "ChatGPT and other general AI assistants"
                    )}

                    <br><br>

                    Start with one tool,
                    learn its workflow,
                    then add another only when necessary.

                `;

            }


            return `
                Your result will appear here.
            `;

        }


        /* =================================================
           ESCAPE HTML
        ================================================= */

        function escapeHTML(
            value
        ) {

            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        /* =================================================
           MODAL CLOSE
        ================================================= */

        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeToolModal
            );

        }


        if (toolModal) {

            var modalOverlay =
                toolModal.querySelector(
                    ".modal-overlay"
                );


            if (modalOverlay) {

                modalOverlay.addEventListener(
                    "click",
                    closeToolModal
                );

            }

        }


        /* =================================================
           GOMEZ DIGITAL LINK
        ================================================= */

        var agencyLink =
            document.querySelector(
                ".agency-link"
            );


        if (agencyLink) {

            agencyLink.addEventListener(
                "click",
                function () {

                    showNotification(
                        "Opening Gomez Digital..."
                    );

                }
            );

        }


        /* =================================================
           KEYBOARD ACCESSIBILITY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Tab"
                ) {

                    document.body.classList.add(
                        "keyboard-user"
                    );

                }

            }
        );


    });


})();
