const { BrowserWindow } = require('electron');
const path = require('path');

class WindowService {
  constructor() {
    this.mainWindow = null;
    this.settingsWindow = null;
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 350,
      height: 450,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    this.mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    return this.mainWindow;
  }

  createSettingsWindow() {
    if (this.settingsWindow) {
      this.settingsWindow.focus();
      return;
    }

    this.settingsWindow = new BrowserWindow({
      width: 500,
      height: 500,
      parent: this.mainWindow,
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    this.settingsWindow.loadFile(path.join(__dirname, '..', 'settings.html'));

    this.settingsWindow.on('closed', () => {
      this.settingsWindow = null;
    });
  }

  getMainWindow() {
    return this.mainWindow;
  }

  getSettingsWindow() {
    return this.settingsWindow;
  }

  isMainWindowClosed() {
    return this.mainWindow === null;
  }

  recreateMainWindow() {
    if (this.mainWindow === null) {
      this.createMainWindow();
    }
  }

  closeSettingsWindow() {
    if (this.settingsWindow) {
      this.settingsWindow.close();
      this.settingsWindow = null;
    }
  }
}

module.exports = WindowService;
