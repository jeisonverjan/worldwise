import { useQuery } from "@tanstack/react-query";
import { getPlaceById } from "../../services/apiPlace";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { usePlaceContext } from "../../contexts/PlaceContext";

export function useCurrentPlace() {
  const { user } = useAuth0();
  const { id } = useParams();
  const { setLastVisitedPlaceId } = usePlaceContext();

  const {
    isLoading,
    data: currentPlace,
    error,
  } = useQuery({
    queryKey: ["currentPlace", user, id],
    queryFn: () => getPlaceById(user.nickname, id),
    onSuccess: () => setLastVisitedPlaceId({ ...currentPlace, key: id }),
  });

  return { isLoading, currentPlace, error };
}
