import styles from "./hero.module.scss";
import cls from "classnames";
import Link from "next/link";

import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
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
        <div className={styles.hero__image} />
        <div className={cls(styles.hero__text, "container--pall")}>
          <h1>Belajar Gratis Kapanpun Dimanapun</h1>
          <p>
            FibonacciKu percaya bahwa semua orang berhak mendapatkan pendidikan
            gratis yang berkualitas
          </p>

          <div className={cls(styles.hero__register, "hide-for-mobile")}>
            <a
              onClick={HandleClickMasuk}
              className={cls("button", styles.hero__cta)}
            >
              Masuk
            </a>
            <a
              onClick={HandleClickDaftar}
              className={cls("button", styles.hero__cta)}
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
