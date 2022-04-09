import styles from "./syarat-ketentuan.module.scss";
import cls from "classnames";

import { useRouter } from "next/router";

const SyaratKetentuan = () => {
  const router = useRouter();

  const HandleClickKebijakan = (e) => {
    e.preventDefault();
    router.push("/kebijakan-privasi");
  };

  return (
    <section className={styles.syarats}>
      <div className={cls(styles.syarat, "container container--px")}>
        <div className={styles.syarat__intro}>
          <h1>Syarat & Ketentuan</h1>
        </div>

        <div className={styles.syarat__grid}>
          <div className={styles.syarat__card}>
            <div className={styles.syarat__konten}>
              <div className={styles.syarat__bab}>
                <h3>Membuat Akun</h3>
              </div>

              <div className={styles.syarat__isi}>
                <ul>
                  <li>
                    Dengan kamu membuat akun di FibonacciKu, maka kamu
                    menyetujui{" "}
                    <a onClick={HandleClickKebijakan}>kebijakan privasi</a>{" "}
                    FibonacciKu dan kamu bertanggung jawab penuh atas akun yang
                    kamu buat.
                  </li>
                  <li>
                    Setelah membuat akun, kamu wajib menverifikasi email kamu
                    untuk menikmati konten FibonacciKu.
                  </li>
                  <li>
                    Email verifikasi hanya dikirim sekali ke email kamu, untuk
                    masalah keamaan akun kamu dan FibonacciKu.
                  </li>
                  <li>
                    Email yang tidak diverifikasi paling lama 1 hari, akan
                    otomatis dihapus dari database FibonacciKu. Jika hal
                    tersebut terjadi, maka kamu harus mendaftar ulang email kamu
                    dan kemudian wajib menverifikasi email kamu.
                  </li>
                  <li>
                    Untuk menggunakan beberapa fitur FibonacciKu, kamu
                    diharuskan membuat akun. Oleh karena itu, kamu bertanggung
                    jawab atas data akun kamu. Jangan membagikan privasi akun
                    kamu ke orang lain untuk menghindari penyalahgunaan akun.
                  </li>
                  <li>
                    Untuk anak dibawah 13 tahun, disarankan untuk didampingi
                    oleh orang tuanya untuk membuat akun di FibonacciKu.
                  </li>
                  <li>
                    Kamu harus memasukkan data email yang valid dan informasi
                    yang lainnya dengan benar. Jika tidak, maka akun kamu akan
                    diblokir dan tidak boleh lagi mengakses FibonacciKu
                    selamanya.
                  </li>
                  <li>
                    Setiap akun hanya boleh dimiliki oleh satu orang dan untuk
                    membuat akun FibonacciKu tidak boleh diwakilkan atau dipaksa
                    oleh orang lain.
                  </li>
                  <li>
                    Tidak boleh membuat akun FibonacciKu untuk tujuan ilegal.
                    Jika ada, maka FibonacciKu akan mengenakan sanksi kepada
                    pelaku yang bersangkutan.
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.syarat__konten}>
              <div className={styles.syarat__bab}>
                <h3>Penggunaan Materi</h3>
              </div>

              <div className={styles.syarat__isi}>
                <ul>
                  <li>
                    Untuk mengakses semua konten FibonacciKu, kamu diharuskan
                    membuat akun. Oleh karena itu, otomatis kamu menyetujui{" "}
                    <a onClick={HandleClickKebijakan}>kebijakan privasi</a> dan
                    syarat ketentuan "Membuat Akun" FibonacciKu.
                  </li>
                  <li>
                    Semua materi pelajaran yang ada di FibonacciKu dimiliki
                    sepenuhnya oleh FibonacciKu. Pembajakan, penyebaran
                    informasi palsu, dan penggunaan ilegal akan dikenakan sanksi
                    yang berlaku.
                  </li>
                  <li>
                    Kamu boleh membagikan materi yang ada di FibonacciKu dengan
                    fitur copy link yang ada di videonya, tetapi tidak boleh
                    untuk menyimpannya secara pribadi dan memperjual belikan
                    materi FibonacciKu.
                  </li>
                  <li>
                    Dilarang membuat produk yang serupa seperti FibonacciKu
                    tanpa izin sah dari FibonacciKu.
                  </li>
                  <li>
                    Jika kamu ingin menggunakan konten yang ada di FibonacciKu.
                    Maka kamu wajib memberi credit kepada FibonacciKu dengan
                    format: "
                    <b>
                      Semua konten FibonacciKu tersedia gratis di
                      www.fibonacciku.com
                    </b>
                    ".
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.syarat__konten}>
              <div className={styles.syarat__bab}>
                <h3>Perilaku yang Dilarang</h3>
              </div>

              <div className={styles.syarat__isi}>
                <ul>
                  <li>
                    Menggunakan semua jenis fasilitas yang diberikan FibonacciKu
                    untuk keuntungan pribadi dan untuk komersial perusahaan.
                  </li>
                  <li>
                    Membagikan, mengunggah, mendistribusi konten FibonacciKu
                    yang tidak akurat di berbagai jenis platform fisik maupun
                    non-fisik.
                  </li>
                  <li>
                    Menggunakan konten FibonacciKu untuk menyerang atau
                    menyakiti orang lain.
                  </li>
                  <li>
                    Menghapus copyright yang ada di FibonacciKu dan tidak
                    menulis credit kepada FibonacciKu jika kalian menggunakan
                    konten FibonacciKu secara pribadi.
                  </li>
                  <li>
                    Membagikan konten FibonacciKu, lalu merubah isi konten tanpa
                    izin sah oleh FibonacciKu.
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

export default SyaratKetentuan;
