import styles from "./registration.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";

const FormDaftar = ({ children }) => {
  const router = useRouter();

  const HandleClickMasuk = (e) => {
    e.preventDefault();
    router.push("/masuk");
  };

  return (
    <section className={styles.forms}>
      <div className={styles.forms__image} />

      <div className={cls(styles.forms__container, styles.sign_up_form)}>
        <div className={cls(styles.forms__imgBox, styles.sign_up_imgBox)}>
          <div className={styles.sliding_link}>
            <p>Kamu sudah punya akun?</p>
            <a className={styles.sign_in_btn} onClick={HandleClickMasuk}>
              Masuk
            </a>
          </div>
          <div className={styles.daftar}>
            <Image
              src={"/static/img/cartoon_nagakecil.webp"}
              alt="Logo Masuk FibonacciKu"
              layout="fill"
              priority
            />
          </div>
        </div>

        <div className={styles.forms__box}>
          <div className={styles.icon} onClick={() => router.push("/")}>
            <Image
              src={"/static/img/logofibonama.svg"}
              alt="Logo FibonacciKu"
              width={256}
              height={48}
              priority
            />
          </div>
          <h2>Daftar</h2>

          {children}
        </div>
      </div>
    </section>
  );
};

export default FormDaftar;
