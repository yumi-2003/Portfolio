import { motion } from "framer-motion";
import React from "react";
import { siteConfig } from "../../config/site";

const HeroTitle: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col items-start gap-1 w-full"
    >
      <h1 className="text-[4.5rem] md:text-[8rem] lg:text-[11rem] font-serif leading-[0.85] text-white tracking-tighter">
        {siteConfig.firstName}
      </h1>
      <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-24 w-full">
        <h1 className="text-[4.5rem] md:text-[8rem] lg:text-[11rem] font-serif leading-[0.85] text-accent ml-4 md:ml-12 lg:ml-20 tracking-tighter whitespace-nowrap">
          {siteConfig.LastName}
        </h1>
        
        {/* Bio text integrated here to stay on the same row on large screens */}
        <div className="max-w-xl pb-4 lg:pb-8">
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed md:leading-10 font-serif">
            I craft elegant digital experiences with modern web technologies. 
            Passionate about clean code, intuitive interfaces, and scalable architectures.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroTitle;
