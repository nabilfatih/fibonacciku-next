import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";

const Ujian = ({ children }) => {
  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

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
