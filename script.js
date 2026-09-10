       // Défilement volontairement plus lent pour les liens de navigation.
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        event.preventDefault();

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + window.scrollY - 90;
        const distance = end - start;
        const duration = 1500;
        const startTime = performance.now();

        const easeInOut = t => t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const animateScroll = now => {
            const progress = Math.min((now - startTime) / duration, 1);
            window.scrollTo(0, start + distance * easeInOut(progress));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    });
});

// Les sections et blocs gagnent légèrement en opacité lorsqu'ils entrent dans la zone de lecture.
const revealTargets = document.querySelectorAll(
    'section, .competence-card, .experience-card, .formation-card, .langue, .interet'
);

revealTargets.forEach(element => element.classList.add('reveal-on-scroll'));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
}, {
    threshold: 0.12,
    rootMargin: '-8% 0px -8% 0px'
});

revealTargets.forEach(element => observer.observe(element));