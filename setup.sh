#!/bin/bash
# Installation du projet Next.js avec Bun

# Création du projet Next.js avec Bun
bun create next-app@latest unipile-auth-demo --typescript --tailwind --eslint --src-dir --app --import-alias "@/*"

# Navigation dans le dossier du projet
cd unipile-auth-demo

# Installation de shadcn/ui et ses dépendances
bun add shadcn-ui
bunx shadcn-ui@latest init

# Répondre aux questions de shadcn-ui:
# Style: Default
# Base color: Slate
# Global CSS: src/app/globals.css
# CSS variables: Yes
# Tailwind CSS config: tailwind.config.js
# Components: src/components
# Utils: src/lib/utils.ts
# React Server Components: Yes
# Components.json location: /

# Installation du composant Button de shadcn/ui
bunx shadcn-ui@latest add button

# Ajouter axios pour les requêtes API
bun add axios

# Installation de dotenv pour les variables d'environnement
bun add dotenv
