// Common JavaScript for all pages

// Get the current year for copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Get last modified date
document.getElementById('lastModified').textContent = document.lastModified;

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode');
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}

// Mobile navigation toggle (for smaller screens)
const createMobileMenu = () => {
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');
    
    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.innerHTML = '☰';
    hamburgerBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
    
    // Insert before nav
    header.insertBefore(hamburgerBtn, nav);
    
    // Add click event
    hamburgerBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        hamburgerBtn.classList.toggle('active');
    });
};

// Add mobile menu on small screens
if (window.innerWidth < 768) {
    createMobileMenu();
}