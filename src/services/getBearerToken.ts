import { fetchAuthSession } from "aws-amplify/auth";

export async function getBearerToken() {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken?.toString();

  if (!idToken) {
    throw new Error("No ID token found in session");
  }

  return idToken;
}