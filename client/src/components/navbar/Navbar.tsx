import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Hamburger from "./Hamburger";
import { siteConfig } from "../../config/site";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const initialName = `${siteConfig.firstName.charAt(0)}${siteConfig.LastName.charAt(0)}`;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#0d0e15]/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-8 md:px-12 py-8">
          {/* Logo - Left */}
          <NavLink to="/" className="text-xl font-bold font-serif tracking-tighter z-50">
            {initialName.split('').join(' ')}
          </NavLink>

          {/* Nav - Center */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <DesktopNav />
          </div>

          {/* Admin - Right */}
          <div className="flex items-center gap-6">
            <NavLink 
              to={siteConfig.adminLink.path}
              className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
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
