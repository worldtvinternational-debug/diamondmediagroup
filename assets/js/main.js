/*=========================================================
  DIAMOND MEDIA GROUP V2
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
      SHRINK NAVBAR
    =====================================================*/

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (window.scrollY > 80) {

            navbar.classList.add("shadow");

            navbar.style.padding = "10px 0";

            navbar.style.background =
                "rgba(5,10,18,.95)";

        } else {

            navbar.classList.remove("shadow");

            navbar.style.padding = "18px 0";

            navbar.style.background =
                "rgba(5,10,18,.82)";

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);


    /*=====================================================
      COUNTERS
    =====================================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 80));

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent = current;

            }, 25);

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /*=====================================================
      FADE IN
    =====================================================*/

    const animatedItems = document.querySelectorAll(
        ".feature-box,.counter-card,.timeline-item,.brand-card,.video-card,.story-image,.snofm-feature img,.mission,.cta-section"
    );

    animatedItems.forEach(item => {

        item.classList.add("fade-up");

    });

    const fadeObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    animatedItems.forEach(item => {

        fadeObserver.observe(item);

    });


    /*=====================================================
      ACTIVE NAV LINKS
    =====================================================*/

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".navbar .nav-link");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href && href.includes("#" + current)) {

                link.classList.add("active");

            }

        });

    });


    /*=====================================================
      BACK TO TOP BUTTON
    =====================================================*/

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className = "back-to-top";

    document.body.appendChild(topButton);

    topButton.style.cssText = `
        position:fixed;
        bottom:25px;
        right:25px;
        width:52px;
        height:52px;
        border:none;
        border-radius:50%;
        background:#d4af37;
        color:#111;
        font-size:22px;
        cursor:pointer;
        display:none;
        z-index:9999;
        transition:.3s;
        box-shadow:0 10px 30px rgba(0,0,0,.4);
    `;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /*=====================================================
      IMAGE HOVER PARALLAX
    =====================================================*/

    document.querySelectorAll(".hero-portrait").forEach(image => {

        image.addEventListener("mousemove", e => {

            const rect = image.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width;

            const y = (e.clientY - rect.top) / rect.height;

            image.style.transform =
                `rotateY(${(x - 0.5) * 8}deg)
                 rotateX(${(0.5 - y) * 8}deg)
                 scale(1.02)`;

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform = "";

        });

    });

});
/* ==========================================
   PROJECTS VIDEO SHOWCASE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const player = document.getElementById("featuredVideo");
    const buttons = document.querySelectorAll(".video-thumb");

    if (!player || buttons.length === 0) return;

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            // Remove active class
            buttons.forEach(btn => btn.classList.remove("active"));

            // Highlight selected button
            this.classList.add("active");

            // Get YouTube video ID
            const videoId = this.dataset.video;

            // Load selected video
            player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        });

    });

});
// Production Showcase

const featuredVideo = document.getElementById("featuredVideo");

const videoButtons = document.querySelectorAll(".video-thumb");

videoButtons.forEach(button => {

    button.addEventListener("click", function () {

        const video = this.dataset.video;

        featuredVideo.src =
            `https://www.youtube.com/embed/${video}`;

        videoButtons.forEach(btn =>
            btn.classList.remove("active"));

        this.classList.add("active");

    });

});