const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen pt-32 pb-20 px-8 md:px-12 lg:px-24 bg-[#0d0e15]"
    >
      {/* Background large number indicator */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 text-[5rem] md:text-[10rem] lg:text-[15rem] font-bold text-accent/5 pointer-events-none select-none z-0">
        04
      </div>
      <h2 className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-4">
        04. Contact
      </h2>
      <h1 className="text-5xl md:text-7xl font-serif text-white mb-16">
        Get In Touch
      </h1>
      <div>Contact implementation...</div>
    </section>
  );
};

export default Contact;
