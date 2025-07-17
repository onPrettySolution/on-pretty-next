import { useQuery } from "@tanstack/react-query";
import { listFiles } from "../services/s3Service";

export const useGetFileList = (websiteId: string) => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => listFiles(websiteId),
  });
};