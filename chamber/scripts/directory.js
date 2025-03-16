// Directory page specific JavaScript

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get directory container and view toggle buttons
    const directoryContainer = document.getElementById('directory-container');
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    
    // View toggle functionality
    gridBtn.addEventListener('click', () => {
        directoryContainer.className = 'grid';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });
    
    listBtn.addEventListener('click', () => {
        directoryContainer.className = 'list';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
    
    // Fetch and display member data
    const fetchMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error('Error fetching member data:', error);
            directoryContainer.innerHTML = '<p>Error loading business directory. Please try again later.</p>';
        }
    };
    
    // Display member data in the directory
    const displayMembers = (members) => {
        directoryContainer.innerHTML = '';
        
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Add membership level class if needed
            if (member.membershipLevel === 2) {
                card.classList.add('silver');
            } else if (member.membershipLevel === 3) {
                card.classList.add('gold');
            }
            
            // Create card content
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p class="business-tagline">${member.tagline || ''}</p>
                    <p class="email"><strong>EMAIL:</strong> ${member.email}</p>
                    <p class="phone"><strong>PHONE:</strong> ${member.phone}</p>
                    <p class="website"><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a></p>
                </div>
            `;
            
            directoryContainer.appendChild(card);
        });
    };
    
    // Load members when page loads
    fetchMembers();
});