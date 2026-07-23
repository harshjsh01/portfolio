import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    id: "01",
    title: "Y-dix: AR E-Commerce",
    subtitle: "DTC platform with WebAR",
    desc: "A Gen Z-inspired e-commerce platform built for selling Augmented Reality frames. Features Mind-AR, Three.js, and a custom zero-fee Dynamic UPI Payment Bridge.",
    tools: "Next.js 15, TypeScript, Tailwind CSS, Framer Motion",
    link: "https://github.com/harshjsh01/ydix-web",
    image: "/images/projects/ydix.png"
  },
  {
    id: "02",
    title: "Focus Warden",
    subtitle: "Productivity Lockdown Suite",
    desc: "A cross-platform productivity app gamified with 'Solo Leveling' mechanics. Uses Gemini API as an AI Content Engine to block distractions.",
    tools: "Gemini API, Supabase, Android, Resend API",
    link: "https://github.com/harshjsh01/shadowmonarch",
    image: "/images/projects/focuswarden.png"
  },
  {
    id: "03",
    title: "Zenfine Costing",
    subtitle: "Cost Intelligence Tool",
    desc: "An enterprise-grade, API-first costing management app. Features an AI CFO Chatbot built with LangChain and RAG for instant variance reports.",
    tools: "Python, FastAPI, Pandas, Electron, React, Tailwind",
    link: "https://github.com/harshjsh01/costing-software",
    image: "/images/projects/zenfine.png"
  },
  {
    id: "04",
    title: "AI Digital Twin",
    subtitle: "Indian Railways Simulation",
    desc: "A prototype decision-support simulation for the Indian Railways aimed at fixing super-saturation delays through AI-driven dynamic dispatching.",
    tools: "Python, C++, FastAPI, Next.js",
    link: "https://github.com/harshjsh01/Digital-Twin"
  },
  {
    id: "05",
    title: "Farewell Ticket System",
    subtitle: "Event Management Portal",
    desc: "A full-stack ticket management and validation system used for large-scale college events featuring unique UUID QR codes and real-time database checks.",
    tools: "Google Forms, Apps Script, Next.js, Supabase, Firebase",
    link: "https://github.com/harshjsh01/farewell2026",
    image: "/images/projects/farewell.png"
  },
  {
    id: "06",
    title: "AI Call Assistant",
    subtitle: "Personal AI Receptionist",
    desc: "A custom Android AI receptionist capable of picking up phone calls, speaking with callers, and filtering spam using NLP voice processing.",
    tools: "Android, Sarvam AI, Bhashini APIs",
    link: "https://github.com/harshjsh01/personal-assistant"
  },
  {
    id: "07",
    title: "Crowd-Source FAQ",
    subtitle: "Open Source Contribution",
    desc: "Forked and contributed to a full-stack FAQ portal designed to handle 1 million registered users with semantic vector search.",
    tools: "TypeScript, Vector Search, AI Moderation",
    link: "https://github.com/vicharanashala/cs5"
  },
  {
    id: "08",
    title: "PyBe",
    subtitle: "Python Learning Prototype",
    desc: "Forked contribution of a scenario-driven Python learning platform prototype.",
    tools: "JavaScript",
    link: "https://github.com/harshjsh01/pybe"
  },
  {
    id: "09",
    title: "Hardware & Early AI",
    subtitle: "Foundational Projects",
    desc: "Early AI projects like Max and Baby (Python chatbots), and Timer Relay, an embedded systems project for Arduino.",
    tools: "Python, C++, Arduino",
    link: "https://github.com/harshjsh01",
    image: "/images/projects/hardware.png"
  }
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={project.id} 
              className="work-box"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.id}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.5, flex: 1 }}>
                  {project.desc}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <h4 style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tools and features</h4>
                  <p style={{ fontSize: '1rem', fontWeight: 500 }}>{project.tools}</p>
                </div>
              </div>
              <WorkImage image={project.image || "/images/placeholder.webp"} alt={project.title} link={project.link} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
