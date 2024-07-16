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
        </AnimatePresence>
      </div>
    </>
  );
}
