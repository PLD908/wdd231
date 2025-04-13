export function showModal(project) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${project.title}</h2>
            <img src="images/${project.image}" alt="${project.title}" loading="lazy">
            <p>${project.description}</p>
            <p><strong>Category:</strong> ${project.category}</p>
            <p><strong>Tags:</strong> ${project.tags.join(', ')}</p>
            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
            <button class="modal-close">Close</button>
        </div>
    `;
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    document.body.appendChild(modal);
}