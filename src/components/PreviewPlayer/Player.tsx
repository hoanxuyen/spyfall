import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { motion } from "framer-motion";
export default function PlayerComponent() {
  const currentPlayerIndex = useSelector(
    (state: RootState) => state.PlayerSlice.currentPlayerIndex
  );
  const location = useSelector(
    (state: RootState) => state.PlayerSlice.location
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
      <p className="font-bold">Người chơi số {currentPlayerIndex + 1}</p>
      <p>Địa điểm là: {location}</p>
    </motion.div>
  );
}
