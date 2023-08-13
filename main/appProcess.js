const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createAppWindow = () => {
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./renderers/index.html');
  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createAppWindow();
});

module.exports = createAppWindow;