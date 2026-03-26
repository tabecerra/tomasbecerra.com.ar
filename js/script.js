(() => {
    const root = document.documentElement;
    root.classList.add("js");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            root.classList.add("page-loaded");
        });
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("ul li");
    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            menuItems.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const toggleBtn = document.querySelector('.toggle-btn')
    const toggleBtnIcon = document.querySelector('.toggle-btn i')
    const dropBoxMenu = document.querySelector('.dropbox-menu')

    if (menuItems.length > 0) {
        menuItems[0].classList.add('active');
    }

    if (toggleBtn && toggleBtnIcon && dropBoxMenu) {
        toggleBtn.onclick = function () {
            dropBoxMenu.classList.toggle('open')
            const isOpen = dropBoxMenu.classList.contains('open')
            toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
        }
    }

    const glassNavLinks = document.querySelectorAll('.glass-nav__item[href^="#"]');
    const glassSections = ["home", "about", "projects"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const syncGlassNavActive = () => {
        const offset = 96;
        const y = window.scrollY + offset;
        let activeId = "home";
        for (const sec of glassSections) {
            if (sec.offsetTop <= y) activeId = sec.id;
        }
        glassNavLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            link.classList.toggle("is-active", href === `#${activeId}`);
        });
    };

    if (glassNavLinks.length > 0 && glassSections.length > 0) {
        window.addEventListener("scroll", syncGlassNavActive, { passive: true });
        syncGlassNavActive();
    }
});

document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const menuItems = document.querySelectorAll("ul li");

    menuItems.forEach((item) => {
        item.classList.remove("active");
    });

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
            const id = section.getAttribute("id");
            const navItem = document.querySelector(`li a[href="#${id}"]`);
            if (navItem) {
                navItem.parentElement.classList.add("active");
            }
        }
    });
});

(() => {
    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const smoothing = 0.05;

    const commit = () => {
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;

        root.style.setProperty("--x", `${currentX}px`);
        root.style.setProperty("--y", `${currentY}px`);

        requestAnimationFrame(commit);
    };

    const onMove = (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    };

    root.style.setProperty("--x", `${currentX}px`);
    root.style.setProperty("--y", `${currentY}px`);

    window.addEventListener("pointermove", onMove, { passive: true });

    requestAnimationFrame(commit);
})();

(() => {
    const numbers = Array.from(document.querySelectorAll(".stat-number"));
    if (numbers.length === 0) return;

    const reduceMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const parseStat = (raw) => {
        const text = String(raw || "").trim();
        const match = text.match(/^([\d.,]+)\s*([kKmMbB]?)\s*(\+?)$/);
        if (!match) return null;

        const numStr = match[1].replace(",", ".");
        const unit = match[2];
        const plus = match[3];

        const target = Number.parseFloat(numStr);
        if (!Number.isFinite(target)) return null;

        const decimals = (numStr.split(".")[1] || "").length;
        return { target, decimals, unit, plus };
    };

    const format = (value, decimals, unit, plus) => {
        const fixed = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
        return `${fixed}${unit}${plus}`;
    };

    const animateCount = (el, spec) => {
        const { target, decimals, unit, plus } = spec;
        const durationMs = 2000;
        const start = performance.now();

        const startValue = 0;
        el.textContent = format(startValue, decimals, unit, plus);

        const tick = (now) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = startValue + (target - startValue) * eased;
            el.textContent = format(current, decimals, unit, plus);
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = format(target, decimals, unit, plus);
        };

        requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                if (el.dataset.animated === "1") return;
                const spec = parseStat(el.textContent);
                if (!spec) return;
                el.dataset.animated = "1";
                animateCount(el, spec);
            });
        },
        { threshold: 0.35 }
    );

    numbers.forEach((n) => io.observe(n));
})();

(() => {
    const el = document.getElementById("subtitle-dynamic");
    if (!el) return;

    const reduceMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const phrases = ["Handball player", "AI enthusiast", "Chess player"];
    if (reduceMotion) {
        el.textContent = phrases[0];
        return;
    }

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const typeSpeedMs = 55;
    const deleteSpeedMs = 32;
    const holdMs = 900;

    const tick = () => {
        const full = phrases[phraseIdx];

        if (!deleting) {
            charIdx = Math.min(full.length, charIdx + 1);
            el.textContent = full.slice(0, charIdx);
            if (charIdx >= full.length) {
                deleting = true;
                setTimeout(tick, holdMs);
                return;
            }
            setTimeout(tick, typeSpeedMs);
            return;
        }

        charIdx = Math.max(0, charIdx - 1);
        el.textContent = full.slice(0, charIdx);
        if (charIdx <= 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(tick, 200);
            return;
        }
        setTimeout(tick, deleteSpeedMs);
    };

    tick();
})();
