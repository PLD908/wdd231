// Display current year
document.getElementById('currentYear').textContent = new Date().getFullYear();
        
// Display last modified date
document.getElementById('lastModified').textContent = document.lastModified;

// Visit tracking with localStorage
const visitMessage = document.getElementById('visitMessage');

// Get the current date in milliseconds
const currentDate = Date.now();

// Get the last visit date from localStorage
const lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
    // First visit
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    // Calculate difference in days
    const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastVisit < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysSinceLastVisit === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
    }
}

// Update the last visit date
localStorage.setItem('lastVisit', currentDate);

// Fetch JSON data and build cards
async function loadAttractions() {
    try {
        const response = await fetch('./data/attractions.json');
        const data = await response.json();
        
        const cardGrid = document.getElementById('cardGrid');
        
        data.attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <h2 class="card-title">${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" width="300" height="200" loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="#" class="button">Learn More</a>
            `;
            
            cardGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading attractions:', error);
    }
}

// Load the attractions when the page loads
loadAttractions();