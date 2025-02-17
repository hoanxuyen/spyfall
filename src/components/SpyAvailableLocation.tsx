import { AnimatePresence } from "framer-motion";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  LocationSource,
  LocationsType,
  removeLocation,
} from "../features/PlayerSlice";
import { RootState } from "../store/store";
import { LocationsTagClass, LocationTagsRemoveBtn } from "../SpyUlt";
import SpyButton from "./SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "./SpyButtonType";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export default function SpyAvailableLocation() {
  const dispatch = useDispatch();
  const locationsList = useSelector(
    (state: RootState) => state.PlayerSlice.locations
  );
  const [selectedId, setSelectedId] = useState("");

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setSelectedId("");
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId("");
      }
    };
    if (selectedId) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("overflow-hidden");
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedId]);

  return (
    <>
      <SpyHeading text="Danh sách địa điểm có sẵn:" type={SpyHeadingType.h3} />
      <div className="flex flex-row flex-wrap gap-2">
        <AnimatePresence>
          {locationsList.map(
            (location: LocationsType, locationIndex: number) => (
              <motion.div
                layoutId={location.name}
                key={location.name}
                className={classNames(LocationsTagClass, "cursor-pointer")}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="m-0" onClick={() => setSelectedId(location.name)}>
                  {location.name}
                </p>
                <SpyButton
                  label="X"
                  color={Color.None}
                  size={SpyButtonSize.SM}
                  customClass={LocationTagsRemoveBtn}
                  onClick={() =>
                    dispatch(
                      removeLocation({
                        locationSource: LocationSource.DEFAULT,
                        index: locationIndex,
                      })
                    )
                  }
                />
              </motion.div>
            )
          )}
          {/** Card */}
          {selectedId && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {locationsList.map(
                (location: LocationsType) =>
                  location.name === selectedId && (
                    <motion.div
                      className="bg-white rounded-lg shadow-md max-w-lg mx-4 sm:mx-auto overflow-hidden"
                      layoutId={location.name} // Khi có chung layoutId thì sẽ có transition giữa cái cũ và cái xuất hiện mới nhất https://www.framer.com/motion/layout-animations/#shared-layout-animations
                      key={location.name}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      ref={cardRef}
                    >
                      <motion.div className="relative prose-headings:!text-black text-black">
                        <motion.div
                          className="card__header flex justify-end text-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        ></motion.div>
                        <div className="space-y-4">
                          <img
                            src={location.image}
                            alt="Ho Chi Minh places"
                            className="aspect-video m-0 w-full h-auto"
                            loading="lazy"
                          />
                          <div className="px-4 pb-4space-y-4">
                            <SpyHeading
                              text={location.name}
                              type={SpyHeadingType.h2}
                              className="card__title m-0"
                            />
                            <p>{location.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
