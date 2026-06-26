
/* ============================================================
   CONFIG — fill these in before deploying
   ============================================================ */
const JSONBIN_KEY      = "$2a$10$sf/esGAW7TXaRowPUWgf9OGnMaX8vbBf6J2zclyzxQvmx98LGZNVG"; // Paste your JSONBin key here
const JSONBIN_KEY_TYPE = "access";                          // "access" (recommended) or "master"
const JSONBIN_BIN_ID   = "6a3e5cfaf5f4af5e2933bcc2";    // The ID of your private bin

/* RECOMMENDED: use a scoped Access Key, not your account Master Key.
   The key is visible to anyone who views this page's source, so limit what it can do.
   In JSONBin → API Keys → create an Access Key with ONLY these permissions enabled:
       ✅ Bins: Read     (needed to load the list)
       ✅ Bins: Update   (needed to add / delete entries)
       ❌ Bins: Create, Delete, List, Versions  (leave OFF)
   With this, a source-viewer still cannot READ the data (it's encrypted) and now
   also cannot delete the bin, list your other bins, or spawn new ones. The only
   residual power is overwriting THIS bin's (encrypted) contents — i.e. vandalism,
   not a data leak. Set JSONBIN_KEY_TYPE = "master" only if you skip Access Keys. */

/* NOTE: There is intentionally NO password constant here.
   With client-side encryption, the password IS the decryption key, so hard-coding
   it in this file would let anyone reading the page source decrypt everything.
   Instead, participants type the shared password on the lock screen; it is turned
   into an AES key in memory and never stored or transmitted.
   The first person to unlock a fresh bin sets the password for everyone.
   To change the password later: empty the bin (set its content to {}) and
   re-bootstrap with a new password. */

const REFRESH_MS = 30000;          // Auto-refresh interval (30 seconds)
const WINDOW_MIN = 30;             // Grouping window size in minutes
const PBKDF2_ITERATIONS = 200000;  // Key-derivation cost
const VERIFIER_MARKER = "taxi-share-v1"; // Plaintext token used to validate the password
/* ============================================================ */


/* ---------- JSONBin endpoints ---------- */
const BASE = "https://api.jsonbin.io/v3/b/" + JSONBIN_BIN_ID;
const KEY_HEADER = JSONBIN_KEY_TYPE === "master" ? "X-Master-Key" : "X-Access-Key";
const HEADERS = {
  "Content-Type": "application/json",
  [KEY_HEADER]: JSONBIN_KEY,
};

/* ---------- Local state ---------- */
const MINE_KEY = "taxiShareMine";          // localStorage: IDs created on this device
const PW_KEY = "taxiSharePw";              // sessionStorage: keep unlocked within the tab session
let entries = [];                          // latest DECRYPTED entries (each includes id)
let cryptoKey = null;                      // derived AES-GCM key (in memory only)
let saltB64 = null;                        // base64 salt the current key was derived from
let refreshTimer = null;
let view = "arrival";                      // active list view: "arrival" | "departure"

/* ---------- Tiny helpers ---------- */
const $ = (id) => document.getElementById(id);
const ENC = new TextEncoder();
const DEC = new TextDecoder();

function getMine() {
  try { return JSON.parse(localStorage.getItem(MINE_KEY)) || []; }
  catch (e) { return []; }
}
function addMine(id) {
  const m = getMine(); m.push(id);
  localStorage.setItem(MINE_KEY, JSON.stringify(m));
}
function removeMine(id) {
  localStorage.setItem(MINE_KEY, JSON.stringify(getMine().filter((x) => x !== id)));
}
function isMine(id) { return getMine().includes(id); }

function makeId() {
  const r = crypto.getRandomValues(new Uint8Array(8));
  return "e_" + Date.now().toString(36) + "_" + Array.from(r, (b) => b.toString(16).padStart(2, "0")).join("");
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

let toastTimer = null;
function toast(msg, isErr) {
  const t = $("toast");
  t.textContent = msg;
  t.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = "toast"; }, 2800);
}

function setSync(state, text) {
  const dot = $("syncDot");
  dot.className = "dot" + (state === "syncing" ? " syncing" : state === "error" ? " error" : "");
  $("syncText").textContent = text;
}

