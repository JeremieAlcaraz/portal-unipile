"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthLink } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectAccount = async () => {
    try {
      setIsLoading(true);
      const { url } = await getAuthLink();
      window.location.href = url;
    } catch (error) {
      console.error("Error fetching auth link:", error);
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
        <CardContent className="flex justify-center">
          <Button
            size="lg"
            onClick={handleConnectAccount}
            disabled={isLoading}
            className="min-w-[200px]"
          >
            {isLoading ? <LoadingSpinner /> : "Connecter un compte"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}