import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    // Générer un ID utilisateur unique
    const userId = `user_${Math.random().toString(36).substring(2, 10)}`;
    
    // URL de l'API Unipile (utiliser directement les variables d'environnement)
    const apiUrl = process.env.NEXT_PUBLIC_UNIPILE_API_URL;
    const apiKey = process.env.UNIPILE_API_KEY;
    
    if (!apiUrl || !apiKey) {
      console.error("Configuration API manquante");
      return NextResponse.json(
        { error: 'Configuration API manquante' },
        { status: 500 }
      );
    }

    // Date d'expiration (2 heures à partir de maintenant)
    const expiresOn = new Date();
    expiresOn.setHours(expiresOn.getHours() + 2);
    
    // URL de notification
    const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    console.log("Requête vers Unipile:", `${apiUrl}/api/v1/hosted/accounts/link`);
    
    // Requête à l'API Unipile
    const response = await axios.post(
      `${apiUrl}/api/v1/hosted/accounts/link`,
      {
        type: 'create',
        providers: '*',
        api_url: apiUrl,
        expiresOn: expiresOn.toISOString(),
        notify_url: notifyUrl,
        name: userId
      },
      {
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log("Réponse Unipile:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération du lien auth:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du lien' },
      { status: 500 }
    );
  }
}