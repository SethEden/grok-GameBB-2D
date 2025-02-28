import { MeshBuilder } from '../node_modules/@babylonjs/core/Meshes/meshBuilder.js';
import { StandardMaterial } from '../node_modules/@babylonjs/core/Materials/standardMaterial.js';

export const createUnlitPlane = (name, size, position, rotation, color, scene) => {
  const plane = MeshBuilder.CreatePlane(name, { size }, scene);
  plane.position = position;
  plane.rotation = rotation; // Z = -90° for XY alignment
  console.log('Mesh created:', { name, position, rotation: { x: plane.rotation.x, y: plane.rotation.y, z: plane.rotation.z } });

  const material = new StandardMaterial(`${name}-material`, scene);
  material.emissiveColor = color; // Unlit, self-illuminated
  material.backFaceCulling = false; // Two-sided
  plane.material = material;
  console.log('Material applied:', material);

  return plane;
};