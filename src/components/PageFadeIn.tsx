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
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
