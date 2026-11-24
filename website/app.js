/* GS Security Solutions - Custom Javascript Interactions & Dynamic Features */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Toast Notification Utility System
       ========================================================================== */
    const ensureToastContainer = () => {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    };

    window.showToast = (message, type = 'info') => {
        const container = ensureToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '<i class="fa-solid fa-circle-info"></i>';
        if (type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color:#00E676;"></i>';
        if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color:#FFB300;"></i>';
        
        toast.innerHTML = `${icon} <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    };


    /* ==========================================================================
       2. Startup Intro Animation (Security System Boot Initialization)
       ========================================================================== */
    const startupOverlay = document.getElementById('systemStartupOverlay');
    const startupProgressBar = document.getElementById('startupProgressBar');
    const startupPercent = document.getElementById('startupPercent');
    const startupTerminal = document.getElementById('startupTerminal');
    const startupSkipBtn = document.getElementById('startupSkipBtn');
    const replayStartupBtn = document.getElementById('replayStartupBtn');

    const bootSequenceLines = [
        "[KERNEL] Initializing GS Defense Protocol v4.2...",
        "[SURVEILLANCE] Connecting 15,480 CCTV nodes across Maharashtra... [OK]",
        "[AI-CORE] Optical motion analytics & night-vision sensors: ARMED",
        "[GS-APP] Secure Cloud telemetry handshake established (12ms ping)",
        "[STATUS] ALL SECURITY SYSTEMS OPERATIONAL. Welcome to GS Security Solutions."
    ];

    let startupInterval = null;

    const runStartupAnimation = () => {
        if (!startupOverlay) return;

        startupOverlay.classList.remove('hidden');
        if (startupProgressBar) startupProgressBar.style.width = '0%';
        if (startupPercent) startupPercent.textContent = '0%';
        if (startupTerminal) startupTerminal.innerHTML = '';

        let progress = 0;
        let lineIndex = 0;

        clearInterval(startupInterval);
        startupInterval = setInterval(() => {
            progress += 2;
            if (startupProgressBar) startupProgressBar.style.width = `${progress}%`;
            if (startupPercent) startupPercent.textContent = `${progress}%`;

            // Add terminal lines at intervals
            if (progress >= (lineIndex + 1) * 18 && lineIndex < bootSequenceLines.length) {
                if (startupTerminal) {
                    const line = document.createElement('div');
                    line.className = 'term-line active';
                    line.textContent = `> ${bootSequenceLines[lineIndex]}`;
                    startupTerminal.appendChild(line);
                    
                    // Remove highlight from previous
                    const prevLines = startupTerminal.querySelectorAll('.term-line');
                    if (prevLines.length > 1) {
                        prevLines[prevLines.length - 2].classList.remove('active');
                    }
                    startupTerminal.scrollTop = startupTerminal.scrollHeight;
                }
                lineIndex++;
            }

            if (progress >= 100) {
                clearInterval(startupInterval);
                setTimeout(() => {
                    closeStartupAnimation();
                }, 400);
            }
        }, 30);
    };

    const closeStartupAnimation = () => {
        clearInterval(startupInterval);
        if (startupOverlay) {
            startupOverlay.classList.add('hidden');
        }
        // Save session flag so it doesn't repeatedly disturb inner page browsing if desired
        sessionStorage.setItem('gs_system_initialized', 'true');
    };

    if (startupSkipBtn) {
        startupSkipBtn.addEventListener('click', closeStartupAnimation);
    }

    if (replayStartupBtn) {
        replayStartupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            runStartupAnimation();
        });
    }

    // Auto-run if element exists and not already run in this session
    if (startupOverlay) {
        const alreadyRan = sessionStorage.getItem('gs_system_initialized');
        if (!alreadyRan) {
            runStartupAnimation();
        } else {
            // Quick subtle fade out if navigated from another page
            startupOverlay.classList.add('hidden');
        }
    }


    /* ==========================================================================
       3. Real-Time Clock Simulator for CCTV Feed
       ========================================================================== */
    const updateClock = () => {
        const timeElement = document.getElementById('live-time');
        const tickerTimeElement = document.getElementById('ticker-live-time');
        
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const timeStr = `${hrs}:${mins}:${secs}`;
        
        if (timeElement) timeElement.textContent = timeStr;
        if (tickerTimeElement) tickerTimeElement.textContent = `${timeStr} IST`;
    };
    
    updateClock();
    setInterval(updateClock, 1000);


    /* ==========================================================================
       4. Sticky Header scroll styling & Back to Top
       ========================================================================== */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ==========================================================================
       5. Mobile Navigation Menu Toggle
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* ==========================================================================
       6. Interactive CCTV Monitor: Camera Switcher & Night Vision & Snapshot
       ========================================================================== */
    const cctvDashboard = document.querySelector('.cctv-dashboard');
    const camSelectorBtns = document.querySelectorAll('.cam-selector-btn');
    const camFeeds = document.querySelectorAll('.cctv-dashboard .cam-feed');
    const toggleNightVisionBtn = document.getElementById('toggleNightVision');
    const takeCctvSnapshotBtn = document.getElementById('takeCctvSnapshot');

    // Camera Switcher buttons
    if (camSelectorBtns.length > 0 && camFeeds.length > 0) {
        camSelectorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                camSelectorBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const camId = btn.getAttribute('data-cam'); // 'all', 'cam1', etc.
                
                camFeeds.forEach((feed, idx) => {
                    if (camId === 'all') {
                        feed.style.display = 'block';
                        feed.classList.remove('highlight-cam');
                    } else {
                        const targetIdx = parseInt(camId.replace('cam', '')) - 1;
                        if (idx === targetIdx) {
                            feed.style.display = 'block';
                            feed.classList.add('highlight-cam');
                        } else {
                            feed.style.display = 'none';
                        }
                    }
                });

                if (window.showToast) {
                    window.showToast(`Switched view to: ${btn.textContent}`, 'info');
                }
            });
        });
    }

    // Night Vision Toggle
    if (toggleNightVisionBtn && cctvDashboard) {
        toggleNightVisionBtn.addEventListener('click', () => {
            const isNight = cctvDashboard.classList.toggle('night-vision');
            if (isNight) {
                toggleNightVisionBtn.classList.add('active-nv');
                toggleNightVisionBtn.innerHTML = '<i class="fa-solid fa-moon"></i> IR Night Vision [ON]';
                window.showToast('Night-Vision Infrared Sensor: ACTIVATED', 'success');
            } else {
                toggleNightVisionBtn.classList.remove('active-nv');
                toggleNightVisionBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Night Vision Mode';
                window.showToast('Switched to Standard Day Optical Feed', 'info');
            }
        });
    }

    // Snapshot Trigger
    if (takeCctvSnapshotBtn && cctvDashboard) {
        takeCctvSnapshotBtn.addEventListener('click', () => {
            const flash = document.createElement('div');
            flash.className = 'snapshot-flash';
            cctvDashboard.appendChild(flash);
            setTimeout(() => flash.remove(), 400);

            const now = new Date();
            const timeTag = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
            window.showToast(`Snapshot CAM_STATION_${timeTag}.PNG captured to GS Vault`, 'success');
        });
    }


    /* ==========================================================================
       7. Dynamic Animated Number Counters
       ========================================================================== */
    const counterElements = document.querySelectorAll('.stat-number, .badge-num');

    const animateCounters = () => {
        counterElements.forEach(counter => {
            if (counter.dataset.animated) return;
            const targetText = counter.textContent.trim();
            const numMatch = targetText.match(/\d+(\.\d+)?/);
            if (!numMatch) return;

            const targetVal = parseFloat(numMatch[0]);
            const suffix = targetText.replace(numMatch[0], '');
            let startVal = 0;
            const duration = 1500;
            const steps = 40;
            const stepVal = targetVal / steps;
            const stepTime = duration / steps;

            counter.dataset.animated = 'true';

            const timer = setInterval(() => {
                startVal += stepVal;
                if (startVal >= targetVal) {
                    counter.textContent = (targetVal % 1 === 0 ? targetVal : targetVal.toFixed(1)) + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = (startVal % 1 === 0 ? Math.floor(startVal) : startVal.toFixed(1)) + suffix;
                }
            }, stepTime);
        });
    };

    // Intersection observer for counters
    if ('IntersectionObserver' in window && counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });

        const statsSection = document.querySelector('.hero-stats') || counterElements[0];
        if (statsSection) counterObserver.observe(statsSection);
    }


    /* ==========================================================================
       8. Services Filter Tabs
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (tabButtons && serviceCards.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const selectedCategory = button.getAttribute('data-tab');

                serviceCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.classList.remove('hidden');
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }


    /* ==========================================================================
       9. Interactive Security Package Cost Estimator Calculator
       ========================================================================== */
    const calcChips = document.querySelectorAll('.calc-chip');
    const calcCamerasVal = document.getElementById('calcCamerasVal');
    const calcTypeVal = document.getElementById('calcTypeVal');
    const calcStorageVal = document.getElementById('calcStorageVal');
    const calcAmcVal = document.getElementById('calcAmcVal');
    const calcTotalAmount = document.getElementById('calcTotalAmount');

    let estimateConfig = {
        prop: 'home',
        cams: 4,
        type: 'ip',
        storage: '30d',
        amc: 'std'
    };

    const updateEstimate = () => {
        if (!calcTotalAmount) return;

        let baseCameraPrice = 2200; // default per camera
        if (estimateConfig.type === 'analog') baseCameraPrice = 1600;
        if (estimateConfig.type === 'ip') baseCameraPrice = 2400;
        if (estimateConfig.type === '4k') baseCameraPrice = 4200;
        if (estimateConfig.type === 'wifi') baseCameraPrice = 2800;

        let dvrNvrPrice = 5000;
        if (estimateConfig.cams > 8) dvrNvrPrice = 11000;
        if (estimateConfig.cams > 16) dvrNvrPrice = 22000;

        let hddPrice = 3500;
        if (estimateConfig.storage === '15d') hddPrice = 2500;
        if (estimateConfig.storage === '30d') hddPrice = 4000;
        if (estimateConfig.storage === '60d') hddPrice = 7500;

        let installationLabor = estimateConfig.cams * 450;
        let amcPrice = (estimateConfig.amc === 'priority') ? 3500 : 1500;

        const total = (estimateConfig.cams * baseCameraPrice) + dvrNvrPrice + hddPrice + installationLabor + amcPrice;

        calcTotalAmount.textContent = `₹${total.toLocaleString('en-IN')}`;

        if (calcCamerasVal) calcCamerasVal.textContent = `${estimateConfig.cams} Cameras`;
        if (calcTypeVal) calcTypeVal.textContent = estimateConfig.type.toUpperCase();
        if (calcStorageVal) calcStorageVal.textContent = estimateConfig.storage.toUpperCase() + ' Video Retention';
        if (calcAmcVal) calcAmcVal.textContent = estimateConfig.amc === 'priority' ? '24/7 Priority Support' : 'Standard 1-Yr AMC';
    };

    if (calcChips.length > 0) {
        calcChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const group = chip.parentElement;
                group.querySelectorAll('.calc-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const key = chip.getAttribute('data-key');
                let val = chip.getAttribute('data-val');
                if (key === 'cams') val = parseInt(val);

                estimateConfig[key] = val;
                updateEstimate();
            });
        });
        updateEstimate();
    }


    /* ==========================================================================
       10. App Simulator Phone Interactivity
       ========================================================================== */
    const simulatorButtons = document.querySelectorAll('.app-quick-actions .action-btn');
    const videoFeed = document.querySelector('.app-video-simulation');
    const alertFeedList = document.querySelector('.app-alerts');

    if (simulatorButtons.length > 0 && videoFeed && alertFeedList) {
        simulatorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                simulatorButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const actionText = btn.querySelector('span').textContent.toLowerCase();

                const alertBoxes = videoFeed.querySelectorAll('.app-car-box, .app-alert-overlay-sim');
                alertBoxes.forEach(box => box.remove());

                if (actionText === 'siren') {
                    const sirenFlash = document.createElement('div');
                    sirenFlash.className = 'app-alert-overlay-sim';
                    sirenFlash.style.position = 'absolute';
                    sirenFlash.style.inset = '0';
                    sirenFlash.style.backgroundColor = 'rgba(211, 47, 47, 0.4)';
                    sirenFlash.style.animation = 'flash 0.5s infinite alternate';
                    sirenFlash.style.zIndex = '5';
                    videoFeed.appendChild(sirenFlash);

                    addSimulatorAlert('Siren Triggered Manually', 'Just Now • Siren Active', 'unread');
                    window.showToast('GS App: High-Decibel Siren Triggered!', 'warning');
                } else if (actionText === 'talk') {
                    const microBox = document.createElement('div');
                    microBox.className = 'app-alert-overlay-sim';
                    microBox.style.position = 'absolute';
                    microBox.style.bottom = '8px';
                    microBox.style.left = '50%';
                    microBox.style.transform = 'translateX(-50%)';
                    microBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    microBox.style.color = '#FFF';
                    microBox.style.padding = '4px 8px';
                    microBox.style.fontSize = '0.45rem';
                    microBox.style.borderRadius = '4px';
                    microBox.innerHTML = '<i class="fa-solid fa-microphone text-red animate-pulse" style="margin-right:4px;"></i> TRANSMITTING AUDIO...';
                    microBox.style.zIndex = '5';
                    videoFeed.appendChild(microBox);
                    window.showToast('Two-Way Audio Channel Open', 'info');
                } else if (actionText === 'backup') {
                    const progress = document.createElement('div');
                    progress.className = 'app-alert-overlay-sim';
                    progress.style.position = 'absolute';
                    progress.style.inset = '0';
                    progress.style.backgroundColor = 'rgba(0,0,0,0.85)';
                    progress.style.display = 'flex';
                    progress.style.flexDirection = 'column';
                    progress.style.alignItems = 'center';
                    progress.style.justifyContent = 'center';
                    progress.style.color = '#FFF';
                    progress.style.fontSize = '0.5rem';
                    progress.style.zIndex = '5';
                    progress.innerHTML = '<i class="fa-solid fa-cloud-arrow-up text-red animate-bounce" style="font-size:1rem; margin-bottom:4px;"></i> SAVING TO GS CLOUD [68%]';
                    videoFeed.appendChild(progress);
                    window.showToast('Cloud Archive Backup In Progress', 'info');
                } else if (actionText === 'ticket') {
                    addSimulatorAlert('Service Ticket Created', 'Just Now • Support Informed', 'unread');
                    window.showToast('Service Ticket #GS-4921 dispatched to Umesh Bhavsar\'s response team.', 'success');
                }
            });
        });
    }

    function addSimulatorAlert(heading, time, unreadClass) {
        if (!alertFeedList) return;
        const item = document.createElement('div');
        item.className = `alert-item ${unreadClass}`;
        
        let icon = '<i class="fa-solid fa-circle-exclamation text-red"></i>';
        if (heading.includes('Ticket')) {
            icon = '<i class="fa-solid fa-screwdriver-wrench text-red"></i>';
        }
        
        item.innerHTML = `
            <div class="alert-i-icon">${icon}</div>
            <div class="alert-i-details">
                <div class="alert-heading">${heading}</div>
                <div class="alert-time">${time}</div>
            </div>
        `;
        
        const alertsHeading = alertFeedList.querySelector('.alert-title');
        if (alertsHeading) {
            alertsHeading.after(item);
        } else {
            alertFeedList.prepend(item);
        }

        const items = alertFeedList.querySelectorAll('.alert-item');
        if (items.length > 4) {
            items[items.length - 1].remove();
        }
    }


    /* ==========================================================================
       11. Testimonials Slideshow Carousel
       ========================================================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let slideTimer;

    const showSlide = (n) => {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    const startSlideShow = () => {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 6000);
    };

    if (slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startSlideShow(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startSlideShow(); });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startSlideShow();
            });
        });

        startSlideShow();
    }


    /* ==========================================================================
       12. Interactive Review Modal & Submission
       ========================================================================== */
    const openReviewModalBtn = document.getElementById('openReviewModalBtn');
    const reviewModalOverlay = document.getElementById('reviewModalOverlay');
    const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
    const reviewForm = document.getElementById('reviewForm');
    const starRatingSelect = document.getElementById('starRatingSelect');
    let selectedRating = 5;

    if (openReviewModalBtn && reviewModalOverlay) {
        openReviewModalBtn.addEventListener('click', () => {
            reviewModalOverlay.classList.add('open');
        });
    }

    if (closeReviewModalBtn && reviewModalOverlay) {
        closeReviewModalBtn.addEventListener('click', () => {
            reviewModalOverlay.classList.remove('open');
        });
    }

    if (starRatingSelect) {
        const stars = starRatingSelect.querySelectorAll('i');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-star'));
                stars.forEach((s, idx) => {
                    if (idx < selectedRating) {
                        s.classList.add('active');
                        s.className = 'fa-solid fa-star active';
                    } else {
                        s.classList.remove('active');
                        s.className = 'fa-regular fa-star';
                    }
                });
            });
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewerName = document.getElementById('r_name').value.trim();
            const reviewerRole = document.getElementById('r_role').value.trim() || 'Verified Customer';
            const reviewerComment = document.getElementById('r_comment').value.trim();

            if (!reviewerName || !reviewerComment) return;

            // Create new review slide or card
            const newSlide = document.createElement('div');
            newSlide.className = 'testimonial-slide';
            
            let starsHtml = '';
            for (let i = 0; i < selectedRating; i++) starsHtml += '<i class="fa-solid fa-star"></i> ';

            newSlide.innerHTML = `
                <div class="testimonial-rating">${starsHtml}</div>
                <p class="testimonial-quote">"${reviewerComment}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar"><i class="fa-solid fa-user-check"></i></div>
                    <div class="author-info">
                        <div class="author-name">${reviewerName}</div>
                        <div class="author-title">${reviewerRole}</div>
                    </div>
                </div>
            `;

            const carousel = document.getElementById('testimonialCarousel');
            if (carousel) {
                carousel.appendChild(newSlide);
            }

            const reviewsGrid = document.getElementById('allReviewsGrid');
            if (reviewsGrid) {
                const card = document.createElement('div');
                card.className = 'review-card';
                card.innerHTML = `
                    <div class="testimonial-rating mb-2">${starsHtml}</div>
                    <p class="testimonial-quote mb-3">"${reviewerComment}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar"><i class="fa-solid fa-user-check"></i></div>
                        <div class="author-info">
                            <div class="author-name">${reviewerName}</div>
                            <div class="author-title">${reviewerRole}</div>
                        </div>
                    </div>
                `;
                reviewsGrid.prepend(card);
            }

            reviewModalOverlay.classList.remove('open');
            reviewForm.reset();
            window.showToast('Thank you! Your verified review has been published.', 'success');
        });
    }


    /* ==========================================================================
       13. FAQ Accordion Click Toggles & Live Search Filter
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearchInput = document.getElementById('faqSearchInput');
    const faqPills = document.querySelectorAll('.faq-pill');
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const parent = question.parentElement;
                const isActive = parent.classList.contains('active');

                faqItems.forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    parent.classList.add('active');
                }
            });
        });
    }

    // FAQ Live Search
    if (faqSearchInput && faqItems.length > 0) {
        faqSearchInput.addEventListener('input', () => {
            const query = faqSearchInput.value.toLowerCase().trim();
            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
                if (questionText.includes(query) || answerText.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // FAQ Category Filter Pills
    if (faqPills.length > 0 && faqItems.length > 0) {
        faqPills.forEach(pill => {
            pill.addEventListener('click', () => {
                faqPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const cat = pill.getAttribute('data-cat');
                faqItems.forEach(item => {
                    const itemCat = item.getAttribute('data-cat') || 'general';
                    if (cat === 'all' || itemCat === cat) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }


    /* ==========================================================================
       14. Contact Form Verification & Submissions
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('formSuccessAlert');
    
    if (contactForm && successAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('has-error'));

            const nameInput = document.getElementById('c_name');
            const phoneInput = document.getElementById('c_phone');
            const emailInput = document.getElementById('c_email');
            const messageInput = document.getElementById('c_message');
            let hasErrors = false;

            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('has-error');
                hasErrors = true;
            }

            const phoneVal = phoneInput.value.trim().replace(/\s+/g, '');
            if (!phoneVal || phoneVal.length < 8) {
                phoneInput.parentElement.classList.add('has-error');
                hasErrors = true;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('has-error');
                hasErrors = true;
            }

            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('has-error');
                hasErrors = true;
            }

            if (!hasErrors) {
                const submitBtn = document.getElementById('formSubmitBtn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Processing Request...';

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successAlert.style.display = 'flex';
                    window.showToast('Consultation request sent successfully!', 'success');
                }, 1200);
            }
        });
    }


    /* ==========================================================================
       15. Interactive Live Chat Widget
       ========================================================================== */
    const chatWidget = document.getElementById('chatWidget');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatBox = document.getElementById('chatBox');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatBadge = document.getElementById('chatBadge');
    const quickReplies = document.querySelectorAll('.chat-quick-replies .qr-btn');

    if (chatToggleBtn && chatBox) {
        chatToggleBtn.addEventListener('click', () => {
            chatBox.classList.toggle('open');
            chatToggleBtn.classList.toggle('chat-open');
            
            if (chatBadge) {
                chatBadge.style.display = 'none';
            }
            
            if (chatBox.classList.contains('open')) {
                setTimeout(() => chatInput.focus(), 150);
            }
        });

        quickReplies.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-reply');
                handleUserChatMessage(text);
            });
        });

        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', () => {
                const val = chatInput.value.trim();
                if (val) {
                    handleUserChatMessage(val);
                    chatInput.value = '';
                }
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const val = chatInput.value.trim();
                    if (val) {
                        handleUserChatMessage(val);
                        chatInput.value = '';
                    }
                }
            });
        }
    }

    function appendMessage(text, sender) {
        if (!chatMessages) return;
        const msg = document.createElement('div');
        msg.className = `message ${sender === 'user' ? 'msg-user' : 'msg-bot'}`;
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserChatMessage(text) {
        appendMessage(text, 'user');

        setTimeout(() => {
            let botReply = "Thank you for reaching out! A technical advisor from GS Security Solutions Nashik will connect with you shortly.";
            
            const lowerText = text.toLowerCase();
            if (lowerText.includes('pricing') || lowerText.includes('cost') || lowerText.includes('price')) {
                botReply = "Our CCTV packages start at affordable pricing. Standard Home 4-Camera configurations start from ₹12,999. Check out our Services page for an interactive Cost Calculator!";
            } else if (lowerText.includes('app') || lowerText.includes('download')) {
                botReply = "You can download the GS App from our dedicated Mobile App page. The application is completely free and coordinates live camera logs and emergency sirens.";
            } else if (lowerText.includes('umesh') || lowerText.includes('owner') || lowerText.includes('founder')) {
                botReply = "Umesh Suresh Bhavsar is the Founder & Owner of GS Security Solutions. He personally guarantees quality surveillance deployments across Maharashtra.";
            } else if (lowerText.includes('cctv') || lowerText.includes('installation') || lowerText.includes('wireless')) {
                botReply = "We offer 4K HD Cameras, Wireless Wi-Fi setups, solar power backups, DVR/NVR servers, and smart triggers. Leave your details in our Contact page for an on-site inspection!";
            }

            appendMessage(botReply, 'bot');
        }, 800);
    }


    /* ==========================================================================
       16. Scroll Entrance Animations (Intersection Observer)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }

});
