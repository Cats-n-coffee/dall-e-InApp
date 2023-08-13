const { app, ipcMain, BrowserWindow } = require('electron');
const { createAuthWindow, createLogoutWindow } = require('./main/authProcess');
const createAppWindow = require('./main/appProcess');
const authService = require('./services/authService');
const apiService = require('./services/apiService');

async function showWindow() {
  try {
    await authService.refreshTokens();
    createAppWindow();
  } catch (error) {
    createAuthWindow();
  }
}

app.on('ready', () => {
  ipcMain.handle('auth:get-profile', authService.getProfile);
  ipcMain.handle('make-open-ai-request', (e, args) => {
    return apiService.makeApiRequest(args);
  });
  ipcMain.on('auth:logout', () => {
    BrowserWindow.getAllWindows().forEach((win) => win.close());
    createLogoutWindow();
  });

  showWindow();
})

app.on('window-all-closed', () => {
  app.quit();
});