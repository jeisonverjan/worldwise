import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlace } from "../../services/apiPlace";

export function useDeletePlace() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    mutate: deletePlaceMutation,
    error,
  } = useMutation({
    mutationFn: deletePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isLoading, deletePlaceMutation, error };
}
