import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hamburger = ({ isOpen, setIsOpen }: Props) => {
  const lineVariants = {
    closed: (i: number) => ({
      rotate: 0,
      y: i * 8,
      transition: { duration: 0.2 },
    }),
    open: (i: number) => ({
      rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
      y: 8,
      opacity: i === 1 ? 0 : 1,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <button
      className="md:hidden relative w-6 h-5 z-[100] flex flex-col justify-between"
      onClick={() => setIsOpen(!isOpen)}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          className="absolute w-full h-[1.5px] bg-white origin-center"
          style={{ top: 0 }}
        />
      ))}
    </button>
  );
};

export default Hamburger;