/* ============================================================
   Crypto — AES-GCM with a PBKDF2-derived key (Web Crypto API)
   ============================================================ */
function b64(buf) {
  let s = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}
function unb64(str) {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

async function deriveKey(password, saltBytes) {
  const base = await crypto.subtle.importKey(
    "raw", ENC.encode(password), "PBKDF2", false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBytes, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptObj(key, obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, key, ENC.encode(JSON.stringify(obj))
  );
  return { iv: b64(iv), ct: b64(ct) };
}

async function decryptObj(key, blob) {
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: unb64(blob.iv) }, key, unb64(blob.ct)
  );
  return JSON.parse(DEC.decode(pt));
}

/* ============================================================
   Date / time formatting
   ============================================================ */
function parseDT(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}
function fmtTime(d) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function fmtDayTime(d) {
  return d.toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
// Floor a date to the start of its WINDOW_MIN window, return a sortable key + label
function windowFor(d) {
  const w = new Date(d);
  const mins = w.getMinutes();
  w.setMinutes(mins - (mins % WINDOW_MIN), 0, 0);
  const end = new Date(w.getTime() + WINDOW_MIN * 60000);
  return {
    key: w.getTime(),
    label: w.toLocaleString([], { weekday: "short", month: "short", day: "numeric" })
         + " · " + fmtTime(w) + "–" + fmtTime(end),
  };
}

/* ============================================================
   JSONBin I/O — the bin stores only encrypted blobs + a salt/verifier
   Record shape:
   { v:1, salt:"<b64>", verifier:{iv,ct}, entries:[ {id, iv, ct}, ... ] }
   ============================================================ */
async function readRecord() {
  const res = await fetch(BASE + "/latest", { headers: HEADERS, cache: "no-store" });
  if (!res.ok) throw new Error("Read failed (" + res.status + ")");
  const json = await res.json();
  let rec = json.record;
  if (Array.isArray(rec)) rec = { entries: rec };       // tolerate a bare array
  if (!rec || typeof rec !== "object") rec = {};
  if (!Array.isArray(rec.entries)) rec.entries = [];
  return rec;
}

async function writeRecord(rec) {
  const res = await fetch(BASE, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(rec),
  });
  if (!res.ok) throw new Error("Save failed (" + res.status + ")");
  return true;
}

// Decrypt a record's entries with the active key; silently skip anything undecryptable.
async function decryptEntries(rec) {
  const out = [];
  for (const item of rec.entries) {
    if (!item || !item.id || !item.iv || !item.ct) continue;
    try {
      const data = await decryptObj(cryptoKey, item);
      out.push(Object.assign({ id: item.id }, data));
    } catch (e) { /* not ours / wrong key — skip */ }
  }
  return out;
}

/* ============================================================
   Render
   ============================================================ */
// Sort entries that have a valid time in `field`, then chunk them into time windows.
function groupByField(field) {
  const valid = entries
    .filter((e) => e && e.id && parseDT(e[field]))
    .sort((a, b) => parseDT(a[field]) - parseDT(b[field]));

  const groups = [];
  let current = null;
  for (const e of valid) {
    const win = windowFor(parseDT(e[field]));
    if (!current || current.key !== win.key) {
      current = { key: win.key, label: win.label, items: [] };
      groups.push(current);
    }
    current.items.push(e);
  }
  return { valid, groups };
}

// Build one entry card. The time chip matching the active view is highlighted.
function entryCardHTML(e) {
  const mine = isMine(e.id);
  const arr = parseDT(e.arrival);
  const dep = parseDT(e.departure);
  let html = '<div class="entry' + (mine ? ' mine' : '') + '">';
  html +=   '<div class="entry-top">';
  html +=     '<div class="name">' + esc(e.name || "Anonymous") +
                (mine ? '<span class="badge-you">You</span>' : '') + '</div>';
  if (mine) {
    html +=   '<button class="btn-del" data-del="' + esc(e.id) + '">Delete</button>';
  }
  html +=   '</div>';

  html +=   '<div class="times">';
  if (arr) html += '<span class="chip' + (view === "arrival" ? " chip-active" : "") + '"><b>Arr</b> ' + esc(fmtDayTime(arr)) +
                     (e.flight ? ' · ✈ ' + esc(e.flight) : '') + '</span>';
  if (dep) html += '<span class="chip' + (view === "departure" ? " chip-active" : "") + '"><b>Dep</b> ' + esc(fmtDayTime(dep)) +
                     (e.depFlight ? ' · ✈ ' + esc(e.depFlight) : '') + '</span>';
  html +=   '</div>';

  if (e.email) {
    html += '<div class="meta">✉ <a href="mailto:' + esc(e.email) + '">' + esc(e.email) + '</a></div>';
  }
  if (e.note) {
    html += '<div class="note">📝 ' + esc(e.note) + '</div>';
  }
  html += '</div>';
  return html;
}

