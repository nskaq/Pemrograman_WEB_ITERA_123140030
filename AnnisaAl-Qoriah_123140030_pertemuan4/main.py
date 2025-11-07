1# Annisa Al-Qoriah
# 123140030
# Pertemuan 4 - Program Pengelolaan Data Nilai Mahasiswa
data_mahasiswa = [
    {"nama": "Yesaya Abraham", "NIM": "123140011", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Chyntia Bella", "NIM": "123140050", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 80},
    {"nama": "Zahra", "NIM": "123140112", "nilai_uts": 94, "nilai_uas": 88, "nilai_tugas": 95},
    {"nama": "Argantara", "NIM": "123140010", "nilai_uts": 67, "nilai_uas": 82, "nilai_tugas": 68},
    {"nama": "Anastasya", "NIM": "123140201", "nilai_uts": 55, "nilai_uas": 65, "nilai_tugas": 87}
]

def hitung_nilai_akhir(uts, uas, tugas):
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tabel(data):
    print("\n" + "="*80)
    print(f"{'Nama':<15} {'NIM':<10} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Nilai Akhir':<12} {'Grade':<5}")
    print("="*80)
    for mahasiswa in data:
        nilai_akhir = hitung_nilai_akhir(mahasiswa["nilai_uts"], mahasiswa["nilai_uas"], mahasiswa["nilai_tugas"])
        grade = tentukan_grade(nilai_akhir)
        print(f"{mahasiswa['nama']:<15} {mahasiswa['NIM']:<10} {mahasiswa['nilai_uts']:<5} {mahasiswa['nilai_uas']:<5} {mahasiswa['nilai_tugas']:<7} {nilai_akhir:<12.2f} {grade:<5}")
    print("="*80)

def tentukan_nilai(data, mode):
    if not data:
        return None
    nilai_akhir_list = [(hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"]), m) for m in data]
    if mode == "max":
        nilai, mahasiswa = max(nilai_akhir_list, key=lambda x: x[0])
        print(f"Mahasiswa dengan nilai tertinggi: {mahasiswa['nama']} (NIM: {mahasiswa['NIM']}) - Nilai Akhir: {nilai:.2f}")
    elif mode == "min":
        nilai, mahasiswa = min(nilai_akhir_list, key=lambda x: x[0])
        print(f"Mahasiswa dengan nilai terendah: {mahasiswa['nama']} (NIM: {mahasiswa['NIM']}) - Nilai Akhir: {nilai:.2f}")

def mahasiswa_baru(data):
    nama = input("Masukkan Nama mahasiswa: ")
    nim = input("Masukkan NIM: ")
    uts = float(input("Masukkan Nilai UTS: "))
    uas = float(input("Masukkan Nilai UAS: "))
    tugas = float(input("Masukkan Nilai Tugas: "))
    data.append({"nama": nama, "NIM": nim, "nilai_uts": uts, "nilai_uas": uas, "nilai_tugas": tugas})
    print("Data mahasiswa baru telah ditambahkan!")

def filter_grade(data, grade):
    filtered = []
    for mahasiswa in data:
        nilai_akhir = hitung_nilai_akhir(mahasiswa["nilai_uts"], mahasiswa["nilai_uas"], mahasiswa["nilai_tugas"])
        if tentukan_grade(nilai_akhir) == grade:
            filtered.append(mahasiswa)
    return filtered

def rerata(data):
    if not data:
        return 0
    total = sum(hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"]) for m in data)
    return total / len(data)

# Menu utama
def main():
    while True:
        print("\nMenu Program Pengelolaan Data Nilai Mahasiswa")
        print("1. Tampilkan semua data mahasiswa")
        print("2. Cari mahasiswa dengan nilai tertinggi")
        print("3. Cari mahasiswa dengan nilai terendah")
        print("4. Input data mahasiswa baru")
        print("5. Filter mahasiswa berdasarkan grade")
        print("6. Hitung rata-rata nilai kelas")
        print("7. Keluar")
        pilihan = input("Pilih menu (1-7): ")
        
        if pilihan == "1":
            tabel(data_mahasiswa)
        elif pilihan == "2":
            tentukan_nilai(data_mahasiswa, "max")
        elif pilihan == "3":
            tentukan_nilai(data_mahasiswa, "min")
        elif pilihan == "4":
            mahasiswa_baru(data_mahasiswa)
        elif pilihan == "5":
            grade = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
            filtered = filter_grade(data_mahasiswa, grade)
            if filtered:
                tabel(filtered)
            else:
                print(f"Tidak ada mahasiswa dengan grade {grade}.")
        elif pilihan == "6":
            rata = rerata(data_mahasiswa)
            print(f"Rata-rata nilai kelas: {rata:.2f}")
        elif pilihan == "7":
            print("Terima kasih telah menggunakan program ini!")
            break
        else:
            print("Pilihan tidak valid. Silakan coba lagi.")

if __name__ == "__main__":
    main()
