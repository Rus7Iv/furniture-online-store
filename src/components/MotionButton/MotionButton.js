import { motion } from "framer-motion";

const buttonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.2,
  },
};

export const MotionButton = ({ children }) => {
  return (
    <motion.button
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={buttonVariants}
      style={buttonStyles}
    >
      {children}
    </motion.button>
  );
};

const buttonStyles = {
  border: "none",
  background: "none",
  position: "relative",
};
