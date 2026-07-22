import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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

  // Clean up (optional, good practice)
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
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>Digital Twin for Indian Railways</h4>
                  <p>AI-Driven Transit Optimization</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, Pandas, OpenCV, Predictive modeling</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Digital Twin" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Y-dix Brand Platform</h4>
                  <p>Full-Stack Dev with AR Integration</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js, Python, AR photo frames</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Y-dix Brand Platform" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>AI Communication Firewall</h4>
                  <p>Intelligent Android Notify Filter</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Kotlin, FastAPI, Google Gemini 1.5 Flash</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="AI Communication Firewall" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
