let map;
let score = 0;
const total = 37;
let solved = new Array(total).fill(false);
let scoreControl;
console.log("DEBUG: script.js wordt uitgevoerd");
// Emoji icons
const icons = {
  "Eten & Drinken": L.divIcon({ className: 'number-icon', html: '🍴' }),
  "Activiteiten": L.divIcon({ className: 'number-icon', html: '🎯' })
};
const defaultIcon = L.divIcon({ className: 'number-icon', html: '❓' });

// === Hotspots met raadsels ===
const hotspots = [
  { coords: [2852, 5379], title: "De visboet van Egmond aan Zee", category: "Eten & Drinken", riddle: "Ik ben klein, vol met vis en sta bij de zee. Wat ben ik?", answer: "visboet" },
  { coords: [5728, 3747], title: "Terras van Fabels", url:"https://fabels-bergen.nl", category: "Eten & Drinken", riddle: "Hier drink je wat en luister je naar verhalen die niet echt zijn gebeurd.", answer: "fabels" },
  { coords: [4300, 4413], title: "Gasterij 't Woud", url:"https://www.het-woud.nl/informatie/", category: "Eten & Drinken", riddle: "Ik sta midden in het bos en geef je eten.", answer: "woud" },
  { coords: [3762, 2401], title: "De Berenkuil in Schoorl", url:"https://www.deberenkuilschoorl.nl/", category: "Eten & Drinken", riddle: "Ik ben een kuil en mijn naam bevat een groot, harig dier.", answer: "beren" },
  { coords: [3456, 4952], title: "Restaurant Natuurlijk", url:"https://natuurlijk-egmond.nl/informatie/", category: "Eten & Drinken", riddle: "Ik serveer eten en mijn naam klinkt als iets puur en echt.", answer: "natuurlijk" },
  { coords: [4065, 1751], title: "Strandhotel Camperduin", url:"https://www.strandhotel-camperduin.nl/nl/contact", category: "Eten & Drinken", riddle: "Ik kijk uit over het zand en de zee, en bied je een bed.", answer: "strandhotel" },
  { coords: [4089, 3246], title: "Duinvermaak restaurant", url:"https://www.duinvermaak.nl/contact/", category: "Eten & Drinken", riddle: "Ik combineer hoge zandheuvels met plezier en eten.", answer: "duinvermaak" },
  { coords: [3186, 5456], title: "Lucky Strike Bowling", url:"https://www.luckystrikebowling.nl/", category: "Activiteiten", riddle: "Ik heb tien kegels en een zware bal. Wat doe je bij mij?", answer: "bowlen" },
  { coords: [2292, 4920], title: "Reddingsboot", category: "Activiteiten", riddle: "Ik vaar uit om levens te redden op zee.", answer: "reddingsboot" },
  { coords: [3230, 4347], title: "Zandkastelen bouwen", category: "Activiteiten", riddle: "Ik ben van zand gemaakt en kan instorten bij de zee.", answer: "zandkasteel" },
  { coords: [3767, 4508], title: "Fietsen door de duinen", category: "Activiteiten", riddle: "Ik heb twee wielen en breng je door het zandige landschap.", answer: "fiets" },
  { coords: [4001, 4326], title: "Hooglanders spotten", category: "Activiteiten", riddle: "Ik ben groot, harig en graas in de duinen.", answer: "hooglander" },
  { coords: [3701, 5478], title: "Slotkapel Egmond", category: "Activiteiten", riddle: "Ik ben oud, klein en stond ooit naast een groot slot.", answer: "kapel" },
  { coords: [4369, 4954], title: "Let's go Fishing", category: "Activiteiten", riddle: "Met een hengel in de hand hoop je mij te vangen.", answer: "vis" },
  { coords: [5342, 5207], title: "Varen naar Alkmaar", category: "Activiteiten", riddle: "Over het water kom je bij de stad van kaas.", answer: "varen" },
  { coords: [4116, 5279], title: "Alpacas knuffelen", url:"https://alpaca-ecofarm.nl/contact/", category: "Activiteiten", riddle: "Ik spuug soms, maar kinderen vinden me lief en zacht.", answer: "alpaca" },
  { coords: [4783, 4988], title: "Speeltuin Batavier", category: "Activiteiten", riddle: "Hier klim en klauter je als een kleine ontdekkingsreiziger.", answer: "speeltuin" },
  { coords: [3657, 3429], title: "Strandspelletjes", category: "Activiteiten", riddle: "Ik speel met bal of frisbee, altijd bij de zee.", answer: "strandspelletjes" },
  { coords: [3355, 4021], title: "Zee Aquarium", url:"https://www.zeeaquarium.nl/", category: "Activiteiten", riddle: "Ik ben vol met vissen, maar je hoeft niet te duiken om me te zien.", answer: "aquarium" },
  { coords: [3003, 3293], title: "Surfkampen", url:"https://www.backyardsurfshop.nl", category: "Activiteiten", riddle: "Op mijn plank dans je op de golven.", answer: "surfen" },
  { coords: [3760, 3749], title: "Schaapskooi", category: "Activiteiten", riddle: "Ik ben een huis vol met wollige dieren.", answer: "schaapskooi" },
  { coords: [4558, 4176], title: "Kaas & Kinderboerderij", category: "Activiteiten", riddle: "Ik heb koeien, geiten en een gele lekkernij.", answer: "kaas" },
  { coords: [4461, 3796], title: "Fietsverhuur BonBonBike", url:"https://www.bonbonbike.nl/contact", category: "Activiteiten", riddle: "Bij mij huur je twee wielen om de duinen te ontdekken.", answer: "fiets" },
  { coords: [4352, 3098], title: "Kabouterpad", category: "Activiteiten", riddle: "Ik ben klein, rood met een hoed, en wijs je de weg.", answer: "kabouter" },
  { coords: [4975, 3248], title: "’t IJspaleis", category: "Activiteiten", riddle: "Hier smelt je lekkers als de zon schijnt.", answer: "ijs" },
  { coords: [4183, 2540], title: "Buiten Centrum Schoorl", category: "Activiteiten", riddle: "Ik leer je alles over duinen en natuur.", answer: "centrum" },
  { coords: [5043, 3045], title: "Elfendeurtjesroute", category: "Activiteiten", riddle: "Kleine deuren in het bos wijzen je een magische weg.", answer: "elf" },
  { coords: [3749, 2980], title: "Klimduin", category: "Activiteiten", riddle: "Ik ben een grote zandberg waar je omhoog en omlaag rent.", answer: "klimduin" },
  { coords: [2947, 2476], title: "Garnalen vangen", category: "Activiteiten", riddle: "Ik ben klein, roze en spring in je net.", answer: "garnaal" },
  { coords: [3238, 1974], title: "Flessenpost", category: "Activiteiten", riddle: "Ik drijf over zee en draag een geheim bericht.", answer: "flessenpost" },
  { coords: [3501, 1745], title: "Zelf een schelpenmuseum maken", category: "Activiteiten", riddle: "Ik verzamel wat de zee achterlaat, groot en klein.", answer: "schelp" },
  { coords: [3863, 1004], title: "Het Piratenschip", category: "Activiteiten", riddle: "Ik vaar op avontuur, zoekend naar schatten.", answer: "piraat" },
  { coords: [4271, 1373], title: "Vogels spotten", category: "Activiteiten", riddle: "Ik fluit in de lucht en soms woon ik in een nest.", answer: "vogel" },
  { coords: [5015, 2766], title: "Uitkijkpost", category: "Activiteiten", riddle: "Van hier zie je alles, want ik ben hoog gebouwd.", answer: "uitkijkpost" },
  { coords: [4782, 3109], title: "Beklimmen van de hoogste trap", category: "Activiteiten", riddle: "Ik heb veel treden en breng je naar boven.", answer: "trap" }
];

