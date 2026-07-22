import * as THREE from "three";

/**
 * The base character mesh ships with skin, shirt, pants and shoes all sharing a
 * single flat gray "default" material, which makes the avatar look lifeless.
 *
 * This util walks the loaded model and, for each part we recognise by node name,
 * clones its material (so recolouring one part never bleeds into the others that
 * share the same source material) and applies a lively stylised palette.
 *
 * Tweak the hex values / roughness below to restyle the character — nothing else
 * needs to change.
 */

type PartStyle = {
  color: number;
  roughness?: number;
  metalness?: number;
};

// Keyed by the node name as it appears in the GLB (and therefore mesh.name).
const PALETTE: Record<string, PartStyle> = {
  // ---- Skin (face, ears, neck, hands) ----
  "Plane.007": { color: 0xe0a884, roughness: 0.62, metalness: 0 }, // face / head
  "Ear.001": { color: 0xe0a884, roughness: 0.62, metalness: 0 },
  Neck: { color: 0xe0a884, roughness: 0.62, metalness: 0 },
  Hand: { color: 0xe0a884, roughness: 0.62, metalness: 0 },

  // ---- Clothing ----
  "BODY.SHIRT": { color: 0x0a192f, roughness: 0.78, metalness: 0.02 }, // dark navy blue
  Pant: { color: 0x111111, roughness: 0.82, metalness: 0 }, // black
  Shoe: { color: 0x2c2826, roughness: 0.7, metalness: 0.05 }, // dark sneakers
  Sole: { color: 0xe7e1d6, roughness: 0.85, metalness: 0 }, // off-white soles

  // ---- Hair (kept dark, just warmed slightly so it isn't pure black) ----
  hair: { color: 0x171210, roughness: 0.6, metalness: 0.05 },
  Eyebrow: { color: 0x171210, roughness: 0.6, metalness: 0 },
};

// GLTFLoader sanitises node names via PropertyBinding.sanitizeNodeName, which
// strips ".", ":", "/" and brackets — so "BODY.SHIRT" arrives as "BODYSHIRT"
// and "Plane.007" as "Plane007". Normalise both the palette keys and the runtime
// mesh name the same way so the lookup matches regardless of those characters.
const normalize = (name: string) => name.replace(/[\s.:/[\]]/g, "");

const NORMALIZED_PALETTE: Record<string, PartStyle> = Object.fromEntries(
  Object.entries(PALETTE).map(([key, style]) => [normalize(key), style])
);

const applyCharacterColors = (mesh: THREE.Mesh) => {
  // Hide the screenlight dummy mesh which looks like a black dot on the forehead
  if (mesh.name.toLowerCase().includes("screenlight")) {
    mesh.visible = false;
    return;
  }

  const key = (mesh.userData?.name as string) ?? mesh.name;
  const style = NORMALIZED_PALETTE[normalize(key)];
  if (!style) return;

  const applyStyle = (mat: THREE.Material) => {
    // Some formats use MeshBasic or MeshPhong instead of Standard
    if ('color' in mat) {
      (mat as any).color = new THREE.Color(style.color);
    }
    if (style.roughness !== undefined && 'roughness' in mat) {
      (mat as any).roughness = style.roughness;
    }
    if (style.metalness !== undefined && 'metalness' in mat) {
      (mat as any).metalness = style.metalness;
    }
    mat.needsUpdate = true;
  };

  // Clone so parts that share the source material keep independent colours.
  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map(m => m.clone());
    mesh.material.forEach(applyStyle);
  } else if (mesh.material) {
    mesh.material = mesh.material.clone();
    applyStyle(mesh.material);
  }
};

export default applyCharacterColors;
