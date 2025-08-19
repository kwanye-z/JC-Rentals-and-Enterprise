
        // Navigation functionality
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const pageSection = document.querySelectorAll('.page-section');

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Page navigation
        function showPage(pageId) {
            // Hide all pages
            pageSection.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Add click events to navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                link.classList.add('active');
                showPage(pageId);
            });
        });

        // Add click events to buttons and links with data-page attribute
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-page')) {
                e.preventDefault();
                const pageId = e.target.getAttribute('data-page');
                showPage(pageId);
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === pageId) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        });

        // Animate statistics on scroll
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const stats = [
                { element: statNumbers[0], target: 500, suffix: '+' },
                { element: statNumbers[1], target: 200, suffix: '+' },
                { element: statNumbers[2], target: 50, suffix: '+' },
                { element: statNumbers[3], target: 24, suffix: '/7' }
            ];

            stats.forEach((stat, index) => {
                let current = 0;
                const increment = stat.target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.target) {
                        stat.element.textContent = stat.target + stat.suffix;
                        clearInterval(timer);
                    } else {
                        stat.element.textContent = Math.floor(current) + stat.suffix;
                    }
                }, 50);
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stats')) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe stats section
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }

        // Contact form handling with WhatsApp integration
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loading = document.getElementById('loading');
            const successMessage = document.getElementById('successMessage');
            const formData = new FormData(this);
            
            // Show loading
            loading.style.display = 'block';
            
            // Get form values
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email') || 'Not provided';
            const eventDate = formData.get('event-date');
            const eventType = formData.get('event-type');
            const equipmentNeeded = formData.getAll('equipment-needed').join(', ');
            const guests = formData.get('guests') || 'Not specified';
            const duration = formData.get('duration') || 'To be discussed';
            const location = formData.get('location');
            const message = formData.get('message') || 'No additional requirements';
            
            // Create WhatsApp message
            const whatsappMessage = `
*🎯 EQUIPMENT RENTAL QUOTE REQUEST*

*👤 Customer Information:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}

*📅 Event Details:*
• Date: ${eventDate}
• Type: ${eventType}
• Location: ${location}
• Expected Guests: ${guests}
• Duration: ${duration}

*🎪 Equipment Needed:*
${equipmentNeeded}

*📝 Additional Requirements:*
${message}

*---*
*Sent from JC Rentals website*
*Please provide quote and availability confirmation*
            `.trim();
            
            // Simulate processing delay
            setTimeout(() => {
                loading.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Redirect to WhatsApp after a short delay
                setTimeout(() => {
                    const whatsappURL = `https://wa.me/2348030804172?text=${encodeURIComponent(whatsappMessage)}`;
                    window.open(whatsappURL, '_blank');
                    
                    // Reset form
                    document.getElementById('contactForm').reset();
                    successMessage.style.display = 'none';
                }, 2000);
            }, 1500);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Lazy loading for images
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });

        // Add loading animation to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        });

        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            cardObserver.observe(card);
        });

        // Gallery lightbox effect
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <span class="close">&times;</span>
                    </div>
                `;
                
                // Add lightbox styles
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease;
                `;
                
                const content = lightbox.querySelector('.lightbox-content');
                content.style.cssText = `
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    animation: fadeInUp 0.3s ease;
                `;
                
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.style.cssText = `
                    width: 100%;
                    height: auto;
                    max-height: 80vh;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                const closeBtn = lightbox.querySelector('.close');
                closeBtn.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 35px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: color 0.3s ease;
                `;
                
                closeBtn.addEventListener('mouseover', () => {
                    closeBtn.style.color = 'var(--accent-orange)';
                });
                
                closeBtn.addEventListener('mouseout', () => {
                    closeBtn.style.color = 'white';
                });
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
                
                // Close with Escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });

        // Add some dynamic interactions and animations
        window.addEventListener('load', () => {
            // Add loaded class to body for CSS transitions
            document.body.classList.add('loaded');
            
            // Animate hero section elements
            const heroElements = document.querySelectorAll('.hero-text h1, .hero-text p, .btn');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                }, index * 200);
            });
            
            console.log('JC Rentals website loaded successfully!');
        });

        // Error handling for images
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RXF1aXBtZW50IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                this.alt = 'Equipment Image';
            });
        });

        // Set minimum date for event date input to today
        const eventDateInput = document.getElementById('event-date');
        if (eventDateInput) {
            const today = new Date().toISOString().split('T')[0];
            eventDateInput.setAttribute('min', today);
        }

        // Add price calculator functionality (optional)
        function calculateEstimate() {
            const eventType = document.getElementById('event-type').value;
            const equipmentNeeded = document.querySelectorAll('#equipment-needed option:checked');
            const duration = document.getElementById('duration').value;
            
            // Simple pricing logic (you can customize this)
            let basePrice = 0;
            const equipmentPrices = {
                'HD Projector': 5000,
                'Projector Screen': 2000,
                'Presenter Pointer': 1000,
                'Flat Screen Monitor': 7000,
                'PA System': 8000,
                'HDMI Cables': 500,
                'Chairs': 200, // per chair
                'Tables': 1000, // per table
                'Canopies': 10000,
                'Decoration': 15000,
                'MC Services': 20000
            };
            
            // This could be expanded to show real-time estimates
        }

        // Add form validation enhancements
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#e53e3e';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--success-green)';
                }
            });
        });

        // Add phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 11) {
                    value = value.substring(0, 11);
                    // Format as Nigerian number
                    if (value.startsWith('0')) {
                        e.target.value = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
                    }
                } else {
                    e.target.value = value;
                }
            });
        }

        // Add smooth transitions for page changes
        function addPageTransition() {
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => {
                page.style.transition = 'opacity 0.3s ease-in-out';
            });
        }

        addPageTransition();

        // Initialize tooltips for equipment selection
        const equipmentSelect = document.getElementById('equipment-needed');
        if (equipmentSelect) {
            equipmentSelect.addEventListener('change', function() {
                const selectedCount = this.selectedOptions.length;
                const helper = this.nextElementSibling;
                if (selectedCount > 0) {
                    helper.textContent = `${selectedCount} item(s) selected`;
                    helper.style.color = 'var(--success-green)';
                } else {
                    helper.textContent = 'Hold Ctrl (Windows) or Cmd (Mac) to select multiple items';
                    helper.style.color = 'var(--light-text)';
                }
            });
        }