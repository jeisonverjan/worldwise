import { createContext, useContext, useState } from "react";

const PlaceContext = createContext();

export function PlaceProvider({ children }) {
  const [lastVisitedPlaceId, setLastVisitedPlaceId] = useState(null);

  return (
    <PlaceContext.Provider
      value={{ lastVisitedPlaceId, setLastVisitedPlaceId }}
    >
      {children}
    </PlaceContext.Provider>
  );
}

export function usePlaceContext() {
  return useContext(PlaceContext);
}
