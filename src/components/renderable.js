export const createRenderable = ({ BABYLON, scene, spriteManager, type, size }) => {
  let renderObject;

  switch (type) {
    case 'sprite':
      renderObject = new BABYLON.Sprite('sprite', spriteManager);
      renderObject.size = size; // Width/height of sprite
      break;
    case 'circle':
      renderObject = BABYLON.MeshBuilder.CreateDisc('circle', { radius: size / 2 }, scene);
      renderObject.rotation.x = Math.PI / 2; // Face the camera in 2D
      break;
    case 'square':
      renderObject = BABYLON.MeshBuilder.CreatePlane('square', { size }, scene);
      renderObject.rotation.x = Math.PI / 2; // Face the camera in 2D
      break;
    default:
      // Fallback to sprite if type is unrecognized
      renderObject = new BABYLON.Sprite('default', spriteManager);
      renderObject.size = size;
  }

  return { renderObject };
};