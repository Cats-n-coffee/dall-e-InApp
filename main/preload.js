const { contextBridge, ipcRenderer } = require('electron')

const electronApi = {
  getProfile: () => ipcRenderer.invoke('auth:get-profile'),
  logout: () => ipcRenderer.send('auth:logout'),
  makeApiRequest: (inputString) => ipcRenderer.invoke('make-open-ai-request', inputString),
};

process.once('loaded', () => {
  contextBridge.exposeInMainWorld('electronApi', electronApi);
});