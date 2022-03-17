import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";
import dataPelajaran from "../../data/dataPelajaran.json";
import Image from "next/image";

const Pelajaran = (props) => {
  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

  return (
    <section className={styles.mata_pelajaran}>
      <div className={cls(styles.pelajaran, "container container--pall")}>
        <div className={styles.pelajaran__intro}>
          <h1>Pilih Pelajaran Sesuka Kamu!</h1>
        </div>

        <div className={styles.pelajaran__grid}>
          {props.data.map((Pelajaran) => {
            if (Pelajaran.jenis == "pelajaran") {
              return (
                <div
                  key={createFromPattern("xxx-xxx")}
                  className={styles.pelajaran__card}
                >
                  <div
                    key={createFromPattern("xxx-xxx")}
                    className={styles.pelajaran__icon}
                  >
                    <Image
                      key={createFromPattern("xxx-xxx")}
                      className={styles.img}
                      src={Pelajaran.icon}
                      width={128}
                      height={128}
                      alt={`Logo ${Pelajaran.pelajaran} FibonacciKu`}
                    />
                  </div>

                  <div className={styles.pelajaran__title}>
                    <h3 key={createFromPattern("xxx-xxx")}>
                      {Pelajaran.pelajaran}
                    </h3>
                  </div>

                  <a
                    key={createFromPattern("xxx-xxx")}
                    className={cls(styles.button, "button")}
                  >
                    Belajar Disini!
                  </a>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Pelajaran;
