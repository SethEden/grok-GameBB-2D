import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store all windows
const windows = [];

const createWindows = async () => {
  const { screen } = await import('electron');
  const displays = screen.getAllDisplays();

  displays.forEach((display, index) => {
    const window = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    window.loadURL(
      new URL(`file://${path.join(__dirname, '../public/index.html')}`).href
    );

    windows.push({ window, displayId: index, bounds: display.bounds });
  });

  // Share window info with renderer processes
  windows.forEach(({ window }) => {
    window.webContents.on('did-finish-load', () => {
      window.webContents.send('display-info', {
        displays: windows.map(w => ({ id: w.displayId, bounds: w.bounds })),
        currentDisplayId: windows.find(w => w.window === window).displayId,
      });
    });
  });

  return windows;
};

app.whenReady().then(() => {
  createWindows().catch(err => {
    throw new Error(`Failed to create windows: ${err}`);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
});

app.on('activate', () => {
  if (windows.length === 0) {
    createWindows().catch(err => {
      throw new Error(`Failed to recreate windows: ${err}`);
    });
  }
});