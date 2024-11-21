import { FC, useCallback, useEffect } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/api";
import mapService from "../../services/map.service";
import { useAtom } from "jotai";
import { searchValueAtom } from "../../store/store";
import { debounce } from "@mui/material";

const MapPage: FC = () => {
  const [searchValue] = useAtom(searchValueAtom);

  const { data, refetch } = useQuery({
    queryKey: [queryKeys.MapText],
    queryFn: () => mapService.getByText(searchValue),
    select: ({ data }) => data,
    enabled: false,
  });

  const searchByText = useCallback(
    debounce(async (value) => {
      value && refetch();
    }),
    []
  );

  useEffect(() => {
    searchByText(searchValue);
  }, [searchValue]);

  return (
    <>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 42.8777895, lng: 74.6066926 }}
        defaultZoom={14}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {data?.map(
          ({
            // @ts-ignore
            place_id,
            // @ts-ignore
            lat,
            // @ts-ignore
            lon,
          }) => (
            <Marker key={place_id} position={{ lat: +lat, lng: +lon }}></Marker>
          )
        )}
      </Map>
    </>
  );
};

export default MapPage;
