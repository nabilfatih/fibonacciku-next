import styles from "./registration.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";

const FormMasuk = ({ children }) => {
  const router = useRouter();

  const HandleClickDaftar = (e) => {
    e.preventDefault();
    router.push("/daftar");
  };

  return (
    <section className={styles.forms}>
      <div className={styles.forms__image} />

      <div className={styles.forms__container}>
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

          <h2>Masuk</h2>

          {children}
        </div>

        <div className={cls(styles.forms__imgBox, styles.sign_in_imgBox)}>
          <div className={styles.sliding_link}>
            <p>Kamu belum punya akun?</p>
            <a className={styles.sign_up_btn} onClick={HandleClickDaftar}>
              Daftar
            </a>
          </div>
          <div className={styles.masuk}>
            <Image
              src={"/static/img/cartoon_ular.webp"}
              alt="Logo Daftar FibonacciKu"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormMasuk;