// === Scorebord als Leaflet Control ===
const ScoreControl = L.Control.extend({
  options: { position: 'topleft' },
  onAdd: function(map) {
    this.container = L.DomUtil.create('div', 'scoreboard');
    this.container.innerHTML = `Raadsels opgelost: ${score} / ${total}`;
    return this.container;
  }
});

function updateScore() {
  if(scoreControl && scoreControl.container){
    scoreControl.container.innerHTML = `Raadsels opgelost: ${score} / ${total}`;
  }
}

// === Check antwoord functie ===
function checkAnswer(index) {
  const input = document.getElementById(`answer${index}`).value.trim().toLowerCase();
  const correct = hotspots[index].answer.toLowerCase();
  const feedbackEl = document.getElementById(`feedback${index}`);

  if(input === correct) {
    if(!solved[index]){
      solved[index] = true;
      score++;
      updateScore();
      feedbackEl.textContent = "✅ Goed gedaan!";
      feedbackEl.className = "feedback correct";
      const markerEl = document.getElementById(`marker${index}`);
      if(markerEl) markerEl.style.borderColor = "#4caf50";
    } else {
      feedbackEl.textContent = "✅ Al opgelost!";
      feedbackEl.className = "feedback correct";
    }
  } else {
    feedbackEl.textContent = "❌ Fout, probeer opnieuw!";
    feedbackEl.className = "feedback wrong";
  }
}

// === Kaart initialiseren ===
function initMap(){
  map = L.map('map', { crs: L.CRS.Simple, minZoom: 0, maxZoom: 5, zoomSnap: 0.1, wheelPxPerZoomLevel: 200, zoomAnimation: true, });
  const w = 8190, h = 8190;
  const bounds = [map.unproject([0,h], map.getMaxZoom()), map.unproject([w,0], map.getMaxZoom())];
  L.tileLayer('bergen/schatkaart/{z}/{x}/{y}.jpg', { noWrap:true, bounds:bounds }).addTo(map);
  map.setMaxBounds(bounds);
  map.fitBounds(bounds);

  // Voeg scorebord toe
  scoreControl = new ScoreControl();
  map.addControl(scoreControl);

  // Voeg markers toe
  hotspots.forEach((spot, i) => {
    const latlng = map.unproject(spot.coords, map.getMaxZoom());
    const marker = L.marker(latlng, { icon: icons[spot.category] || defaultIcon }).addTo(map);
    let popupContent = `<b>${spot.title}</b><br><i>${spot.category}</i>`;
    if(spot.url) popupContent += `<br><a href="${spot.url}" target="_blank">Meer info</a>`;
    if(spot.riddle) popupContent += `<br><b>Raadsel:</b> ${spot.riddle}<br>
      <input type="text" id="answer${i}" placeholder="Jouw antwoord..." />
      <button onclick="checkAnswer(${i})">Controleer</button>
      <div id="feedback${i}" class="feedback"></div>`;
    marker.bindPopup(popupContent);
    marker.on('add', () => { if(marker._icon) marker._icon.id = `marker${i}`; });
  });
}

// === Overlay buttons ===
const openBtn = document.getElementById('open-map-btn');
const closeBtn = document.getElementById('close-map-btn');
const introOverlay = document.getElementById('intro-overlay');
const mapDiv = document.getElementById('map');

openBtn.addEventListener('click', () => {
  introOverlay.style.display = 'none';
  mapDiv.style.display = 'block';
  closeBtn.style.display = 'flex';
  initMap();
});

closeBtn.addEventListener('click', () => {
  mapDiv.style.display = 'none';
  introOverlay.style.display = 'flex';
  closeBtn.style.display = 'none';
});