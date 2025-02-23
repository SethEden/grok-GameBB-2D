export const updateMovement = (entities, delta, config = {}) => {
  const { worldWidth = 5760, worldHeight = 1080, wrap = false } = config; // Defaults for 3x1920 monitors
  entities.forEach(entity => {
    if (entity.position && entity.velocity) {
      entity.position.x += entity.velocity.vx * delta;
      entity.position.y += entity.velocity.vy * delta;

      if (wrap) {
        entity.position.x = (entity.position.x + worldWidth / 2) % worldWidth - worldWidth / 2;
        entity.position.y = (entity.position.y + worldHeight / 2) % worldHeight - worldHeight / 2;
      } else {
        entity.position.x = Math.max(-worldWidth / 2, Math.min(worldWidth / 2, entity.position.x));
        entity.position.y = Math.max(-worldHeight / 2, Math.min(worldHeight / 2, entity.position.y));
      }
    }
  });
};