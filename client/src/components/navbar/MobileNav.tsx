import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { LayoutGrid } from "lucide-react";

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
          className="fixed inset-0 z-[150] bg-[#0d0e15] flex flex-col pt-40 px-8 md:px-12 lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {siteConfig.navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="group py-6 border-b border-white/5 flex items-baseline gap-4"
              >
                <span className="font-mono text-[10px] text-accent font-bold tracking-tighter">
                  {`0${index + 1}.`}
                </span>
                <span className="font-serif text-4xl md:text-6xl text-gray-500 group-hover:text-white transition-colors">
                  {link.name}
                </span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pb-12">
            <NavLink
              to={siteConfig.adminLink.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors"
            >
              <LayoutGrid size={16} />
              <span>{siteConfig.adminLink.name}</span>
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
