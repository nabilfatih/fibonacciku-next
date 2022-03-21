import { useRouter } from "next/router";
import Image from "next/image";
import cls from 'classnames'

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";

import styles from "./query.module.scss";
import dataBab from "../../data/dataBab.json";
import dataPelajaran from "../../data/dataPelajaran.json";
import Link from "next/link";

export async function getStaticPaths() {
  return {
    paths: dataBab.map((bab) => {
      return {
        params: {
          query: bab.query,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pelajaran = dataPelajaran.find((bab) => bab.query === params.query);
  const babs = dataBab.filter((bab) => bab.query === params.query);

  return {
    props: {
      babs,
      pelajaran,
    }, // will be passed to the page component as props
  };
}

const Query = ({ babs, pelajaran }) => {
  const router = useRouter();

  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

  const handleOnClickPelajaran = (e) => {
    e.preventDefault();
    router.push("/mata-pelajaran");
  };

  return (
    <div>
      <Head>
        <title>{pelajaran.pelajaran} | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <section className={styles.shows_pelajaran}>
          <div className={styles.shows}>
            <div className={cls(styles.shows__header, "container--px")}>
              <div className="container">
                <div className={styles.shows__pelajaran}>
                  <Image
                    src={pelajaran.icon}
                    alt={`Logo ${pelajaran.pelajaran} FibonacciKu`}
                    width={85}
                    height={85}
                  />
                  <div className={styles.header__belajar}>
                    <a onClick={handleOnClickPelajaran}>
                      <h3>Mata Pelajaran</h3>
                    </a>
                    <h1>{pelajaran.pelajaran}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="container container--px">
              <div className={styles.shows__grid}>
                {babs.map((bab) => {
                  return (
                    <div className={styles.shows__card}>
                      <div className={styles.shows__icon}>
                        <Link href={`${pelajaran.query}/${bab.querybab}`}>
                          <a>
                            <Image
                              src={bab.icon}
                              alt={`Logo ${bab.bab} FibonacciKu`}
                              width={128}
                              height={128}
                            />
                          </a>
                        </Link>
                      </div>

                      <Link href={`${pelajaran.query}/${bab.querybab}`}>
                        <a className={styles.shows__bab}>
                          <h3>{bab.bab}</h3>
                        </a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Query;
