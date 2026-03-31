// =============================================
// OPERA CREATIVES — Premium Effects Engine
// =============================================

(function () {
    'use strict';

    // =============================================
    // 0. SPLASH SCREEN — The Grand Overture (Premium)
    // =============================================
    const splash = document.getElementById('splash');
    const splashSkip = document.getElementById('splashSkip');

    const dismissSplash = () => {
        if (!splash || splash.classList.contains('fade-out')) return;
        splash.classList.add('fade-out');
        // After slide-down transition, remove DOM + start hero animations
        setTimeout(() => {
            if (splash.parentNode) splash.parentNode.removeChild(splash);
            startHeroAnimations();
        }, 1500);
    };

    // Premium brands don't rush — 4 second reveal
    const splashTimer = setTimeout(dismissSplash, 4000);

    if (splashSkip) {
        splashSkip.addEventListener('click', () => {
            clearTimeout(splashTimer);
            dismissSplash();
        });
    }
    // =============================================
    // 2b. MAGNETIC BUTTONS (#2)
    // =============================================
    const initMagneticButtons = () => {
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * 0.22;
                const dy = (e.clientY - cy) * 0.22;
                btn.style.transform = `translate(${dx}px, ${dy}px)`;
                btn.style.transition = 'transform 0.15s ease-out';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });
    };

    // =============================================
    // 2c. BUTTON CLICK RIPPLE (#7)
    // =============================================
    const initButtonRipple = () => {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    };

    initMagneticButtons();
    initButtonRipple();

    // =============================================
    // 4. ENHANCED PARALLAX DEPTH LAYERS (#3)
    // =============================================
    const initEnhancedParallax = () => {
        const mid = document.getElementById('parallaxMid');
        const far = document.getElementById('parallaxFar');
        if (!mid || !far) return;
        document.addEventListener('mousemove', (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;
            mid.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
            far.style.transform = `translate(${dx * 3}px, ${dy * 3}px)`;
        });
    };

    // =============================================
    // 5. SUBTLE PAGE TILT (#9)
    // =============================================
    const initPageTilt = () => {
        const tiltEl = document.querySelector('.hero-content');
        if (!tiltEl) return;
        let tiltActive = true;
        document.addEventListener('mousemove', (e) => {
            if (!tiltActive) return;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const rx = -((e.clientY - cy) / cy) * 0.9;
            const ry =  ((e.clientX - cx) / cx) * 0.9;
            tiltEl.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        document.addEventListener('mouseleave', () => {
            tiltEl.style.transform = '';
        });
        // Disable tilt when booking form is open to avoid layout issues
        document.getElementById('btnBookCall')?.addEventListener('click',  () => { tiltActive = false; tiltEl.style.transform = ''; });
        document.getElementById('btnCloseForm')?.addEventListener('click', () => { tiltActive = true; });
    };

    // =============================================
    // 6. EASTER EGG — press "o" twice (#8)
    // =============================================
    const initEasterEgg = () => {
        const overlay = document.getElementById('easterEgg');
        if (!overlay) return;
        let keyHistory = '';
        document.addEventListener('keydown', (e) => {
            keyHistory += e.key.toLowerCase();
            keyHistory = keyHistory.slice(-2);
            if (keyHistory === 'oo') {
                overlay.classList.add('active');
                overlay.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                    overlay.classList.remove('active');
                    overlay.setAttribute('aria-hidden', 'true');
                }, 3200);
            }
        });
        // Also dismiss on click
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
        });
    };

    initEnhancedParallax();
    initPageTilt();
    initEasterEgg();

    // Body starts at opacity:0 (inline style in HTML).
    // We wait for everything to load, then fade it in.
    const revealPage = () => {
        document.body.style.opacity = '1';
    };

    // Reveal as soon as background image is ready
    const bgImg = new Image();
    const bgUrl = getComputedStyle(document.body).backgroundImage.slice(5, -2);
    bgImg.onload = revealPage;
    bgImg.onerror = revealPage; // Reveal even if image fails
    bgImg.src = bgUrl;
    // Safety fallback — reveal after 1.5s no matter what
    setTimeout(revealPage, 1500);


    // =============================================
    // 2. HERO ANIMATIONS — fire after splash ends
    // =============================================
    const startHeroAnimations = () => {
        // 4. Navbar slides in from edges
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('entered');

        // Footer fades up after hero settles
        const footer = document.getElementById('siteFooter');
        if (footer) setTimeout(() => footer.classList.add('entered'), 900);

        // Timeline bar at very bottom (#D)
        const timeline = document.getElementById('timelineBar');
        if (timeline) setTimeout(() => timeline.classList.add('entered'), 1200);

        // Accent line expand from center (#2)
        setTimeout(() => {
            document.getElementById('accentTop')?.classList.add('entered');
        }, 300);

        // 8. Word-by-word headline stagger
        const words = document.querySelectorAll('.word');
        words.forEach((w, i) => {
            setTimeout(() => w.classList.add('show'), 100 + i * 95);
        });

        // CTA button fades up after words (6 words × 95ms ≈ 670ms)
        const cta = document.querySelector('.btn-primary.reveal');
        if (cta) setTimeout(() => cta.classList.add('visible'), 820);

        // Scarcity indicator fades up right after CTA
        const scarcity = document.querySelector('.scarcity-indicator.reveal');
        if (scarcity) setTimeout(() => scarcity.classList.add('visible'), 1020);

        // Typewriter starts once headline is settling in
        const typer = document.getElementById('subtextTyper');
        if (typer) {
            const text = 'The art of the ad, with the speed of AI.';
            let i = 0;
            setTimeout(() => {
                const interval = setInterval(() => {
                    typer.textContent = text.slice(0, i + 1);
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                        setTimeout(() => typer.classList.add('done'), 1500);
                    }
                }, 45);
            }, 500);
        }
    };

    // If there's no splash (e.g., already removed), start immediately
    if (!splash) startHeroAnimations();


    // =============================================
    // 4. BOKEH / FLOATING PARTICLES
    // =============================================
    const initBokeh = () => {
        const canvas = document.getElementById('bokehCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Warm-toned particle colors matching the brand
        const colors = [
            'rgba(232, 168, 152, ',  // Rose #E8A898
            'rgba(255, 179, 177, ',  // Soft pink
            'rgba(200, 140, 120, ',  // Warm tan
            'rgba(255, 220, 210, ',  // Cream
            'rgba(160, 100, 80, ',   // Deep warm
        ];

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.radius = Math.random() * 3 + 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.17 + 0.08;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.2 - 0.1; // Slight upward drift
                this.pulseSpeed = Math.random() * 0.008 + 0.003;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.blur = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulsePhase += this.pulseSpeed;

                // Wrap around
                if (this.x < -20) this.x = w + 20;
                if (this.x > w + 20) this.x = -20;
                if (this.y < -20) this.y = h + 20;
                if (this.y > h + 20) this.y = -20;
            }

            draw() {
                const pulsedOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulsePhase));
                ctx.save();
                ctx.filter = `blur(${this.blur}px)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + pulsedOpacity + ')';
                ctx.fill();
                ctx.restore();
            }
        }

        // Create particles — enough for ambience, not overwhelming
        const particles = Array.from({ length: 40 }, () => new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    };

    initBokeh();


    // =============================================
    // 5. MOUSE PARALLAX ON BACKGROUND
    // =============================================
    const initParallax = () => {
        const body = document.body;
        const intensity = 15; // Max pixel shift

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            // Normalize mouse position to -1 to 1
            const normX = (e.clientX / window.innerWidth - 0.5) * 2;
            const normY = (e.clientY / window.innerHeight - 0.5) * 2;
            targetX = -normX * intensity;
            targetY = -normY * intensity;
        });

        const lerp = (a, b, t) => a + (b - a) * t;

        const updateParallax = () => {
            // Smooth interpolation for buttery movement
            currentX = lerp(currentX, targetX, 0.04);
            currentY = lerp(currentY, targetY, 0.04);
            body.style.backgroundPosition = `calc(50% + ${currentX}px) calc(50% + ${currentY}px)`;
            requestAnimationFrame(updateParallax);
        };

        updateParallax();
    };

    initParallax();

    // =============================================
    // 3. BOOKING FORM REVEAL ("SILENT CLICK" #3)
    // =============================================
    const btnBookCall = document.getElementById('btnBookCall');
    const btnCloseForm = document.getElementById('btnCloseForm');
    const heroIntroText = document.getElementById('heroIntroText');
    const bookingFormWrapper = document.getElementById('bookingFormWrapper');

    if (btnBookCall && btnCloseForm && heroIntroText && bookingFormWrapper) {
        btnBookCall.addEventListener('click', () => {
            heroIntroText.classList.add('fade-out');
            bookingFormWrapper.classList.add('visible');
        });

        btnCloseForm.addEventListener('click', () => {
            bookingFormWrapper.classList.remove('visible');
            heroIntroText.classList.remove('fade-out');
        });
    }

    // =============================================
    // TRANSITION #2 — LINK BLOOM SHUTTER
    // =============================================
    (() => {
        const bloom = document.getElementById('pageBloom');
        if (!bloom) return;
        document.querySelectorAll('a[href^="http"], a[href^="mailto"], a[href^="tel"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.href;
                const target = link.target;
                bloom.classList.add('flash');
                setTimeout(() => {
                    bloom.classList.remove('flash');
                    if (target === '_blank') window.open(href, '_blank', 'noopener,noreferrer');
                    else window.location.href = href;
                }, 220);
            });
        });
    })();

    // =============================================
    // TRANSITION #3 — STAGGERED FORM INPUTS
    // =============================================
    (() => {
        const bookBtn    = document.getElementById('btnBookCall');
        const closeBtn   = document.getElementById('btnCloseForm');
        const formGroups = document.querySelectorAll('.form-group');
        if (!bookBtn || !formGroups.length) return;
        const revealInputs = () => {
            formGroups.forEach((group, i) => {
                setTimeout(() => group.classList.add('revealed'), 400 + i * 130);
            });
        };
        const hideInputs = () => {
            formGroups.forEach(group => group.classList.remove('revealed'));
        };
        bookBtn.addEventListener('click', revealInputs);
        if (closeBtn) closeBtn.addEventListener('click', hideInputs);
    })();

})();
