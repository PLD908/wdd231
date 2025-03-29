 // Set current timestamp when the form loads
 document.getElementById("timestamp").value = new Date().toISOString();
        
 // Modal functionality
 const openButtons = document.querySelectorAll('.open-modal');
 const closeButtons = document.querySelectorAll('.close-modal');
 
 openButtons.forEach(button => {
     button.addEventListener('click', () => {
         const modalId = button.getAttribute('data-modal');
         const modal = document.getElementById(modalId);
         modal.showModal();
     });
 });
 
 closeButtons.forEach(button => {
     button.addEventListener('click', () => {
         const modal = button.closest('dialog');
         modal.close();
     });
 });
 
 // Card animation on page load
 document.addEventListener('DOMContentLoaded', () => {
     const cards = document.querySelectorAll('.card');
     cards.forEach((card, index) => {
         setTimeout(() => {
             card.classList.add('show');
         }, 200 * index); // Staggered animation
     });
 });