import NavBar from "../components/nav/nav";
import Head from "next/head";
import Footer from "../components/footer/footer";
import styles from "../styles/404.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function Custom404() {
  const cookies = parseCookies();
  const router = useRouter();

  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

  return (
    <div>
      <Head>
        <title>Halaman Tidak Ditemukan! | FibonacciKu</title>
      </Head>
      <NavBar user={user} token={token} />

      <main>
        <section className={styles.error}>
          <div className={styles.background__image} />

          <div className={cls(styles.container, "container--pall")}>
            <div className={styles.card}>
              <div className={styles.alert}>
                <h3>Halaman Tidak Ditemukan 😭</h3>
                <p>
                  Oh tidak! ada sesuatu yang salah! mungkin ada monster yang
                  bersembunyi disini! atau mungkin hantu 👻 HIHIHIHI 💩
                </p>
                <hr className={styles.line} />
                <p>
                  Apa yang kamu cari tidak dapat ditemukan, pastikan apa yang
                  kamu cari benar!
                </p>

                <button className={styles.button} onClick={() => router.back()}>
                  Kembali ke jalan yang benar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer user={user} token={token} />
    </div>
  );
}
