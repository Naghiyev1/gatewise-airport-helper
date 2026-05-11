
const APP_VERSION = "1.0";

const AIRPORTS = {
  BCN: {
    code: "BCN",
    name: "Barcelona-El Prat Airport",
    city: "Barcelona",
    country: "Spain",
    terminals: {
      T1: {
        name: "Terminal 1",
        departureLevel: "Departures: Level 3",
        arrivalsLevel: "Arrivals: Level 1",
        transport: [
          "Aerobús A1 serves Terminal 1.",
          "Metro L9 Sud stops at Aeroport T1.",
          "Taxi ranks are outside arrivals.",
          "Ride-share pickup can vary, so check the airport signs/app."
        ],
        smoking: {
          summary: "Smoking areas may be available after security in designated outdoor zones, but access can change.",
          details: [
            "Look for signed outdoor smoking areas after security.",
            "Do not assume you can smoke at every gate area.",
            "If smoking is important, check before passing security and allow extra time."
          ],
          confidence: "Medium"
        },
        meeting: [
          "For arrivals, wait at Terminal 1 Arrivals, Level 1.",
          "If the flight is international/non-Schengen, allow extra time for passport control.",
          "Baggage belt information usually appears after landing."
        ],
        mistakes: [
          "Do not go to T2 just because an old forum says the airline used it before.",
          "Check the terminal again on the day because airlines and operations can change.",
          "Gate is usually not useful until much closer to boarding."
        ]
      },
      T2: {
        name: "Terminal 2",
        departureLevel: "Departures: T2 building area, check A/B/C signs",
        arrivalsLevel: "Arrivals: follow signs for T2 arrivals",
        transport: [
          "Aerobús A2 serves Terminal 2.",
          "Metro L9 Sud stops at Aeroport T2.",
          "R2 Nord train serves Terminal 2 station.",
          "Free airport shuttle connects T1 and T2."
        ],
        smoking: {
          summary: "Smoking at T2 is more limited and may require using outdoor/public areas depending on where you are.",
          details: [
            "Check before security if you need a smoking stop.",
            "Do not count on a convenient post-security smoking area.",
            "Allow extra time because T2 is split into areas."
          ],
          confidence: "Medium"
        },
        meeting: [
          "For arrivals, confirm whether the passenger lands at T2A, T2B or T2C if available.",
          "Use the arrivals board and airline information if the app does not know the sub-terminal.",
          "T2 is more fragmented than T1, so signs matter."
        ],
        mistakes: [
          "T2 is not one simple building experience; A/B/C can confuse people.",
          "Do not assume Aerobús A1 works for T2. Use A2.",
          "If you land at T2 and need T1, use the free shuttle."
        ]
      }
    },
    general: {
      transfer: [
        "There is a free shuttle between T1 and T2.",
        "Allow buffer time for terminal changes.",
        "If you are meeting someone, ask them to send the terminal screenshot once the airline confirms it."
      ],
      emergency: [
        "If terminal is unknown, search by airline + airport on the official airport site.",
        "If gate is unknown, that is normal until closer to departure.",
        "If baggage belt is unknown, check again after landing."
      ]
    }
  }
};

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

const state = {
  section: "finder",
  form: safeParse(STORAGE.form, {
    flight: "",
    airline: "",
    airport: "BCN",
    terminal: "",
    mode: "departing",
    date: new Date().toISOString().slice(0,10),
    notes: ""
  }),
  trips: safeParse(STORAGE.trips, []),
  liveEnabled: false
};

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c]));
function safeParse(k, fallback){ try { const r=localStorage.getItem(k); return r ? JSON.parse(r) : fallback; } catch { return fallback; } }
function saveJSON(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function norm(s){ return String(s || "").toLowerCase().trim(); }

function airport(){
  return AIRPORTS[state.form.airport] || AIRPORTS.BCN;
}

function inferTerminal(){
  if(state.form.terminal) {
    return {
      terminal: state.form.terminal,
      confidence: "Manual",
      note: "You selected this terminal manually."
    };
  }

  const text = `${state.form.airline} ${state.form.flight}`.toLowerCase();
  const found = AIRLINES_BCN_HINTS.find(a => a.match.some(m => text.includes(m)));
  if(found) return found;

  return {
    terminal: "",
    confidence: "Unknown",
    note: "No terminal selected yet. Choose one manually or verify with the airline/airport source."
  };
}

function terminalInfo(){
  const ap = airport();
  const inferred = inferTerminal();
  const terminal = inferred.terminal && ap.terminals[inferred.terminal] ? inferred.terminal : "";
  return {
    airport: ap,
    inferred,
    terminal,
    info: terminal ? ap.terminals[terminal] : null
  };
}

function actionSummary(){
  const t = terminalInfo();
  const mode = state.form.mode;
  if(!t.info){
    return {
      title: "Terminal not confirmed",
      line: "Choose a terminal manually or verify it before leaving.",
      tone: "medium",
      primary: "Do not travel blind",
      secondary: "Flight trackers often miss terminal data until later."
    };
  }

  if(mode === "meeting"){
    return {
      title: `Go to ${t.terminal} arrivals`,
      line: `${t.info.name}. ${t.info.arrivalsLevel}.`,
      tone: "good",
      primary: "Meeting someone",
      secondary: "Check baggage belt after landing."
    };
  }

  if(mode === "arriving"){
    return {
      title: `You arrive at ${t.terminal}`,
      line: `${t.info.name}. Follow arrivals and baggage signs.`,
      tone: "good",
      primary: "Arrival mode",
      secondary: "Baggage belt usually appears after landing."
    };
  }

  return {
    title: `Go to ${t.terminal} departures`,
    line: `${t.info.name}. ${t.info.departureLevel}.`,
    tone: "good",
    primary: "Departure mode",
    secondary: "Gate usually appears closer to boarding."
  };
}

function render(){
  if(!document.querySelector(".app-shell")) renderShell();
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.nav === state.section));

  if(state.section === "finder") renderFinder();
  if(state.section === "airport") renderAirportGuide();
  if(state.section === "saved") renderSaved();
  if(state.section === "api") renderApiReady();
}

