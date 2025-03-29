// Function to get URL parameters
function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

// Function to format date from ISO string
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const formDataContainer = document.getElementById('form-data');
    
    if (!formDataContainer) {
        console.error('Element with ID "form-data" not found');
        return;
    }

    // Get required fields from URL parameters
    const firstName = getParam('first-name');
    const lastName = getParam('last-name');
    const email = getParam('email');
    const phone = getParam('phone');
    const businessName = getParam('business-name');
    const timestamp = getParam('timestamp');

    // Create HTML for form data
    let formDataHTML = '';

    if (firstName) {
        formDataHTML += `
            <div class="info-group">
                <span class="info-label">First Name:</span>
                <span>${firstName}</span>
            </div>
        `;
    }

    if (lastName) {
        formDataHTML += `
            <div class="info-group">
                <span class="info-label">Last Name:</span>
                <span>${lastName}</span>
            </div>
        `;
    }

    if (email) {
        formDataHTML += `
            <div class="info-group">
                <span class="info-label">Email:</span>
                <span>${email}</span>
            </div>
        `;
    }

    if (phone) {
        formDataHTML += `
            <div class="info-group">
                <span class="info-label">Phone Number:</span>
                <span>${phone}</span>
            </div>
        `;
    }

    if (businessName) {
        formDataHTML += `
            <div class="info-group">
                <span class="info-label">Business Name:</span>
                <span>${businessName}</span>
            </div>
        `;
    }

    if (timestamp) {
        formDataHTML += `
            <div class="info-group">
                <span class="info-label">Submission Date:</span>
                <span>${formatDate(timestamp)}</span>
            </div>
        `;
    }

    // Insert data into the page
    formDataContainer.innerHTML = formDataHTML;
});