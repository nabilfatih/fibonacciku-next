import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";

const Ujian = ({ children }) => {
  return (
    <section className={styles.persiapan_ujian}>
      <div className={cls(styles.ujian, "container container--pall")}>
        <div className={styles.ujian__intro}>
          <h1>Belajar Persiapan Ujian!</h1>
        </div>

        <div className={styles.ujian__grid}>{children}</div>
      </div>
    </section>
  );
};

export default Ujian;
