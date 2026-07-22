const fs = require('fs');

const glb = fs.readFileSync('character.glb');
const jsonChunkLength = glb.readUInt32LE(12);
const jsonChunk = glb.subarray(20, 20 + jsonChunkLength).toString('utf-8');
const data = JSON.parse(jsonChunk);

console.log("----- MESHES -----");
if (data.meshes) {
  data.meshes.forEach(m => console.log(m.name));
}

console.log("----- NODES -----");
if (data.nodes) {
  data.nodes.forEach(n => {
    if (n.mesh !== undefined) {
      console.log(`Node: ${n.name}, Mesh Index: ${n.mesh}`);
    }
  });
}
