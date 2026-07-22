import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    let links = document.querySelectorAll(".header ul a.scroll-link");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let sectionId = elem.getAttribute("data-href");
          if (sectionId) {
            const target = document.querySelector(sectionId);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      });
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          HJ
        </a>
        <ul>
          <li>
            <a className="scroll-link" data-href="#about" href="/#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a className="scroll-link" data-href="#work" href="/#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="/blog">
              <HoverLinks text="BLOG" />
            </a>
          </li>
          <li>
            <a className="scroll-link" data-href="#contact" href="/#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
