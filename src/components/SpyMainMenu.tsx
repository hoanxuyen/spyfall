import { useNavigate } from "react-router-dom";
import { Color } from "../theme";
import Rules from "./Rules";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import { motion } from "framer-motion";
export default function MainMenu() {
  const navigate = useNavigate();
  return (
    <div>
      <Rules />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex justify-center"
      >
        <SpyButton
          label="Bắt đầu thôi!"
          color={Color.Primary}
          size={SpyButtonSize.LG}
          onClick={() => navigate("/lobby")}
        />
      </motion.div>
    </div>
  );
}
