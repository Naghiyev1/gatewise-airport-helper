
const APP_VERSION = "1.1";
const AIRPORTS = [{"code": "BCN", "name": "Barcelona-El Prat Airport", "city": "Barcelona", "country": "Spain", "terminals": ["T1", "T2"], "transport": ["Aerobús A1 serves T1; A2 serves T2.", "Metro L9 Sud serves both terminals.", "R2 Nord train serves T2.", "Free shuttle connects T1 and T2."], "smoking": "Smoking availability depends on terminal/security zone. BCN has had designated outdoor areas, but always follow current airport signage.", "notes": ["T2 is split into areas, so check signs carefully.", "Wrong terminal can cost time, but T1/T2 shuttle exists."], "detailed": true}, {"code": "MAD", "name": "Adolfo Suárez Madrid-Barajas Airport", "city": "Madrid", "country": "Spain", "terminals": ["T1", "T2", "T3", "T4", "T4S"], "transport": ["Metro Line 8 serves airport terminals.", "Cercanías train serves T4.", "Airport Express bus connects central Madrid.", "Allow extra time for T4/T4S satellite transfers."], "smoking": "Smoking rules can vary by terminal and security zone. Check airport signage before relying on it.", "notes": ["T4/T4S can require extra transfer time.", "Check whether your flight is T4 or T4S."], "detailed": false}, {"code": "LHR", "name": "Heathrow Airport", "city": "London", "country": "United Kingdom", "terminals": ["T2", "T3", "T4", "T5"], "transport": ["Elizabeth line and Heathrow Express serve the airport.", "Tube Piccadilly line serves Heathrow.", "Terminal transfers can take time."], "smoking": "UK airport smoking areas are generally restricted. Assume no smoking after security unless clearly signed.", "notes": ["Terminal matters a lot at Heathrow.", "Do not go by airline memory; verify current terminal."], "detailed": false}, {"code": "LGW", "name": "Gatwick Airport", "city": "London", "country": "United Kingdom", "terminals": ["North", "South"], "transport": ["Gatwick Express and Thameslink trains serve the airport.", "Inter-terminal shuttle connects North and South."], "smoking": "Assume smoking is restricted and check official signage.", "notes": ["North/South terminal confusion is common."], "detailed": false}, {"code": "CDG", "name": "Charles de Gaulle Airport", "city": "Paris", "country": "France", "terminals": ["T1", "T2", "T3"], "transport": ["RER B connects CDG with Paris.", "CDGVAL connects terminals.", "T2 is large and split into multiple halls."], "smoking": "Smoking areas may exist in designated zones only. Check signage.", "notes": ["T2 sub-terminal matters: 2A, 2B, 2C, 2D, 2E, 2F, 2G."], "detailed": false}, {"code": "ORY", "name": "Paris Orly Airport", "city": "Paris", "country": "France", "terminals": ["Orly 1", "Orly 2", "Orly 3", "Orly 4"], "transport": ["Metro/RER/tram/bus connections vary by route.", "Check Orly terminal before choosing transport."], "smoking": "Designated areas only; verify signage.", "notes": ["Orly terminal numbering can confuse visitors."], "detailed": false}, {"code": "AMS", "name": "Amsterdam Schiphol Airport", "city": "Amsterdam", "country": "Netherlands", "terminals": ["Single terminal"], "transport": ["Train station is under the airport.", "Arrivals/departures are divided by halls rather than separate terminals."], "smoking": "Smoking is heavily restricted. Check signage.", "notes": ["Schiphol feels like one large terminal; hall/pier matters more."], "detailed": false}, {"code": "FRA", "name": "Frankfurt Airport", "city": "Frankfurt", "country": "Germany", "terminals": ["T1", "T2"], "transport": ["S-Bahn and long-distance trains serve the airport.", "SkyLine/train/shuttle connects terminals."], "smoking": "Designated smoking lounges/areas may exist, but check current signage.", "notes": ["T1 is large. Pier/gate area matters."], "detailed": false}, {"code": "MUC", "name": "Munich Airport", "city": "Munich", "country": "Germany", "terminals": ["T1", "T2"], "transport": ["S-Bahn connects airport with Munich.", "Terminal transfer depends on airline and area."], "smoking": "Designated smoking areas only. Verify signage.", "notes": ["T2 is heavily used by Lufthansa group."], "detailed": false}, {"code": "FCO", "name": "Rome Fiumicino Airport", "city": "Rome", "country": "Italy", "terminals": ["T1", "T3"], "transport": ["Leonardo Express train connects with Roma Termini.", "Regional trains and buses also serve the airport."], "smoking": "Use only designated smoking areas where available.", "notes": ["T1/T3 assignment can depend on airline/route."], "detailed": false}, {"code": "MXP", "name": "Milan Malpensa Airport", "city": "Milan", "country": "Italy", "terminals": ["T1", "T2"], "transport": ["Malpensa Express train serves the airport.", "Terminal shuttle may be needed."], "smoking": "Designated areas only. Verify signage.", "notes": ["Terminal matters; T1 and T2 are separate."], "detailed": false}, {"code": "LIS", "name": "Lisbon Airport", "city": "Lisbon", "country": "Portugal", "terminals": ["T1", "T2"], "transport": ["Metro serves the airport.", "T2 is mostly for departures and requires shuttle from T1 area."], "smoking": "Designated areas only; verify signage.", "notes": ["T2 can surprise people because access is less direct."], "detailed": false}, {"code": "DUB", "name": "Dublin Airport", "city": "Dublin", "country": "Ireland", "terminals": ["T1", "T2"], "transport": ["Airport buses and taxis connect to Dublin.", "No rail directly at airport."], "smoking": "Smoking areas are limited; verify official airport information.", "notes": ["US preclearance applies to some US-bound flights."], "detailed": false}, {"code": "ZRH", "name": "Zurich Airport", "city": "Zurich", "country": "Switzerland", "terminals": ["Check-in 1", "Check-in 2", "Check-in 3"], "transport": ["Train connects directly to Zurich and Swiss cities."], "smoking": "Designated smoking lounges/areas may exist. Check signage.", "notes": ["Check-in area and gate area matter more than terminal label."], "detailed": false}, {"code": "VIE", "name": "Vienna International Airport", "city": "Vienna", "country": "Austria", "terminals": ["T1", "T1A", "T3"], "transport": ["City Airport Train and S-Bahn connect to Vienna.", "Bus and taxi options available."], "smoking": "Designated areas only. Verify signage.", "notes": ["T1A can confuse passengers."], "detailed": false}, {"code": "CPH", "name": "Copenhagen Airport", "city": "Copenhagen", "country": "Denmark", "terminals": ["T2", "T3"], "transport": ["Metro and train serve the airport."], "smoking": "Designated areas only where available.", "notes": ["Terminals are connected but check-in area matters."], "detailed": false}, {"code": "ARN", "name": "Stockholm Arlanda Airport", "city": "Stockholm", "country": "Sweden", "terminals": ["T2", "T3", "T4", "T5"], "transport": ["Arlanda Express and trains/buses connect to Stockholm."], "smoking": "Assume smoking is restricted to designated areas.", "notes": ["Terminal changes can be annoying; verify on day."], "detailed": false}, {"code": "OSL", "name": "Oslo Airport", "city": "Oslo", "country": "Norway", "terminals": ["Single terminal"], "transport": ["Airport express train and regional trains connect to Oslo."], "smoking": "Restricted/designated areas only.", "notes": ["Gate area matters more than terminal."], "detailed": false}, {"code": "HEL", "name": "Helsinki Airport", "city": "Helsinki", "country": "Finland", "terminals": ["Single terminal"], "transport": ["Train connects the airport to Helsinki."], "smoking": "Designated smoking areas only where available.", "notes": ["Modern single-terminal flow; gate area matters."], "detailed": false}, {"code": "IST", "name": "Istanbul Airport", "city": "Istanbul", "country": "Turkey", "terminals": ["Main terminal"], "transport": ["Metro, buses and taxis serve the airport.", "Distances inside the terminal can be long."], "smoking": "Designated terrace/areas may exist but verify signage.", "notes": ["Huge airport. Allow walking time."], "detailed": false}, {"code": "SAW", "name": "Sabiha Gökçen Airport", "city": "Istanbul", "country": "Turkey", "terminals": ["Main terminal"], "transport": ["Metro/bus/taxi options available depending on city side."], "smoking": "Designated areas only. Verify signage.", "notes": ["Far from European side of Istanbul; plan travel time."], "detailed": false}, {"code": "DXB", "name": "Dubai International Airport", "city": "Dubai", "country": "United Arab Emirates", "terminals": ["T1", "T2", "T3"], "transport": ["Metro serves T1 and T3.", "T2 is separate; plan accordingly."], "smoking": "Designated smoking lounges/areas may exist. Verify signage.", "notes": ["T3 is heavily Emirates; T2 is separate."], "detailed": false}, {"code": "DOH", "name": "Hamad International Airport", "city": "Doha", "country": "Qatar", "terminals": ["Main terminal"], "transport": ["Metro/taxi/limousine options available."], "smoking": "Designated smoking rooms/areas may exist. Verify signage.", "notes": ["Large transfer airport; concourse/gate matters."], "detailed": false}, {"code": "AUH", "name": "Zayed International Airport", "city": "Abu Dhabi", "country": "United Arab Emirates", "terminals": ["Terminal A"], "transport": ["Taxi, bus and car transfer options available."], "smoking": "Designated areas only. Verify signage.", "notes": ["New terminal layout; follow signs."], "detailed": false}, {"code": "JFK", "name": "John F. Kennedy International Airport", "city": "New York", "country": "United States", "terminals": ["T1", "T4", "T5", "T7", "T8"], "transport": ["AirTrain connects terminals and transit links.", "Terminal changes can take time."], "smoking": "Most US airports do not allow smoking inside terminals. Assume outside only unless official signage says otherwise.", "notes": ["JFK terminal matters a lot. Do not arrive without terminal."], "detailed": false}, {"code": "EWR", "name": "Newark Liberty International Airport", "city": "New York/Newark", "country": "United States", "terminals": ["A", "B", "C"], "transport": ["AirTrain and rail/bus/taxi options available."], "smoking": "Assume outside only. Verify airport rules.", "notes": ["Terminal A/B/C matters for pickup and departure."], "detailed": false}, {"code": "LGA", "name": "LaGuardia Airport", "city": "New York", "country": "United States", "terminals": ["A", "B", "C"], "transport": ["Buses, taxis and ride-share available."], "smoking": "Assume outside only.", "notes": ["Terminal/pickup zones are important."], "detailed": false}, {"code": "LAX", "name": "Los Angeles International Airport", "city": "Los Angeles", "country": "United States", "terminals": ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "Tom Bradley"], "transport": ["LAX-it/rideshare pickup may require shuttle/walk.", "Terminal loop traffic can be painful."], "smoking": "Assume smoking is outside designated areas only.", "notes": ["Tom Bradley International Terminal is often written as TBIT."], "detailed": false}, {"code": "SFO", "name": "San Francisco International Airport", "city": "San Francisco", "country": "United States", "terminals": ["T1", "T2", "T3", "International"], "transport": ["BART serves the airport.", "AirTrain connects terminals."], "smoking": "Assume outside only.", "notes": ["International terminal has A/G sides."], "detailed": false}, {"code": "ORD", "name": "Chicago O'Hare International Airport", "city": "Chicago", "country": "United States", "terminals": ["T1", "T2", "T3", "T5"], "transport": ["CTA Blue Line serves airport.", "Terminal transfer can take time."], "smoking": "Assume outside only.", "notes": ["International arrivals often use T5."], "detailed": false}, {"code": "ATL", "name": "Hartsfield-Jackson Atlanta International Airport", "city": "Atlanta", "country": "United States", "terminals": ["Domestic", "International"], "transport": ["Plane Train connects concourses.", "MARTA serves the airport."], "smoking": "Indoor smoking is generally not allowed. Assume outside only.", "notes": ["Domestic terminal has North/South sides."], "detailed": false}, {"code": "MIA", "name": "Miami International Airport", "city": "Miami", "country": "United States", "terminals": ["North", "Central", "South"], "transport": ["MIA Mover connects to transport centre."], "smoking": "Assume outside designated areas only.", "notes": ["Terminal names and concourses matter."], "detailed": false}, {"code": "YYZ", "name": "Toronto Pearson International Airport", "city": "Toronto", "country": "Canada", "terminals": ["T1", "T3"], "transport": ["UP Express train connects to downtown Toronto.", "Terminal Link train connects areas."], "smoking": "Assume outside designated areas only.", "notes": ["T1/T3 matters for pickup."], "detailed": false}, {"code": "YUL", "name": "Montréal-Trudeau International Airport", "city": "Montreal", "country": "Canada", "terminals": ["Main terminal"], "transport": ["Bus/taxi/car options available."], "smoking": "Assume outside designated areas only.", "notes": ["Single terminal but transborder/international/domestic zones matter."], "detailed": false}, {"code": "MEX", "name": "Mexico City International Airport", "city": "Mexico City", "country": "Mexico", "terminals": ["T1", "T2"], "transport": ["Terminal train/shuttle options connect T1/T2.", "Metro/bus/taxi options available."], "smoking": "Designated areas only where available.", "notes": ["Terminal transfer can be slow. Verify T1/T2."], "detailed": false}, {"code": "GRU", "name": "São Paulo Guarulhos International Airport", "city": "São Paulo", "country": "Brazil", "terminals": ["T1", "T2", "T3"], "transport": ["Airport train/bus/taxi options available."], "smoking": "Designated areas only where available.", "notes": ["T2/T3 are common for major operations."], "detailed": false}, {"code": "EZE", "name": "Ezeiza International Airport", "city": "Buenos Aires", "country": "Argentina", "terminals": ["A", "B", "C"], "transport": ["Taxi/bus/private transfer options common."], "smoking": "Designated areas only where available.", "notes": ["Terminal letters can matter."], "detailed": false}, {"code": "BOG", "name": "El Dorado International Airport", "city": "Bogotá", "country": "Colombia", "terminals": ["T1", "T2/Puente Aéreo"], "transport": ["Taxi/bus options available."], "smoking": "Designated areas only where available.", "notes": ["Domestic vs international routing matters."], "detailed": false}, {"code": "SCL", "name": "Santiago International Airport", "city": "Santiago", "country": "Chile", "terminals": ["T1 Domestic", "T2 International"], "transport": ["Bus/taxi/private transfer options available."], "smoking": "Designated areas only where available.", "notes": ["Domestic/international terminal distinction matters."], "detailed": false}, {"code": "NRT", "name": "Narita International Airport", "city": "Tokyo", "country": "Japan", "terminals": ["T1", "T2", "T3"], "transport": ["Narita Express, Skyliner and buses connect to Tokyo.", "Terminal shuttle may be needed."], "smoking": "Designated smoking rooms may exist. Verify signage.", "notes": ["T3 is more low-cost oriented; check carefully."], "detailed": false}, {"code": "HND", "name": "Haneda Airport", "city": "Tokyo", "country": "Japan", "terminals": ["T1", "T2", "T3"], "transport": ["Monorail and Keikyu connect to Tokyo."], "smoking": "Designated smoking rooms may exist. Verify signage.", "notes": ["T3 is international; T1/T2 mainly domestic but verify."], "detailed": false}, {"code": "ICN", "name": "Incheon International Airport", "city": "Seoul", "country": "South Korea", "terminals": ["T1", "T2"], "transport": ["AREX train and buses connect to Seoul.", "Terminal shuttle/train options available."], "smoking": "Designated smoking rooms/areas may exist. Verify signage.", "notes": ["T1/T2 airline split is important."], "detailed": false}, {"code": "SIN", "name": "Singapore Changi Airport", "city": "Singapore", "country": "Singapore", "terminals": ["T1", "T2", "T3", "T4"], "transport": ["Skytrain connects T1/T2/T3; T4 uses shuttle arrangement.", "MRT serves airport."], "smoking": "Designated smoking areas may exist in terminals. Verify signage.", "notes": ["T4 is separate from main Skytrain flow."], "detailed": false}, {"code": "HKG", "name": "Hong Kong International Airport", "city": "Hong Kong", "country": "Hong Kong", "terminals": ["T1"], "transport": ["Airport Express connects to city.", "Buses and taxis available."], "smoking": "Designated smoking lounges/areas may exist. Verify signage.", "notes": ["Terminal is simpler, but gate/concourse distance can be long."], "detailed": false}, {"code": "BKK", "name": "Suvarnabhumi Airport", "city": "Bangkok", "country": "Thailand", "terminals": ["Main terminal"], "transport": ["Airport Rail Link connects to Bangkok.", "Taxi and bus options available."], "smoking": "Designated areas only. Verify signage.", "notes": ["Large terminal; allow walking time."], "detailed": false}, {"code": "KUL", "name": "Kuala Lumpur International Airport", "city": "Kuala Lumpur", "country": "Malaysia", "terminals": ["KLIA Terminal 1", "KLIA Terminal 2"], "transport": ["KLIA Ekspres serves airport.", "Terminal transfer can take time."], "smoking": "Designated areas only. Verify signage.", "notes": ["KLIA1/KLIA2 confusion is common."], "detailed": false}, {"code": "SYD", "name": "Sydney Airport", "city": "Sydney", "country": "Australia", "terminals": ["T1 International", "T2 Domestic", "T3 Domestic"], "transport": ["Airport train connects to city.", "Terminal transfer may require train/bus/walk depending route."], "smoking": "Assume outside designated areas only.", "notes": ["Domestic/international terminal difference matters."], "detailed": false}, {"code": "MEL", "name": "Melbourne Airport", "city": "Melbourne", "country": "Australia", "terminals": ["T1", "T2", "T3", "T4"], "transport": ["SkyBus and taxis/rideshare serve airport."], "smoking": "Assume outside designated areas only.", "notes": ["T4 can involve different walking/transport flow."], "detailed": false}, {"code": "AKL", "name": "Auckland Airport", "city": "Auckland", "country": "New Zealand", "terminals": ["International", "Domestic"], "transport": ["Inter-terminal bus/walkway connects terminals."], "smoking": "Assume outside designated areas only.", "notes": ["Domestic/international transfer requires planning."], "detailed": false}, {"code": "CPT", "name": "Cape Town International Airport", "city": "Cape Town", "country": "South Africa", "terminals": ["Central terminal"], "transport": ["Taxi, rideshare, shuttle and car options common."], "smoking": "Designated areas only where available.", "notes": ["Domestic/international areas share central terminal concept."], "detailed": false}, {"code": "JNB", "name": "O. R. Tambo International Airport", "city": "Johannesburg", "country": "South Africa", "terminals": ["A", "B"], "transport": ["Gautrain connects airport with city areas.", "Taxi/rideshare options available."], "smoking": "Designated areas only where available.", "notes": ["Terminal A/B and domestic/international split matters."], "detailed": false}];

