import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  console.log("API appelée: /api/auth/get-link");
  
  try {
    // Générer un ID utilisateur unique
    const userId = `user_${Math.random().toString(36).substring(2, 10)}`;
    
    // URL de l'API Unipile
    const apiUrl = process.env.NEXT_PUBLIC_UNIPILE_API_URL;
    const apiKey = process.env.UNIPILE_API_KEY;
    
    console.log("Variables d'environnement:", {
      apiUrl,
      apiKeyDefined: apiKey ? "oui" : "non",
      appUrl: process.env.NEXT_PUBLIC_APP_URL
    });
    
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

    // Créer le payload selon la documentation Unipile
    const payload = {
      type: 'create',
      providers: "*", // ou ["LINKEDIN", "WHATSAPP", "GOOGLE"]
      api_url: apiUrl,
      expiresOn: expiresOn.toISOString(),
      notify_url: notifyUrl,
      name: userId
    };

    console.log("Requête vers Unipile:", {
      url: `${apiUrl}/api/v1/hosted/accounts/link`,
      payload
    });
    
    // Requête à l'API Unipile
    const response = await axios.post(
      `${apiUrl}/api/v1/hosted/accounts/link`,
      payload,
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
  } catch (error: any) {
    console.error('Erreur lors de la récupération du lien auth:', error.message);
    
    // Journaliser tous les détails possibles de l'erreur
    if (error.response) {
      console.error('Données de réponse:', error.response.data);
      console.error('Code d\'état:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('La requête a été faite mais pas de réponse reçue', error.request);
    } else {
      console.error('Erreur lors de la configuration de la requête:', error.message);
    }
    console.error('Configuration de la requête:', error.config);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération du lien', 
        details: error.message,
        responseData: error.response?.data || null,
        status: error.response?.status || 500
      },
      { status: 500 }
    );
  }
}