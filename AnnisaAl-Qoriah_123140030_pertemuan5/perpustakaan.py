from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self.__id = item_id
        self._title = title
        self._available = True

    @property
    def id(self):
        return self.__id

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, new_title):
        if len(new_title) > 0:
            self._title = new_title
        else:
            print("Judul tidak boleh kosong!")

    @property
    def available(self):
        return self._available

    def set_available(self, status):
        self._available = status

    @abstractmethod
    def display_info(self):
        pass

class Book(LibraryItem):
    def __init__(self, item_id, title, author, kategori):
        super().__init__(item_id, title)
        self._author = author
        self._kategori = kategori

    def display_info(self):
        status = "Tersedia" if self.available else "Dipinjam"
        print(f"[BUKU] ID: {self.id} | Judul: {self.title} | Penulis: {self._author} | Kategori: {self._kategori} | Status: {status}")


class Magazine(LibraryItem):
    def __init__(self, item_id, title, Author, edisi):
        super().__init__(item_id, title)
        self._edisi = edisi
        self._Author = Author

    def display_info(self):
        status = "Tersedia" if self.available else "Dipinjam"
        print(f"[MAJALAH] ID: {self.id} | Judul: {self.title} | Penerbit: {self._Author} | Edisi: {self._edisi}  | Status: {status}")


class Library:
    def __init__(self):
        self._items = []

    def add_item(self, item):
        self._items.append(item)
        print("Item berhasil ditambahkan ke perpustakaan.\n")

    def show_all_items(self):
        if len(self._items) == 0:
            print("Belum ada item di perpustakaan.\n")
        else:
            print("DAFTAR ITEM PERPUSTAKAAN")
            for item in self._items:
                item.display_info()
            print("")

    def search_by_id(self, item_id):
        for item in self._items:
            if item.id == item_id:
                return item
        return None

    def search_by_title(self, keyword):
        results = []
        for item in self._items:
            if keyword.lower() in item.title.lower():
                results.append(item)
        return results


def main():
    perpustakaan = Library()

    while True:
        print(" SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA ")
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Tampilkan Semua Item")
        print("4. Cari Item berdasarkan ID")
        print("5. Cari Item berdasarkan Judul")
        print("0. Keluar")

        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            print("\n--- Tambah Buku ---")
            item_id = input("Masukkan ID buku: ")
            title = input("Masukkan judul buku: ")
            author = input("Masukkan nama penulis: ")
            kategori = input("Masukkan kategori buku: ")

            buku = Book(item_id, title, author, kategori)
            perpustakaan.add_item(buku)

        elif pilihan == "2":
            print("\n--- Tambah Majalah ---")
            item_id = input("Masukkan ID majalah: ")
            title = input("Masukkan judul majalah: ")
            Author = input("Masukkan nama penerbit: ")
            edisi = input("Masukkan edisi: ")
            

            majalah = Magazine(item_id, title, Author, edisi)
            perpustakaan.add_item(majalah)

        elif pilihan == "3":
            print("")
            perpustakaan.show_all_items()

        elif pilihan == "4":
            print("\n Cari Item berdasarkan ID ")
            item_id = input("Masukkan ID item: ")
            item = perpustakaan.search_by_id(item_id)
            if item:
                print("Item ditemukan:")
                item.display_info()
                print("")
            else:
                print("Item dengan ID tersebut tidak ditemukan.\n")

        elif pilihan == "5":
            print("\nCari Item berdasarkan Judul ")
            keyword = input("Masukkan kata kunci judul: ")
            hasil = perpustakaan.search_by_title(keyword)

            if len(hasil) == 0:
                print("Tidak ada item dengan judul yang mengandung kata kunci tersebut.\n")
            else:
                print(f"Ditemukan {len(hasil)} item:")
                for item in hasil:
                    item.display_info()
                print("")

        elif pilihan == "0":
            print(" Terima kasih telah menggunakan sistem perpustakaan. ")
            break

        else:
            print("Pilihan tidak valid, coba lagi.\n")


if __name__ == "__main__":
    main()
