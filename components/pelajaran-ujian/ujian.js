import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";

const Ujian = () => {
  return (
    <section className={styles.persiapan_ujian}>
      <div className={cls(styles.ujian, "container container--pall")}>
        <div className={styles.ujian__intro}>
          <h1>Belajar Persiapan Ujian!</h1>
        </div>

        <div className={styles.ujian__grid}>
          <div className={styles.ujian__card}>
            <div className={styles.ujian__icon}></div>

            <div className={styles.ujian__title}>
              <h3></h3>
            </div>

            <a className={cls(styles.button, "button")}>Belajar Disini!</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ujian;
