import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({ isOpen, setIsOpen }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-40 bg-[#0d0e15] flex flex-col pt-32 px-10 md:hidden"
        >
          <div className="flex flex-col">
            {siteConfig.navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="group py-8 border-b border-gray-800 flex items-baseline gap-4"
              >
                <span className="font-mono text-[10px] text-accent font-bold tracking-tighter">
                  {`0${index + 1}.`}
                </span>
                <span className="font-serif text-5xl text-gray-400 group-hover:text-white transition-colors">
                  {link.name}
                </span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pb-10 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-gray-500">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-white mt-2"
            >
              ADMIN DASHBOARD
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
