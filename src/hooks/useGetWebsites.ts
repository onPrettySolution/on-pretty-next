import { useQuery } from "@tanstack/react-query";
import { fetchWebsites } from "../services/getWebsitesService";

export const useGetWebsites = () => {
  return useQuery({
    queryKey: ["websites"],
    queryFn: () => fetchWebsites(),
  });
};