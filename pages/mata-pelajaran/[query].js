import { useRouter } from "next/router";
import Image from "next/image";
import cls from "classnames";
import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import styles from "./query.module.scss";
import dataBab from "../../data/dataBab.json";
import dataPelajaran from "../../data/dataPelajaran.json";
import { parseCookies } from "nookies";

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
    },
  };
}

export default function Query({ babs, pelajaran }) {
  const router = useRouter();
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = user ? true : false

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

        <meta
          name="description"
          content={`Belajar ${pelajaran.pelajaran} Gratis di FibonacciKu!`}
        />
        <meta property="og:title" content={`${pelajaran.pelajaran}`} />
        <meta
          property="og:description"
          content={`Belajar ${pelajaran.pelajaran} Gratis di FibonacciKu!`}
        />
        <meta
          property="og:url"
          content={`https://fibonacciku.com/mata-pelajaran/${pelajaran.query}`}
        />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
        <meta name="robots" content="all" />
      </Head>

      <NavBar user={user} token={token} />

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
                          `/mata-pelajaran/${pelajaran.query}/${bab.querybab}`
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

      <Footer user={user} token={token} />
    </div>
  );
}
