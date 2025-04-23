import axios from "axios";

export interface AuthLinkResponse {
  object: string;
  url: string;
}

export async function getAuthLink(): Promise<AuthLinkResponse> {
  // Utiliser une URL relative simple
  console.log("Appel API vers: /api/auth/get-link");
  const response = await axios.post('/api/auth/get-link');
  return response.data;
}