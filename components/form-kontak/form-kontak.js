import styles from "./form-kontak.module.scss";
import cls from "classnames";
import Image from "next/image";

import { UilPhoneAlt } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";

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
              <UilPhoneAlt
                className={styles.kontak__icon}
                
                width="38"
                height="38"
              />
              <div>
                <h3 className={styles.kontak__title}>Telepon</h3>
                <span className={styles.kontak__subtitle}>+49-17669341393</span>
              </div>
            </div>

            <div className={styles.kontak__information}>
              <UilMap
                className={cls(styles.kontak__icon, styles.kontak__icon__map)}
                
                width="38"
                height="38"
              />
              <div>
                <h3 className={styles.kontak__title}>Lokasi</h3>
                <span className={styles.kontak__subtitle}>
                  <p>Regesnburg, Jerman</p>
                  <p>Plato Wild Straße 2A, Nr. 1024</p>
                </span>
              </div>
            </div>

            <div className={styles.kontak__information}>
              <div className={cls(styles.kontak__foto)}>
                <Image src={"/static/icon/kontak-icon.png"} layout="fill" priority={true}/>
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
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormKontak;
