import { ipcRenderer } from 'electron';

export const createRenderable = ({ BABYLON, scene, spriteManager, type, size }) => {
  let renderObject;

  switch (type) {
    case 'sprite':
      renderObject = new BABYLON.Sprite('sprite', spriteManager);
      renderObject.size = size; // Width/height of sprite
      break;
    case 'circle':
      renderObject = BABYLON.MeshBuilder.CreateDisc('circle', { radius: size / 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      renderObject.position.z = 0;
      logVertices(renderObject, 'custom');
      break;
    case 'square':
      renderObject = BABYLON.MeshBuilder.CreatePlane('square', { size, sideOrientation: BABYLON.Mesh.DOUBLESIDE },  scene);
      renderObject.position.z = 0;
      logVertices(renderObject, 'custom');
      break;
    case 'custom':
        renderObject = customMesh;
        renderObject.position.z = 0;
        logVertices(renderObject, 'custom');
        break;
    default:
      // Fallback to sprite if type is unrecognized
      renderObject = new BABYLON.Sprite('default', spriteManager);
      renderObject.size = size;
  }

  const material = new BABYLON.StandardMaterial('mat', scene);
  material.diffuseColor = new BABYLON.Color3(0, 1, 0); // Bright green
  material.emissiveColor = new BABYLON.Color3(0, 1, 0); // Glow green
  renderObject.material = material;

  if (renderObject.isVisible !== undefined) {
    ipcRenderer.send('log', `Renderable ${type} visibility: ${renderObject.isVisible}`);
  } else {
    ipcRenderer.send('log', `Renderable ${type} no visibility property`);
  }

  ipcRenderer.send('log', `Created renderable: ${type}, mesh: ${renderObject.name}`);
  return { renderObject };
};

// Helper to log vertices
const logVertices = (mesh, type) => {
  if (mesh && mesh.geometry) {
    const vertices = mesh.geometry.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    if (vertices) {
      const vertexCount = vertices.length / 3; // x, y, z per vertex
      let vertexLog = `Vertices for ${type} (${mesh.name}):`;
      for (let i = 0; i < vertexCount; i++) {
        const x = vertices[i * 3];
        const y = vertices[i * 3 + 1];
        const z = vertices[i * 3 + 2];
        vertexLog += ` (${x}, ${y}, ${z})`;
      }
      ipcRenderer.send('log', vertexLog);
    } else {
      ipcRenderer.send('log', `No vertices for ${type} (${mesh.name})`);
    }
  } else {
    ipcRenderer.send('log', `No geometry for ${type}`);
  }
};