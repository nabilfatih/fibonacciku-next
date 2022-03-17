import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";
import Image from "next/image";

import dataPelajaran from "../../data/dataPelajaran.json";

const Ujian = () => {
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
                <div className={styles.ujian__card}>
                  <div className={styles.ujian__icon}>
                    <Image
                      className={styles.img}
                      src={ujians.icon}
                      width={128}
                      height={128}
                      alt={`Logo ${ujians.pelajaran} FibonacciKu`}
                    />
                  </div>

                  <div className={styles.ujian__title}>
                    <h3>{ujians.pelajaran}</h3>
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
