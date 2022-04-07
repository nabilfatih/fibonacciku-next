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
    }, // will be passed to the page component as props
  };
}

export default function QueryJudul({ konten }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{konten.judul} | FibonacciKu</title>
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
                    onClick={() => router.back({ shallow: true })}
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
                  src={`${konten.link}?autoplay=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&cc_lang_pref=id&enablejsapi=1&origin=https%3A%2F%2Fwww.fibonacciku.com`}
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
