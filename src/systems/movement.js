export const updateMovement = (entities, delta) => {
  entities.forEach(entity => {
    if (entity.position && entity.velocity) {
      entity.position.x += entity.velocity.vx * delta;
      entity.position.y += entity.velocity.vy * delta;
    }
  });
};