import styles from "./donasi.module.scss";
import cls from "classnames";

const Donasi = () => {
  return (
    <section className={styles.donasi}>
      <div className={cls(styles.container, "container")}>
        <div className={styles.donasi__image} />

        <div className={cls(styles.donasi__text, "container--pall")}>
          <h1>Kita butuh Kamu</h1>
          <p>
            Bantuan donasi yang kamu berikan sangat berarti untuk kita, supaya
            kita dapat selalu memberikan pendidikan gratis yang berkualitas
            kepada kalian semua
          </p>
          <a
            href="https://saweria.co/Fibonacciku"
            target="_blank"
            className={cls(styles.button, "button")}
          >
            Donasi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default Donasi;
