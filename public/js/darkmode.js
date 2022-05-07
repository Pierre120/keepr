// Retrieve the file containing the info if dark mode is enabled
let darkMode = localStorage.getItem('darkMode');
// Get the element responsible for the dark mode toggle
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  // Add .dark-mode to body
  document.body.classList.add('dark-mode');
  // Update darkMode status in the LocalStorage to `enabled`
  localStorage.setItem('darkMode', 'enabled');
};
