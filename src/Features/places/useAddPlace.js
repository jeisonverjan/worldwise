import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlace } from "../../services/apiPlace";
import { usePlaceContext } from "../../contexts/PlaceContext";

export function useAddPlace() {
  const queryClient = useQueryClient();
  const { setLastVisitedPlaceId } = usePlaceContext();

  const { isLoading, mutate: addPlaceMutation } = useMutation({
    mutationFn: addPlace,
    onSuccess: (data) => {
      setLastVisitedPlaceId({ ...data });
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isLoading, addPlaceMutation };
}
