import { ipcRenderer } from 'electron';

export const setupInput = (entities, { canvas, displays, currentDisplayId }) => {
  const updatePosition = (x, y) => {
    const player = entities[0];
    if (player && player.position) {
      const worldWidth = displays.reduce((sum, d) => sum + d.bounds.width, 0);
      const worldHeight = displays[0].bounds.height; // Assuming uniform height
      const screenWidth = canvas.width;
      const screenHeight = canvas.height;
      const minX = Math.min(...displays.map(d => d.bounds.x));
      const currentDisplay = displays.find(d => d.id === currentDisplayId);

      // Calculate display's starting X in centered world coordinates
      const totalWidth = worldWidth;
      const displayStartX = (currentDisplay.bounds.x - minX) - totalWidth / 2;

      // Map mouse coordinates to world coordinates
      const worldX = displayStartX + x;
      const worldY = (screenHeight / 2) - y;

      player.position.x = worldX;
      player.position.y = worldY;
      ipcRenderer.send('update-player-position', { x: worldX, y: worldY });
    }
  };

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    updatePosition(mouseX, mouseY);
  });

  canvas.addEventListener('click', () => {
    const player = entities[0];
    if (player && player.position) {
      ipcRenderer.send('log', `Clicked at ${player.position.x}, ${player.position.y}`);
    }
  });
};

export const updateInput = () => {};