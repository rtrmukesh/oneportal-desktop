require('dotenv').config(); // Load environment variables from .env file

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  
  // For development, load the Vite app
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(process.env.VITE_APP_URL); 
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}


ipcMain.handle('set-item', (_, key, value) => store.set(key, value));
ipcMain.handle('get-item', (_, key) => store.get(key));
ipcMain.handle('remove-item', (_, key) => store.delete(key));
ipcMain.handle('clear-store', () => store.clear());

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
