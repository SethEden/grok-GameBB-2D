export const updateRendering = ({ BABYLON, scene, camera, canvas }) => (entities) => {
  entities.forEach(entity => {
    if (entity.position && entity.renderable) {
      const { renderObject } = entity.renderable;
      renderObject.position.x = entity.position.x;
      renderObject.position.y = entity.position.y;
    }
  });
};