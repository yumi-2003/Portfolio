import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Hamburger from "./Hamburger";
import { siteConfig } from "../../config/site";
import { NavLink } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Split logo for coloring like the title
  const firstInitial = siteConfig.firstName.charAt(0);
  const lastInitial = siteConfig.LastName.charAt(0);

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-transparent">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-8 md:px-12 py-10">
          {/* Logo - Left */}
          <NavLink to="/" className="text-xl md:text-2xl font-serif tracking-tighter z-[110] flex gap-1.5 hover:opacity-80 transition-opacity">
            <span className="text-white font-bold">{firstInitial}</span>
            <span className="text-white/60 font-bold">{lastInitial}</span>
          </NavLink>

          {/* Nav - Center - Only visible on desktop (lg+) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
            <DesktopNav />
          </div>

          {/* Admin & Mobile Toggle - Right */}
          <div className="flex items-center gap-6 md:gap-8">
            <NavLink 
              to={siteConfig.adminLink.path}
              className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-accent transition-colors group"
            >
              <LayoutGrid size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>{siteConfig.adminLink.name}</span>
            </NavLink>
            
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </header>
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
