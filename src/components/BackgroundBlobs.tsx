import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles/BackgroundBlobs.css';

const BackgroundBlobs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-blob-1", {
        x: "50vw", y: "20vh", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(".bg-blob-2", {
        x: "-50vw", y: "-20vh", duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-blobs-container">
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
    </div>
  );
};

export default BackgroundBlobs;
