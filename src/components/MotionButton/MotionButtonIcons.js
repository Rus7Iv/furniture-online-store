import { motion } from "framer-motion";
import Link from "next/link";
import styles from "@/components/MotionButton/MotionButton.module.css";

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

export const MotionButtonIcons = ({ href, icons, text }) => {
  return (
    <Link href={href} className={styles.link}>
      <motion.button
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={buttonVariants}
        style={buttonStyles}
      >
        <div className={styles.icons}>{icons}</div>
        {text}
      </motion.button>
    </Link>
  );
};

const buttonStyles = {
  border: "none",
  background: "none",
  position: "relative",
  zIndex: 1,
};
