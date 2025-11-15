# 📚 Sistem Manajemen Perpustakaan Sederhana
Program ini merupakan implementasi sederhana dari konsep OOP Python seperti class, inheritance, abstraction, encapsulation, dan polymorphism. Sistem ini digunakan untuk mengelola item perpustakaan berupa Buku dan Majalah.

---

## 🧾 Fitur Utama Program
### 1. Menambahkan Item ke Perpustakaan
Pengguna dapat menambah dua jenis item:
* Buku (Book) → memiliki atribut ID, judul, penulis, kategori
* Majalah (Magazine) → memiliki atribut ID, judul, penerbit, edisi

### 2. Menampilkan Semua Item
Menampilkan seluruh koleksi item yang telah tersimpan di perpustakaan.

### 3. Mencari Item Berdasarkan ID
Pengguna dapat mencari item berdasarkan ID yang unik.

### 4. Mencari Item Berdasarkan Judul
Pencarian menggunakan kata kunci (keyword), tidak case-sensitive.

### 5. Konsep OOP yang Diterapkan
| Konsep OOP             | Penjelasan                                            |
| ---------------------- | ----------------------------------------------------- |
| **Abstraction**        | Class `LibraryItem` menjadi abstract base class.      |
| **Inheritance**        | Class `Book` dan `Magazine` mewarisi `LibraryItem`.   |
| **Encapsulation**      | Atribut `__id` dibuat private dan `_title` protected. |
| **Polymorphism**       | Method `display_info()` berbeda di tiap subclass.     |
| **Property Decorator** | Digunakan pada atribut `title` dan `id`.              |

---

## 🖼 Screenshot Hasil Running Program
### Menu Utama
![Menu Utama](https://github.com/user-attachments/assets/6d78989e-3508-47c9-a79c-57464482f65f) 

### Tambah Buku dan Majalah
![Tambah Buku](https://github.com/user-attachments/assets/b908ce16-b7aa-4f67-a4ea-560b949443c2)
![Tambah Majalah](https://github.com/user-attachments/assets/f4ed22a1-4544-415d-b9cd-ec68857f0fcf)

### Tampilkan Semua Item
![Tampilan Item](https://github.com/user-attachments/assets/57d30dac-a281-4a2e-8bf8-457695cd3702) 

### Mencari Item Berdasarkan ID dan Judul
![Cari ID](https://github.com/user-attachments/assets/fab95828-05e1-441e-9850-0f4806c2884f)
![Cari Judul](https://github.com/user-attachments/assets/3e90db8a-1fa0-4fc4-abea-2bcd041897f8)

---

## 📘 Diagram Class
Berikut diagram class sederhana berdasarkan struktur program:
               +---------------------+
               |   LibraryItem (ABC) |
               +---------------------+
               | - __id              |
               | - _title            |
               | - _available        |
               +---------------------+
               | + id (property)     |
               | + title (property)  |
               | + available         |
               | + set_available()   |
               | + display_info() *  |
               +---------------------+
                         ^
                         |
         +---------------+----------------+
         |                                |
+-------------------+           +-------------------+
|       Book        |           |     Magazine      |
+-------------------+           +-------------------+
| - _author         |           | - _Author         |
| - _kategori       |           | - _edisi          |
+-------------------+           +-------------------+
| + display_info()  |           | + display_info()  |
+-------------------+           +-------------------+


+---------------------+
|      Library        |
+---------------------+
| - _items            |
+---------------------+
| + add_item()        |
| + show_all_items()  |
| + search_by_id()    |
| + search_by_title() |
+---------------------+
---