function renderShell(){
  document.body.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand" data-nav="finder">
          <div class="logo-mark">GW</div>
          <div><strong>GateWise</strong><span>Terminal-first flight helper · v${APP_VERSION}</span></div>
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
        <div class="eyebrow">${esc(airport().name)} · ${esc(state.form.date || "Today")}</div>
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
        <label><span>Flight number</span><input id="flightInput" value="${esc(state.form.flight)}" placeholder="e.g. VY1234"></label>
        <label><span>Airline</span><input id="airlineInput" value="${esc(state.form.airline)}" placeholder="e.g. Vueling"></label>
        <label><span>Date</span><input id="dateInput" type="date" value="${esc(state.form.date)}"></label>
        <label><span>Why are you going?</span>
          <select id="modeInput">
            <option value="departing" ${state.form.mode==="departing"?"selected":""}>I am flying</option>
            <option value="meeting" ${state.form.mode==="meeting"?"selected":""}>I am meeting someone</option>
            <option value="arriving" ${state.form.mode==="arriving"?"selected":""}>I am arriving</option>
          </select>
        </label>
        <label><span>Airport</span>
          <select id="airportInput">
            <option value="BCN" selected>Barcelona BCN</option>
          </select>
        </label>
        <label><span>Terminal if known</span>
          <select id="terminalInput">
            <option value="" ${!state.form.terminal?"selected":""}>Unknown / infer</option>
            <option value="T1" ${state.form.terminal==="T1"?"selected":""}>T1</option>
            <option value="T2" ${state.form.terminal==="T2"?"selected":""}>T2</option>
          </select>
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
      <strong>Important reality check</strong>
      <p>Gate, terminal and baggage belt can change. GateWise is designed to tell you what to verify and where to go, not to pretend airport data is always perfect.</p>
    </section>
  `;
}

function terminalCard(t){
  return `<article class="info-card ${t.terminal ? "good" : "medium"}">
    <div class="eyebrow">Terminal</div>
    <strong>${esc(t.terminal || "Unknown")}</strong>
    <h2>${esc(t.terminal ? t.info.name : "Not confirmed yet")}</h2>
    <p>${esc(t.inferred.note)}</p>
    <span>Confidence: ${esc(t.inferred.confidence)}</span>
  </article>`;
}

function airportActionCard(t){
  if(!t.info){
    return `<article class="info-card medium">
      <div class="eyebrow">Where to go</div>
      <strong>Verify first</strong>
      <h2>Terminal needed</h2>
      <p>Search the airline, airport departures/arrivals board, or select the terminal manually if you already know it.</p>
      <span>BCN has T1 and T2. Going to the wrong one costs time.</span>
    </article>`;
  }

  const mode = state.form.mode;
  const level = mode === "meeting" || mode === "arriving" ? t.info.arrivalsLevel : t.info.departureLevel;
  return `<article class="info-card good">
    <div class="eyebrow">Go here</div>
    <strong>${esc(t.terminal)}</strong>
    <h2>${esc(level)}</h2>
    <p>${esc(mode === "meeting" ? "Wait at arrivals and check baggage belt after landing." : "Go to departures. Gate is usually announced later.")}</p>
    <span>${esc(t.airport.name)}</span>
  </article>`;
}

function smokingCard(t){
  const s = t.info?.smoking;
  if(!s){
    return `<article class="info-card medium">
      <div class="eyebrow">Smoking</div>
      <strong>Check terminal</strong>
      <h2>Not enough info yet</h2>
      <p>Select T1 or T2 first. Smoking areas depend heavily on terminal and security zone.</p>
      <span>Do not assume there is one after security.</span>
    </article>`;
  }
  return `<article class="info-card ${s.confidence === "High" ? "good" : "medium"}">
    <div class="eyebrow">Smoking</div>
    <strong>${esc(s.confidence)}</strong>
    <h2>${esc(s.summary)}</h2>
    <p>${esc(s.details[0])}</p>
    <span>Always follow airport signage.</span>
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
    "Leave buffer if you may need T1/T2 transfer."
  ];
  if(t.terminal === "T1") items.unshift("Use Aerobús A1 if taking Aerobús.");
  if(t.terminal === "T2") items.unshift("Use Aerobús A2 or R2 Nord train if suitable.");
  return items;
}

