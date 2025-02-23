export const createRenderable = ({ BABYLON, scene, type, size }) => {
  const mesh = type === 'box'
    ? BABYLON.MeshBuilder.CreateBox('box', { size }, scene)
    : BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: size }, scene);
  return { mesh };
};