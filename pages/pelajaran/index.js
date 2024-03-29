import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Pelajaran from "../../components/pelajaran-ujian/pelajaran";
import Ujian from "../../components/pelajaran-ujian/ujian";
import styles from "./matapelajaran.module.scss";
import cls from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import dataPelajaran from "../../data/dataPelajaran.json";

export async function getStaticProps(context) {
  return {
    props: {
      dataPelajaran,
    },
  };
}

export default function MataPelajaran(props) {
  const router = useRouter();

  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

  return (
    <>
      <Head>
        <title>Pelajaran | FibonacciKu</title>

        <meta name="description" content="Pilih Pelajaran Sesuka Kamu!" />
        <meta property="og:title" content="Pelajaran | FibonacciKu" />
        <meta
          property="og:description"
          content="Pilih Pelajaran Sesuka Kamu!"
        />
        <meta property="og:url" content="https://fibonacciku.com/pelajaran" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
      </Head>

      <NavBar />

      <main>
        <Pelajaran>
          {props.dataPelajaran.map((Pelajaran) => {
            if (Pelajaran.jenis == "pelajaran") {
              return (
                <div
                  className={styles.pelajaran__card}
                  key={createFromPattern("xxx-xxx")}
                >
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

                  <a
                    className={cls(styles.button, "button")}
                    onClick={() => router.push(`/pelajaran/${Pelajaran.query}`)}
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

                  <a
                    className={cls(styles.button, "button")}
                    onClick={() => router.push(`/pelajaran/${ujians.query}`)}
                  >
                    Belajar Disini!
                  </a>
                </div>
              );
            }
          })}
        </Ujian>
      </main>

      <Footer />
    </>
  );
}
