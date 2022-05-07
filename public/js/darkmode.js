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

const disableDarkMode = () => {
  // Remove .dark-mode from body
  document.body.classList.remove('dark-mode');
  // Update darkMode status in the LocalStorage to `null`
  localStorage.setItem('darkMode', null);
};


// Check if darkMode is `enabled`
if(darkMode === 'enabled') {
  // Enable dark mode soon as the page loads
  enableDarkMode();
}


darkModeToggle.addEventListener('click', () => {
  // Get the darkMode to see its current status
  darkMode = localStorage.getItem('darkMode');

  // Check if darkMode is not `enabled`
  if(darkMode !== 'enabled') {
    enableDarkMode();
    // For checking purposes
    console.log('Dark mode is enabled');
    console.log(`darkMode:  ${darkMode}`);
  } else {
    disableDarkMode();
    // For checking purposes
    console.log('Dark mode is disabled');
    console.log(`darkMode:  ${darkMode}`);
  }
});
