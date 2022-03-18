import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Pelajaran from "../../components/pelajaran-ujian/pelajaran";
import Ujian from "../../components/pelajaran-ujian/ujian";
import styles from "./matapelajaran.module.scss";
import cls from "classnames";
import Image from "next/image";

import dataPelajaran from "../../data/dataPelajaran.json";

export async function getStaticProps(context) {
  return {
    props: {
      dataPelajaran,
    }, // will be passed to the page component as props
  };
}

export default function MataPelajaran(props) {
  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

  return (
    <div>
      <Head>
        <title>Mata Pelajaran | FibonacciKu</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <NavBar />

      <main>
        <Pelajaran>
          {props.dataPelajaran.map((Pelajaran) => {
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
        </Pelajaran>

        <Ujian>
          {props.dataPelajaran.map((ujians) => {
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
        </Ujian>
      </main>

      <Footer />
    </div>
  );
}
