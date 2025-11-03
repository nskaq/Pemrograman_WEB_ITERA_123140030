# 📚 Personal Book Manager

Aplikasi **Manajemen Buku Pribadi** dibuat menggunakan **React + Vite + Tailwind CSS**.
Aplikasi ini berguna untuk mencatat buku-buku yang dimiliki, sedang dibaca, atau ingin dibeli dengan antarmuka modern dan penyimpanan lokal (localStorage).
Proyek ini dikembangkan sebagai latihan penerapan *React Hooks, Context API, custom hooks, routing, dan testing.*

---

## Deskripsi Aplikasi

**Personal Book Manager** membantu pengguna untuk:

* Menambah, mengedit, dan menghapus data buku.
* Menandai status buku (dimiliki, sedang dibaca, ingin dibeli).
* Menyaring dan mencari buku berdasarkan status atau kata kunci.
* Melihat statistik koleksi (jumlah, status, dan buku terbaru).
* Data tersimpan otomatis di `localStorage` tanpa database eksternal.

---

## Instruksi Instalasi & Menjalankan

### Persiapan Project

```bash
# Clone atau buat project baru
npm create vite@latest book-manager -- --template react
cd book-manager

# Instalasi dependensi
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
npx tailwindcss init -p
```

### Struktur Folder

```
src/
├── components/
│   ├── BookForm/
│   ├── BookList/
│   ├── BookFilter/
│   └── ui/
├── context/
│   └── BookContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── pages/
│   ├── Home/
│   └── Stats/
└── App.jsx
```

### Jalankan Project

```bash
npm run dev
```

Akses di browser: **[http://localhost:5174](http://localhost:5174)**

---

## Screenshot Antarmuka

### Halaman Utama (Home)

![Home](https://github.com/user-attachments/assets/8888aaae-f239-4097-b6b5-98f853709b6a)

### Statistik Koleksi

![Stats](https://github.com/user-attachments/assets/623d67f0-257d-4a23-a06a-dc044c98b9c1)



---

## Fitur React yang Digunakan

| Fitur                                                 | Penjelasan                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **useState & useEffect**                              | Mengelola state form buku dan memantau perubahan data.                                |
| **useReducer**                                        | Mengatur logika state global di `BookContext` untuk efisiensi.                        |
| **Context API**                                       | Menyediakan state global (buku, filter, query) ke seluruh komponen.                   |
| **Custom Hooks (`useLocalStorage`, `useBookStats`)**  | Menyimpan data secara lokal dan menghitung statistik buku.                            |
| **React Router (BrowserRouter, Routes, NavLink)**     | Navigasi antar halaman (`Home` dan `Stats`).                                          |
| **Reusable Components (Button, Input, Select, Card)** | Meningkatkan konsistensi UI dengan komponen serbaguna.                                |
| **Tailwind CSS + Custom Theme**                       | Memberikan gaya modern dengan palet warna `#B77466`, `#FFE1AF`, `#E2B59A`, `#957C62`. |

---

## Komentar dalam Kode Bagian Penting

Contoh komentar dari kode utama `BookContext.jsx`:

```jsx
// State global buku
const initialState = {
  books: [],        // Daftar buku tersimpan
  filter: 'all',    // Filter status
  query: '',        // Kata kunci pencarian
}

// Reducer untuk menangani perubahan state (ADD, UPDATE, DELETE)
function reducer(state, action){
  switch(action.type){
    case 'ADD':
      return { ...state, books: [action.payload, ...state.books] }
    ...
  }
}

// Context Provider menyediakan state dan action ke seluruh aplikasi
export function BookProvider({ children }){ ... }
```

---

## Laporan Testing

Testing dilakukan dengan **Vitest + React Testing Library**.
Tujuannya adalah memastikan setiap fitur utama (tambah, hapus, filter, pencarian, routing) berjalan baik.

### Screenshot Hasil Test

![Uji validasi & penambahan buku](https://github.com/user-attachments/assets/a3b15b21-9f8f-4051-a167-6997215d9d5e) (https://github.com/user-attachments/assets/2ee0bfe8-27c2-4ac7-ba0d-7459441ec569)
![ Uji filter dan pencarian](https://github.com/user-attachments/assets/76400dda-2f8a-431b-837e-7d2ca579fe20)
![Uji penghapusan buku](https://github.com/user-attachments/assets/67958523-1318-47db-9e01-b5b529ba7201)
![Uji edit buku](https://github.com/user-attachments/assets/611dbf8b-8c61-4369-b3fe-9ee89d9c0ea1) (https://github.com/user-attachments/assets/653733a4-6eb0-4742-af43-f3f8979bd6b1)




