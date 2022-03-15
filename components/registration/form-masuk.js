import styles from "./registration.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";

const FormMasuk = () => {
  const router = useRouter();

  const HandleCLickLupaPassword = (e) => {
    e.preventDefault();
    router.push("/lupa-password");
  };

  const HandleClickDaftar = (e) => {
    e.preventDefault();
    router.push("/daftar");
  };

  return (
    <section className={styles.forms}>
      <div className={styles.forms__image} />

      <div className={styles.forms__container}>
        <div className={styles.forms__box}>
          <h2>Masuk</h2>

          <form method="POST" novalidate className="validated-form">
            <div className={styles.field}>
              <i className="uil uil-user-circle"></i>
              <label for="username"></label>
              <input
                className={"form-control"}
                type="text"
                id="username"
                name="username"
                placeholder="username"
                maxLength="20"
                required
              />
            </div>

            <div className={styles.field}>
              <i class="uil uil-lock-alt"></i>
              <label for="password"></label>
              <input
                className={"password-inpu form-control"}
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />
              <div className={styles.eye_btn}>
                <i className="uil uil-eye-slash"></i>
              </div>
            </div>

            <div className={styles.forgot_link}>
              <a onClick={HandleCLickLupaPassword}>Lupa password?</a>
            </div>

            <button className={styles.submit_btn}>Masuk</button>
          </form>

          <div className={styles.login_options}>
            <p className={styles.text}>Atau, masuk dengan...</p>
            <div className={styles.other_logins}>
              <a>
                <img
                  src="/static/img/google.png"
                  alt="Logo Google FibonacciKu"
                />
              </a>
              <a>
                <img
                  src="/static/img/GitHub.png"
                  alt="Logo GitHub FibonacciKu"
                />
              </a>
              <a>
                <img
                  src="/static/img/facebook.png"
                  alt="Logo Facebook FibonacciKu"
                />
              </a>
            </div>
          </div>
        </div>

        <div className={cls(styles.forms__imgBox, styles.sign_in_imgBox)}>
          <div className={styles.sliding_link}>
            <p>Kamu belum punya akun?</p>
            <a className={styles.sign_up_btn} onClick={HandleClickDaftar}>
              Daftar
            </a>
          </div>
          <img
            className={styles.masuk}
            src="/static/img/cartoon_ular.png"
            alt="Logo Daftar FibonacciKu"
          />
        </div>
      </div>
    </section>
  );
};

export default FormMasuk;
