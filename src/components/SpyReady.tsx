import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion } from "framer-motion";

export default function SpyReady() {
  const currentPlayerIndex = useSelector(
    (state: RootState) => state.PlayerSlice.currentPlayerIndex
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
      <p>Người chơi số: {currentPlayerIndex + 1} sẵn sàng chưa?</p>
    </motion.div>
  );
}
