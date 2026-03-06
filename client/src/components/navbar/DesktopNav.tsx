import { NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site";

const DesktopNav = () => {
  return (
    <nav className="flex gap-12 font-mono text-[10px] tracking-[0.25em] uppercase items-center">
      {siteConfig.navLinks.map((link, index) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `relative group flex items-center gap-2 transition-colors ${
              isActive ? "text-white" : "text-gray-500 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="text-accent/80 font-bold">{`0${index + 1}.`}</span>
              <span>{link.name}</span>
              <span
                aria-hidden="true"
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default DesktopNav;
