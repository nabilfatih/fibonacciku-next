import styles from "./registration.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";

const FormDaftar = ({ children }) => {
  const router = useRouter();

  const HandleClickMasuk = (e) => {
    e.preventDefault();
    router.push("/masuk");
  };

  return (
    <section className={cls(styles.forms, styles.forms_daftar)}>
      <div className={styles.forms__image} />

      <div className={cls(styles.forms__container, styles.sign_up_form)}>
        <div className={cls(styles.forms__imgBox, styles.sign_up_box)}>
          <div className={styles.sliding_link}>
            <p>Kamu sudah punya akun?</p>
            <a className={styles.sign_in_btn} onClick={HandleClickMasuk}>
              Masuk
            </a>
          </div>
          <img
            className={styles.daftar}
            src="/static/img/cartoon_nagakecil.webp"
            alt="Logo Masuk FibonacciKu"
          />
        </div>

        <div className={styles.forms__box}>
          <h2>Daftar</h2>
          <div className={styles.login_options}>
            <div className={styles.other_logins}>
              <a>
                <img
                  src="/static/img/google.webp"
                  alt="Logo Google FibonacciKu"
                />
              </a>
              <a>
                <img
                  src="/static/img/GitHub.webp"
                  alt="Logo GitHub FibonacciKu"
                />
              </a>
              <a>
                <img
                  src="/static/img/facebook.webp"
                  alt="Logo Facebook FibonacciKu"
                />
              </a>
            </div>
            <p className={styles.text}>Atau, daftar dengan email...</p>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};

export default FormDaftar;
