import { useQuery } from "@tanstack/react-query";
import placesService from "../../services/places.service";
import { queryKeys } from "../../constants/api";

export const usePlaces = () =>
  useQuery({
    queryKey: [queryKeys.Places],
    queryFn: () => placesService.getAll(),
    select: ({ data }) => data,
  });
