import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Logging des données reçues
    console.log('Callback de Unipile reçu:', data);
    
    // En production, vous stockeriez ces informations dans votre base de données
    // data contient: { status: "CREATION_SUCCESS", account_id: "...", name: "..." }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors du traitement du callback:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du callback' },
      { status: 500 }
    );
  }
}