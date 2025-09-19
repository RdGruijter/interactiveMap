let map;
let score = 0;
const total = 37;
let solved = new Array(total).fill(false);
let scoreControl;

// Emoji icons
const icons = {
  "Eten & Drinken": L.divIcon({ className: 'number-icon', html: '🍴' }),
  "Activiteiten": L.divIcon({ className: 'number-icon', html: '🎯' })
};
const defaultIcon = L.divIcon({ className: 'number-icon', html: '❓' });
const solvedIcon = L.divIcon({ className: 'number-icon', html: '🚩' });
// markers array opslaan
let markers = [];

// Hotspots
const hotspots = [
  { coords: [2852, 5379], title: "De visboet van Egmond aan Zee", category: "Eten & Drinken", riddle: "Ik ben klein, vol met vis en sta bij de zee. Wat ben ik?", answer: "visboet", letter: "B" },
  { coords: [5728, 3747], title: "Terras van Fabels", url:"https://fabels-bergen.nl", category: "Eten & Drinken", riddle: "Hier drink je wat en luister je naar verhalen die niet echt zijn gebeurd.", answer: "fabels", letter: "E" },
  { coords: [4300, 4413], title: "Gasterij 't Woud", url:"https://www.het-woud.nl/informatie/", category: "Eten & Drinken", riddle: "Ik sta midden in het bos en geef je eten.", answer: "woud", letter: "A" },
  { coords: [3762, 2401], title: "De Berenkuil in Schoorl", url:"https://www.deberenkuilschoorl.nl/", category: "Eten & Drinken", riddle: "Ik ben een kuil en mijn naam bevat een groot, harig dier.", answer: "beren", letter: "R" },
  { coords: [3456, 4952], title: "Restaurant Natuurlijk", url:"https://natuurlijk-egmond.nl/informatie/", category: "Eten & Drinken", riddle: "Ik serveer eten en mijn naam klinkt als iets puur en echt.", answer: "natuurlijk", letter: "N" },
  { coords: [4065, 1751], title: "Strandhotel Camperduin", url:"https://www.strandhotel-camperduin.nl/nl/contact", category: "Eten & Drinken", riddle: "Ik kijk uit over het zand en de zee, en bied je een bed.", answer: "strandhotel", letter: "S" },
  { coords: [4089, 3246], title: "Duinvermaak restaurant", url:"https://www.duinvermaak.nl/contact/", category: "Eten & Drinken", riddle: "Ik combineer hoge zandheuvels met plezier en eten.", answer: "duinvermaak", letter: "D" },
  { coords: [3186, 5456], title: "Lucky Strike Bowling", url:"https://www.luckystrikebowling.nl/", category: "Activiteiten", riddle: "Ik heb tien kegels en een zware bal. Wat doe je bij mij?", answer: "bowlen", letter: "L" },
  { coords: [2292, 4920], title: "Reddingsboot", category: "Activiteiten", riddle: "Ik vaar uit om levens te redden op zee.", answer: "reddingsboot", letter: "G" },
  { coords: [3230, 4347], title: "Zandkastelen bouwen", category: "Activiteiten", riddle: "Ik ben van zand gemaakt en kan instorten bij de zee.", answer: "zandkasteel", letter: "Z" },
  { coords: [3767, 4508], title: "Fietsen door de duinen", category: "Activiteiten", riddle: "Ik heb twee wielen en breng je door het zandige landschap.", answer: "fiets", letter: "F" },
  { coords: [4001, 4326], title: "Hooglanders spotten", category: "Activiteiten", riddle: "Ik ben groot, harig en graas in de duinen.", answer: "hooglander", letter: "H" },
  { coords: [3701, 5478], title: "Slotkapel Egmond", category: "Activiteiten", riddle: "Ik ben oud, klein en stond ooit naast een groot slot.", answer: "kapel", letter: "K" },
  { coords: [4369, 4954], title: "Let's go Fishing", category: "Activiteiten", riddle: "Met een hengel in de hand hoop je mij te vangen.", answer: "vis", letter: "V" },
  { coords: [5342, 5207], title: "Varen naar Alkmaar", category: "Activiteiten", riddle: "Over het water kom je bij de stad van kaas.", answer: "varen", letter: "A" },
  { coords: [4116, 5279], title: "Alpacas knuffelen", url:"https://alpaca-ecofarm.nl/contact/", category: "Activiteiten", riddle: "Ik spuug soms, maar kinderen vinden me lief en zacht.", answer: "alpaca", letter: "C" },
  { coords: [4783, 4988], title: "Speeltuin Batavier", category: "Activiteiten", riddle: "Hier klim en klauter je als een kleine ontdekkingsreiziger.", answer: "speeltuin", letter: "P" },
  { coords: [3657, 3429], title: "Strandspelletjes", category: "Activiteiten", riddle: "Ik speel met bal of frisbee, altijd bij de zee.", answer: "strandspelletjes", letter: "T" },
  { coords: [3355, 4021], title: "Zee Aquarium", url:"https://www.zeeaquarium.nl/", category: "Activiteiten", riddle: "Ik ben vol met vissen, maar je hoeft niet te duiken om me te zien.", answer: "aquarium", letter: "Q" },
  { coords: [3003, 3293], title: "Surfkampen", url:"https://www.backyardsurfshop.nl", category: "Activiteiten", riddle: "Op mijn plank dans je op de golven.", answer: "surfen", letter: "U" },
  { coords: [3760, 3749], title: "Schaapskooi", category: "Activiteiten", riddle: "Ik ben een huis vol met wollige dieren.", answer: "schaapskooi", letter: "O" },
  { coords: [4558, 4176], title: "Kaas & Kinderboerderij", category: "Activiteiten", riddle: "Ik heb koeien, geiten en een gele lekkernij.", answer: "kaas", letter: "M" },
  { coords: [4461, 3796], title: "Fietsverhuur BonBonBike", url:"https://www.bonbonbike.nl/contact", category: "Activiteiten", riddle: "Bij mij huur je twee wielen om de duinen te ontdekken.", answer: "fiets", letter: "I" },
  { coords: [4352, 3098], title: "Kabouterpad", category: "Activiteiten", riddle: "Ik ben klein, rood met een hoed, en wijs je de weg.", answer: "kabouter", letter: "J" },
  { coords: [4975, 3248], title: "’t IJspaleis", category: "Activiteiten", riddle: "Hier smelt je lekkers als de zon schijnt.", answer: "ijs", letter: "Y" },
  { coords: [4183, 2540], title: "Buiten Centrum Schoorl", category: "Activiteiten", riddle: "Ik leer je alles over duinen en natuur.", answer: "centrum", letter: "X" },
  { coords: [5043, 3045], title: "Elfendeurtjesroute", category: "Activiteiten", riddle: "Kleine deuren in het bos wijzen je een magische weg.", answer: "elf", letter: "E" },
  { coords: [3749, 2980], title: "Klimduin", category: "Activiteiten", riddle: "Ik ben een grote zandberg waar je omhoog en omlaag rent.", answer: "klimduin", letter: "L" },
  { coords: [2947, 2476], title: "Garnalen vangen", category: "Activiteiten", riddle: "Ik ben klein, roze en spring in je net.", answer: "garnaal", letter: "W" },
  { coords: [3238, 1974], title: "Flessenpost", category: "Activiteiten", riddle: "Ik drijf over zee en draag een geheim bericht.", answer: "flessenpost", letter: "S" },
  { coords: [3501, 1745], title: "Zelf een schelpenmuseum maken", category: "Activiteiten", riddle: "Ik verzamel wat de zee achterlaat, groot en klein.", answer: "schelp", letter: "R" },
  { coords: [3863, 1004], title: "Het Piratenschip", category: "Activiteiten", riddle: "Ik vaar op avontuur, zoekend naar schatten.", answer: "piraat", letter: "P" },
  { coords: [4271, 1373], title: "Vogels spotten", category: "Activiteiten", riddle: "Ik fluit in de lucht en soms woon ik in een nest.", answer: "vogel", letter: "V" },
  { coords: [5015, 2766], title: "Uitkijkpost", category: "Activiteiten", riddle: "Van hier zie je alles, want ik ben hoog gebouwd.", answer: "uitkijkpost", letter: "U" },
  { coords: [4782, 3109], title: "Beklimmen van de hoogste trap", category: "Activiteiten", riddle: "Ik heb veel treden en breng je naar boven.", answer: "trap", letter: "T" },
  { coords: [4878, 4025], title: "New Hotspot", category: "Activiteiten", riddle: "uit je geloof", answer: "in de kerk", letter: "K" },
  { coords: [3109, 5200], title: "Vuurtoren van Egmond aan Zee", category: "Activiteiten", riddle: "Ik ben de eenzame wachter van de zee", answer: "vuurtoren", letter: "V" }
  
];
// coords x , y 
 //Projected Pixel Coordinates:
  //      X: 3109
    //    Y: 5200

