// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navSectionIndicator = document.getElementById('nav-section-indicator');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Scroll-based section highlighting and URL updates
    function updateActiveSection() {
        const sections = ['hero', 'aboutus', 'services', 'contactus'];
        const scrollPosition = window.scrollY + 100;
        let activeSection = '';

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    activeSection = section;
                    break;
                }
            }
        }

        // Update navigation links
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        navLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update page title and URL based on active section
        const sectionTitles = {
            'hero': 'index - Ganesh Events',
            'aboutus': 'About Us - Ganesh Events',
            'services': 'Our Services - Ganesh Events',
            'contactus': 'Contact Us - Ganesh Events'
        };

        const sectionUrls = {
            'hero': '#hero',
            'aboutus': '#aboutus',
            'services': '#services',
            'contactus': '#contactus'
        };

        if (activeSection && sectionTitles[activeSection]) {
            document.title = sectionTitles[activeSection];
            // Update URL with hash fragment
            const newUrl = sectionUrls[activeSection];
            if (window.location.hash !== newUrl) {
                window.history.replaceState({}, '', newUrl);
            }
        }

        // // Update section indicator
        // if (navSectionIndicator) {
        //     if (activeSection) {
        //         const sectionNames = {
        //             'hero': 'Home',
        //             'aboutus': 'About Us',
        //             'services': 'Our Services',
        //             'contactus': 'Contact Us'
        //         };
        //         navSectionIndicator.textContent = sectionNames[activeSection] || '';
        //         navSectionIndicator.classList.add('show');
        //     } else {
        //         navSectionIndicator.classList.remove('show');
        //     }
        // }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update title and URL immediately when clicking navigation
                const targetId = this.getAttribute('href').substring(1);
                const sectionTitles = {
                    'hero': 'index - Ganesh Events',
                    'aboutus': 'About Us - Ganesh Events',
                    'services': 'Our Services - Ganesh Events',
                    'contactus': 'Contact Us - Ganesh Events'
                };

                const sectionUrls = {
                    'hero': '#hero',
                    'aboutus': '#aboutus',
                    'services': '#services',
                    'contactus': '#contactus'
                };
                
                if (sectionTitles[targetId]) {
                    document.title = sectionTitles[targetId];
                    window.history.replaceState({}, '', sectionUrls[targetId]);
                }
            }
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial call
    updateActiveSection();
});

// Hero carousel functionality
let slideIndex = 1;
showSlide(slideIndex);

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance slides
setInterval(function() {
    slideIndex++;
    showSlide(slideIndex);
}, 5000);

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    event.target.reset();
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to section functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update title and URL immediately when scrolling to section
        const sectionTitles = {
            'hero': 'index - Ganesh Events',
            'aboutus': 'About Us - Ganesh Events',
            'services': 'Our Services - Ganesh Events',
            'contactus': 'Contact Us - Ganesh Events'
        };

        const sectionUrls = {
            'hero': '#hero',
            'aboutus': '#aboutus',
            'services': '#services',
            'contactus': '#contactus'
        };
        
        if (sectionTitles[sectionId]) {
            document.title = sectionTitles[sectionId];
            window.history.replaceState({}, '', sectionUrls[sectionId]);
        }
    }
}

document
  .getElementById("contact-booking-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(this),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.reset(); // Reset the form
          alert("Event scheduled successfully! We will reach out to you soon."); // Optional feedback
        } else {
          alert("There was an issue scheduling your event.");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
      });
  });



  