const { app } = require('electron')
const WindowService = require('./services/windowService')
const ShortcutService = require('./services/shortcutService')
const FileService = require('./services/fileService')

const windowService = new WindowService()
const fileService = new FileService()
const shortcutService = new ShortcutService(windowService, fileService)

app.whenReady().then(() => {
  windowService.createMainWindow()
  shortcutService.registerShortcuts()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  windowService.recreateMainWindow()
})

// Clean up shortcuts when the app is quitting
app.on('will-quit', () => {
  shortcutService.unregisterAllShortcuts()
})
