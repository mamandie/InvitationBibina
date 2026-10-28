// Identité, date et lieu confirmés. Horaires et récit à compléter.
window.WEDDING = {
  demo: false,
  bride: 'Bintou', brideSurname: 'Niang', groom: 'Mansour', groomSurname: 'Kane', initials: 'B & M',
  date: '2019-11-15T00:00:00+00:00', dateOnly: true, dateLabel: '14 & 15 novembre 2019', city: 'Keur Massar · Grand Médine',
  locationName: 'Terrain Grand Médine',
  locationAddress: 'Grand Médine, Keur Massar, Sénégal',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.8805792530075!2d-17.30780973271833!3d14.775755893835232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10b0003ca5a07%3A0x86674518d1f8a5da!2sTerrain%20Grand%20Medine!5e0!3m2!1sfr!2ssn!4v1793191813931!5m2!1sfr!2ssn',
  invitation: 'Deux chemins, une même évidence. Et le bonheur de vous retrouver pour écrire la suite.',
  youtubeId: 'tvqTdceUYu0', musicStart: 35,
  // Numéro international, chiffres uniquement. Exemple : 221XXXXXXXXX.
  whatsapp: '',
  // Activez seulement après déploiement sur Netlify et vérification de Forms.
  netlifyForms: false,
  story: [
    { chapter: 'La rencontre', title: 'Le début de nous.', text: 'Parfois, les plus belles histoires commencent par un simple regard. Le récit de leur rencontre prendra bientôt place ici.' },
    { chapter: 'La complicité', title: 'Mille petits bonheurs.', text: 'Des conversations qui n’en finissent pas, des rêves partagés et cette envie de tout vivre ensemble. Leurs souvenirs seront ajoutés ici.' },
    { chapter: 'La promesse', title: 'Pour toute une vie.', text: 'Aujourd’hui, un nouveau chapitre s’ouvre. Et ce chapitre sera encore plus beau avec vous à leurs côtés.' }
  ],
  events: [
    { date: '2019-11-14', dateLabel: 'Jeudi 14 novembre 2019', time: '14 NOV.', title: 'Henné Time', place: 'Lieu à préciser', text: 'Un moment de partage et de douceur autour du henné, pour ouvrir ces deux jours de célébration.', icon: '❧' },
    { date: '2019-11-15', dateLabel: 'Vendredi 15 novembre 2019', time: '15 NOV.', title: 'Takk Diakka', place: 'Terrain Grand Médine · Keur Massar', address: 'Terrain Grand Medine, Keur Massar, Sénégal', text: 'La cérémonie religieuse, entourés de nos familles et de ceux qui nous sont chers.', icon: '✧' }
  ],
  photos: [0,2,6,1,4,7,9,10,11,12,3,5,8].map((n,i) => ({ src: `assets/photo-${n}.webp`, alt: `Portrait souvenir ${i + 1}`, position: n === 0 ? '50% 30%' : '50% 35%' })),
  videos: ['assets/video.mp4', 'assets/video1.mp4']
};
