const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById(
  "lastmodified"
).textContent = `Last modified: ${document.lastModified}`;
