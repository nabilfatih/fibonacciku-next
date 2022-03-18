import styles from "./form-kontak.module.scss";
import cls from "classnames";
import Image from "next/image";

const FormKontak = () => {
  return (
    <section className={styles.kontak_form}>
      <div className={cls(styles.kontak, "container container--pall")}>
        <div className={styles.kontak__intro}>
          <h1>Kamu Bisa Kontak Kita!</h1>
          <p>
            Kalau kamu ada saran atau masukan untuk kita, bisa mengisi form
            dibawah!
          </p>
          <p>
            Atau bahkan jika kamu ingin kerjasama dengan kita, dengan senang
            hati kita membuka tangan lebar-lebar.
          </p>
        </div>

        <div className={styles.kontak__container}>
          <div className={styles.kontak__grid}>
            <div className={styles.kontak__information}>
              <i className={cls(styles.kontak__icon, "uil uil-phone")}></i>
              <div>
                <h3 className={styles.kontak__title}>Telepon</h3>
                <span className={styles.kontak__subtitle}>+49-17669341393</span>
              </div>
            </div>

            <div className={styles.kontak__information}>
              <i className={cls(styles.kontak__icon, "uil uil-map-marker")}></i>
              <div>
                <h3 className={styles.kontak__title}>Lokasi</h3>
                <span className={styles.kontak__subtitle}>
                  Regensburg - Jerman, Plato Wild Str. 2A, Nr. 1024
                </span>
              </div>
            </div>

            <div className={styles.kontak__information}>
              <div className={cls(styles.kontak__foto)}>
                <img
                  src="/static/icon/kontak-icon.png"
                  alt="Logo Kontak FibonacciKu"
                />
              </div>
            </div>
          </div>

          <form
            action=""
            method="POST"
            className={cls(styles.kontak__form, "grid validated-form")}
            noValidate
          >
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label, "form-label")}>
                Nama Lengkap
              </label>
              <input
                className={cls("form-control", styles.kontak__input)}
                type="text"
                id="nama"
                name="nama"
                required
              />
            </div>
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label, "form-label")}>
                Email
              </label>
              <input
                className={cls("form-control", styles.kontak__input)}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label, "form-label")}>
                Subjek
              </label>
              <input
                className={cls("form-control", styles.kontak__input)}
                type="text"
                id="subject"
                name="subjek"
                required
              />
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label, "form-label")}>
                Pesan
              </label>
              <textarea
                className={cls("form-control", styles.kontak__input)}
                type="text"
                id="pesan"
                cols="0"
                rows="9"
                name="pesan"
                required
              ></textarea>
            </div>

            <div className={styles.button}>
              <button type="submit" className={styles.button__button}>
                Kirim Pesan
                <i className={cls(styles.button__icon, "uil uil-message")}></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormKontak;
