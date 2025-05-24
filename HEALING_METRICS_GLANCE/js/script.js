document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const logoutBtn = document.getElementById('logout-btn');
    const navLinks = document.querySelectorAll('nav ul li a');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Feature modals and accordion elements
    const featureButtons = document.querySelectorAll('.feature-btn');
    const featureModal = document.getElementById('feature-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Feature contents for modals
    const featureContents = {
        analytics: {
            title: 'Advanced Analytics',
            content: `
                <div class="feature-details">
                    <p>Our advanced analytics platform uses machine learning algorithms to process your health data and provide meaningful insights.</p>
                    <h4>Key Analytics Features:</h4>
                    <ul>
                        <li>Trend analysis to identify patterns in your health metrics</li>
                        <li>Predictive alerts for potential health concerns</li>
                        <li>Comparative analysis against population benchmarks</li>
                        <li>Custom reporting tools for healthcare provider sharing</li>
                        <li>Integration with medical research databases</li>
                    </ul>
                    <p>With these powerful tools, you'll be able to understand your health data like never before and make informed decisions about your wellness journey.</p>
                </div>
            `
        },
        personalization: {
            title: 'Personalized Health Plans',
            content: `
                <div class="feature-details">
                    <p>Every person's health needs are unique, which is why we offer tailored health plans based on your specific data and goals.</p>
                    <h4>Personalization Features:</h4>
                    <ul>
                        <li>AI-powered recommendations adapted to your health profile</li>
                        <li>Custom goal setting with achievable milestones</li>
                        <li>Personalized notification schedules</li>
                        <li>Adaptive wellness programs that evolve with your progress</li>
                        <li>Customizable dashboard layouts to highlight what matters most</li>
                    </ul>
                    <p>Our personalized approach ensures you receive guidance that's relevant to your unique health situation and wellness objectives.</p>
                </div>
            `
        },
        integration: {
            title: 'Device Integration',
            content: `
                <div class="feature-details">
                    <p>Healing Metrics connects seamlessly with over 100 health devices and applications to create a comprehensive health monitoring ecosystem.</p>
                    <h4>Supported Integrations:</h4>
                    <ul>
                        <li>Fitness trackers and smartwatches from all major brands</li>
                        <li>Smart scales and body composition analyzers</li>
                        <li>Blood pressure monitors and glucose meters</li>
                        <li>Sleep tracking devices and applications</li>
                        <li>Nutrition and hydration tracking apps</li>
                    </ul>
                    <p>With our open API architecture, your devices work together to provide a complete picture of your health without manual data entry or switching between multiple apps.</p>
                </div>
            `
        }
    };
    
    // Simulated user credentials (in a real app, this would be server-side)
    const users = [
        { username: 'user', password: 'password' }
    ];
    
    // Added flag to prevent continuous reloading
    let autoLoginAttempted = false;
    
    // Check if user is already logged in (using sessionStorage)
    if (sessionStorage.getItem('loggedIn') && !autoLoginAttempted) {
        autoLoginAttempted = true;
        showDashboardWithoutAnimation();
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simulate login authentication
            const validUser = users.find(user => user.username === username && user.password === password);
            
            if (validUser) {
                // Store login state
                sessionStorage.setItem('loggedIn', 'true');
                if (remember) {
                    localStorage.setItem('rememberUser', 'true');
                }
                
                // Show success animation
                loginForm.classList.add('success');
                
                // Initiate the sliding transition after success animation
                setTimeout(() => {
                    // Add slide-out class to login container
                    loginSection.classList.add('slide-out');
                    
                    // Show dashboard section without hiding login yet (for transition overlap)
                    dashboardSection.classList.remove('hide');
                    
                    // Add a small delay then add slide-in class to dashboard
                    setTimeout(() => {
                        dashboardSection.classList.add('slide-in');
                        
                        // Hide login section after transition completes
                        setTimeout(() => {
                            loginSection.classList.add('hide');
                            // Reset form state after animation completes
                            loginForm.classList.remove('success');
                        }, 800);
                    }, 100);
                }, 800);
            } else {
                // Show error animation
                loginForm.classList.add('error');
                
                // Remove error class after shake animation
                setTimeout(() => {
                    loginForm.classList.remove('error');
                }, 500);
            }
        });
    }
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear session
            sessionStorage.removeItem('loggedIn');
            
            // Reverse animation for logout
            dashboardSection.classList.remove('slide-in');
            
            // Show login section for transition
            loginSection.classList.remove('hide');
            loginSection.classList.remove('slide-out');
            
            // After dashboard slides out, fully hide it
            setTimeout(() => {
                dashboardSection.classList.add('hide');
            }, 800);
            
            // Clear form fields if remember option wasn't selected
            if (!localStorage.getItem('rememberUser')) {
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        });
    }
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.id !== 'logout-btn') {
                e.preventDefault();
                
                // Get the section to show from data attribute
                const sectionToShow = this.getAttribute('data-section');
                
                // Remove active class from all navigation links
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all content sections
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show the selected content section
                document.getElementById(`${sectionToShow}-content`).classList.add('active');
            }
        });
    });
    
    // Parallax effect for About section
    window.addEventListener('scroll', function() {
        const parallax = document.getElementById('about-parallax');
        if (parallax) {
            const scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Feature buttons click handlers
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            const featureContent = featureContents[feature];
            
            // Update modal content
            if (featureContent) {
                modalTitle.textContent = featureContent.title;
                modalBody.innerHTML = featureContent.content;
                
                // Show modal with animation
                featureModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            featureModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === featureModal) {
            featureModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Accordion functionality
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the parent accordion item
            const accordionItem = this.parentElement;
            
            // Toggle active class on the clicked item
            accordionItem.classList.toggle('active');
            
            // Close other accordion items
            accordionHeaders.forEach(item => {
                if (item !== this) {
                    item.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Helper function to switch from login to dashboard without animation (for session restore)
    function showDashboardWithoutAnimation() {
        loginSection.classList.add('hide');
        dashboardSection.classList.remove('hide');
        dashboardSection.classList.add('slide-in');
        
        // Set initial active section
        const activeSection = document.querySelector('.content-section.active') || document.getElementById('dashboard-content');
        activeSection.classList.add('active');
    }
    
    // Legacy helper functions (kept for compatibility)
    function showDashboard() {
        showDashboardWithoutAnimation();
    }
    
    function showLogin() {
        dashboardSection.classList.add('hide');
        loginSection.classList.remove('hide');
        loginSection.classList.remove('slide-out');
    }
    
    // Add animation classes for login form elements
    const animatedElements = document.querySelectorAll('.login-form .input-group, .login-form .remember-forgot, .login-form button');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1 + 0.2}s`;
        element.classList.add('fade-in');
    });
});