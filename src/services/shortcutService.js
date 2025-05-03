const { globalShortcut } = require('electron');
const { ROLES, SHORTCUTS } = require('../config/constants');

class ShortcutService {
  constructor(windowService) {
    this.windowService = windowService;
    this.registeredShortcuts = new Set();
  }

  registerShortcuts() {
    Object.entries(SHORTCUTS).forEach(([role, shortcut]) => {
      this.registerShortcut(shortcut, () => {
        const mainWindow = this.windowService.getMainWindow();
        if (mainWindow) {
          mainWindow.webContents.send('set-timer', ROLES[role]);
        }
      });
    });
  }

  registerShortcut(shortcut, callback) {
    if (globalShortcut.register(shortcut, callback)) {
      this.registeredShortcuts.add(shortcut);
    }
  }

  unregisterAllShortcuts() {
    this.registeredShortcuts.forEach(shortcut => {
      globalShortcut.unregister(shortcut);
    });
    this.registeredShortcuts.clear();
  }

  unregisterShortcut(shortcut) {
    if (globalShortcut.unregister(shortcut)) {
      this.registeredShortcuts.delete(shortcut);
    }
  }
}

module.exports = ShortcutService;
