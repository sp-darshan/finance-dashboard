import { motion } from 'framer-motion';

export default function Card({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.01,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(255,255,255,0.12), 0 24px 80px rgba(0,0,0,0.28)',
      }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`rounded-3xl border border-zinc-800 bg-zinc-950/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}