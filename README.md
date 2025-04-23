# Démo d'intégration Unipile Hosted Auth Wizard

Ce projet démontre comment intégrer le système d'authentification Hosted Auth Wizard de Unipile dans une application Next.js.

## Technologies utilisées

- Next.js 15
- Bun (gestionnaire de paquets et runtime)
- Tailwind CSS
- shadcn/ui (bibliothèque de composants)
- API Unipile

## Configuration requise

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
NEXT_PUBLIC_UNIPILE_API_URL=https://apiXXX.unipile.com:XXX
UNIPILE_API_KEY=XXXXXXXX
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Remplacez les valeurs par vos propres informations d'API Unipile.

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd unipile-auth-demo

# Installer les dépendances
bun install

# Démarrer le serveur de développement
bun dev
```

## Fonctionnement

1. L'utilisateur clique sur le bouton "Connecter un compte" sur la page d'accueil
2. Une requête est envoyée au backend pour générer un lien d'authentification Unipile
3. L'utilisateur est redirigé vers l'interface Hosted Auth Wizard de Unipile
4. Après l'authentification réussie, Unipile envoie un webhook à votre API
5. L'utilisateur est redirigé vers la page de succès

## Structure du projet

- `src/app/page.tsx` - Page d'accueil avec le bouton de connexion
- `src/app/success/page.tsx` - Page de succès après la connexion
- `src/app/api/auth/get-link/route.ts` - API pour générer le lien d'authentification
- `src/app/api/auth/callback/route.ts` - API pour recevoir le webhook de Unipile
- `src/lib/api.ts` - Fonctions pour interagir avec l'API
- `src/components/ui/` - Composants UI réutilisables