function render() {
  const list = $("list");
  const field = view === "departure" ? "departure" : "arrival";
  const word = view === "departure" ? "departure" : "arrival";
  const { valid, groups } = groupByField(field);

  $("totalCount").textContent = valid.length
    ? valid.length + (valid.length === 1 ? " person" : " people")
    : "";

  if (!valid.length) {
    list.innerHTML =
      '<div class="empty"><span class="big">🧳</span>No ' + word + ' times yet.<br>Add yours above.</div>';
    return;
  }

  let html = "";
  for (const g of groups) {
    const shareable = g.items.length > 1;
    html += '<div class="group">';
    html += '<div class="group-head">' +
              esc(g.label) +
              ' <span class="count">(' + g.items.length + ')</span>' +
              (shareable ? '<span class="share-hint">🤝 ' + g.items.length + ' can share</span>' : '') +
            '</div>';
    for (const e of g.items) html += entryCardHTML(e);
    html += '</div>';
  }
  list.innerHTML = html;

  // Wire delete buttons
  list.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => deleteEntry(btn.getAttribute("data-del")));
  });
}

/* ============================================================
   Actions
   ============================================================ */
function passwordChanged(rec) {
  // Someone reset the bin with a different password/salt while we were unlocked.
  return rec.salt && saltB64 && rec.salt !== saltB64;
}

function forceRelock(msg) {
  clearInterval(refreshTimer);
  sessionStorage.removeItem(PW_KEY);
  cryptoKey = null; saltB64 = null; entries = [];
  $("app").classList.add("hidden");
  $("lock").classList.remove("hidden");
  $("pwErr").textContent = msg || "Session ended. Please unlock again.";
  $("pw").focus();
}

async function refresh(silent) {
  setSync("syncing", silent ? "Syncing…" : "Refreshing…");
  try {
    const rec = await readRecord();
    if (passwordChanged(rec)) { forceRelock("The shared password was changed. Please unlock again."); return; }
    entries = await decryptEntries(rec);
    render();
    setSync("ok", "Updated " + fmtTime(new Date()));
  } catch (err) {
    setSync("error", "Connection problem");
    if (!silent) toast(err.message || "Could not load entries.", true);
  }
}

async function addEntry(ev) {
  ev.preventDefault();
  $("formErr").textContent = "";

  const name = $("f-name").value.trim();
  const email = $("f-email").value.trim();
  const flight = $("f-flight").value.trim();
  const depFlight = $("f-dep-flight").value.trim();
  const arrival = $("f-arrival").value;
  const departure = $("f-departure").value;
  const note = $("f-note").value.trim();

  if (!name || !email || !arrival) {
    $("formErr").textContent = "Name, email and arrival time are required.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    $("formErr").textContent = "Please enter a valid email address.";
    return;
  }

  const id = makeId();
  const payload = { name, email, flight, depFlight, arrival, departure: departure || "", note, created: new Date().toISOString() };

  const btn = $("addBtn");
  btn.disabled = true;
  btn.textContent = "Encrypting…";
  setSync("syncing", "Saving…");

  try {
    // Read-modify-write so we don't clobber others' concurrent entries
    const rec = await readRecord();
    if (passwordChanged(rec)) { forceRelock("The shared password was changed. Please unlock again."); return; }
    const blob = await encryptObj(cryptoKey, payload);
    rec.entries.push({ id, iv: blob.iv, ct: blob.ct });
    await writeRecord(rec);
    addMine(id);
    entries = await decryptEntries(rec);
    render();
    $("entryForm").reset();
    setSync("ok", "Updated " + fmtTime(new Date()));
    toast("Added — others can now see you 🚕");
  } catch (err) {
    setSync("error", "Save failed");
    $("formErr").textContent = err.message || "Could not save. Try again.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Add my entry";
  }
}

