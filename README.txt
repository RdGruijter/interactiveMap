🗺️ De Schatkaart van Bergen

Een interactieve schatkaart gemaakt met Leaflet.js
.
Op de kaart staan 37 hotspots (eten & drinken, activiteiten, natuur, etc.), elk met een raadsel dat de speler kan oplossen. Bij elk correct antwoord wordt een letter verzameld voor de eindzin om de schatkist te openen.

✨ Features

Interactieve kaart gebaseerd op een custom afbeelding (bergen/schatkaart/{z}/{x}/{y}.jpg).

37 hotspots met titel, categorie, optionele link en raadsel.

Correct antwoord geeft een ✅ feedback, fout antwoord een ❌.

Elke correct opgeloste hotspot geeft een letter voor het eindspel.

Scorebord en voortgang worden dynamisch bijgewerkt.

Zoom- en sleepbare kaart met grenzen (je kunt niet buiten de kaart scrollen).

Animaties voor markers en icons per categorie.

Intro-overlay met thumbnail en knop om de kaart te openen.

Mogelijkheid om terug te gaan naar de intro via een sluitknop.

📂 Projectstructuur
/bergen/schatkaart/{z}/{x}/{y}.jpg  # Tiles van de kaartafbeelding
index.html                           # HTML structuur
css/
 └── style.css                        # Styles voor kaart, overlay, scorebord en feedback
js/
 └── script.js                        # Alle logica: hotspots, raadsels, score, markers, kaartinitialisatie
README.md                             # Dit bestand

▶️ Gebruik

Clone of download dit project.

Zorg dat de map-tiles aanwezig zijn in:

bergen/schatkaart/{z}/{x}/{y}.jpg


Je kunt tiles maken met een tool zoals gdal2tiles
 of MapTiler.

Open index.html in je browser.

De intro-overlay wordt eerst getoond.

Klik op “Open de plattegrond” om de kaart te laden.

Klik op het kruisje rechtsboven om terug te gaan naar de intro.

🧩 Hotspots aanpassen

Hotspots zijn gedefinieerd in js/script.js:

const hotspots = [
  { 
    coords: [2852, 5379], 
    title: "De visboet van Egmond aan Zee", 
    category: "Eten & Drinken", 
    riddle: "Ik ben klein, vol met vis en sta bij de zee. Wat ben ik?", 
    answer: "visboet" 
  },
  ...
];


coords: Pixel-coördinaten van de hotspot in de originele afbeelding (x, y).

title: Naam die getoond wordt in de popup.

url (optioneel): Link die in de popup wordt getoond.

category: Type hotspot (Eten & Drinken, Activiteiten, etc.).

riddle: Tekst van het raadsel.

answer: Correct antwoord (kleine letters, 1 woord aanbevolen).

💻 Separatie van HTML, CSS en JS

HTML (index.html) bevat alleen de structuur: map-container, scorebord, overlay.
CSS (css/style.css) bevat styles voor map, markers, overlay, scorebord en feedback.
JS (js/script.js) bevat de volledige logica:

Initialisatie van de kaart (initMap()), tile-layer en bounds

Hotspots toevoegen met animaties en iconen

Raadsels checken, scorebord updaten

Letters verzamelen voor het eindspel

Intro-overlay en close-knop functionaliteit

Door deze scheiding wordt het onderhoud van het project veel makkelijker.

📦 Dependencies

Leaflet.js 1.7.1
 – voor interactieve kaarten

Leaflet.SmoothMarkerBouncing (optioneel) – voor animatie van markers

Alle dependencies worden via CDN geladen, dus geen installatie nodig.

🌟 Ideeën voor uitbreiding

Eindgame met 37 letters → vorm een zin om de schatkist te openen.

Voeg extra animaties of icoontjes per categorie toe.

Scorebord interactief maken (bijvoorbeeld progress bar).

Meerdere talen of extra hints.

Intro-overlay verbeteren met video of geluid.

👩‍💻 Gemaakt met ❤️

Voor kinderen (en volwassenen) die Bergen, Schoorl en Egmond willen ontdekken via een interactieve schatkaart.