import { useRouter } from "next/router";
import Image from "next/image";
import cls from "classnames";
import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import styles from "./query.module.scss";
import dataBab from "../../data/dataBab.json";
import dataPelajaran from "../../data/dataPelajaran.json";


export async function getStaticPaths() {
  return {
    paths: dataPelajaran.map((pelajaran) => {
      return {
        params: {
          query: pelajaran.query,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pelajaran = dataPelajaran.find(
    (pelajaran) => pelajaran.query === params.query
  );
  const babs = dataBab.filter((bab) => bab.query === params.query);

  return {
    props: {
      babs,
      pelajaran,
    }, // will be passed to the page component as props
  };
}

export default function Query({ babs, pelajaran }) {
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
            <div className={cls(styles.shows__header)}>
              <div className="container container--px">
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
                    <div
                      className={styles.shows__card}
                      key={createFromPattern("xxx-xxx")}
                      onClick={() =>
                        router.push(
                          `/mata-pelajaran/${pelajaran.query}/${bab.querybab}`,
                          undefined,
                          { shallow: true }
                        )
                      }
                    >
                      <div className={styles.shows__icon}>
                        <a>
                          <Image
                            src={bab.icon}
                            alt={`Logo ${bab.bab} FibonacciKu`}
                            width={128}
                            height={128}
                          />
                        </a>
                      </div>

                      <a className={styles.shows__bab}>
                        <h3>{bab.bab}</h3>
                      </a>
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
}
