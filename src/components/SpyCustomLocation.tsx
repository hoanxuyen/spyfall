import { useDispatch, useSelector } from "react-redux";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import { RootState } from "../store/store";
import { updateCustomLocations } from "../features/PlayerSlice";
import { AnimatePresence, motion } from "framer-motion";
import { LocationsTagClass, LocationTagsRemoveBtn } from "../SpyUlt";
export default function SpyCustomLocation() {
  const locations = useSelector(
    (state: RootState) => state.PlayerSlice.customLocations
  );
  const dispatch = useDispatch();
  const handleRemoveLocation = (locationIndex: number) => {
    const newlocations = [
      ...locations.slice(0, locationIndex),
      ...locations.slice(locationIndex + 1),
    ];
    dispatch(updateCustomLocations(newlocations));
  };
  return (
    <>
      <SpyHeading
        text="Danh sách địa điểm thêm vào:"
        type={SpyHeadingType.h3}
      />
      {locations.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-2">
          <AnimatePresence>
            {locations.map((location, locationIndex) => (
              <motion.div
                key={locationIndex}
                className={LocationsTagClass}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="m-0">{location}</p>
                <button
                  onClick={() => handleRemoveLocation(locationIndex)}
                  aria-label="removeBtn"
                  className={LocationTagsRemoveBtn}
                >
                  X
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p>Chưa có địa điểm được thêm vào.</p>
      )}
    </>
  );
}
