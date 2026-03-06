import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchProjects } from "../features/projects/projectSlice";

const Projects = () => {
  const dispatch = useAppDispatch();

  const { projects, loading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <section id="projects" className="relative min-h-screen pt-32 pb-20 px-8 md:px-12 lg:px-24 bg-[#0d0e15]">
      {/* Background large number indicator */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 text-[5rem] md:text-[10rem] lg:text-[15rem] font-bold text-accent/5 pointer-events-none select-none z-0">
        03
      </div>
      <h2 className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-4">03. Projects</h2>
      <h1 className="text-5xl md:text-7xl font-serif text-white mb-16">Featured Work</h1>

      {loading && <p className="text-gray-300">Loading projects...</p>}

      {!loading && error && <p className="text-red-400">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-400">No projects available.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project._id} className="rounded-lg border border-white/10 p-5 bg-white/5">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-2 text-gray-300">{project.description}</p>
              {project.techStack?.length > 0 && (
                <p className="mt-3 text-sm text-gray-400">{project.techStack.join(" | ")}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
