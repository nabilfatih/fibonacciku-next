import styles from "./features.module.scss";
import cls from "classnames";

const Features = () => {
  return (
    <section className={styles.feature}>
      <div className={cls(styles.feature, "container container--pall")}>
        <div className={styles.feature__intro}>
          <h2>Kenapa memilih FibonacciKu?</h2>
          <p>
            Kita menyediakan pendidikan gratis untuk orang Indonesia di seluruh
            dunia yang dapat diakses kapanpun dan dimanapun.
          </p>
        </div>

        <div className={styles.feature__grid}>
          <div className={styles.feature__item}>
            <div
              className={cls(styles.feature__icon, styles.belajar_mandiri)}
            />
            <h3 className={styles.feature__title}>Belajar Mandiri</h3>
            <p className={styles.feature__description}>
              Murid belajar pada kemampuannya sendiri, bertujuan mengisi gap
              pemahaman suatu materi supaya memiliki pondasi yang kuat
            </p>
          </div>

          <div className={styles.feature__item}>
            <div
              className={cls(styles.feature__icon, styles.konten_terpercaya)}
            />
            <h3 className={styles.feature__title}>Konten Terpercaya</h3>
            <p className={styles.feature__description}>
              Diciptakan oleh mahasiswa di jerman yang berpengalaman di
              bidangnya dan mengajar dengan sepenuh hati
            </p>
          </div>

          <div className={styles.feature__item}>
            <div className={cls(styles.feature__icon, styles.belajar_asyik)} />
            <h3 className={styles.feature__title}>Belajar Asyik</h3>
            <p className={styles.feature__description}>
              Pembelajaran yang simpel dan tentunya menyenangkan untuk semua
              umur
            </p>
          </div>

          <div className={styles.feature__item}>
            <div className={cls(styles.feature__icon, styles.akses_gratis)} />
            <h3 className={styles.feature__title}>Akses Gratis</h3>
            <p className={styles.feature__description}>
              Semua materi di FibonacciKu dapat diakses secara gratis kapanpun
              dan dimanapun kamu berada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
