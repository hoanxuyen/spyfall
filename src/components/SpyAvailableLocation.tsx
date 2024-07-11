import { AnimatePresence } from "framer-motion";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeLocation } from "../features/PlayerSlice";
import { RootState } from "../store/store";
import { LocationsTagClass, LocationTagsRemoveBtn } from "../SpyUlt";
export default function SpyAvailableLocation() {
  const dispatch = useDispatch();
  const locations: string[] = useSelector(
    (state: RootState) => state.PlayerSlice.locations
  );
  return (
    <>
      <SpyHeading text="Danh sách địa điểm có sẵn:" type={SpyHeadingType.h3} />
      <div className="flex flex-row flex-wrap gap-2">
        <AnimatePresence>
          {locations.map((location, locationIndex) => (
            <motion.div
              key={location}
              className={LocationsTagClass}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="m-0">{location}</p>
              <button
                onClick={() =>
                  dispatch(
                    removeLocation({
                      typeLocation: "location",
                      index: locationIndex,
                    })
                  )
                }
                aria-label="removeBtn"
                className={LocationTagsRemoveBtn}
              >
                X
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