// Scoreboard
const ScoreControl = L.Control.extend({
  options: { position: 'topleft' },
  onAdd: function(map) {
    this.container = L.DomUtil.create('div', 'scoreboard');
    this.container.innerHTML = `Raadsels opgelost: ${score} / ${total}`;
    return this.container;
  }
});


// Letterbord coords (schatkist)
const chestCoords = [6008, 2535];
let collectedLetters = new Array(hotspots.length).fill('');


// LetterControl
const LetterControl = L.Control.extend({
  onAdd: function(map) {
    // Container maken
    this.container = L.DomUtil.create('div', 'letterboard');
    this.container.style.position = 'topleft';
    this.container.style.pointerEvents = 'none'; // klikken gaat door
    this.container.style.zIndex = 1;

    // Letters initialiseren
    this.updateLetters();

    // Positie berekenen
    this.updatePosition(map);

    return this.container;
  },

  // Update letters die verzameld zijn
  updateLetters: function() {
    if (this.container) {
      this.container.innerHTML = collectedLetters.map(l => l || "_").join(" ");
    }
  },

  // Positionering boven de schatkist
  updatePosition: function(map) {
    if (!this.container || !map) return;
	console.log(chestCoords);
	
    const latlng = map.unproject(chestCoords, map.getMaxZoom());
	// Marker voor de schatkist (kan onzichtbaar)
	const chestMarker = L.marker(latlng, { 
		icon: L.divIcon({ html: '💰' }) 
	}).addTo(map);
    const pos = map.latLngToContainerPoint(latlng);
    console.log(pos.x);
	console.log(pos.y);
    this.container.style.left = `${pos.x + 500}px`;       // horizontaal gecentreerd
    this.container.style.top = `${pos.y - 50}px`;   // iets boven de marker
    this.container.style.transform = 'translateX(-50%)'; // echt centreren
  }
});







