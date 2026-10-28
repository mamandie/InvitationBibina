# Vérification du 28 octobre 2026

Contrôles de source : `npm run build` réussi. Les 13 photos et les 2 vidéos sont présentes, les ancres et sélecteurs principaux sont valides, la configuration musicale demande 35 secondes. Médias distribués : 3,89 Mo au total, avec chargement différé.

## Navigateur intégré — Chromium

| Format demandé | Taille testée | Résultat |
|---|---:|---|
| iPhone 12 Pro Max | 428 × 926 | Pas de débordement horizontal |
| iPhone 13 / 14 | 390 × 844 | Enveloppe centrée, ouverture et portrait contrôlés visuellement |
| iPhone 15 | 393 × 852 | Pas de débordement horizontal |
| Android compact | 360 × 800 | Pas de débordement horizontal |
| Android grand écran | 412 × 915 | Pas de débordement horizontal |
| Tablette | 768 × 1024 | Pas de débordement horizontal |
| Ordinateur | 1440 × 900 | Composition à deux colonnes contrôlée visuellement, pas de débordement |

Le navigateur de bureau réserve une largeur de barre de défilement après l’ouverture : la largeur CSS du contenu est alors inférieure de 15 px à la largeur configurée. `scrollWidth` et `clientWidth` sont identiques sur tous les formats testés.

Interactions vérifiées :

- Toucher/clic de l’enveloppe, disparition du sceau, révélation du contenu, déverrouillage du défilement et rejeu.
- Galerie modale, passage de la photo 1 à la photo 2, fermeture, affichage des 13 souvenirs.
- Préparation locale du RSVP et du livre d’or : affichage explicite « Il n’a pas encore été envoyé », lien de téléchargement disponible.
- Le lecteur officiel reçoit `start=35`, passe à l’état PLAYING, puis se met en pause à la fermeture. La commande de reprise a fonctionné dans cet environnement. Le démarrage au tout premier toucher sur un véritable iPhone reste à vérifier.
- Aucun message d’erreur dans la console lors du parcours testé.

## Limites

Il s’agit de tests de formats dans Chromium, pas d’une certification de Safari iOS ou de Chrome Android sur appareils physiques. Les gestes tactiles réels, les navigateurs intégrés WhatsApp, la lecture des vidéos locales, l’import du fichier calendrier dans les calendriers mobiles et la collecte Netlify Forms restent à vérifier sur les services/appareils cibles. Aucun stockage distant n’est activé.

L’aperçu Sites est privé, accessible après connexion ChatGPT. Il ne remplace pas un lien public Netlify pour les invités. Le site de référence était inaccessible au moment de l’analyse.