function meetingChecklist(t){
  const items = [
    "Track landing time, not only scheduled arrival.",
    "Baggage belt usually appears after landing.",
    "Ask passenger to send terminal screenshot when they land.",
    "Agree a simple meeting point before they exit."
  ];
  if(t.terminal === "T1") items.unshift("Wait around T1 Arrivals, Level 1.");
  if(t.terminal === "T2") items.unshift("Check whether it is T2A, T2B or T2C if available.");
  return items;
}

function renderAirportGuide(){
  const ap = airport();
  $("#app").innerHTML = `
    <section class="page-head">
      <div>
        <div class="eyebrow">Airport guide</div>
        <h1>Barcelona BCN</h1>
        <p>Terminal-focused practical notes for departures, arrivals, transport, smoking and common mistakes.</p>
      </div>
    </section>

    <section class="terminal-guide-grid">
      ${Object.entries(ap.terminals).map(([code, info]) => terminalGuide(code, info)).join("")}
    </section>

    <section class="guide-card">
      <div class="eyebrow">T1 ↔ T2 transfer</div>
      <h2>Wrong terminal? Do not panic, but move quickly.</h2>
      <ul>${ap.general.transfer.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>
  `;
}

function terminalGuide(code, info){
  return `<article class="terminal-guide">
    <div class="terminal-title">
      <strong>${esc(code)}</strong>
      <div><h2>${esc(info.name)}</h2><p>${esc(info.departureLevel)} · ${esc(info.arrivalsLevel)}</p></div>
    </div>
    <section>
      <div class="eyebrow">Transport</div>
      <ul>${info.transport.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>
    <section>
      <div class="eyebrow">Smoking</div>
      <p>${esc(info.smoking.summary)}</p>
      <ul>${info.smoking.details.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>
    <section>
      <div class="eyebrow">Common mistakes</div>
      <ul>${info.mistakes.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
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
  return `<article class="saved-trip">
    <div class="eyebrow">${esc(trip.date)} · ${esc(trip.mode)}</div>
    <h2>${esc(trip.flight || trip.airline || "Airport trip")}</h2>
    <p>${esc(trip.airline || "No airline added")}</p>
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
        <p>This static v1 is useful without an API key. The next version can connect to a live flight data provider.</p>
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
        <h2>Recommended app behaviour</h2>
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

function persistForm(){
  saveJSON(STORAGE.form, state.form);
}

function updateFormFromInputs(){
  state.form.flight = $("#flightInput")?.value || "";
  state.form.airline = $("#airlineInput")?.value || "";
  state.form.date = $("#dateInput")?.value || new Date().toISOString().slice(0,10);
  state.form.mode = $("#modeInput")?.value || "departing";
  state.form.airport = $("#airportInput")?.value || "BCN";
  state.form.terminal = $("#terminalInput")?.value || "";
  persistForm();
}

function saveTrip(){
  updateFormFromInputs();
  const t = terminalInfo();
  const trip = {
    ...state.form,
    terminal: t.terminal || state.form.terminal || "",
    savedAt: new Date().toISOString()
  };
  state.trips.unshift(trip);
  state.trips = state.trips.slice(0, 20);
  saveJSON(STORAGE.trips, state.trips);
  renderFinder();
}

function handleInput(e){
  if(["flightInput","airlineInput","dateInput"].includes(e.target.id)){
    updateFormFromInputs();
    renderFinder();
  }
}

function handleChange(e){
  if(["modeInput","airportInput","terminalInput"].includes(e.target.id)){
    updateFormFromInputs();
    renderFinder();
  }
}

function handleClick(e){
  const nav = e.target.closest("[data-nav]");
  if(nav){
    state.section = nav.dataset.nav;
    render();
    return;
  }

  const action = e.target.closest("[data-action]");
  if(!action) return;
  const a = action.dataset.action;

  if(a === "saveTrip") saveTrip();

  if(a === "clearForm"){
    state.form = {
      flight: "",
      airline: "",
      airport: "BCN",
      terminal: "",
      mode: "departing",
      date: new Date().toISOString().slice(0,10),
      notes: ""
    };
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
      state.form = { ...state.form, ...trip };
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
