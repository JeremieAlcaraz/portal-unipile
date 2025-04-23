import axios from "axios";

export interface AuthLinkResponse {
  object: string;
  url: string;
}

export async function getAuthLink(): Promise<AuthLinkResponse> {
  // Utiliser l'URL absolue basée sur l'origine actuelle
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  console.log("Appel API vers:", `${baseUrl}/api/auth/get-link`);
  
  const response = await axios.post(`${baseUrl}/api/auth/get-link`);
  return response.data;
}