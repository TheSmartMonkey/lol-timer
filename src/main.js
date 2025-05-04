const { app, ipcMain } = require('electron');
const WindowService = require('./services/windowService');
const ShortcutService = require('./services/shortcutService');
const FileService = require('./services/fileService');

const windowService = new WindowService();
const fileService = new FileService();
const shortcutService = new ShortcutService(windowService, fileService);

ipcMain.on('open-settings', () => {
  windowService.createSettingsWindow();
});

ipcMain.on('get-shortcuts', (event) => {
  const shortcuts = fileService.readShortcuts();
  event.reply('shortcuts-data', shortcuts);
});

ipcMain.on('save-shortcuts', (event, shortcuts) => {
  if (fileService.saveShortcuts(shortcuts)) {
    shortcutService.updateShortcuts(shortcuts);
    windowService.closeSettingsWindow();
  }
});

ipcMain.on('close-settings', () => {
  windowService.closeSettingsWindow();
});

app.whenReady().then(() => {
  windowService.createMainWindow();
  shortcutService.registerShortcuts();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  windowService.recreateMainWindow();
});

app.on('will-quit', () => {
  shortcutService.unregisterAllShortcuts();
});
