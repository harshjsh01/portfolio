import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './styles/Startups.css';
import Contact from './Contact';
import BackgroundBlobs from './BackgroundBlobs';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const startups = [
  {
    id: "zenfine",
    name: "Zenfine",
    logo: "/images/startups/zenfine.jpg",
    identity: "Deep-Tech, Hardware & AI Innovation Engine",
    items: [
      { title: "4G-to-5G Connectivity Modem", desc: "A cross-platform hardware solution bridging legacy networks to high-speed 5G" },
      { title: "Railway Twin", desc: "An AI-driven digital twin platform for real-time railway operations and transit optimization" },
      { title: "Shadow Monarch", desc: "An autonomous multi-agent AI system for complex workflow orchestration" },
      { title: "Dev Steno", desc: "A customized, cost-effective mechanical stenography keyboard" }
    ]
  },
  {
    id: "ydix",
    name: "Y-dix",
    logo: "/images/startups/ydix.png",
    identity: "Gen-Z Lifestyle & Augmented Reality (AR) Brand",
    items: [
      { title: "AR-Integrated Merchandise", desc: "Bridges the gap between physical lifestyle goods and digital interactive experiences using smartphone-triggered AR filters" },
      { title: "Digital Platform", desc: "A high-performance digital storefront and brand platform built with Next.js and Python" }
    ]
  },
  {
    id: "navra",
    name: "Navra Studio",
    logo: "/images/startups/navra.png",
    identity: "Full-Stack Creative Agency & Software Development Studio",
    items: [
      { title: "Tech & AI Engineering", desc: "Custom web app development, custom AI/ML integration, and cloud backend solutions" },
      { title: "Digital Growth & Media", desc: "End-to-end social media handling, campaign strategy, and video production" },
      { title: "Featured Client Work", desc: "Complete brand identity and storefront maintenance for luxury brands like Veltrix Grace and heritage jewelers" }
    ]
  },
  {
    id: "eco",
    name: "Eco Initiative: Sustainable Gaushala Project",
    identity: "Self-Sustaining Agriculture & Conservation Sanctuary (Jaipur)",
    items: [
      { title: "Key Focus", desc: "A social impact project operating on an eco-friendly, circular business model powered by organic bi-products like vermicompost and bio-gas" }
    ]
  }
];

const Startups = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  useGSAP(() => {
    gsap.from(".startup-card", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".startups-grid",
        start: "top 85%",
      }
    });

    gsap.from(".startups-title span", {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <div className="startups-page" ref={containerRef}>
      <BackgroundBlobs />
      
      <div className="startups-content">
        <div className="startups-header">
        <h1 className="startups-title">My <span>Startups</span></h1>
        <Link to="/" className="startups-back-link">Back to Portfolio</Link>
      </div>

      <div className="startups-grid">
        {startups.map((startup) => (
          <div key={startup.id} className="startup-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
              {startup.logo && <img src={startup.logo} alt={`${startup.name} logo`} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px' }} />}
              <h2 className="startup-name" style={{ marginBottom: 0 }}>{startup.name}</h2>
            </div>
            <div className="startup-identity">{startup.identity}</div>
            <div className="startup-details">
              <h3>Key Products & Initiatives</h3>
              <ul>
                {startup.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div style={{ marginTop: '5rem', position: 'relative', zIndex: 10 }}>
        <Contact />
      </div>
    </div>
  );
};

export default Startups;
