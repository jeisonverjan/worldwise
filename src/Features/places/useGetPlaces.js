import { useQuery } from "@tanstack/react-query";
import { getPlacesByUserId } from "../../services/apiPlace";
import { useAuth0 } from "@auth0/auth0-react";

export function useGetPlaces() {
  const { user } = useAuth0();

  const { isLoading, data, error } = useQuery({
    queryKey: ["placesByUser", user],
    queryFn: () => getPlacesByUserId(user.nickname),
  });

  const countries = data?.reduce((acc, place) => {
    if (!acc[place.country]) {
      acc[place.country] = { country: place.country, emoji: place.countryCode };
    }
    return acc;
  }, {});

  return { isLoading, data, error, countries };
}
