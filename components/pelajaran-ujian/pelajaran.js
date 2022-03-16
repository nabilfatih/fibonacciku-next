import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";

const Pelajaran = () => {
  return (
    <section className={styles.mata_pelajaran}>
      <div className={cls(styles.pelajaran, "container container--pall")}>
        <div className={styles.pelajaran__intro}>
          <h1>Pilih Pelajaran Sesuka Kamu!</h1>
        </div>

        <div className={styles.pelajaran__grid}>
          <div className={styles.pelajaran__card}>
            <div className={styles.pelajaran__icon}></div>

            <div className={styles.pelajaran__title}>
              <h3></h3>
            </div>

            <a className={cls(styles.button, "button")}>Belajar Disini!</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pelajaran;
