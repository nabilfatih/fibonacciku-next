import Head from "next/head";
import Footer from "../../components/footer/footer";
import FormKontak from "../../components/form-kontak/form-kontak";
import NavBar from "../../components/nav/nav";

import styles from "./kontak.module.scss";
import cls from "classnames";

const Kontak = () => {
  return (
    <div>
      <Head>
        <title>Kontak | FibonacciKu</title>
      </Head>
      <NavBar />

      <main>
        <FormKontak>
          <form method="POST" className={cls(styles.kontak__form)}>
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Nama Lengkap</label>
              <input
                className={cls(styles.kontak__input)}
                type="text"
                id="nama"
                name="nama"
                required
              />
            </div>
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Email</label>
              <input
                className={cls(styles.kontak__input)}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Subjek</label>
              <input
                className={cls(styles.kontak__input)}
                type="text"
                id="subject"
                name="subjek"
                required
              />
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Pesan</label>
              <textarea
                className={cls(styles.kontak__input)}
                type="text"
                id="pesan"
                cols="0"
                rows="9"
                name="pesan"
                required
              ></textarea>
            </div>

            <div className={styles.kontak__button}>
              <button type="submit">Kirim Pesan</button>
            </div>
          </form>
        </FormKontak>
      </main>

      <Footer />
    </div>
  );
};

export default Kontak;
