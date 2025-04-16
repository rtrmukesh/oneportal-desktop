require('dotenv').config(); // Load environment variables from .env file

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { existsSync } = require('fs');

app.disableHardwareAcceleration();
app.setName('Oneportal Desktop');

const store = new Store();

const isDev = process.env.NODE_ENV === 'development';
const appIcon = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, 'resources', 'app', 'icon.png') // For packaged app
  : path.join(__dirname, 'icon.png');

let win;

function createWindow() {
  // Ensure the development server is running before creating the window
  if (isDev) {
    const serverUrl = process.env.VITE_APP_URL || 'http://localhost:8001';
    const http = require('http');
    
    // Check if the local server is running
    http.get(serverUrl, (response) => {
      if (response.statusCode === 200) {
        console.log('Server is running...');
      } else {
        console.error(`Server returned an error status: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      console.error(`Could not connect to the server: ${err.message}`);
    });
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenu(null); // optional

  if (isDev) {
    // Load the development URL
    win.loadURL(process.env.VITE_APP_URL || 'http://localhost:8001');
    win.webContents.openDevTools();
  } else {
    // Load the packaged app's index.html
    win.loadFile(path.join(__dirname, 'dist/index.html'));
    console.log('Exists:', existsSync(path.join(__dirname, 'dist/index.html')));
  }
  console.log('NODE_ENV >>>', process.env.NODE_ENV);
  win.on('closed', () => {
    win = null;
  });
}

// IPC handlers for managing local storage
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
