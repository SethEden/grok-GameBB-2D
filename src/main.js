import { app, BrowserWindow, screen } from 'electron';

const createWindow = () => {
  const displays = screen.getAllDisplays();
  const minX = Math.min(...displays.map(display => display.bounds.x));
  const minY = Math.min(...displays.map(display => display.bounds.y));
  const maxX = Math.max(...displays.map(display => display.bounds.x + display.bounds.width));
  const maxY = Math.max(...displays.map(display => display.bounds.y + display.bounds.height));
  const width = maxX - minX;
  const height = maxY - minY;

  console.log({ minX, minY, width, height })

  const window = new BrowserWindow({
    x: minX,
    y: minY,
    width,
    height,
    fullscreenable: false, // Prevents fullscreen mode
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Simplified setup; consider security adjustments later
    }
  });

  // Explicitly set the bounds after creation to span all monitors
  window.setBounds({ x: minX, y: minY, width, height });

  window.loadFile('src/index.html');
  window.webContents.openDevTools(); // Add this line
};

app.whenReady().then(createWindow);