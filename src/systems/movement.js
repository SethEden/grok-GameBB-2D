export const updateMovement = (entities) => {
  entities.forEach(entity => {
    if (entity.position && entity.velocity) {
      entity.position.x += entity.velocity.vx;
      entity.position.y += entity.velocity.vy;
      entity.position.z += entity.velocity.vz;
    }
  });
};