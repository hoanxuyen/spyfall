import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion } from "framer-motion";
export default function SpyComponent() {
  const spyIndex = useSelector(
    (state: RootState) => state.PlayerSlice.spyIndex as number
  );
  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.p
        className="text-red-300 font-bold"
        animate={{ scale: 1.1 }}
        transition={{ delay: 0.5 }}
      >
        Người chơi số {spyIndex + 1}, bạn là điệp viên{"🤫"}
      </motion.p>
    </motion.div>
  );
}
