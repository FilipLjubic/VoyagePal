import { CircleF, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { FC} from "react";
import { useMemo } from "react";
import { usePlaces } from "~/utils/usePlaces";
import Search from "./Search";

const Map: FC = () => {
    const { isMapLoaded, setMap, map, place } = usePlaces();

    const mapCenter = useMemo(() =>
        ({ lat: 48.480136, lng: 12.463043 })
        , []);

    const mapOptions: google.maps.MapOptions = useMemo(() => {
        return { mapTypeControl: false, fullscreenControl: false, streetViewControl: false, isFractionalZoomEnabled: false, gestureHandling: 'greedy', draggableCursor: 'default' };
    }, []);

    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
    }

    return (
        <div className="w-full h-screen flex">
                    <div className="w-64 h-screen bg-slate-50">
                <h1 className="text-gray-700 dark:text-blue-100 text-xl font-bold p-4">
                    {place?.name ?? 'No place'}
                </h1>
            </div>

            {isMapLoaded && <GoogleMap onLoad={onMapLoad} center={map?.getCenter() ?? mapCenter} options={mapOptions} mapContainerClassName="w-full h-screen relative items-center justify-center" zoom={5}>

                <MarkerF position={mapCenter} />

                {[1000, 2500].map((radius, idx) => {
                    return (
                        <CircleF
                            key={idx}
                            center={mapCenter}
                            radius={radius}
                            options={{
                                fillColor: radius > 1000 ? 'red' : 'green',
                                strokeColor: radius > 1000 ? 'red' : 'green',
                                strokeOpacity: 0.8,
                            }}
                        />
                    );
                })}

                <div className="absolute top-10 centered">
                    <Search />
                </div>
            </GoogleMap>}


        </div >
    );
};

export default Map;