function updateScore() {
  if(scoreControl && scoreControl.container){
    scoreControl.container.innerHTML = `Raadsels opgelost: ${score} / ${total}`;
  }
}

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

      // Letter toevoegen
      collectedLetters[index] = hotspots[index].letter;
      letterControl.updateLetters();

      const markerEl = document.getElementById(`marker${index}`);
      if(markerEl) markerEl.style.borderColor = "#4caf50";
	  markers[index].setIcon(solvedIcon);
      checkEndGame();
    } else {
      feedbackEl.textContent = "✅ Al opgelost!";
      feedbackEl.className = "feedback correct";
    }
  } else {
    feedbackEl.textContent = "❌ Fout, probeer opnieuw!";
    feedbackEl.className = "feedback wrong";
  }
}

// Eindgame overlay
function checkEndGame() {
  if (collectedLetters.every(l => l !== '')) {
    const finalWord = collectedLetters.join('');
    const overlay = document.getElementById('chest-overlay');
    document.getElementById('final-code').textContent = finalWord;
    overlay.style.display = 'block';
    overlay.classList.add('show');
    setTimeout(() => overlay.classList.remove('show'), 1000);
  }
}

document.getElementById('close-chest-btn').addEventListener('click', () => {
  document.getElementById('chest-overlay').style.display = 'none';
});

// Kaart initialiseren
function initMap(){
  map = L.map('map', { crs: L.CRS.Simple, minZoom: 0, maxZoom: 5, zoomSnap: 0.1, wheelPxPerZoomLevel: 200, zoomAnimation: true });
  const w = 8190, h = 8190;
  const bounds = [map.unproject([0,h], map.getMaxZoom()), map.unproject([w,0], map.getMaxZoom())];
  L.tileLayer('bergen/schatkaart/{z}/{x}/{y}.jpg', { noWrap:true, bounds:bounds }).addTo(map);
  map.setMaxBounds(bounds);
  map.fitBounds(bounds);

  // Scorebord
  scoreControl = new ScoreControl();
  map.addControl(scoreControl);

  // Letterbord
  letterControl = new LetterControl();
  map.addControl(letterControl);
  
    // Letterbord
  letterControl = new LetterControl();
  map.addControl(letterControl);

  // Meebewegen bij zoom/pan
  map.on('zoom move', () => {
    letterControl.updatePosition(map);
  });


  // This click handler will now give you pixel coordinates

  map.on('click', function(e) {
    // 1. Get the L.LatLng object from the click event
    const latlng = e.latlng;

    // 2. Project the latlng to pixel coordinates
    // We use the current map zoom level for the conversion
    const pixelPoint = map.project(latlng, map.getZoom());

    console.log(`
        Clicked Geographic Coordinates:
        Lat: ${latlng.lat.toFixed(6)}
        Lng: ${latlng.lng.toFixed(6)}

        Projected Pixel Coordinates:
        X: ${pixelPoint.x.toFixed(0)}
        Y: ${pixelPoint.y.toFixed(0)}
    `);
});	

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
	markers.push(marker); // sla de marker op in de array
  });
}

// Overlay buttons
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
