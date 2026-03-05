import HeroSection from "../components/hero/HeroSection";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0d0e15] text-white">
      <div id="home">
        <HeroSection />
      </div>
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
