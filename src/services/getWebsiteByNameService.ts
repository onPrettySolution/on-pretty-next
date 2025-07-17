import { getBearerToken } from "./getBearerToken";

export const getWebsiteByNameService = async (site: string) => {
  const url = `/api/tenants/${site}`;
  const token = await getBearerToken();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    });

    if (response.status === 404) {
      const errorData = await response.json();
      if (errorData.message === "No websites found with the specified name") {
        return [];
      }
    }

    if (!response.ok) {
      throw new Error("Failed to fetch websites");
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error &&
      error.message === "No websites found with the specified name") {
      return [];
    }
    throw error;
  }
}