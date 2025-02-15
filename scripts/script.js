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

    // Audio Players
    const players = document.querySelectorAll('.custom-player');
    players.forEach(player => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const progress = player.querySelector('.progress');
        const timeDisplay = player.querySelector('.time');

        // Play/Pause
        playBtn.addEventListener('click', () => {
            const icon = playBtn.querySelector('i');
            if (audio.paused) {
                audio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                audio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });

        // Update Progress
        audio.addEventListener('timeupdate', () => {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Update time display
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        });
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

    // Form Validation e Submit
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animação de envio
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simular envio (substitua por sua lógica de envio real)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            }, 2000);
        }, 1500);
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

// Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    const langSwitcher = document.getElementById('switcher-lang');
    const langOptions = document.querySelector('.lang-options');
    const langOptionBtns = document.querySelectorAll('.lang-option');
    
    // Toggle dropdown
    langSwitcher.addEventListener('click', () => {
        langOptions.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-switcher-container')) {
            langOptions.classList.remove('show');
        }
    });

    function loadTranslation(lang) {
        // Update button content
        const flagSrc = lang === 'en' ? 'assets/united-kingdom.png' : 'assets/brazil.png';
        const langText = lang === 'en' ? 'EN' : 'PT-BR';
        langSwitcher.innerHTML = `
            <img src="${flagSrc}" alt="${langText} flag" class="flag-icon">
            <span>${langText}</span>
        `;

        // Load translations
        fetch("./translations/translation.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.querySelectorAll("[data-translate]").forEach(element => {
                    const key = element.getAttribute("data-translate");
                    if (data[lang] && data[lang][key]) {
                        element.textContent = data[lang][key];
                    } else {
                        console.warn(`Missing translation for key "${key}" in language "${lang}"`);
                    }
                });
                localStorage.setItem("selectedLanguage", lang);
                langOptions.classList.remove('show'); // Close dropdown after selection
            })
            .catch(error => {
                console.error("Translation error:", error);
                alert("Error loading translations. Please try again later.");
            });
    }

    // Initialize language
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    loadTranslation(savedLanguage);

    // Handle language option clicks
    langOptionBtns.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-value');
            loadTranslation(lang);
        });
    });
});