async function deleteEntry(id) {
  if (!isMine(id)) return;
  if (!confirm("Delete your entry?")) return;
  setSync("syncing", "Deleting…");
  try {
    const rec = await readRecord();
    if (passwordChanged(rec)) { forceRelock("The shared password was changed. Please unlock again."); return; }
    rec.entries = rec.entries.filter((e) => e.id !== id);
    await writeRecord(rec);
    removeMine(id);
    entries = await decryptEntries(rec);
    render();
    setSync("ok", "Updated " + fmtTime(new Date()));
    toast("Entry deleted.");
  } catch (err) {
    setSync("error", "Delete failed");
    toast(err.message || "Could not delete. Try again.", true);
  }
}

/* ============================================================
   Unlock flow
   ============================================================ */
// Validates (or bootstraps) the password. Returns true on success.
async function attemptUnlock(password) {
  const rec = await readRecord();

  if (rec.salt && rec.verifier) {
    // Existing list: derive the key and check it against the stored verifier.
    const saltBytes = unb64(rec.salt);
    const key = await deriveKey(password, saltBytes);
    try {
      const v = await decryptObj(key, rec.verifier);
      if (!v || v.marker !== VERIFIER_MARKER) throw new Error("bad");
    } catch (e) {
      return false; // wrong password
    }
    cryptoKey = key;
    saltB64 = rec.salt;
    return true;
  }

  // Fresh bin: bootstrap salt + verifier. This password becomes THE password.
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, saltBytes);
  const verifier = await encryptObj(key, { marker: VERIFIER_MARKER });
  const newRec = { v: 1, salt: b64(saltBytes), verifier, entries: [] };
  await writeRecord(newRec);
  cryptoKey = key;
  saltB64 = newRec.salt;
  return true;
}

function startApp() {
  $("lock").classList.add("hidden");
  $("app").classList.remove("hidden");

  // Default arrival to "now" rounded up to the next 15 minutes
  const d = new Date();
  d.setMinutes(d.getMinutes() + (15 - (d.getMinutes() % 15 || 15)), 0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  $("f-arrival").value = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
                         "T" + pad(d.getHours()) + ":" + pad(d.getMinutes());

  clearInterval(refreshTimer);
  refresh(false);
  refreshTimer = setInterval(() => refresh(true), REFRESH_MS);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && cryptoKey) refresh(true);
  });
}

$("lockForm").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const val = $("pw").value;
  if (!val) { $("pwErr").textContent = "Enter the shared password."; return; }
  const btn = $("unlockBtn");
  btn.disabled = true; btn.textContent = "Unlocking…";
  $("pwErr").textContent = "";
  try {
    const ok = await attemptUnlock(val);
    if (ok) {
      sessionStorage.setItem(PW_KEY, val); // stay unlocked for this tab session
      $("pw").value = "";
      startApp();
    } else {
      $("pwErr").textContent = "Incorrect password. Try again.";
      $("pw").value = "";
      $("pw").focus();
    }
  } catch (err) {
    $("pwErr").textContent = err.message || "Could not reach the server. Check your connection / API keys.";
  } finally {
    btn.disabled = false; btn.textContent = "Unlock";
  }
});

$("entryForm").addEventListener("submit", addEntry);
$("refreshBtn").addEventListener("click", () => refresh(false));

// Arrivals / Departures view toggle
document.querySelectorAll("#viewTabs .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    view = tab.getAttribute("data-view");
    document.querySelectorAll("#viewTabs .tab").forEach((t) => t.classList.toggle("active", t === tab));
    $("listTitle").textContent = view === "departure" ? "Departures" : "Arrivals";
    render();
  });
});

// Resume an unlocked session (password kept only in sessionStorage, cleared when the tab closes)
(async function init() {
  const saved = sessionStorage.getItem(PW_KEY);
  if (saved) {
    try {
      if (await attemptUnlock(saved)) { startApp(); return; }
    } catch (e) { /* fall through to lock screen */ }
    sessionStorage.removeItem(PW_KEY);
  }
  $("pw").focus();
})();
