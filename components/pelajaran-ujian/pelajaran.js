import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";

const Pelajaran = ({ children }) => {
  return (
    <section className={styles.mata_pelajaran}>
      <div className={cls(styles.pelajaran, "container container--pall")}>
        <div className={styles.pelajaran__intro}>
          <h1>Pilih Pelajaran Sesuka Kamu!</h1>
        </div>

        <div className={styles.pelajaran__grid}>{children}</div>
      </div>
    </section>
  );
};

export default Pelajaran;
