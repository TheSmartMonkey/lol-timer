const { ipcRenderer } = require('electron');

// Get all shortcut input fields
const shortcutInputs = document.querySelectorAll('.shortcut-input');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

// Load current shortcuts
ipcRenderer.send('get-shortcuts');

ipcRenderer.on('shortcuts-data', (event, shortcuts) => {
  Object.entries(shortcuts).forEach(([role, shortcut]) => {
    const input = document.getElementById(role);
    if (input) {
      input.value = shortcut;
    }
  });
});

// Handle key recording
shortcutInputs.forEach((input) => {
  let keys = new Set();

  input.addEventListener('focus', () => {
    input.value = '';
    keys.clear();
  });

  input.addEventListener('keydown', (e) => {
    e.preventDefault();

    // Clear on Escape
    if (e.key === 'Escape') {
      input.value = '';
      keys.clear();
      input.blur();
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
    input.value = Array.from(keys).join('+');
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
