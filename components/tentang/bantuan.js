import styles from "./bantuan.module.scss";
import cls from "classnames";

const Bantuan = () => {
  return (
    <section className={styles.bantuan}>
      <div className={cls(styles.bantuan__container, "container")}>
        <div className={styles.bantuan__judul}>
          <h3>Kita Butuh Kamu</h3>

          <div className={styles.bantuan__card}>
            <div className={styles.konten}>
              <p>
                Pendidikan di FibonacciKu gratis, tetapi operasional FibonacciKu
                tidak gratis 😢. Oleh karena itu, kita butuh kamu supaya
                FibonacciKu dapat terus berjalan dan selalu memberikan
                pendidikan gratis yang berkualitas.
              </p>

              <p>
                Donasi yang kalian berikan akan sangat membantu FibonacciKu
                kedepannya, dan semoga menjadi amal sedekah untuk kalian 😇
              </p>
            </div>

            <a
              href="https://saweria.co/Fibonacciku"
              target={"_blank"}
              rel="noreferrer"
            >
              <button className={styles.button}>Donasi Sekarang</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bantuan;
