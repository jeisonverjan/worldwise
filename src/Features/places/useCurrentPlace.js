import { useQuery } from "@tanstack/react-query";
import { getPlaceById } from "../../services/apiPlace";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

export function useCurrentPlace() {
  const { user } = useAuth0();
  const { id } = useParams();
  const {
    isLoading,
    data: currentPlace,
    error,
  } = useQuery({
    queryKey: ["currentPlace", user, id],
    queryFn: () => getPlaceById(user.nickname, id),
  });

  return { isLoading, currentPlace, error };
}
