import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Decal } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/python.svg",
  "/images/pytorch.svg",
  "/images/pandas.svg",
  "/images/opencv.svg",
  "/images/fastapi.svg",
  "/images/cpp.svg",
  "/images/kotlin.svg",
  "/images/gcp.svg",
  "/images/googlegemini.svg",
  "/images/tensorflow.svg",
  "/images/numpy.svg",
  "/images/nextdotjs.svg",
  "/images/tailwindcss.svg",
  "/images/javascript.svg",
  "/images/typescript.svg",
  "/images/mysql.svg",
  "/images/arduino.svg",
  "/images/raspberrypi.svg",
  "/images/git.svg",
  "/images/linux.svg"
];
const textures = imageUrls.map((url) => textureLoader.load(url));
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const spheres = [...Array(30)].map(() => ({
  scale: [1.1, 1.5, 1.2, 1.5, 1.5][Math.floor(Math.random() * 5)],
}));

const baseMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  metalness: 0.5,
  roughness: 1,
  clearcoat: 0.1,
});

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture: THREE.Texture;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baseMaterial}
        rotation={[0.3, 1, 1]}
      >
        <Decal
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          scale={1.2}
        >
          <meshPhysicalMaterial
            map={texture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
        <Decal
          position={[0, 0, -1]}
          rotation={[0, Math.PI, 0]}
          scale={1.2}
        >
          <meshPhysicalMaterial
            map={texture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      </mesh>
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }: { vec?: THREE.Vector3; isActive: boolean; }) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const techSkillsData = [
  { category: "Python (Advanced)", items: "Expertise in Python for backend, AI, and automation." },
  { category: "AI & Machine Learning", items: "Google Gemini API, Deep Reinforcement Learning, PyTorch, TensorFlow, NLP, OpenCV, Pandas, NumPy, Matplotlib" },
  { category: "Full-Stack Web Development", items: "Next.js, Tailwind CSS, JavaScript ES6+, TypeScript, SQL" },
  { category: "System Architecture & API Design", items: "FastAPI, System Architecting" },
  { category: "App Development", items: "Kotlin, Android NotificationListenerService" },
  { category: "Hardware & IoT", items: "Arduino, Raspberry Pi, Custom Modem Integration" },
  { category: "Core Languages", items: "C++" },
  { category: "Tools & Security", items: "Git, Linux, Penetration Testing" }
];

const softSkillsData = [
  {
    title: "Strategic Leadership & Team Building",
    reason: "I actively serve as the Lead Organizer for Aahvaan 2025, Technical Lead at the E-Cell, Tech Coordinator for the Student Activity Center, and hold leadership roles in the NCC and RSS."
  },
  {
    title: "High-Level Multitasking",
    reason: "I successfully balance building multiple deep-tech startups (Y-dix, Zenfine, Navra Studio), executing a summer internship at IIT Ropar, completing my B.Tech thesis, and training for national-level Karate competitions."
  },
  {
    title: "Complex Problem Solving",
    reason: "I engineer solutions for massive real-world problems, such as building a Digital Twin using AI to optimize Indian Railways transit schedules, and developing a dual-layer AI Communication Firewall to eliminate notification overload."
  },
  {
    title: "Relentless Discipline & Determination",
    reason: "I maintain a highly structured routine balancing rigorous coding sessions, strict academic prep for the GRE/TOEFL, physical fitness goals (gaining 15kg mass), and athletic recovery after securing a National 8th position in Karate."
  },
  {
    title: "Quick Learner & High Adaptability",
    reason: "I rapidly acquire skills across entirely different domains, seamlessly transitioning between developing AR lifestyle platforms, building cross-platform 4G-to-5G hardware modems, and architecting autonomous multi-agent AI systems."
  }
];

const SoftSkillCard = ({ title, reason }: { title: string, reason: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '1rem',
        boxShadow: isOpen ? '0 4px 20px rgba(194, 164, 255, 0.2)' : 'none',
        borderLeft: isOpen ? '4px solid #c2a4ff' : '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{title}</h3>
        <span style={{ fontSize: '1.5rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
      </div>
      <div style={{
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, opacity 0.3s ease',
        opacity: isOpen ? 1 : 0,
        marginTop: isOpen ? '1rem' : '0'
      }}>
        <p style={{ margin: 0, color: '#adacac', lineHeight: '1.6', fontSize: '1.05rem' }}>{reason}</p>
      </div>
    </div>
  );
};

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const elem = document.getElementById("techstack-bubbles");
      if (elem) {
        const threshold = elem.getBoundingClientRect().top + scrollY - window.innerHeight;
        setIsActive(scrollY > threshold);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // We no longer need the materials array since we pass the texture directly to the SphereGeo for Decal mapping

  return (
    <div style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Tech Skills Grid */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 500 }}>Technical <span style={{ color: '#c2a4ff' }}>Skills</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {techSkillsData.map((skill, index) => (
            <div key={index} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#c2a4ff', fontSize: '1.3rem' }}>{skill.category}</h3>
              <p style={{ margin: 0, color: '#adacac', lineHeight: 1.5 }}>{skill.items}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 3D Bubbles Animation */}
      <div id="techstack-bubbles" className="techstack" style={{ height: '70vh', marginTop: '2rem', marginBottom: '2rem' }}>
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo key={i} {...props} texture={textures[Math.floor(Math.random() * textures.length)]} isActive={isActive} />
            ))}
          </Physics>
          <Environment files="/models/char_enviorment.hdr" environmentIntensity={0.5} environmentRotation={[0, 4, 2]} />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 3. Soft Skills Accordion */}
      <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box', paddingBottom: '8rem' }}>
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 500 }}>Soft <span style={{ color: '#c2a4ff' }}>Skills</span></h2>
        <div>
          {softSkillsData.map((skill, index) => (
            <SoftSkillCard key={index} title={skill.title} reason={skill.reason} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default TechStack;
