import { motion } from "framer-motion";
import React from "react";
import { siteConfig } from "../../config/site";

const HeroSubtitle: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4 text-accent tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-2"
    >
      <div className="h-[2px] w-12 bg-accent opacity-80"></div>
      {siteConfig.position}
    </motion.div>
  );
};

export default HeroSubtitle;
