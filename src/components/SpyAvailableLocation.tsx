import { AnimatePresence } from "framer-motion";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { LocationSource, removeLocation } from "../features/PlayerSlice";
import { RootState } from "../store/store";
import { LocationsTagClass, LocationTagsRemoveBtn } from "../SpyUlt";
import SpyButton from "./SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "./SpyButtonType";
import { useState } from "react";
import classNames from "classnames";
export default function SpyAvailableLocation() {
  const dispatch = useDispatch();
  const locations: string[] = useSelector(
    (state: RootState) => state.PlayerSlice.locations
  );
  const [selectedId, setSelectedId] = useState("");
  return (
    <>
      <SpyHeading text="Danh sách địa điểm có sẵn:" type={SpyHeadingType.h3} />
      <div className="flex flex-row flex-wrap gap-2">
        <AnimatePresence>
          {locations.map((location, locationIndex) => (
            <motion.div
              layoutId={location}
              key={location}
              className={classNames(LocationsTagClass, "cursor-pointer")}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="m-0" onClick={() => setSelectedId(location)}>
                {location}
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
          ))}
          {/**Card*/}
          {selectedId && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {locations.map(
                (location) =>
                  location === selectedId && (
                    <motion.div
                      className="bg-white rounded-lg p-4 shadow-md max-w-lg mx-auto"
                      layoutId={location}
                      key={location}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <motion.div className="relative prose-headings:!text-black text-black">
                        <motion.div
                          className="card__header flex justify-end text-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <SpyButton
                            color={Color.None}
                            label="X"
                            size={SpyButtonSize.SM}
                            onClick={() => setSelectedId("")}
                          />
                        </motion.div>
                        <div>
                          <SpyHeading
                            text={location}
                            type={SpyHeadingType.h3}
                            className="card__title m-0"
                          />
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
