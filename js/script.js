document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // Ink Particle System - Floating ink motes
    // =========================================
    function createInkParticles() {
        const hero = document.getElementById('hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.classList.add('ink-particles');
        particleContainer.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 3;
            pointer-events: none;
            overflow: hidden;
        `;
        hero.appendChild(particleContainer);

        for (let i = 0; i < 20; i++) {
            createParticle(particleContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.3 + 0.05;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(184, 168, 154, ${opacity}), transparent);
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            animation: inkFloat ${duration}s ease-in-out ${delay}s infinite;
        `;
        container.appendChild(particle);
    }

    // Add the particle keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes inkFloat {
            0%, 100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0.1;
            }
            25% {
                transform: translateY(-40px) translateX(20px) scale(1.5);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-80px) translateX(-10px) scale(1);
                opacity: 0.15;
            }
            75% {
                transform: translateY(-30px) translateX(15px) scale(1.3);
                opacity: 0.25;
            }
        }
    `;
    document.head.appendChild(style);

    createInkParticles();
});
