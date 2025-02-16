// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    // Cursor Personalizado
    const cursor = document.querySelector('.raccoon-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Menu Mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

   

    // Scroll Animation
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

   
    // Easter Eggs
    let konami = '';
    const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
    
    document.addEventListener('keydown', (e) => {
        konami += e.key;
        if (konami.includes(konamiCode)) {
            document.body.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                document.body.style.transform = 'none';
            }, 1000);
            konami = '';
        }
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            button.innerHTML = '<i class="fas fa-check"></i>';
            input.value = 'Thanks for subscribing!';
            input.disabled = true;
            
            setTimeout(() => {
                input.value = '';
                input.disabled = false;
                button.innerHTML = '<i class="fas fa-arrow-right"></i>';
            }, 3000);
        });
    }

    // Shapes Animation
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        setInterval(() => {
            const x = Math.random() * 10 - 5;
            const y = Math.random() * 10 - 5;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        }, 2000);
    });
});


const logoHeader = document.getElementById('lopo-header');
logoHeader.addEventListener('click', () => {
    window.location.reload();
});

logoHeader.addEventListener('mouseover', () => {
    logoHeader.style.cursor = 'pointer';
});


