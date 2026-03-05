// import { useGetProjectsQuery } from "../redux/api/projectApi";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  // const { data: projects, isLoading, error } = useGetProjectsQuery();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[#0d0e15] text-white">
  //       <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[#0d0e15] text-red-500 font-mono">
  //       Error loading projects. Please try again later.
  //     </div>
  //   );
  // }

  return (
    <section id="projects" className="min-h-screen pt-32 pb-20 px-8 md:px-12 lg:px-24 bg-[#0d0e15]">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-4">03. Projects</h2>
        <h1 className="text-5xl md:text-7xl font-serif text-white">Selected Works</h1>
      </motion.div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {projects?.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-900 mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-serif text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-4">
                <a href={project.githubLink} className="text-gray-500 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href={project.liveLink} className="text-gray-500 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div> */}
    </section>
  );
};

export default Projects;
