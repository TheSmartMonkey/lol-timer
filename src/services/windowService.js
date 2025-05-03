const { BrowserWindow } = require('electron');
const path = require('path');

class WindowService {
  constructor() {
    this.mainWindow = null;
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 400,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    this.mainWindow.loadFile(path.join(__dirname, '../index.html'));

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    return this.mainWindow;
  }

  getMainWindow() {
    return this.mainWindow;
  }

  isMainWindowClosed() {
    return this.mainWindow === null;
  }

  recreateMainWindow() {
    if (this.isMainWindowClosed()) {
      this.createMainWindow();
    }
  }
}

module.exports = WindowService; 
