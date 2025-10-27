/* ===========================
   Personal Dashboard – Places (versi disesuaikan dengan HTML)
   ES6+ : Classes, Arrow funcs, Template literals, Async/Await, localStorage
=========================== */

// ---------- Utilities (arrow functions)
const qs = (sel, el = document) => el.querySelector(sel);
const formatDate = (value) => {
  if (!value) return "Tidak ditentukan";
  try {
    const d = new Date(value);
    return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(d);
  } catch { return value; }
};

// ---------- Data Models
class Place {
  constructor({ id, title, location = "", targetDate = "", priority = "medium", notes = "", visited = false, createdAt = Date.now() }) {
    this.id = id ?? (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));
    this.title = title;
    this.location = location;
    this.targetDate = targetDate;
    this.priority = priority;
    this.notes = notes;
    this.visited = visited;
    this.createdAt = createdAt;
  }
}

class PlaceStore {
  static key = "pd_places_v1";

  static all() {
    const raw = localStorage.getItem(this.key);
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      return arr.map((p) => new Place(p));
    } catch {
      return [];
    }
  }

  static save(list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  static create(payload) {
    const list = this.all();
    const item = new Place(payload);
    list.unshift(item);
    this.save(list);
    return item;
  }

  static update(id, patch) {
    const list = this.all();
    const idx = list.findIndex(p => p.id === id);
    if (idx >= 0) {
      list[idx] = new Place({ ...list[idx], ...patch });
      this.save(list);
      return list[idx];
    }
    return null;
  }

  static remove(id) {
    const list = this.all().filter(p => p.id !== id);
    this.save(list);
  }

  static clear() {
    localStorage.removeItem(this.key);
  }
}

// ---------- DOM references (hanya yang ADA di HTML)
const els = {
  form: qs("#place-form"),
  formTitle: qs("#form-title"),
  id: qs("#place-id"),
  title: qs("#title"),
  location: qs("#location"),
  targetDate: qs("#targetDate"),
  priority: qs("#priority"),
  notes: qs("#notes"),
  submitBtn: qs("#submit-btn"),
  resetBtn: qs("#reset-btn"),
  clearAllBtn: qs("#clear-all-btn"),

  statTotal: qs("#stat-total"),
  statVisited: qs("#stat-visited"),
  statUpcoming: qs("#stat-upcoming"),

  list: qs("#place-list"),
  filterStatus: qs("#filter-status"),
};

// ---------- Async sample: load short motivation (tetap ada sbg syarat async/await)
const delay = (ms) => new Promise(res => setTimeout(res, ms));
async function loadMotivation() {
  // Di versi HTML ini tidak ada tempat menampilkan motivasi,
  // tapi kita tetap jalankan async/await sebagai contoh penggunaan.
  await delay(300);
  // console.log("Motivation loaded"); // Kalau mau cek di console
}

// ---------- State + Render
let state = {
  items: [],
  filter: "all",           // 'all' | 'planned' | 'visited'
  sort: "created_desc",    // tidak ada UI sort, tapi tetap kita pakai default
};

// Derived stats
const computeStats = () => {
  const total = state.items.length;
  const visited = state.items.filter(p => p.visited).length;
  const upcoming = state.items.filter(p => !p.visited && p.targetDate).length;
  if (els.statTotal) els.statTotal.textContent = total;
  if (els.statVisited) els.statVisited.textContent = visited;
  if (els.statUpcoming) els.statUpcoming.textContent = upcoming;
};

const renderItem = (p) => {
  const visitedClass = p.visited ? "visited" : "";
  const dateBadge = `<span class="badge date" title="Target Tanggal">${formatDate(p.targetDate)}</span>`;
  const prioCls = p.priority === "high" ? "high" : p.priority === "low" ? "low" : "medium";
  const prioBadge = `<span class="badge ${prioCls}" title="Prioritas">${p.priority.toUpperCase()}</span>`;
  const loc = p.location ? `<span class="location">📍 ${p.location}</span>` : "";
  const notes = p.notes ? `<div class="notes">${p.notes}</div>` : "";

  return `
    <li class="place ${visitedClass}" data-id="${p.id}">
      <button class="check" title="Tandai ${p.visited ? 'belum' : 'sudah'} dikunjungi">${p.visited ? "✔" : ""}</button>
      <div>
        <div class="title">${p.title}</div>
        <div class="meta">${loc} ${dateBadge} ${prioBadge}</div>
        ${notes}
      </div>
      <div class="actions-row">
        <button class="icon-btn edit">Edit</button>
        <button class="icon-btn del">Hapus</button>
      </div>
    </li>
  `;
};

