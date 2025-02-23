export const updateRendering = ({ BABYLON, scene, camera, canvas }) => (entities) => {
  entities.forEach(entity => {
    if (entity.position && entity.renderable) {
      console.log('Rendering entity at:', entity.position);
      entity.renderable.mesh.position.x = entity.position.x;
      entity.renderable.mesh.position.y = entity.position.y;
      entity.renderable.mesh.position.z = entity.position.z;
    }
  });
};