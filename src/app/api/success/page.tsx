"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Success() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Compte connecté avec succès!</CardTitle>
          <CardDescription>
            Votre compte a été connecté avec succès via Unipile
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/" passHref>
            <Button variant="outline">Retour à accueil</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}