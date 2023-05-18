import type { FC } from "react";

import { usePlaces } from "~/utils/usePlaces";
import { Input } from "./input";

const Search: FC = () => {
  const {
    getPlacePredictions,
    placePredictions,
    isPlacePredictionsLoading,
    placesService,
    setPlace,
    map,
  } = usePlaces();

  const onPlaceClick = (item: google.maps.places.AutocompletePrediction) => {
    placesService?.getDetails({ placeId: item.place_id }, (place, status) => {
      const location = place?.geometry?.location;

      if (location) {
        setPlace({
          lat: location.lat(),
          lng: location.lng(),
          name: item.description,
        });
        map?.panTo(location);

        map?.setZoom(8);
      }
    });
  };

  return (
    <>
      <div className="flex h-fit w-64 flex-col">
        <Input
          placeholder="Search for a place"
          className="bg-white"
          onChange={(evt) => {
            getPlacePredictions({ input: evt.target.value });
          }}
        />

        <div className="bg-white">
          {isPlacePredictionsLoading ? (
            <>Loading..</>
          ) : (
            placePredictions.map((item) => (
              <div onClick={() => onPlaceClick(item)} key={item.place_id}>
                {item.description}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
