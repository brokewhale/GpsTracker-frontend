import { useQuery } from "react-query";
import { getLocations } from "./getLocation";

export function useGetLocations() {
  return useQuery("getLocations", () => getLocations(), {
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
}
