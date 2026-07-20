// =========================================================
//  Peter Njuguna — Portfolio  (Editorial Minimal / "1c")
// =========================================================

const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const typingText = document.getElementById('typingText');

// ---------- Rotating role line ----------
const roles = [
    'MERN Stack Developer',
    'Python AI Engineer',
    'Database Specialist',
    'Full-Stack Engineer'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
    if (!typingText) return;
    const current = roles[roleIndex];
    charIndex += isDeleting ? -1 : 1;
    typingText.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 45 : 90;
    if (!isDeleting && charIndex === current.length) {
        speed = 1800; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }
    setTimeout(typeWriter, speed);
}

// ---------- Header scroll state ----------
function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
}

// ---------- Mobile menu ----------
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    const open = mobileNav.classList.contains('active');
    icon.classList.toggle('fa-bars', !open);
    icon.classList.toggle('fa-times', open);
}

// ---------- Smooth scroll with header offset ----------
function smoothScroll(target) {
    const el = document.querySelector(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
}

// ---------- Animated counter ----------
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const increment = target / (duration / 16);
    (function update() {
        start += increment;
        if (start < target) {
            el.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    })();
}

// ---------- Skill bars ----------
function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
    });
}

// ---------- Project filtering ----------
function filterProjects(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
        const match = category === 'all' || card.getAttribute('data-category') === category;
        card.classList.toggle('hidden', !match);
    });
}

// ---------- Intersection Observer: reveals + triggers ----------
function createObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');

            if (entry.target.id === 'about') {
                document.querySelectorAll('.stat-number [data-target]').forEach(el => {
                    animateCounter(el, parseInt(el.getAttribute('data-target'), 10));
                });
            }
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.section').forEach(s => observer.observe(s));

    document.querySelectorAll('.service, .skill-category, .project-card, .contact-item')
        .forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 6) * 0.06}s`;
            observer.observe(el);
        });
}

// ---------- Form handling (Netlify) ----------
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="loading"></i> Sending…';
    btn.disabled = true;

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message sent';
        form.reset();
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3000);
    })
    .catch(() => {
        btn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Try again';
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3000);
    });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 900);
    createObserver();

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
            if (mobileNav.classList.contains('active')) toggleMobileMenu();
        });
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            filterProjects(this.getAttribute('data-filter'), this);
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) toggleMobileMenu();
    });
});
