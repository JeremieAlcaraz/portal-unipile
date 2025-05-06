#!/usr/bin/env bash
set -euo pipefail

# ╭─────────────────────────────────────────────────────────────╮
# │        UNIPILE – INITIALISATION D’UN PROJET EXISTANT        │
# ╰─────────────────────────────────────────────────────────────╯
#  (powered by Jeremiaou 😻)

# ────────────────
# Couleurs “so fancy”
# ────────────────
GREEN="\033[0;32m"   # Texte vert
CYAN="\033[0;36m"    # Texte cyan
YELLOW="\033[1;33m"  # Texte jaune (bold)
RESET="\033[0m"
TICK="${GREEN}✅${RESET}"

echo -e "${CYAN}✨ Initialisation de votre projet Unipile ✨${RESET}\n"

# ────────────────
# 0) Vérifications rapides
# ────────────────
if [[ ! -f package.json ]]; then
  echo -e "${YELLOW}🚨 Aucun package.json trouvé. Lance ce script à la racine de ton projet !${RESET}"
  exit 1
fi

# ────────────────
# 1) Saisie des variables sensibles / config
# ────────────────
read -rsp "🗝  Clé API Unipile (invisible) : " UNIPILE_API_KEY; echo
read -rp  "🌐 URL privée de l’API Unipile : " NEXT_PUBLIC_UNIPILE_API_URL
read -rp  "🏠 Base URL [http://localhost:3000] : " NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_APP_URL="${NEXT_PUBLIC_APP_URL:-http://localhost:3000}"

# ────────────────
# 2) Génération / mise à jour du fichier .env
# ────────────────
cat <<EOF > .env
UNIPILE_API_KEY="$UNIPILE_API_KEY"
NEXT_PUBLIC_UNIPILE_API_URL=$NEXT_PUBLIC_UNIPILE_API_URL
NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
EOF
echo -e "${TICK} Fichier ${YELLOW}.env${RESET} généré / mis à jour."

# ────────────────
# 3) Installation des dépendances nécessaires
# ────────────────
echo -e "${CYAN}📦 Installation des dépendances (axios, dotenv, shadcn/ui)…${RESET}"
bun add axios dotenv shadcn-ui >/dev/null
echo -e "${TICK} Dépendances ajoutées."

# ────────────────
# 4) Configuration shadcn/ui (si pas déjà fait)
# ────────────────
if [[ ! -f components.json ]]; then
  echo -e "${CYAN}🔧 Initialisation de shadcn/ui…${RESET}"
  bunx shadcn-ui@latest init <<HERE
Default
Slate
src/app/globals.css
Yes
tailwind.config.js
src/components
src/lib/utils.ts
Yes
/
HERE
  bunx shadcn-ui@latest add button >/dev/null
  echo -e "${TICK} shadcn/ui installé."
else
  echo -e "${GREEN}ℹ️  shadcn/ui déjà configuré, étape ignorée.${RESET}"
fi

# ────────────────
# 5) Récapitulatif (infos non sensibles) & lancement
# ────────────────
echo -e "\n${GREEN}🎉 Projet prêt !${RESET}"
echo -e "NEXT_PUBLIC_APP_URL : ${YELLOW}$NEXT_PUBLIC_APP_URL${RESET}\n"
echo -e "${CYAN}🚀 Lancement de bun dev… (Ctrl‑C pour arrêter)${RESET}\n"

# Remplace le processus courant par bun dev
exec bun dev
