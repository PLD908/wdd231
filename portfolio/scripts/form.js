if (window.location.pathname.includes('form-data.html')) {
    const formOutput = document.querySelector('#form-output');
    const params = new URLSearchParams(window.location.search);
    formOutput.innerHTML = `
        <p><strong>Name:</strong> ${params.get('name') || 'N/A'}</p>
        <p><strong>Email:</strong> ${params.get('email') || 'N/A'}</p>
        <p><strong>Message:</strong> ${params.get('message') || 'N/A'}</p>
    `;
}