# Aplikasi Manajemen Tugas Mahasiswa

Aplikasi Manajemen Tugas Mahasiswa merupakan aplikasi berbasis web yang digunakan untuk membantu mahasiswa dalam mengelola aktivitas akademik seperti mencatat, mengedit, menandai selesai, dan menghapus tugas. Seluruh data disimpan secara lokal di browser menggunakan `localStorage`, sehingga tetap tersimpan meskipun halaman ditutup atau direfresh.

---

## Fitur Aplikasi

- Menambahkan tugas baru (nama tugas, mata kuliah, deadline)
- Mengedit tugas yang sudah ada
- Menandai tugas sebagai selesai atau belum selesai
- Menghapus tugas yang tidak diperlukan
- Filter tugas berdasarkan status atau mata kuliah
- Pencarian tugas berdasarkan nama atau mata kuliah
- Menampilkan jumlah tugas yang belum selesai
- Penyimpanan data secara lokal menggunakan `localStorage`
- Validasi form input (tidak boleh kosong dan deadline valid)

---

## Screenshot Aplikasi

| Tampilan | Deskripsi |
|----------|-----------|
| ![Screenshot 1](screenshots/form.png) | Form tambah tugas dengan validasi input |
| ![Screenshot 2](screenshots/list.png) | Daftar tugas dengan status dan aksi |
| ![Screenshot 3](screenshots/filter.png) | Fitur pencarian dan filter tugas |

*Catatan: Ganti nama file gambar sesuai dengan screenshot yang Anda miliki.*

---

## Cara Menjalankan Aplikasi

1. Pastikan Anda memiliki tiga file berikut dan simpan dalam satu folder:
   - `index.html`
   - `styles.css`
   - `app.js`
2. Buka file `index.html` menggunakan browser (Chrome, Edge, Firefox, dan sebagainya).
3. Aplikasi dapat langsung digunakan tanpa instalasi tambahan.
4. Data tugas akan otomatis tersimpan di `localStorage` browser.

---

## Daftar Fitur dan Status Implementasi

| No | Fitur | Status |
|----|--------|--------|
| 1 | Tambah tugas baru | Selesai |
| 2 | Edit tugas | Selesai |
| 3 | Hapus tugas | Selesai |
| 4 | Tandai selesai/belum selesai | Selesai |
| 5 | Filter dan pencarian tugas | Selesai |
| 6 | Hitung jumlah tugas belum selesai | Selesai |
| 7 | Validasi form input | Selesai |
| 8 | Penyimpanan data di localStorage | Selesai |

---

## Penjelasan Teknis

### Penyimpanan Data menggunakan `localStorage`

Aplikasi menyimpan data tugas dalam bentuk array objek yang dikonversi ke JSON sebelum disimpan di `localStorage`.

Contoh penyimpanan data:
```javascript
localStorage.setItem('tasks', JSON.stringify(tasks));
```
### Mengambil Data Dari `LocalStorage`
```javascript
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```
### Validasi Form
```javascript
if (!name || !name.trim()) {
    document.getElementById('err-name').textContent = 'Nama tugas tidak boleh kosong.';
    valid = false;
}

if (!course || !course.trim()) {
    document.getElementById('err-course').textContent = 'Mata kuliah tidak boleh kosong.';
    valid = false;
}

const dateValue = new Date(deadline + 'T00:00:00');
if (!deadline || isNaN(dateValue.getTime())) {
    document.getElementById('err-deadline').textContent = 'Deadline harus tanggal yang valid.';
    valid = false;
}

```