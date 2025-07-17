import { useQuery } from "@tanstack/react-query";
import { getWebsiteByNameService } from "@/services/getWebsiteByNameService";

export const useGetWebsiteByName = ({ site }: { site: string }) => {
  return useQuery({
    queryKey: ["website", site],
    queryFn: () => getWebsiteByNameService(site),
  });
};