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
      document.body.classList.add("overflow-hidden");
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, dispatch]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="Modal-wrapper absolute inset-0 flex justify-center items-center p-4"
          initial="exit"
          animate="animate"
          exit="exit"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            className="modal-backdrop absolute inset-0 backdrop-blur-md backdrop-brightness-50 dark:backdrop-brightness-100"
            variants={backdropVariants}
            onClick={() => dispatch(setOpen(false))}
          ></motion.div>
          <motion.div
            className="Modal-container p-4 bg-white text-black prose-headings:!text-black text-sm sm:text-base rounded-lg sm:w-fit z-10 max-h-[80%] overflow-auto shadow-md"
            variants={contentVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
