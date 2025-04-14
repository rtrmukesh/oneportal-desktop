const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) {
        element.textContent = text;
      }
    };
  
    replaceText('app-version', require('electron').app.getVersion());
  });
  

  contextBridge.exposeInMainWorld('estore', {
    setItem: (key, value) => ipcRenderer.invoke('set-item', key, value),
    getItem: (key) => ipcRenderer.invoke('get-item', key),
    removeItem: (key) => ipcRenderer.invoke('remove-item', key),
    clear: () => ipcRenderer.invoke('clear-store'),
  });