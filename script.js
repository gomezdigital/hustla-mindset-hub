/* =========================================================
   HUSTLA MINDSET V5
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

        var menuBackdrop =
            document.getElementById("menuBackdrop");

        var yearEl =
            document.getElementById("year");

        var scrollProgress =
            document.getElementById("scrollProgress");

        var backToTop =
            document.getElementById("backToTop");

        var toolModal =
            document.getElementById("toolModal");

        var modalOverlay =
            document.getElementById("modalOverlay");

        var modalClose =
            document.getElementById("modalClose");

        var modalBox =
            toolModal
                ? toolModal.querySelector(".modal-box")
                : null;

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

        var communityButton =
            document.getElementById("communityButton");


        /* =================================================
           YEAR
        ================================================= */

        if (yearEl) {
            yearEl.textContent =
                new Date().getFullYear();
        }


        /* =================================================
           LOADER
        ================================================= */

        function hideLoader() {

            if (!loader) {
                return;
            }

            loader.classList.add("hidden");
        }

        window.addEventListener(
            "load",
            function () {

                setTimeout(
                    hideLoader,
                    250
                );

            },
            {
                once: true
            }
        );

        setTimeout(
            hideLoader,
            1800
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


        /* =================================================
           SCROLL PROGRESS
        ================================================= */

        function updateScrollProgress() {

            if (!scrollProgress) {
                return;
            }

            var scrollTop =
                window.scrollY;

            var documentHeight =
                document.documentElement.scrollHeight
                - window.innerHeight;

            if (documentHeight <= 0) {
                scrollProgress.style.width = "0%";
                return;
            }

            var percentage =
                (scrollTop / documentHeight) * 100;

            scrollProgress.style.width =
                Math.min(
                    percentage,
                    100
                ) + "%";
        }


        /* =================================================
           BACK TO TOP
        ================================================= */

        function updateBackToTop() {

            if (!backToTop) {
                return;
            }

            if (window.scrollY > 650) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }


        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        var sections =
            Array.prototype.slice.call(
                document.querySelectorAll(
                    "main section[id]"
                )
            );

        var navLinks =
            Array.prototype.slice.call(
                document.querySelectorAll(
                    ".navigation a[data-nav]"
                )
            );


        function updateActiveNavigation() {

            if (!sections.length) {
                return;
            }

            var currentId = "home";

            var activationPoint =
                window.scrollY + 180;

            sections.forEach(
                function (section) {

                    if (
                        activationPoint >=
                        section.offsetTop
                    ) {
                        currentId =
                            section.id;
                    }

                }
            );

            navLinks.forEach(
                function (link) {

                    var isActive =
                        link.getAttribute("data-nav")
                        === currentId;

                    link.classList.toggle(
                        "active",
                        isActive
                    );

                }
            );
        }


        /* =================================================
           MASTER SCROLL HANDLER
        ================================================= */

        function handleScroll() {

            updateHeader();
            updateScrollProgress();
            updateBackToTop();
            updateActiveNavigation();

        }

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );

        handleScroll();


        /* =================================================
           MOBILE MENU
        ================================================= */

        function openMenu() {

            if (
                !navigation ||
                !menuToggle
            ) {
                return;
            }

            navigation.classList.add("active");
            menuToggle.classList.add("active");

            if (menuBackdrop) {
                menuBackdrop.classList.add("active");
            }

            document.body.classList.add("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );
        }


        function closeMenu() {

            if (
                !navigation ||
                !menuToggle
            ) {
                return;
            }

            navigation.classList.remove("active");
            menuToggle.classList.remove("active");

            if (menuBackdrop) {
                menuBackdrop.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );
        }


        if (menuToggle) {

            menuToggle.addEventListener(
                "click",
                function () {

                    var isOpen =
                        navigation &&
                        navigation.classList.contains(
                            "active"
                        );

                    if (isOpen) {
                        closeMenu();
                    } else {
                        openMenu();
                    }

                }
            );

        }


        if (menuBackdrop) {

            menuBackdrop.addEventListener(
                "click",
                closeMenu
            );

        }


        if (navigation) {

            var navigationLinks =
                navigation.querySelectorAll(
                    "a"
                );

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


        /* =================================================
           SMOOTH SCROLL
        ================================================= */

        var anchorLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        anchorLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        var href =
                            link.getAttribute("href");

                        if (
                            !href ||
                            href === "#"
                        ) {
                            return;
                        }

                        var target =
                            document.querySelector(
                                href
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
                            target.getBoundingClientRect().top
                            + window.scrollY
                            - headerHeight
                            - 10;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth"
                        });

                        closeMenu();

                    }
                );

            }
        );


        /* =================================================
           BACK TO TOP ACTION
        ================================================= */

        if (backToTop) {

            backToTop.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        var revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            var revealObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    revealObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: .12,
                        rootMargin: "0px 0px -40px 0px"
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

            clearTimeout(
                notificationTimer
            );

            notificationTimer =
                setTimeout(
                    function () {

                        notification.classList.remove(
                            "show"
                        );

                    },
                    3200
                );
        }


        /* =================================================
           EXPLORE CARDS
        ================================================= */

        var exploreCards =
            document.querySelectorAll(
                ".explore-card"
            );


        var categoryMessages = {

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

                        var message =
                            categoryMessages[
                                category
                            ] ||
                            "More Hustla Mindset content is coming soon.";

                        showNotification(
                            message
                        );

                    }
                );

            }
        );


        /* =================================================
           COMMUNITY
        ================================================= */

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
           FOOTER PLACEHOLDER LINKS
        ================================================= */

        var placeholderLinks =
            document.querySelectorAll(
                ".placeholder-link"
            );

        placeholderLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        var name =
                            link.getAttribute(
                                "data-placeholder"
                            ) ||
                            "Social media";

                        showNotification(
                            name +
                            " link will be added soon."
                        );

                    }
                );

            }
        );


        /* =================================================
           TOOL DATA
        ================================================= */

        var toolData = {

            business: {

                title:
                    "Business Idea Generator",

                description:
                    "Tell us what interests you and what you can do. We'll turn it into a practical business direction."

            },

            content: {

                title:
                    "Content Idea Generator",

                description:
                    "Choose your platform and topic to generate a simple content direction."

            },

            roadmap: {

                title:
                    "Hustle Roadmap",

                description:
                    "Give us your goal and a skill you're developing. We'll turn it into an action roadmap."

            },

            ai: {

                title:
                    "AI Tool Finder",

                description:
                    "Choose what you want AI to help you with and discover useful tools."

            }

        };


        /* =================================================
           ESCAPE HTML
        ================================================= */

        function escapeHTML(value) {

            return String(value || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        }


        /* =================================================
           TOOL FORM BUILDER
        ================================================= */

        function getToolForm(
            toolType
        ) {

            if (toolType === "business") {

                return `
                    <form
                        class="tool-form"
                        data-tool-form="business"
                    >

                        <label>
                            WHAT ARE YOU INTERESTED IN?
                            <input
                                type="text"
                                name="interest"
                                placeholder="e.g. fashion, technology, fitness"
                                required
                            >
                        </label>

                        <label>
                            WHAT SKILL DO YOU HAVE?
                            <input
                                type="text"
                                name="skill"
                                placeholder="e.g. design, selling, coding"
                                required
                            >
                        </label>

                        <button type="submit">
                            GENERATE IDEA →
                        </button>

                    </form>
                `;

            }


            if (toolType === "content") {

                return `
                    <form
                        class="tool-form"
                        data-tool-form="content"
                    >

                        <label>
                            PLATFORM
                            <select
                                name="platform"
                                required
                            >

                                <option value="">
                                    Select platform
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
                        </label>

                        <label>
                            TOPIC
                            <input
                                type="text"
                                name="topic"
                                placeholder="e.g. student money, fitness, AI"
                                required
                            >
                        </label>

                        <button type="submit">
                            GENERATE CONTENT →
                        </button>

                    </form>
                `;

            }


            if (toolType === "roadmap") {

                return `
                    <form
                        class="tool-form"
                        data-tool-form="roadmap"
                    >

                        <label>
                            YOUR GOAL
                            <input
                                type="text"
                                name="goal"
                                placeholder="e.g. start a web design business"
                                required
                            >
                        </label>

                        <label>
                            SKILL YOU ARE DEVELOPING
                            <input
                                type="text"
                                name="skill"
                                placeholder="e.g. HTML/CSS"
                                required
                            >
                        </label>

                        <button type="submit">
                            BUILD ROADMAP →
                        </button>

                    </form>
                `;

            }


            if (toolType === "ai") {

                return `
                    <form
                        class="tool-form"
                        data-tool-form="ai"
                    >

                        <label>
                            WHAT DO YOU WANT AI TO HELP WITH?
                            <select
                                name="purpose"
                                required
                            >

                                <option value="">
                                    Select purpose
                                </option>

                                <option value="school">
                                    School / Studying
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
                        </label>

                        <button type="submit">
                            FIND TOOLS →
                        </button>

                    </form>
                `;

            }

            return "";
        }


        /* =================================================
           MODAL FOCUS
        ================================================= */

        var lastFocusedElement = null;


        function getFocusableElements() {

            if (!modalBox) {
                return [];
            }

            return Array.prototype.slice.call(
                modalBox.querySelectorAll(
                    'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
                )
            ).filter(
                function (element) {

                    return !element.disabled &&
                           element.offsetParent !== null;

                }
            );

        }


        /* =================================================
           OPEN TOOL MODAL
        ================================================= */

        function openToolModal(
            toolType,
            triggerElement
        ) {

            if (
                !toolModal ||
                !modalTitle ||
                !modalDescription ||
                !modalContent
            ) {
                return;
            }

            var data =
                toolData[toolType];

            if (!data) {
                return;
            }

            lastFocusedElement =
                triggerElement ||
                document.activeElement;

            modalTitle.textContent =
                data.title;

            modalDescription.textContent =
                data.description;

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
                    "input, select, button"
                );

            if (firstInput) {

                setTimeout(
                    function () {
                        firstInput.focus();
                    },
                    50
                );

            }

        }


        /* =================================================
           CLOSE TOOL MODAL
        ================================================= */

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

            if (
                lastFocusedElement &&
                typeof lastFocusedElement.focus === "function"
            ) {

                lastFocusedElement.focus();

            }

        }


        /* =================================================
           TOOL LAUNCH BUTTONS
        ================================================= */

        var toolLaunchButtons =
            document.querySelectorAll(
                ".tool-launch"
            );


        toolLaunchButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        var card =
                            button.closest(
                                ".tool-card"
                            );

                        if (!card) {
                            return;
                        }

                        var toolType =
                            card.getAttribute(
                                "data-tool"
                            );

                        openToolModal(
                            toolType,
                            button
                        );

                    }
                );

            }
        );


        /* =================================================
           TOOL FORM GENERATOR
        ================================================= */

        if (modalContent) {

            modalContent.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    var form =
                        event.target;

                    if (
                        !form.matches(
                            ".tool-form"
                        )
                    ) {
                        return;
                    }

                    var toolType =
                        form.getAttribute(
                            "data-tool-form"
                        );

                    var formData =
                        new FormData(form);

                    var result =
                        generateToolResult(
                            toolType,
                            formData
                        );

                    var oldResult =
                        modalContent.querySelector(
                            ".tool-result"
                        );

                    if (oldResult) {
                        oldResult.remove();
                    }

                    var resultElement =
                        document.createElement(
                            "div"
                        );

                    resultElement.className =
                        "tool-result";

                    resultElement.innerHTML =
                        result;

                    modalContent.appendChild(
                        resultElement
                    );

                    resultElement.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                }
            );

        }


        /* =================================================
           TOOL RESULTS
        ================================================= */

        function generateToolResult(
            toolType,
            data
        ) {

            if (toolType === "business") {

                var interest =
                    escapeHTML(
                        data.get("interest")
                    );

                var skill =
                    escapeHTML(
                        data.get("skill")
                    );

                return `
                    <h3>Your Business Direction</h3>

                    <p>
                        Build around your interest in
                        <strong>${interest}</strong>
                        using your skill in
                        <strong>${skill}</strong>.
                    </p>

                    <p>
                        <strong>Possible direction:</strong>
                        A small digital service or product
                        that solves a clear problem for people
                        interested in ${interest}.
                    </p>

                    <p>
                        <strong>First move:</strong>
                        Find 5 people or businesses with a
                        problem in this area and ask what
                        they currently struggle with.
                    </p>
                `;
            }


            if (toolType === "content") {

                var platform =
                    escapeHTML(
                        data.get("platform")
                    );

                var topic =
                    escapeHTML(
                        data.get("topic")
                    );

                return `
                    <h3>Content Direction</h3>

                    <p>
                        <strong>Platform:</strong>
                        ${platform}
                    </p>

                    <p>
                        <strong>Topic:</strong>
                        ${topic}
                    </p>

                    <ul>

                        <li>
                            <strong>Hook:</strong>
                            "Nobody tells you this about ${topic}..."
                        </li>

                        <li>
                            <strong>Value:</strong>
                            Give 3 practical lessons or mistakes.
                        </li>

                        <li>
                            <strong>Example:</strong>
                            Show a real situation or simple demonstration.
                        </li>

                        <li>
                            <strong>Action:</strong>
                            Ask viewers to save or share the post.
                        </li>

                    </ul>
                `;
            }


            if (toolType === "roadmap") {

                var goal =
                    escapeHTML(
                        data.get("goal")
                    );

                var skill =
                    escapeHTML(
                        data.get("skill")
                    );

                return `
                    <h3>Your Hustle Roadmap</h3>

                    <p>
                        <strong>Goal:</strong>
                        ${goal}
                    </p>

                    <p>
                        <strong>Core skill:</strong>
                        ${skill}
                    </p>

                    <ol>

                        <li>
                            Learn the fundamentals.
                        </li>

                        <li>
                            Build one small practical project.
                        </li>

                        <li>
                            Publish your work publicly.
                        </li>

                        <li>
                            Get feedback and improve it.
                        </li>

                        <li>
                            Turn the skill into a service,
                            product or opportunity.
                        </li>

                    </ol>
                `;
            }


            if (toolType === "ai") {

                var purpose =
                    data.get("purpose");

                var tools = {

                    school: [
                        "ChatGPT",
                        "Gemini",
                        "NotebookLM",
                        "Perplexity"
                    ],

                    business: [
                        "ChatGPT",
                        "Claude",
                        "Gemini",
                        "Perplexity"
                    ],

                    content: [
                        "ChatGPT",
                        "Claude",
                        "Canva AI",
                        "CapCut AI"
                    ],

                    design: [
                        "Canva AI",
                        "Adobe Firefly",
                        "ChatGPT"
                    ],

                    coding: [
                        "ChatGPT",
                        "GitHub Copilot",
                        "Claude",
                        "Gemini"
                    ]

                };


                var selected =
                    tools[purpose] ||
                    [];


                var list =
                    selected.map(
                        function (tool) {

                            return `
                                <li>
                                    ${escapeHTML(tool)}
                                </li>
                            `;

                        }
                    ).join("");


                return `
                    <h3>AI Tools For You</h3>

                    <p>
                        Based on your selected use case,
                        these are useful categories of tools
                        to explore:
                    </p>

                    <ul>
                        ${list}
                    </ul>

                    <p>
                        <strong>Hustla move:</strong>
                        Don't collect tools. Pick one,
                        learn it properly and use it to
                        produce something useful.
                    </p>
                `;

            }


            return `
                <h3>Let's Build.</h3>
                <p>
                    Your result is being prepared.
                </p>
            `;

        }


        /* =================================================
           MODAL CLOSE BUTTON
        ================================================= */

        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeToolModal
            );

        }


        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                closeToolModal
            );

        }


        /* =================================================
           KEYBOARD CONTROLS
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMenu();
                    closeToolModal();

                }


                if (
                    event.key === "Tab" &&
                    toolModal &&
                    toolModal.classList.contains(
                        "active"
                    )
                ) {

                    var focusable =
                        getFocusableElements();

                    if (!focusable.length) {
                        return;
                    }

                    var first =
                        focusable[0];

                    var last =
                        focusable[
                            focusable.length - 1
                        ];

                    if (
                        event.shiftKey &&
                        document.activeElement === first
                    ) {

                        event.preventDefault();

                        last.focus();

                    } else if (
                        !event.shiftKey &&
                        document.activeElement === last
                    ) {

                        event.preventDefault();

                        first.focus();

                    }

                }

            }
        );


        /* =================================================
           KEYBOARD USER DETECTION
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Tab") {

                    document.body.classList.add(
                        "keyboard-user"
                    );

                }

            }
        );


        /* =================================================
           FINAL SAFETY
        ================================================= */

        window.addEventListener(
            "error",
            function (event) {

                /*
                 * Prevent a small front-end error from
                 * creating an unusable visible page.
                 */

                if (
                    event &&
                    event.message
                ) {

                    console.warn(
                        "Hustla Mindset:",
                        event.message
                    );

                }

            }
        );


    });

})();
