import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site";

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex gap-10 font-mono text-[11px] tracking-widest uppercase items-center">
      {siteConfig.navLinks.map((link, index) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `relative group flex items-center gap-2 py-1 transition-colors ${
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <span className="text-accent font-bold">{`0${index + 1}.`}</span>
          <span>{link.name}</span>
          
          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-accent w-0 group-hover:w-full"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            initial={false}
          />
        </NavLink>
      ))}
    </nav>
  );
};

export default DesktopNav;
