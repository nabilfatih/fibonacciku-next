import dataBab from "../../../data/dataBab.json";
import dataSubBab from "../../../data/dataSubbab.json";
import dataKonten from "../../../data/dataKonten.json";
import NavBar from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import Image from "next/image";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import styles from "./querybab.module.scss";
import Link from "next/link";
import Head from "next/head";
import { parseCookies } from "nookies";

export async function getStaticPaths() {
  return {
    paths: dataBab.map((bab) => {
      return {
        params: {
          query: bab.query,
          querybab: bab.querybab,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const bab = dataBab.find((bab) => bab.querybab === params.querybab);
  const subBabs = dataSubBab.filter(
    (subbab) => subbab.querybab === params.querybab
  );
  const kontens = dataKonten.filter(
    (konten) => konten.querybab === params.querybab
  );

  return {
    props: {
      bab,
      subBabs,
      kontens,
    }, // will be passed to the page component as props
  };
}

export default function QueryBab({ bab, subBabs, kontens }) {
  const router = useRouter();
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

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
        <title>{bab.bab} | FibonacciKu</title>

        <meta
          name="description"
          content={`Belajar ${bab.bab} Gratis di FibonacciKu!`}
        />
        <meta property="og:title" content={`${bab.bab}`} />
        <meta
          property="og:description"
          content={`Belajar ${bab.bab} Gratis di FibonacciKu!`}
        />
        <meta
          property="og:url"
          content={`https://fibonacciku.com/mata-pelajaran/${bab.query}/${bab.querybab}`}
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
        <section className={styles.belajar}>
          <div className={styles.shows}>
            <div className={styles.shows__header}>
              <div className="container container--px">
                <div className={styles.shows__pelajaran}>
                  <Image
                    src={bab.icon}
                    width={85}
                    height={85}
                    alt={`Logo ${bab.bab} FibonacciKu`}
                  />
                  <div className={styles.header__belajar}>
                    <Link href={`/mata-pelajaran/${bab.query}`}>
                      <a>
                        <h3>{bab.pelajaran}</h3>
                      </a>
                    </Link>
                    <h1>{bab.bab}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="container container--px">
              <div className={styles.belajar__grid}>
                {subBabs.map((subbab) => {
                  return (
                    <div
                      className={styles.belajar__card}
                      key={createFromPattern("xxx-xxx")}
                    >
                      <div className={styles.belajar__subbab}>
                        <h3>{subbab.subbab}</h3>
                      </div>

                      <div className={styles.belajar__konten}>
                        <div className={styles.belajar__keterangan}>
                          <h4>Belajar</h4>
                        </div>

                        <div className={styles.belajar__videos}>
                          {kontens.map((konten) => {
                            if (subbab.querysubbab === konten.querysubbab) {
                              return (
                                <div
                                  className={styles.konten}
                                  key={createFromPattern("xxx-xxx")}
                                >
                                  <UilPlayCircle className={styles.icon} />
                                  <div className={styles.judul}>
                                    <a
                                      onClick={() =>
                                        router.push(
                                          `/mata-pelajaran/${konten.query}/${konten.querybab}/${konten.queryjudul}`
                                        )
                                      }
                                    >
                                      {konten.judul}
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
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
