import Head from "next/head";
import styles from "../styles/500.module.scss";
import Image from "next/image";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Maintenance | FibonacciKu</title>
      </Head>

      <main>
        <section className={styles.maintenance}>
          <div className={styles.background} />

          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.icon}>
                <Image
                  src={"/static/img/logofibonama.svg"}
                  alt="Logo FibonacciKu"
                  width={256}
                  height={48}
                  priority
                />
              </div>

              <h3>Server Maintenance</h3>
              <p>Harap kembali beberapa saat lagi 😇</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
