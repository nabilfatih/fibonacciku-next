import styles from "./registration.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";

import { UilUserCircle } from '@iconscout/react-unicons'
import { UilLockAlt } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'

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

          <form method="POST" noValidate className="validated-form">
            <div className={styles.field}>
              <UilUserCircle className={cls(styles.icon, styles.icon__user)}/>
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
              <UilLockAlt className={styles.icon} />
              <input
                className={"password-input form-control"}
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />
              <div className={styles.eye_btn}>
                <UilEyeSlash className={styles.icon}/>
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
            src="/static/img/cartoon_ular.webp"
            alt="Logo Daftar FibonacciKu"
          />
        </div>
      </div>
    </section>
  );
};

export default FormMasuk;