const sorters = {
  created_desc: (a, b) => b.createdAt - a.createdAt,
  created_asc: (a, b) => a.createdAt - b.createdAt,
  date_asc: (a, b) => (a.targetDate || "9999-12-31").localeCompare(b.targetDate || "9999-12-31"),
  priority_desc: (a, b) => {
    const rank = { high: 2, medium: 1, low: 0 };
    return rank[b.priority] - rank[a.priority];
  }
};

const filteredItems = () => {
  let arr = [...state.items];
  // Filter sesuai UI yang ada
  if (state.filter === "planned") arr = arr.filter(p => !p.visited);
  if (state.filter === "visited") arr = arr.filter(p => p.visited);
  // Sort default (meski UI sort tidak ada)
  arr.sort(sorters[state.sort]);
  return arr;
};

// Main render
const render = () => {
  const items = filteredItems();
  if (!els.list) return;

  if (items.length === 0) {
    els.list.innerHTML = `
      <li class="place" style="justify-content:center; grid-template-columns:1fr; text-align:center; opacity:.8;">
        Belum ada data
      </li>
    `;
  } else {
    els.list.innerHTML = items.map(renderItem).join("");
  }
  computeStats();
};

// ---------- Handlers
function resetForm() {
  els.id.value = "";
  els.title.value = "";
  els.location.value = "";
  els.targetDate.value = "";
  els.priority.value = "medium";
  els.notes.value = "";
  els.submitBtn.textContent = "Simpan";
  els.formTitle.textContent = "Tambah Tempat";
  els.title.focus();
}

function fillForm(p) {
  els.id.value = p.id;
  els.title.value = p.title;
  els.location.value = p.location;
  els.targetDate.value = p.targetDate || "";
  els.priority.value = p.priority;
  els.notes.value = p.notes;
  els.submitBtn.textContent = "Update";
  els.formTitle.textContent = "Edit Tempat";
  els.title.focus();
}

function loadState() {
  state.items = PlaceStore.all();
  // sort default saat load
  state.items.sort(sorters.created_desc);
  render();
}

function submitHandler(e) {
  e.preventDefault();
  const payload = {
    title: els.title.value.trim(),
    location: els.location.value.trim(),
    targetDate: els.targetDate.value,
    priority: els.priority.value,
    notes: els.notes.value.trim(),
  };
  if (!payload.title) {
    els.title.focus();
    return;
  }

  const id = els.id.value;
  if (id) {
    PlaceStore.update(id, payload);
  } else {
    PlaceStore.create(payload);
  }
  loadState();
  resetForm();
}

function listClickHandler(e) {
  const li = e.target.closest(".place");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains("del")) {
    if (confirm("Hapus tempat ini?")) {
      PlaceStore.remove(id);
      loadState();
    }
    return;
  }

  if (e.target.classList.contains("edit")) {
    const item = state.items.find(p => p.id === id);
    if (item) fillForm(item);
    return;
  }

  if (e.target.classList.contains("check")) {
    const item = state.items.find(p => p.id === id);
    if (item) {
      PlaceStore.update(id, { visited: !item.visited });
      loadState();
    }
    return;
  }
}

function clearAll() {
  if (state.items.length === 0) return;
  if (confirm("Hapus SEMUA data tempat?")) {
    PlaceStore.clear();
    loadState();
    resetForm();
  }
}

// ---------- Init
function init() {
  

  // Load
  loadState();

  // Event listeners
  els.form.addEventListener("submit", submitHandler);
  els.resetBtn.addEventListener("click", resetForm);
  els.clearAllBtn.addEventListener("click", clearAll);
  els.list.addEventListener("click", listClickHandler);

  // Filter status
  els.filterStatus.addEventListener("change", (e) => {
    state.filter = e.target.value;
    render();
  });

  // Contoh async/await tetap dipanggil
  loadMotivation();
}

// Run
window.addEventListener("DOMContentLoaded", init);
