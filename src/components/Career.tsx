import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Full Stack Developer</h4>
                <h5>Y-dix</h5>
              </div>
              <h3>12/2025 - 02/2026</h3>
            </div>
            <p>
              Architected and deployed a Gen Z-focused lifestyle platform using Next.js and Tailwind CSS. Engineered an innovative AR-integrated product line, bridging physical lifestyle goods with digital experiences. Developed the brand identity and go-to-market strategy.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer Intern</h4>
                <h5>Prodigy InfoTech</h5>
              </div>
              <h3>09/2024 - 10/2024</h3>
            </div>
            <p>
              Designed and developed responsive web interfaces using HTML, CSS, and JavaScript. Implemented front-end features ensuring cross-browser compatibility.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Technology in Computer Science</h4>
                <h5>Engineering College Bikaner</h5>
              </div>
              <h3>08/2023 - Present</h3>
            </div>
            <p>
              Active tech co-ordinator for the Student Activity Center. Technical Lead at E-Cell, and NCC Cadet. Focus on DSA, System Architecture, and AI engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
