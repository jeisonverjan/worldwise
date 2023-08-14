import { useQuery } from "@tanstack/react-query";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { getPlaceName } from "../../services/apiPlaceName";

export function usePlace() {
  const { lat, lng } = useUrlPosition();

  const { isLoading, data, error } = useQuery({
    queryKey: ["placeName", lat, lng],
    queryFn: () => getPlaceName({ lat, lng }),
  });

  const newPlace = {
    cityName: data?.city || data?.locality,
    country: data?.countryName,
    countryCode: data?.countryCode,
    position: { lat, lng },
  };

  return { isLoading, newPlace, error };
}
