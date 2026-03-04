import React from "react";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroBottomInfo from "./HeroBottomInfo";
import { MoveDown } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-40 pb-20 px-8 md:px-12 lg:px-24 overflow-hidden bg-[#0d0e15]">
      {/* Background large number indicator */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 text-[5rem] md:text-[10rem] lg:text-[15rem] font-bold text-accent/5 pointer-events-none select-none z-0">
        01
      </div>

      <div className="relative z-10 flex flex-col gap-12 lg:gap-20 flex-grow">
        <div className="flex flex-col gap-6 lg:gap-10">
          <HeroSubtitle />
          <HeroTitle />
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 pt-10 mt-16 lg:mt-0">
        <HeroBottomInfo />
      </div>

      {/* Scroll indicator icon */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent opacity-50 animate-bounce">
        <MoveDown size={20} />
      </div>

      {/* Top vertical line decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-accent to-transparent z-[60] opacity-30"></div>
    </section>
  );
};

export default HeroSection;
