import { createContext, useContext, useMemo, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export type Place = {
  name: string;
  lat: number;
  lng: number;
};

// First, extract the function body into its own function so the return type can be inferred
function usePlacesServiceWithState() {
  const [place, setPlace] = useState<Place>();
  const [map, setMap] = useState<google.maps.Map>();

  const libraries = useMemo(() => {
    return ["places"];
  }, []);

  const { isLoaded: isMapLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as any[],
    preventGoogleFontsLoading: true,
  });

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });

  return {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
    isMapLoaded,
    place,
    setPlace,
    map,
    setMap,
  };
}

type PlacesContextProps = ReturnType<typeof usePlacesServiceWithState>;
const PlacesContext = createContext<PlacesContextProps | null>(null);

export const PlacesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const placesValues = usePlacesServiceWithState();

  return (
    <PlacesContext.Provider value={placesValues}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (context === null) {
    throw new Error("usePlaces must be used within a PlacesProvider");
  }
  return context;
};
