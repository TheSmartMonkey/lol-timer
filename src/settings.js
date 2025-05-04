const { ipcRenderer } = require('electron');

// Get all shortcut input fields
const shortcutInputs = document.querySelectorAll('.shortcut-input');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

// Store current shortcuts for validation
let currentShortcuts = {};

// Load current shortcuts
ipcRenderer.send('get-shortcuts');

ipcRenderer.on('shortcuts-data', (event, shortcuts) => {
  currentShortcuts = shortcuts;
  Object.entries(shortcuts).forEach(([role, shortcut]) => {
    const input = document.getElementById(role);
    if (input) {
      input.value = shortcut;
    }
  });
});

// Function to check for duplicate shortcuts
function isDuplicateShortcut(value, currentInputId) {
  for (const [role, shortcut] of Object.entries(currentShortcuts)) {
    if (role !== currentInputId && shortcut === value) {
      return role;
    }
  }
  return false;
}

// Function to show error message
function showError(input, message) {
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.textContent = message;
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
  }
  input.classList.add('error');
}

// Function to clear error message
function clearError(input) {
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
  input.classList.remove('error');
}

// Handle key recording
shortcutInputs.forEach((input) => {
  let keys = new Set();

  input.addEventListener('focus', () => {
    input.value = '';
    keys.clear();
    clearError(input);
  });

  input.addEventListener('keydown', (e) => {
    e.preventDefault();

    // Clear on Escape
    if (e.key === 'Escape') {
      input.value = '';
      keys.clear();
      input.blur();
      clearError(input);
      return;
    }

    // Don't record the modifier keys alone
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
      return;
    }

    keys.clear(); // Clear previous keys

    // Add modifier keys
    if (e.ctrlKey) keys.add('CommandOrControl');
    if (e.shiftKey) keys.add('Shift');
    if (e.altKey) keys.add('Alt');

    // Add the main key
    keys.add(e.key.toUpperCase());

    // Update input value
    const newShortcut = Array.from(keys).join('+');
    input.value = newShortcut;

    // Check for duplicates
    const duplicateRole = isDuplicateShortcut(newShortcut, input.id);
    if (duplicateRole) {
      showError(input, `This shortcut is already used for ${duplicateRole}`);
    } else {
      clearError(input);
    }
  });

  input.addEventListener('keyup', (e) => {
    // If all keys are released, blur the input
    if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
      input.blur();
    }
  });
});

// Save shortcuts
saveButton.addEventListener('click', () => {
  // Check for any errors before saving
  const hasErrors = document.querySelectorAll('.error-message').length > 0;
  if (hasErrors) {
    return; // Don't save if there are errors
  }

  const shortcuts = {};
  shortcutInputs.forEach((input) => {
    if (input.value) {
      shortcuts[input.id] = input.value;
    }
  });

  ipcRenderer.send('save-shortcuts', shortcuts);
});

// Cancel and close window
cancelButton.addEventListener('click', () => {
  ipcRenderer.send('close-settings');
});
