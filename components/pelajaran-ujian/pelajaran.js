import styles from "./pelajaran-ujian.module.scss";
import cls from "classnames";
import dataPelajaran from "../../data/dataPelajaran.json";
import Image from "next/image";

const Pelajaran = () => {
  return (
    <section className={styles.mata_pelajaran}>
      <div className={cls(styles.pelajaran, "container container--pall")}>
        <div className={styles.pelajaran__intro}>
          <h1>Pilih Pelajaran Sesuka Kamu!</h1>
        </div>

        <div className={styles.pelajaran__grid}>
          {dataPelajaran.map((Pelajaran) => {
            if (Pelajaran.jenis == "pelajaran") {
              return (
                <div className={styles.pelajaran__card}>
                  <div className={styles.pelajaran__icon}>
                    <Image
                      className={styles.img}
                      src={Pelajaran.icon}
                      width={128}
                      height={128}
                      alt={`Logo ${Pelajaran.pelajaran} FibonacciKu`}
                    />
                  </div>

                  <div className={styles.pelajaran__title}>
                    <h3>{Pelajaran.pelajaran}</h3>
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

export default Pelajaran;
