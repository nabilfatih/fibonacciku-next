import styles from "./registration.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";

import { UilAt } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilUserCircle } from '@iconscout/react-unicons'
import { UilLockAlt } from '@iconscout/react-unicons'

const FormDaftar = () => {
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

          <form method="POST" noValidate className="validated-form">
            <div className={styles.field}>
              <UilAt className={styles.icon}/>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required
              />
            </div>
            <div className={styles.field}>
              <UilUser className={styles.icon}/>
              <input
                className="form-control"
                type="text"
                id="nama"
                name="nama"
                placeholder="nama lengkap"
                required
              />
            </div>
            <div className={styles.field}>
              <UilUserCircle className={styles.icon}/>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                placeholder="username"
                maxLength={20}
                required
              />
            </div>
            <div className={styles.field}>
              <UilLockAlt className={styles.icon}/>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="password"
                minLength={8}
                required
              />
            </div>

            <button className={styles.submit_btn}>Daftar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormDaftar;
