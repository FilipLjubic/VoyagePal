import { useMemo, type FC } from "react";
import { CircleF, GoogleMap, MarkerF } from "@react-google-maps/api";

import { usePlaces } from "~/utils/usePlaces";

const Map: FC = () => {
  const { isMapLoaded, map, setMap } = usePlaces();

  const mapCenter = useMemo(() => ({ lat: 48.480136, lng: 12.463043 }), []);

  const mapOptions: google.maps.MapOptions = useMemo(() => {
    return {
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      isFractionalZoomEnabled: false,
      gestureHandling: "greedy",
      draggableCursor: "default",
    };
  }, []);

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  return isMapLoaded ? (
    <GoogleMap
      onLoad={onMapLoad}
      center={map?.getCenter() ?? mapCenter}
      options={mapOptions}
      mapContainerClassName="w-full h-screen relative items-center justify-center z-0"
      zoom={5}
    >
      <MarkerF position={mapCenter} />

      {[1000, 2500].map((radius, idx) => {
        return (
          <CircleF
            key={idx}
            center={mapCenter}
            radius={radius}
            options={{
              fillColor: radius > 1000 ? "red" : "green",
              strokeColor: radius > 1000 ? "red" : "green",
              strokeOpacity: 0.8,
            }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <div></div>
  );
};

export default Map;
