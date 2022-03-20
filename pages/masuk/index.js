import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./masuk.module.scss";
import cls from "classnames";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import FormMasuk from "../../components/registration/form-masuk";

import { UilUserCircle } from "@iconscout/react-unicons";
import { UilLockAlt } from "@iconscout/react-unicons";
import { UilEyeSlash } from "@iconscout/react-unicons";

export default function Masuk() {
  const router = useRouter();
  const [usernameActive, setUsernameActive] = useState("");
  const [passwordActive, setPasswordActive] = useState("");

  const HandleCLickLupaPassword = (e) => {
    e.preventDefault();
    router.push("/lupa-password");
  };

  const handleFocus = (e) => {
    e.preventDefault();
    const target = e.target.id;
    if (target == "username") setUsernameActive(styles.aktif);
    if (target == "password") setPasswordActive(styles.aktif);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const target = e.target.id;
    if (target == "username") setUsernameActive("");
    if (target == "password") setPasswordActive("");
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Masukkan username"),
    password: Yup.string().required("Masukkan Password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    const formData = data;

    console.log(formData);
  }

  return (
    <div>
      <Head>
        <title>Masuk | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <FormMasuk>
          <form
            className={styles.forms__form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.forms__fieldBox}>
              <div className={cls(styles.forms__field, usernameActive)}>
                <UilUserCircle
                  className={cls(styles.icon, styles.icon__user)}
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <p className={styles.forms__userMsg}>
                {errors.username?.message}
              </p>
            </div>

            <div className={styles.forms__fieldBox}>
              <div className={cls(styles.forms__field, passwordActive)}>
                <UilLockAlt className={styles.icon} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className={styles.eye_btn}>
                  <UilEyeSlash className={styles.icon} />
                </div>
              </div>
              <p className={styles.forms__userMsg}>
                {errors.password?.message}
              </p>
            </div>

            <div className={styles.forms__forgot_link}>
              <a onClick={HandleCLickLupaPassword}>Lupa password?</a>
            </div>

            <button className={styles.forms__submit_btn}>Masuk</button>
          </form>
        </FormMasuk>
      </main>

      <Footer />
    </div>
  );
}
