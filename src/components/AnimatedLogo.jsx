// components/AnimatedLogo.jsx
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function AnimatedLogo({ variants, animate, transition, className = "", style = {} }) {
  return (
    <motion.img
      src={logo}
      alt="Logo"
      className={className}
      variants={variants}
      animate={animate}
      transition={transition}
      style={style}
    />
  );
}