import { fetchData } from './data-fetch.js';
import { showModal } from './modal.js';

// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');
menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.textContent = isExpanded ? '☰' : '✕';
    navMenu.classList.toggle('show');
});

// Load and display projects
const projectList = document.querySelector('#project-list');
const filterButtons = document.querySelectorAll('.filter-btn');

async function displayProjects(filter = 'all') {
    const projects = await fetchData();
    if (!projects) return;

    // Filter projects
    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    // Clear existing content
    projectList.innerHTML = '';

    // Display projects with template literals
    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <img src="images/${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank">View Project</a>
            </div>
        `;
        card.addEventListener('click', () => {
            showModal(project);
            saveFavorite(project);
        });
        projectList.appendChild(card);
    });
}

// Save to localStorage
function saveFavorite(project) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some(fav => fav.id === project.id)) {
        favorites.push(project);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Filter projects
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayProjects(button.dataset.filter);
    });
});

// Initialize
displayProjects();