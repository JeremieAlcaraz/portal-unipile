// src/app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Appel direct à l'API
      const response = await fetch('/api/auth/get-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Réponse reçue:", data);
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL non trouvée dans la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du lien:", error);
      setError(error instanceof Error ? error.message : "Erreur inconnue");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Connecter un compte</CardTitle>
          <CardDescription>
            Utilisez le système Unipile Hosted Auth Wizard pour connecter vos comptes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <Button
            size="lg"
            onClick={handleConnectAccount}
            disabled={isLoading}
            className="min-w-[200px]"
          >
            {isLoading ? <LoadingSpinner /> : "Connecter un compte"}
          </Button>
          
          {error && (
            <div className="mt-4 text-sm text-red-600">
              Erreur: {error}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}