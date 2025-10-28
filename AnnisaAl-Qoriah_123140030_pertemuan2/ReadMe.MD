#  Personal Dashboard – *Places To Visit*

Aplikasi web sederhana berbasis **JavaScript ES6+** yang berfungsi sebagai *personal dashboard* untuk mencatat dan mengelola **daftar tempat yang ingin dikunjungi**.  
Data tersimpan secara **lokal di browser menggunakan localStorage**, sehingga tidak hilang meskipun halaman direfresh.

---

##  Penjelasan Singkat

Aplikasi ini memungkinkan pengguna menambahkan, mengedit, menandai, dan menghapus daftar tempat yang ingin dikunjungi.  
Setiap tempat memiliki data seperti **nama, lokasi, tanggal target, prioritas, dan catatan pribadi**.  
Selain itu, terdapat statistik otomatis yang menampilkan jumlah total tempat, tempat yang sudah dikunjungi, dan tempat yang akan datang.

---

##  Screenshot Aplikasi

| Tampilan | Deskripsi |
|-----------|------------|
| ![Form Tambah Tempat](https://github.com/user-attachments/assets/036c935a-3f59-48eb-b912-db9bd222bffa) | Form input untuk menambahkan tempat baru dengan kolom nama, lokasi, tanggal, prioritas, dan catatan. |
| ![Daftar Tempat](https://github.com/user-attachments/assets/7b56629a-dba4-4de9-9556-b56f327f78e5) | Tampilan daftar tempat dengan tombol edit dan hapus. |
| ![Statistik Ringkas](https://github.com/user-attachments/assets/c9bf4bb3-4465-4106-86ee-a37cdf30a906) | Bagian statistik yang menampilkan total tempat, jumlah yang sudah dikunjungi, dan yang akan datang. |

---

##  Daftar Fitur ES6+ yang Diimplementasikan

| Fitur ES6+ | Implementasi |
|-------------|--------------|
| **Classes** | Menggunakan `class Place` dan `class PlaceStore` untuk memodelkan data dan interaksi dengan localStorage. |
| **Arrow Functions** | Digunakan untuk fungsi ringkas seperti `qs`, `formatDate`, `filteredItems`, `computeStats`, dan `render`. |
| **Template Literals** | Menyusun HTML dinamis untuk daftar tempat dengan interpolasi variabel di `renderItem()`. |
| **Async/Await** | Digunakan pada fungsi `loadMotivation()` untuk simulasi proses asynchronous. |
| **Const & Let** | Digunakan dengan tepat untuk deklarasi variabel yang bersifat tetap dan dapat diubah. |
| **LocalStorage API** | Menyimpan, memperbarui, dan menghapus data pengguna secara lokal di browser. |
