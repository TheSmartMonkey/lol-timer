const { globalShortcut } = require('electron');
const { ROLES } = require('../config/constants');

class ShortcutService {
  constructor(windowService, fileService) {
    this.windowService = windowService;
    this.fileService = fileService;
    this.registeredShortcuts = new Set();
  }

  registerShortcuts() {
    const shortcuts = this.fileService.readShortcuts();
    this.registerShortcutsFromConfig(shortcuts);
  }

  registerShortcutsFromConfig(shortcuts) {
    Object.entries(shortcuts).forEach(([role, shortcut]) => {
      this.registerShortcut(shortcut, () => {
        const mainWindow = this.windowService.getMainWindow();
        if (mainWindow) {
          mainWindow.webContents.send('set-timer', ROLES[role]);
        }
      });
    });
  }

  updateShortcuts(newShortcuts) {
    this.unregisterAllShortcuts();
    this.registerShortcutsFromConfig(newShortcuts);
  }

  registerShortcut(shortcut, callback) {
    if (globalShortcut.register(shortcut, callback)) {
      this.registeredShortcuts.add(shortcut);
    }
  }

  unregisterAllShortcuts() {
    this.registeredShortcuts.forEach((shortcut) => {
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
