import styles from "./kebijakan-privasi.module.scss";
import cls from "classnames";

const KebijakanPrivasi = () => {
  return (
    <section className={styles.kebijakans}>
      <div className={cls(styles.kebijakan, "container container--px")}>
        <div className={styles.kebijakan__intro}>
          <h1>Kebijakan Privasi</h1>
        </div>

        <div className={styles.kebijakan__grid}>
          <div className={styles.kebijakan__card}>
            <div className={styles.kebijakan__konten}>
              <div className={styles.kebijakan__bab}>
                <h3>Prinsip Keamanan FibonacciKu</h3>
              </div>

              <div className={styles.kebijakan__deskripsi}>
                <p>
                  Semua kebijakan privasi FibonacciKu menggunakan prinsip
                  sebagai berikut:
                </p>
              </div>

              <div className={styles.kebijakan__isi}>
                <ul>
                  <li>
                    FibonacciKu tidak menjual data kepada pihak ketiga. Semua
                    data disimpan aman oleh FibonacciKu.
                  </li>
                  <li>
                    FibonacciKu tidak menampilkan iklan. Tujuannya ialah, agar
                    pengalaman belajar kamu tidak terganggu oleh iklan yang
                    tiba-tiba muncul.
                  </li>
                  <li>
                    FibonacciKu berkomitmen untuk menyediakan lingkungan belajar
                    yang aman dan terjaga dari serangan pihak lain.
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.kebijakan__konten}>
              <div className={styles.kebijakan__bab}>
                <h3>Data Informasi</h3>
              </div>

              <div className={styles.kebijakan__deskripsi}>
                <p>
                  FibonacciKu mengambil data sebagai berikut, jika kamu ingin
                  membuat akun dan belajar di FibonacciKu:
                </p>
              </div>

              <div className={styles.kebijakan__isi}>
                <ul>
                  <li>
                    FibonacciKu mengambil data langsung ketika kamu membuat
                    akun, untuk penggunaan konten FibonacciKu.
                  </li>
                  <li>
                    Ketika kamu membuat akun, password yang kamu buat tersimpan
                    aman dan otomatis terencypt oleh sistem FibonacciKu.
                    FibonacciKu sendiri tidak mengetahui password pribadi kamu,
                    karena sudah otomatis diencrypt.
                  </li>
                  <li>
                    Contoh data informasi ketika registrasi adalah: nama
                    lengkap, username, email.
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.kebijakan__konten}>
              <div className={styles.kebijakan__bab}>
                <h3>Penggunaan Data Informasi</h3>
              </div>

              <div className={styles.kebijakan__deskripsi}>
                <p>
                  FibonacciKu mengambil data informasi untuk tujuan sebagai
                  berikut:
                </p>
              </div>

              <div className={styles.kebijakan__isi}>
                <ul>
                  <li>
                    Memberikan kamu akses untuk menggunakan semua konten yang
                    tersedia di FibonacciKu.
                  </li>
                  <li>
                    Memberikan FibonacciKu informasi, seberapa jauh kamu memakai
                    fasilitas FibonacciKu.
                  </li>
                  <li>
                    Memberikan FibonacciKu informasi, tentang pengalaman kamu
                    dalam menggunakan FibonacciKu sebagai tempat belajar.
                  </li>
                  <li>
                    Memperbaiki fasilitas FibonacciKu supaya kamu lebih puas
                    lagi saat belajar di FibonacciKu.
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.kebijakan__konten}>
              <div className={styles.kebijakan__bab}>
                <h3>Transparansi dan Pilihan</h3>
              </div>

              <div className={styles.kebijakan__deskripsi}>
                <p>
                  FibonacciKu paham, kita tidak boleh memaksa kamu untuk
                  memberikan data informasi pribadi. Oleh karena itu,
                  FibonacciKu memberikan pilihan ketika kamu ingin membuat akun
                  sebagai berikut:
                </p>
              </div>

              <div className={styles.kebijakan__isi}>
                <ul>
                  <li>Batas minimal data informasi yang harus kamu berikan.</li>
                  <li>
                    Merubah dan menghapus data informasi kamu melalui pengaturan
                    akun.
                  </li>
                  <li>
                    Jika kamu ingin menghapus akun kamu, silahkan kontak
                    FibonacciKu dengan fitur kontak.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KebijakanPrivasi;
