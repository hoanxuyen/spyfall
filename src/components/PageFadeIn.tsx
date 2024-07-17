import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function PageFadeIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key={location.pathname}
        className="flex-auto flex flex-col justify-center"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
