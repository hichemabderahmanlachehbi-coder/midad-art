window.addEventListener("load", () => {
        gsap.registerPlugin(ScrollTrigger);

        /* قائمة الهاتف (Mobile menu) */
        const navToggle = document.getElementById("navToggle");
        const navLinks = document.getElementById("navLinks");
        if (navToggle && navLinks) {
          navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            document.body.style.overflow = isOpen ? "hidden" : "";
          });
          navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
              navLinks.classList.remove("open");
              navToggle.classList.remove("open");
              navToggle.setAttribute("aria-expanded", "false");
              document.body.style.overflow = "";
            });
          });
        }

        const namePath = document.getElementById("namePath");
        const loaderPath = document.getElementById("loaderPath");
        [namePath, loaderPath].forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len;
          p.style.strokeDashoffset = len;
        });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(loaderPath, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power1.inOut",
        })
          .to(
            "#loader",
            { opacity: 0, duration: 0.6, pointerEvents: "none" },
            "+=.3",
          )
          .fromTo(
            namePath,
            { strokeDashoffset: namePath.getTotalLength() },
            { strokeDashoffset: 0, duration: 1.6, ease: "power1.inOut" },
            "-=.3",
          )
          .to(
            "#midadEn",
            { opacity: 1, textIndent: "0", duration: 1, ease: "power2.out" },
            "-=.3",
          )
          .to("#heroQuote", { opacity: 1, duration: 1 }, "-=.4")
          .to("#rotator", { opacity: 1, duration: 0.8 })
          .to("#heroCta", { opacity: 1, duration: 0.8 }, "-=.2")
          .to("#scrollHint", { opacity: 1, duration: 0.8 }, "-=.4");

        const headlines = [
          "فن الخط العربي بروح الطبيعة",
          "آياتٌ تتجلّى… وصورٌ تروي إعجاز الخالق",
          "صانع محتوى يجمع بين القلم والعدسة",
        ];
        let hi = 0;
        const rotator = document.getElementById("rotator");
        function cycleHeadline() {
          const cur = rotator.querySelector(".rotator-item");
          const next = document.createElement("div");
          next.className = "rotator-item";
          hi = (hi + 1) % headlines.length;
          next.textContent = headlines[hi];
          next.style.transform = "translateY(100%)";
          next.style.opacity = "0";
          rotator.appendChild(next);
          gsap.to(cur, {
            y: -16,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => cur.remove(),
          });
          gsap.to(next, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
          });
        }
        setInterval(cycleHeadline, 4200);

        gsap.to("#heroBg", {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".bigframe img", {
          y: "-8%",
          ease: "none",
          scrollTrigger: {
            trigger: ".bigframe",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        document.querySelectorAll("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          );
        });

        const spine = document.getElementById("spinePath");
        const slen = spine.getTotalLength();
        spine.style.strokeDasharray = slen;
        spine.style.strokeDashoffset = slen;
        gsap.to(spine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".story",
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        });

        document.querySelectorAll(".stat").forEach((stat) => {
          const target = +stat.dataset.count;
          const num = stat.querySelector(".num");
          ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            once: true,
            onEnter: () =>
              gsap.to(
                { v: 0 },
                {
                  v: target,
                  duration: 2,
                  ease: "power1.out",
                  onUpdate: function () {
                    num.textContent = Math.round(this.targets()[0].v);
                  },
                },
              ),
          });
        });

        gsap.to("#progress", {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        const glow = document.getElementById("glow");
        window.addEventListener("mousemove", (e) => {
          gsap.to(glow, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        /* في حال لم تُرفع صورة بعد، اعرض بديلاً أنيقاً بدل أيقونة الصورة المكسورة */
        document.querySelectorAll("img").forEach((img) => {
          img.addEventListener("error", () => {
            img.classList.add("img-fallback");
          });
        });
      });
