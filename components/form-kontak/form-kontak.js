import styles from "./form-kontak.module.scss";
import cls from "classnames";
import Image from "next/image";

import { UilPhoneAlt } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";

const FormKontak = ({ children }) => {
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
                  <p>Regensburg, Jerman</p>
                  <p>Plato Wild Straße 2A, Nr. 1024</p>
                </span>
              </div>
            </div>

            <div className={cls(styles.kontak__information, styles.foto)}>
              <div className={cls(styles.kontak__foto)}>
                <Image
                  src={"/static/icon/kontak-icon.png"}
                  layout="fill"
                  priority={true}
                  alt="Logo Kontak FibonacciKu"
                />
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};

export default FormKontak;