const AIRLINES_BCN_HINTS = [
  { match: ["vueling", "vy"], terminal: "T1", confidence: "High", note: "Vueling usually operates from T1 at Barcelona, but always verify on the day." },
  { match: ["iberia", "ib"], terminal: "T1", confidence: "Medium", note: "Iberia commonly uses T1 for many operations at BCN; verify for your route." },
  { match: ["british airways", "ba"], terminal: "T1", confidence: "Medium", note: "Often T1, but verify live." },
  { match: ["ryanair", "fr"], terminal: "T2", confidence: "Medium", note: "Ryanair commonly uses T2 at Barcelona; verify on the day." },
  { match: ["easyjet", "u2", "ej"], terminal: "T2", confidence: "Medium", note: "easyJet commonly uses T2 at Barcelona; verify on the day." },
  { match: ["wizz", "w6"], terminal: "T2", confidence: "Medium", note: "Wizz Air often uses T2; verify on the day." }
];

const STORAGE = {
  trips: "gatewise_trips_v1",
  form: "gatewise_form_v1"
};

const DEFAULT_FORM = {
  flight: "",
  airline: "",
  airport: "BCN",
  terminal: "",
  mode: "departing",
  date: new Date().toISOString().slice(0,10),
  notes: ""
};

const state = {
  section: "finder",
  form: safeParse(STORAGE.form, DEFAULT_FORM),
  trips: safeParse(STORAGE.trips, []),
  airportQuery: "",
  airportResults: []
};

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c]));
function safeParse(k, fallback){ try { const r=localStorage.getItem(k); return r ? JSON.parse(r) : fallback; } catch { return fallback; } }
function saveJSON(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function norm(s){ return String(s || "").toLowerCase().trim(); }
function airportByCode(code){ return AIRPORTS.find(a => a.code === code) || AIRPORTS.find(a => a.code === "BCN"); }
function airport(){ return airportByCode(state.form.airport); }
function locationLine(a=airport()){ return [a.city, a.country].filter(Boolean).join(", "); }

function searchAirports(q){
  const n = norm(q);
  if(!n) return [];
  return AIRPORTS.filter(a => {
    const hay = norm(`${a.code} ${a.name} ${a.city} ${a.country}`);
    return hay.includes(n);
  }).slice(0, 12);
}

function inferTerminal(){
  const selected = state.form.terminal.trim();
  if(selected) {
    return {
      terminal: selected,
      confidence: "Manual",
      note: "You entered this terminal manually."
    };
  }

  const ap = airport();
  if(ap.code === "BCN"){
    const text = `${state.form.airline} ${state.form.flight}`.toLowerCase();
    const found = AIRLINES_BCN_HINTS.find(a => a.match.some(m => text.includes(m)));
    if(found) return found;
  }

  return {
    terminal: "",
    confidence: "Unknown",
    note: "No live terminal data yet. Enter the terminal manually if you know it, or verify with airline/airport source."
  };
}

function terminalInfo(){
  const ap = airport();
  const inferred = inferTerminal();
  const terminal = inferred.terminal || "";
  const knownTerminal = ap.terminals.find(t => norm(t) === norm(terminal));
  return {
    airport: ap,
    inferred,
    terminal,
    knownTerminal: knownTerminal || terminal,
    hasTerminal: Boolean(terminal)
  };
}

function actionSummary(){
  const t = terminalInfo();
  const mode = state.form.mode;
  if(!t.hasTerminal){
    return {
      title: "Find the terminal first",
      line: `${t.airport.name} · ${locationLine(t.airport)}`,
      tone: "medium",
      secondary: "Without terminal, airport trips become guesswork."
    };
  }

  if(mode === "meeting"){
    return {
      title: `Go to ${t.terminal} arrivals`,
      line: `Meeting someone at ${t.airport.code}. Follow arrivals and live flight boards.`,
      tone: "good",
      secondary: "Baggage belt usually appears after landing."
    };
  }

  if(mode === "arriving"){
    return {
      title: `You arrive at ${t.terminal}`,
      line: `Follow arrivals, passport control if needed, then baggage signs.`,
      tone: "good",
      secondary: "Baggage belt is often not known before landing."
    };
  }

  return {
    title: `Go to ${t.terminal} departures`,
    line: `Flying from ${t.airport.code}. Go to departures/check-in for ${t.terminal}.`,
    tone: "good",
    secondary: "Gate usually appears closer to boarding."
  };
}

function render(){
  if(!document.querySelector(".app-shell")) renderShell();
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.nav === state.section));

  if(state.section === "finder") return renderFinder();
  if(state.section === "airport") return renderAirportGuide();
  if(state.section === "saved") return renderSaved();
  if(state.section === "api") return renderApiReady();
  state.section = "finder";
  renderFinder();
}

