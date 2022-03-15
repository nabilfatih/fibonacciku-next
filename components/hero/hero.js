import styles from "./hero.module.scss";
import cls from "classnames";
import Link from "next/link";

const Hero = () => {
  const HandleClickMasuk = (e) => {
    e.preventDefault();
    router.push("/masuk");
  };
  const HandleClickDaftar = (e) => {
    e.preventDefault();
    router.push("/daftar");
  };

  return (
    <section className={styles.hero}>
      <div className={cls(styles.container, "container")}>
        <div className={styles.hero__image}></div>
        <div className={cls(styles.hero__text, "container--pall")}>
          <h1>Belajar Gratis Kapanpun Dimanapun</h1>
          <p>
            FibonacciKu percaya bahwa semua orang berhak mendapatkan pendidikan
            gratis yang berkualitas
          </p>

          <div className={cls(styles.hero__register, "hide-for-mobile")}>
            <a
              onClick={HandleClickMasuk}
              className={cls("button", styles.header__cta)}
            >
              Masuk
            </a>
            <a
              onClick={HandleClickDaftar}
              className={cls("button", styles.header__cta)}
            >
              Daftar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
