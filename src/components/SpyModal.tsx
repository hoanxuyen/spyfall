import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AnimatePresence, motion } from "framer-motion";
import { setOpen } from "../features/ModalSlice";
import { useEffect } from "react";

export default function SpyModal({ children }: { children: React.ReactNode }) {
  const isOpen = useSelector((state: RootState) => state.ModalSlice.isOpen);

  const transition = { ease: "easeInOut", duration: 0.5 };

  const backdropVariants = {
    animate: { opacity: 1, transition },
    exit: { opacity: 0, transition },
  };

  const contentVariants = {
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { ...transition, delay: 0.2 },
    },
    exit: { opacity: 0, y: 20, scale: 0.9, transition },
  };

  const dispatch = useDispatch();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      dispatch(setOpen(false));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(setOpen(false));
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="Modal-wrapper absolute inset-0 flex justify-center items-center m-4 sm:m-0"
          initial="exit"
          animate="animate"
          exit="exit"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            className="modal-backdrop absolute inset-0 backdrop-blur-md"
            variants={backdropVariants}
            onClick={() => dispatch(setOpen(false))}
          ></motion.div>
          <motion.div
            className="Modal-container p-4 bg-white text-black prose-headings:!text-black text-sm sm:text-base rounded-lg sm:w-2/3 z-10 max-h-[80%] overflow-auto"
            variants={contentVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
