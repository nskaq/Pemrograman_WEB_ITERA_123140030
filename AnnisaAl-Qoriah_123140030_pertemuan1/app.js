// ====== Konfigurasi dasar ======
const STORAGE_KEY = 'tasks_v1';

// Struktur data: { id, name, course, deadline (YYYY-MM-DD), completed: boolean }
let tasks = [];

// ====== Util ======
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  tasks = raw ? JSON.parse(raw) : [];
}

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generateId() {
  return 't_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ====== Validasi Form ======
function clearErrors() {
  $('#err-name').textContent = '';
  $('#err-course').textContent = '';
  $('#err-deadline').textContent = '';
}

function validateForm({ name, course, deadline }) {
  clearErrors();
  let ok = true;

  if (!name || !name.trim()) {
    $('#err-name').textContent = 'Nama tugas tidak boleh kosong.';
    ok = false;
  }
  if (!course || !course.trim()) {
    $('#err-course').textContent = 'Mata kuliah tidak boleh kosong.';
    ok = false;
  }
  if (!deadline) {
    $('#err-deadline').textContent = 'Deadline harus diisi.';
    ok = false;
  } else {
    // tanggal valid dan tidak terlalu jauh ke masa lalu (opsional: izinkan lewat)
    const d = new Date(deadline + 'T00:00:00');
    if (isNaN(d.getTime())) {
      $('#err-deadline').textContent = 'Format tanggal tidak valid.';
      ok = false;
    }
  }
  return ok;
}

// ====== Render UI ======
function renderList() {
  const tbody = $('#task-list');
  tbody.innerHTML = '';

  const statusFilter = $('#status-filter').value;
  const courseFilter = $('#course-filter').value.trim().toLowerCase();
  const searchText = $('#search-text').value.trim().toLowerCase();

  const filtered = tasks.filter(t => {
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && !t.completed) ||
      (statusFilter === 'completed' && t.completed);

    const courseMatch = !courseFilter || t.course.toLowerCase().includes(courseFilter);
    const textMatch =
      !searchText ||
      t.name.toLowerCase().includes(searchText) ||
      t.course.toLowerCase().includes(searchText);

    return statusMatch && courseMatch && textMatch;
  });

  // Hitung belum selesai
  const incomplete = tasks.filter(t => !t.completed).length;
  $('#incomplete-count').textContent = incomplete;

  if (filtered.length === 0) {
    $('#empty-state').style.display = 'block';
    return;
  }
  $('#empty-state').style.display = 'none';

  for (const t of filtered) {
    const tr = document.createElement('tr');

    // Status (checkbox)
    const tdStatus = document.createElement('td');
    const label = document.createElement('label');
    label.className = 'checkbox';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!t.completed;
    cb.addEventListener('change', () => toggleCompleted(t.id, cb.checked));
    const st = document.createElement('span');
    st.className = 'badge ' + (t.completed ? 'done' : 'pending');
    st.textContent = t.completed ? 'Selesai' : 'Belum';
    label.appendChild(cb);
    label.appendChild(st);
    tdStatus.appendChild(label);

    // Nama
    const tdName = document.createElement('td');
    tdName.textContent = t.name;

    // Mata kuliah
    const tdCourse = document.createElement('td');
    tdCourse.textContent = t.course;

    // Deadline
    const tdDeadline = document.createElement('td');
    tdDeadline.textContent = formatDate(t.deadline);

    // Aksi
    const tdActions = document.createElement('td');
    tdActions.className = 'row-actions';
    const btnEdit = document.createElement('button');
    btnEdit.className = 'action-link';
    btnEdit.textContent = 'Edit';
    btnEdit.addEventListener('click', () => populateFormForEdit(t.id));

    const btnDelete = document.createElement('button');
    btnDelete.className = 'action-link danger';
    btnDelete.textContent = 'Hapus';
    btnDelete.addEventListener('click', () => handleDelete(t.id));

    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDelete);

    tr.appendChild(tdStatus);
    tr.appendChild(tdName);
    tr.appendChild(tdCourse);
    tr.appendChild(tdDeadline);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  }
}

// ====== CRUD Logic ======
function addTask(payload) {
  tasks.push({
    id: generateId(),
    name: payload.name.trim(),
    course: payload.course.trim(),
    deadline: payload.deadline,
    completed: false,
  });
  saveToStorage();
  renderList();
}

function updateTask(id, payload) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return;
  tasks[idx] = {
    ...tasks[idx],
    name: payload.name.trim(),
    course: payload.course.trim(),
    deadline: payload.deadline,
  };
  saveToStorage();
  renderList();
}

function toggleCompleted(id, completed) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  t.completed = !!completed;
  saveToStorage();
  renderList();
}

function handleDelete(id) {
  const t = tasks.find(x => x.id === id);
  const ok = confirm(`Hapus tugas "${t?.name || ''}"?`);
  if (!ok) return;
  tasks = tasks.filter(t => t.id !== id);
  saveToStorage();
  renderList();
}

// ====== Form Helpers ======
function resetForm() {
  $('#task-id').value = '';
  $('#name').value = '';
  $('#course').value = '';
  $('#deadline').value = '';
  $('#btn-submit').textContent = 'Tambah';
  $('#form-title').textContent = 'Tambah Tugas';
  clearErrors();
}

function populateFormForEdit(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  $('#task-id').value = t.id;
  $('#name').value = t.name;
  $('#course').value = t.course;
  $('#deadline').value = t.deadline;
  $('#btn-submit').textContent = 'Simpan Perubahan';
  $('#form-title').textContent = 'Edit Tugas';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== Event Binding ======
function bindEvents() {
  // Submit form
  $('#task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: $('#name').value,
      course: $('#course').value,
      deadline: $('#deadline').value,
    };
    if (!validateForm(payload)) return;

    const editingId = $('#task-id').value;
    if (editingId) {
      updateTask(editingId, payload);
    } else {
      addTask(payload);
    }
    resetForm();
  });

  // Reset form
  $('#btn-reset').addEventListener('click', resetForm);

  // Filters
  $('#status-filter').addEventListener('change', renderList);
  $('#course-filter').addEventListener('input', renderList);
  $('#search-text').addEventListener('input', renderList);
}

// ====== Init ======
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  bindEvents();
  renderList();
});
