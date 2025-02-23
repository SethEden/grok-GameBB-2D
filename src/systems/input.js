import { ipcRenderer } from 'electron';

export const setupInput = (entities, { canvas, displays, currentDisplayId }) => {
  const updatePosition = (x, y) => {
    const player = entities[0];
    if (player && player.position) {
      player.position.x = x;
      player.position.y = y;
      ipcRenderer.send('update-player-position', { x, y });
    }
  };

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const worldWidth = displays.reduce((sum, d) => sum + d.bounds.width, 0);
    const worldHeight = displays[0].bounds.height;
    const x = (mouseX / canvas.width) * displays[currentDisplayId].bounds.width +
              displays.filter(d => d.id < currentDisplayId).reduce((sum, d) => sum + d.bounds.width, 0) -
              worldWidth / 2;
    const y = -(mouseY / canvas.height) * worldHeight + worldHeight / 2;

    console.log('Mouse:', mouseX, mouseY, 'World:', x, y); // Temp debug
    updatePosition(x, y);
  });
};

// Empty update function for now—can add frame-based input later
export const updateInput = () => {};