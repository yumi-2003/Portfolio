import { motion, type Variants } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { Github, Linkedin, Twitter, Mail, ArrowRight, MoveDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const HeroBottomInfo: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 text-gray-400"
    >
      {/* Left: Location & Socials Wrapper for Tablet/Mobile or separate for Desktop */}
      <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 w-full lg:w-auto">
        {/* Location & Status */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.2em] uppercase font-serif whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(255,51,102,0.5)]"></div>
          {siteConfig.location} — Available for work
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center gap-8 lg:gap-10">
          <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300"><Github size={20} strokeWidth={1.5} /></a>
          <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300"><Linkedin size={20} strokeWidth={1.5} /></a>
          <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300"><Twitter size={20} strokeWidth={1.5} /></a>
          <a href={`mailto:${siteConfig.socialLinks.email}`} className="hover:text-accent transition-colors duration-300"><Mail size={20} strokeWidth={1.5} /></a>
        </motion.div>
      </div>

      {/* Right: CTA Buttons */}
      <motion.div variants={itemVariants} className="flex items-center gap-10 lg:gap-14 w-full lg:w-auto justify-center lg:justify-end">
        <Link to={siteConfig.navLinks.find(l => l.name === "Projects")?.path ?? "/#projects"} className="flex items-center gap-6 group">
          <span className="text-white font-serif text-xl md:text-2xl tracking-wide group-hover:text-accent transition-colors duration-300">
            View Work
          </span>
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:scale-105 transition-all duration-300">
            <ArrowRight size={24} className="text-white group-hover:text-accent transition-colors duration-300" />
          </div>
        </Link>
        
        <a href="/resume.pdf" className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.3em] uppercase hover:text-white transition-colors duration-300 font-mono">
          <MoveDown size={14} className="text-gray-500" />
          Resume
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroBottomInfo;
