import { fetchAuthSession } from "aws-amplify/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getBearerToken() {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken?.toString();

  if (!idToken) {
    throw new Error("No ID token found in session");
  }

  return idToken;
}

export const fetchWebsites = async () => {
  const url = `${API_BASE_URL}/tenants?last=tenant01`;
  // const url = `https://2ly0gfcicf.execute-api.us-east-1.amazonaws.com/default/test`;
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
      if (errorData.message === "No websites found for the given day") {
        return [];
      }
    }

    if (!response.ok) {
      throw new Error("Failed to fetch websites");
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error &&
      error.message === "No websites found for the given day") {
      return [];
    }
    throw error;
  }
};