function renderShell(){
  document.body.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand" data-nav="finder">
          <div class="logo-mark">GW</div>
          <div><strong>GateWise</strong><span>Global terminal helper · v${APP_VERSION}</span></div>
        </div>
        <nav class="nav">
          <button class="nav-btn active" data-nav="finder">Finder</button>
          <button class="nav-btn" data-nav="airport">Airport guide</button>
          <button class="nav-btn" data-nav="saved">Saved</button>
          <button class="nav-btn" data-nav="api">API-ready</button>
        </nav>
      </header>
      <main id="app"></main>
    </div>
  `;
}

function renderFinder(){
  const t = terminalInfo();
  const summary = actionSummary();

  $("#app").innerHTML = `
    <section class="hero ${summary.tone}">
      <div>
        <div class="eyebrow">${esc(t.airport.code)} · ${esc(t.airport.name)} · ${esc(state.form.date || "Today")}</div>
        <h1>${esc(summary.title)}</h1>
        <p>${esc(summary.line)}</p>
        <div class="hero-note">${esc(summary.secondary)}</div>
      </div>
      <div class="terminal-orb ${summary.tone}">
        <span>${esc(t.terminal || "?")}</span>
        <em>${esc(t.inferred.confidence)} confidence</em>
      </div>
    </section>

    <section class="form-card">
      <div class="form-grid">
        <label><span>Flight number</span><input id="flightInput" value="${esc(state.form.flight)}" placeholder="e.g. VY1234, BA472, EK185"></label>
        <label><span>Airline</span><input id="airlineInput" value="${esc(state.form.airline)}" placeholder="e.g. Vueling, Emirates, British Airways"></label>
        <label><span>Date</span><input id="dateInput" type="date" value="${esc(state.form.date)}"></label>

        <label class="wide"><span>Airport search</span>
          <input id="airportSearchInput" value="${esc(airport().code + " · " + airport().name)}" placeholder="Search city, airport or IATA code">
          <div id="airportResults" class="airport-results"></div>
        </label>

        <label><span>Why are you going?</span>
          <select id="modeInput">
            <option value="departing" ${state.form.mode==="departing"?"selected":""}>I am flying</option>
            <option value="meeting" ${state.form.mode==="meeting"?"selected":""}>I am meeting someone</option>
            <option value="arriving" ${state.form.mode==="arriving"?"selected":""}>I am arriving</option>
          </select>
        </label>

        <label><span>Terminal if known</span>
          <input id="terminalInput" value="${esc(state.form.terminal)}" placeholder="T1, T2, T3, A, B, International...">
          <small>${esc(airport().terminals.length ? "Known options: " + airport().terminals.join(", ") : "Enter terminal manually if known.")}</small>
        </label>
      </div>
      <div class="form-actions">
        <button class="pill-btn active" data-action="saveTrip">Save trip</button>
        <button class="pill-btn" data-action="clearForm">Clear</button>
      </div>
    </section>

    <section class="cards-grid">
      ${terminalCard(t)}
      ${airportActionCard(t)}
      ${smokingCard(t)}
    </section>

    <section class="checklist-grid">
      ${checklistCard("If you are flying", departingChecklist(t))}
      ${checklistCard("If you are meeting someone", meetingChecklist(t))}
    </section>

    <section class="truth-card">
      <strong>Reality check</strong>
      <p>GateWise v1.1 is global airport guidance, not live flight tracking. Terminal, gate and baggage data can change. The app helps you avoid the rabbit hole and know what to verify.</p>
    </section>
  `;
}

function renderAirportResults(){
  const box = $("#airportResults");
  if(!box) return;
  if(!state.airportResults.length){
    box.innerHTML = "";
    return;
  }
  box.innerHTML = state.airportResults.map(a => `
    <button type="button" class="airport-result" data-action="pickAirport" data-code="${esc(a.code)}">
      <strong>${esc(a.code)} · ${esc(a.city)}</strong>
      <span>${esc(a.name)} · ${esc(a.country)}</span>
    </button>
  `).join("");
}

function terminalCard(t){
  return `<article class="info-card ${t.hasTerminal ? "good" : "medium"}">
    <div class="eyebrow">Terminal</div>
    <strong>${esc(t.terminal || "Unknown")}</strong>
    <h2>${esc(t.hasTerminal ? "Terminal added" : "Not confirmed yet")}</h2>
    <p>${esc(t.inferred.note)}</p>
    <span>Confidence: ${esc(t.inferred.confidence)}</span>
  </article>`;
}

function airportActionCard(t){
  if(!t.hasTerminal){
    return `<article class="info-card medium">
      <div class="eyebrow">Where to go</div>
      <strong>Verify</strong>
      <h2>Terminal needed</h2>
      <p>Search the airport/airline source or enter the terminal manually. At large airports, wrong terminal can cost serious time.</p>
      <span>${esc(t.airport.code)} · ${esc(locationLine(t.airport))}</span>
    </article>`;
  }

  const mode = state.form.mode;
  return `<article class="info-card good">
    <div class="eyebrow">Go here</div>
    <strong>${esc(t.terminal)}</strong>
    <h2>${esc(mode === "meeting" ? "Arrivals" : mode === "arriving" ? "Arrivals flow" : "Departures / check-in")}</h2>
    <p>${esc(mode === "meeting" ? "Wait at arrivals and check live landing/baggage updates." : mode === "arriving" ? "Follow arrivals and baggage signs." : "Go to departures. Gate usually appears later.")}</p>
    <span>${esc(t.airport.name)}</span>
  </article>`;
}

function smokingCard(t){
  return `<article class="info-card medium">
    <div class="eyebrow">Smoking</div>
    <strong>Check</strong>
    <h2>${esc(t.airport.smoking || "Use designated areas only.")}</h2>
    <p>Smoking rules change by airport, terminal and security zone. Do not assume there is a post-security area.</p>
    <span>Follow current airport signage.</span>
  </article>`;
}

function checklistCard(title, items){
  return `<article class="check-card">
    <h2>${esc(title)}</h2>
    <ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
  </article>`;
}

function departingChecklist(t){
  const items = [
    "Confirm terminal on the day of travel.",
    "Do not worry if gate is missing too early.",
    "Check airline baggage/drop-off rules.",
    "Leave buffer if terminal transfer is possible."
  ];
  if(t.airport.transport?.length) items.unshift(t.airport.transport[0]);
  return items;
}

function meetingChecklist(t){
  const items = [
    "Track landing time, not only scheduled arrival.",
    "Baggage belt usually appears after landing.",
    "Ask passenger to send their terminal screenshot when they land.",
    "Agree a simple meeting point before they exit."
  ];
  if(t.hasTerminal) items.unshift(`Wait around ${t.terminal} arrivals.`);
  return items;
}

function renderAirportGuide(){
  const ap = airport();
  $("#app").innerHTML = `
    <section class="page-head">
      <div>
        <div class="eyebrow">Airport guide</div>
        <h1>${esc(ap.code)} · ${esc(ap.city)}</h1>
        <p>${esc(ap.name)}. Practical notes for terminals, transport, smoking and common mistakes.</p>
      </div>
    </section>

    <section class="guide-card airport-overview">
      <div class="eyebrow">Terminals</div>
      <h2>${esc(ap.terminals.join(", ") || "Terminal info varies")}</h2>
      <p>${esc(ap.notes?.[0] || "Check your airline or airport source for terminal confirmation.")}</p>
    </section>

    <section class="terminal-guide-grid">
      ${terminalGuide(ap)}
    </section>
  `;
}

function terminalGuide(ap){
  return `<article class="terminal-guide">
    <div class="terminal-title">
      <strong>${esc(ap.code)}</strong>
      <div><h2>${esc(ap.name)}</h2><p>${esc(locationLine(ap))}</p></div>
    </div>
    <section>
      <div class="eyebrow">Transport</div>
      <ul>${(ap.transport || []).map(x => `<li>${esc(x)}</li>`).join("") || "<li>Check airport transport options before leaving.</li>"}</ul>
    </section>
    <section>
      <div class="eyebrow">Smoking</div>
      <p>${esc(ap.smoking || "Use designated smoking areas only where available.")}</p>
    </section>
    <section>
      <div class="eyebrow">Useful notes</div>
      <ul>${(ap.notes || []).map(x => `<li>${esc(x)}</li>`).join("") || "<li>Terminal and gate details may appear late.</li>"}</ul>
    </section>
  </article>`;
}

function renderSaved(){
  $("#app").innerHTML = `
    <section class="page-head">
      <div>
        <div class="eyebrow">Saved trips</div>
        <h1>Your airport plans</h1>
        <p>Useful for flights, pickups and recurring airport runs.</p>
      </div>
      <button class="pill-btn" data-action="clearTrips">Clear all</button>
    </section>

    <section class="saved-grid">
      ${state.trips.length ? state.trips.map(savedTripCard).join("") : `<article class="empty-card">No saved trips yet. Create one in Finder.</article>`}
    </section>
  `;
}

function savedTripCard(trip, i){
  const ap = airportByCode(trip.airport || "BCN");
  return `<article class="saved-trip">
    <div class="eyebrow">${esc(trip.date)} · ${esc(trip.mode)} · ${esc(ap.code)}</div>
    <h2>${esc(trip.flight || trip.airline || "Airport trip")}</h2>
    <p>${esc(ap.name)}</p>
    <strong>${esc(trip.terminal || "Terminal unknown")}</strong>
    <div class="trip-actions">
      <button class="pill-btn" data-action="loadTrip" data-index="${i}">Load</button>
      <button class="pill-btn" data-action="deleteTrip" data-index="${i}">Delete</button>
    </div>
  </article>`;
}

function renderApiReady(){
  $("#app").innerHTML = `
    <section class="page-head">
      <div>
        <div class="eyebrow">API-ready mode</div>
        <h1>Live flight data later</h1>
        <p>This static v1.1 is useful globally without an API key. The next version can connect to live flight data.</p>
      </div>
    </section>

    <section class="api-grid">
      <article>
        <h2>What live data could add</h2>
        <ul>
          <li>Terminal from flight number</li>
          <li>Gate when announced</li>
          <li>Baggage belt after landing</li>
          <li>Delay / estimated / actual times</li>
          <li>Aircraft and airline status</li>
        </ul>
      </article>
      <article>
        <h2>What can still be missing</h2>
        <ul>
          <li>Gate often appears late</li>
          <li>Baggage belt appears after landing</li>
          <li>Some airports do not expose everything</li>
          <li>Free API tiers may be limited</li>
        </ul>
      </article>
      <article>
        <h2>Correct behaviour</h2>
        <ul>
          <li>Show confidence level</li>
          <li>Show “not announced yet” clearly</li>
          <li>Never pretend missing data is confirmed</li>
          <li>Keep airport helper cards even when live data fails</li>
        </ul>
      </article>
    </section>
  `;
}

function persistForm(){ saveJSON(STORAGE.form, state.form); }

function updateFormFromInputs(){
  const flight = $("#flightInput");
  const airline = $("#airlineInput");
  const date = $("#dateInput");
  const mode = $("#modeInput");
  const terminal = $("#terminalInput");

  if(flight) state.form.flight = flight.value;
  if(airline) state.form.airline = airline.value;
  if(date) state.form.date = date.value || new Date().toISOString().slice(0,10);
  if(mode) state.form.mode = mode.value || "departing";
  if(terminal) state.form.terminal = terminal.value;
  persistForm();
}

function saveTrip(){
  updateFormFromInputs();
  const trip = { ...state.form, savedAt: new Date().toISOString() };
  state.trips.unshift(trip);
  state.trips = state.trips.slice(0, 20);
  saveJSON(STORAGE.trips, state.trips);
  renderFinder();
}

function handleInput(e){
  if(["flightInput","airlineInput","dateInput","terminalInput"].includes(e.target.id)){
    updateFormFromInputs();
    // Do not re-render here. Re-rendering on every character breaks typing focus.
  }

  if(e.target.id === "airportSearchInput"){
    state.airportQuery = e.target.value;
    state.airportResults = searchAirports(state.airportQuery);
    renderAirportResults();
  }
}

function handleChange(e){
  if(["modeInput"].includes(e.target.id)){
    updateFormFromInputs();
    renderFinder();
  }
}

function handleClick(e){
  const nav = e.target.closest("[data-nav]");
  if(nav){
    updateFormFromInputs();
    state.section = nav.dataset.nav;
    render();
    return;
  }

  const action = e.target.closest("[data-action]");
  if(!action) return;
  const a = action.dataset.action;

  if(a === "pickAirport"){
    const code = action.dataset.code;
    const ap = airportByCode(code);
    state.form.airport = ap.code;
    state.form.terminal = "";
    state.airportResults = [];
    persistForm();
    renderFinder();
  }

  if(a === "saveTrip") saveTrip();

  if(a === "clearForm"){
    state.form = { ...DEFAULT_FORM, date: new Date().toISOString().slice(0,10) };
    persistForm();
    renderFinder();
  }

  if(a === "clearTrips"){
    state.trips = [];
    saveJSON(STORAGE.trips, state.trips);
    renderSaved();
  }

  if(a === "loadTrip"){
    const trip = state.trips[Number(action.dataset.index)];
    if(trip){
      state.form = { ...DEFAULT_FORM, ...trip };
      persistForm();
      state.section = "finder";
      render();
    }
  }

  if(a === "deleteTrip"){
    state.trips.splice(Number(action.dataset.index), 1);
    saveJSON(STORAGE.trips, state.trips);
    renderSaved();
  }
}

function boot(){
  renderShell();
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  document.addEventListener("click", handleClick);
  if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
  render();
}

document.addEventListener("DOMContentLoaded", boot);
