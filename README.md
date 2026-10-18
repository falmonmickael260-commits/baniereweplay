# Télécharge tes GIF

Mini-site statique pour télécharger 4 GIF animés hébergés sur Cloudinary.

## Structure

- `index.html` — page unique, galerie de 4 cartes
- `styles.css` — design sombre et responsive
- `api/download.js` — fonction serverless Vercel qui récupère le GIF sur Cloudinary et le renvoie avec `Content-Disposition: attachment` pour forcer un vrai téléchargement (nom de fichier `partie-1.gif` à `partie-4.gif`)

## Déploiement sur Vercel

```bash
npm i -g vercel
vercel
```

Aucune variable d'environnement, base de données ou build step n'est nécessaire.
