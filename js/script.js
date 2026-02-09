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

    menuItems[0].classList.add('active');

    toggleBtn.onclick = function() {
        dropBoxMenu.classList.toggle('open')
        const isOpen = dropBoxMenu.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
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
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rafId = null;

    const commit = () => {
        rafId = null;
        root.style.setProperty("--x", `${x}px`);
        root.style.setProperty("--y", `${y}px`);
    };

    const onMove = (e) => {
        x = e.clientX;
        y = e.clientY;
        if (rafId === null) rafId = requestAnimationFrame(commit);
    };

    root.style.setProperty("--x", `${x}px`);
    root.style.setProperty("--y", `${y}px`);

    window.addEventListener("pointermove", onMove, { passive: true });
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
