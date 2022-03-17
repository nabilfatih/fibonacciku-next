import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";
import Image from "next/image";

import dataPelajaran from "../../data/dataPelajaran.json";

const Ujian = () => {
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

        <div className={styles.ujian__grid}>
          {dataPelajaran.map((ujians) => {
            if (ujians.jenis == "ujian") {
              return (
                <div
                  key={createFromPattern("xxx-xxx")}
                  className={styles.ujian__card}
                >
                  <div
                    key={createFromPattern("xxx-xxx")}
                    className={styles.ujian__icon}
                  >
                    <Image
                      key={createFromPattern("xxx-xxx")}
                      className={styles.img}
                      src={ujians.icon}
                      width={128}
                      height={128}
                      alt={`Logo ${ujians.pelajaran} FibonacciKu`}
                    />
                  </div>

                  <div className={styles.ujian__title}>
                    <h3 key={createFromPattern("xxx-xxx")}>
                      {ujians.pelajaran}
                    </h3>
                  </div>

                  <a className={cls(styles.button, "button")}>
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

export default Ujian;
