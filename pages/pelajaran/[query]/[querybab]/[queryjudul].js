import Head from "next/head";
import Footer from "../../../../components/footer/footer";
import NavBar from "../../../../components/nav/nav";
import styles from "./queryjudul.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";
import dataKonten from "../../../../data/dataKonten.json";

export async function getStaticPaths() {
  return {
    paths: dataKonten.map((konten) => {
      return {
        params: {
          query: konten.query,
          querybab: konten.querybab,
          queryjudul: konten.queryjudul,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const konten = dataKonten.find(
    (konten) => konten.queryjudul === params.queryjudul
  );

  return {
    props: {
      konten,
    },
  };
}

export default function QueryJudul({ konten }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{konten.judul} | FibonacciKu</title>

        <meta
          name="description"
          content={`Belajar ${konten.judul} Gratis di FibonacciKu!`}
        />
        <meta property="og:title" content={`${konten.judul}`} />
        <meta
          property="og:description"
          content={`Belajar ${konten.judul} Gratis di FibonacciKu!`}
        />
        <meta
          property="og:url"
          content={`https://fibonacciku.com/pelajaran/${konten.query}/${konten.querybab}/${konten.queryjudul}`}
        />
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
        <section className={styles.modal_video}>
          <div className={cls(styles.modals, "container container--px")}>
            <div className={styles.modals__card}>
              <div className={styles.modals__header}>
                <div className={styles.modals__judul}>
                  <h3>{konten.judul}</h3>
                  <a
                    className={styles.close_button}
                    onClick={() => router.back()}
                  >
                    &times;
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.wrapper}>
              <div className={styles.modals__body}>
                <iframe
                  className={styles.modals__iframe}
                  title={`${konten.tipe}: ${konten.judul}`}
                  src={`${konten.link}?autoplay=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=id&enablejsapi=1&origin=https://www.fibonacciku.com`}
                  width="800"
                  height="570"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
