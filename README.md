# Une promesse, une vie

Invitation de mariage en HTML, CSS et JavaScript, sans dépendance de compilation. Mobile first, palette ivoire/bordeaux/champagne, sceau de cire et enveloppe CSS en perspective. Les photographies et vidéos fournies sont intégrées ; les originaux restent intacts.

## Démarrer

Node 18+ et Python 3 sont nécessaires pour les commandes de développement.

```bash
npm run dev
# http://localhost:4173
npm run build
```

Le dossier déployable est `dist/`. Le serveur local est uniquement destiné au développement.

## Personnaliser

Modifier `dist/config.js` : prénoms, initiales, date ISO avec fuseau, date affichée, ville, textes, étapes de l’histoire, cérémonies, adresses, images et vidéos. Les noms Bintou Niang et Mansour Kane, les dates du 14 novembre 2026 (Henné Time) et du 15 novembre 2026 (Takk Diakka) et le lieu Terrain Grand Médine, Keur Massar sont renseignés. `demo` est désormais `false`. Les horaires et le récit restent à compléter. `dateOnly: true` exporte le mariage comme événement de journée entière, sans inventer d’heure. Les noms de famille sont configurés séparément pour conserver une belle composition mobile. Adapter aussi les métadonnées Open Graph dans `dist/index.html` à l’adresse publique finale, et vérifier les descriptions des images.

Pour les lieux, renseigner `events[].address` avec une adresse exacte : le bouton Google Maps apparaîtra automatiquement. Aucune adresse précise n’a été inventée.

Les fichiers photo sont des WebP optimisés. Les vidéos sont chargées uniquement à la demande (`preload=none`), sans lecture automatique. Les polices utilisent Google Fonts avec `display=swap`, avec polices de secours locales.

## Musique

Intégration YouTube IFrame API, vidéo `tvqTdceUYu0`, départ demandé à 35 secondes. La demande de lecture vient du toucher d’ouverture de l’enveloppe. Le lecteur reste hors écran et ne prend aucune place dans l’invitation. Une seule icône de haut-parleur permet de couper ou réactiver la musique, avec un libellé accessible et un état visuel. Les sections ne réinitialisent pas la musique. Lire une vidéo souvenir, rejouer l’enveloppe ou quitter l’onglet met la musique en pause.

Safari, les navigateurs intégrés à WhatsApp, les règles YouTube ou un blocage réseau peuvent empêcher la lecture au premier toucher. Dans ce cas, l’icône revient à l’état sans son et permet de réessayer. La lecture effective et le comportement du lecteur hors écran doivent être vérifiés sur les appareils cibles.
Documentation : https://developers.google.com/youtube/iframe_api_reference

## RSVP et livre d’or

Par défaut aucun serveur de collecte n’est activé. Le site ne prétend pas enregistrer les réponses : les invités peuvent préparer et télécharger un fichier texte. Renseigner `whatsapp` avec le numéro réel des organisateurs active un lien WhatsApp prérempli ; l’invité confirme lui-même l’envoi dans WhatsApp.

Les deux formulaires sont déclarés pour Netlify Forms avec champ honeypot. Pour collecter les réponses :

1. Déployer sur Netlify (le fichier `netlify.toml` est prêt).
2. Activer/détecter les formulaires dans le tableau de bord Netlify.
3. Vérifier les deux formulaires avec une réponse de test dans le tableau de bord.
4. Passer `netlifyForms` à `true`, redéployer et revérifier la collecte.

Ne pas activer cette option sur Vercel ou Sites : ces hébergeurs n’implémentent pas Netlify Forms. Les données Netlify sont consultables par les administrateurs ayant accès au projet, et ne sont jamais exposées par le site. Le livre d’or reste privé : aucune publication automatique. La publication publique des messages et une interface de modération nécessitent un backend dédié ; elles ne sont pas simulées ici. Prévoir la notice d’information adaptée à la collecte réelle et à la durée de conservation choisie.

## Déployer

- Netlify : dossier de base `invitation`, commande `npm run build`, publication `dist`.
- Vercel : racine `invitation`, configuration `vercel.json` fournie ; collecte à connecter séparément.
- Hébergement statique : transférer le contenu de `dist/`.

Un aperçu privé Sites peut être créé séparément. Il ne modifie pas le site Netlify de référence et n’est pas destiné à un partage WhatsApp public tant que son accès n’est pas adapté.

## Vérifications

`npm run build` valide la syntaxe JavaScript, les fichiers configurés, la date, le point de départ musical, les ancres et les sélecteurs principaux. Ce contrôle ne remplace pas un navigateur.

Formats à contrôler : 428×926 (iPhone 12 Pro Max), 390×844 (iPhone 13/14), 393×852 (iPhone 15), 360×800 et 412×915 (Android), 768×1024 (tablette), 1440×900 (desktop). Tester l’enveloppe, le défilement, la navigation, le zoom photo, les flèches et gestes tactiles, la fermeture Escape, la musique et son repli, les téléchargements calendrier/RSVP, les deux vidéos et les préférences de réduction des mouvements. Essais sur vrais Safari iOS et Chrome Android nécessaires avant diffusion.

Les essais dans le navigateur intégré ont finalement pu être réalisés : ouverture/rejeu de l’enveloppe, affichage mobile et desktop, absence de débordement aux six formats demandés, navigation de la galerie, expansion des 13 photos, préparation des deux formulaires et lecture YouTube avec paramètre start=35. Voir `VERIFICATION.md`. Ces essais de dimensions dans Chromium ne remplacent pas les essais sur de vrais appareils Safari iOS et Chrome Android.

Les deux journées sont définies dans `events` et surlignées dans le calendrier. Le lieu du Henné Time et les horaires restent à préciser. Pour les dates passées, le compte à rebours et le bouton d’ajout au calendrier sont masqués.


## Envoi des formulaires par e-mail

Les réponses et le livre d’or utilisent l’API AJAX de FormSubmit (https://formsubmit.co), avec `contactEmail` dans `dist/config.js` comme destinataire. Aucune clé privée n’est nécessaire. Les noms et messages saisis sont transmis à ce service, puis par e-mail aux organisateurs.

Après déploiement, soumettre un message de test depuis le site puis ouvrir l’e-mail d’activation reçu à dieniang32@gmail.com et cliquer sur le lien de confirmation (vérifier les indésirables). Envoyer ensuite un second test pour vérifier la réception effective. Un changement d’adresse nécessite une nouvelle activation. La confirmation du navigateur signifie que le service a accepté le message, pas que la boîte destinataire l’a reçu. En cas d’échec, le formulaire conserve les données et propose un envoi par application mail ou un téléchargement.
