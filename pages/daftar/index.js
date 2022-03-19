import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import FormDaftar from "../../components/registration/form-daftar";

import styles from "./daftar.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { UilAt } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { UilUserCircle } from "@iconscout/react-unicons";
import { UilLockAlt } from "@iconscout/react-unicons";

export default function Daftar() {
  const router = useRouter();
  const [emailActive, setEmailActive] = useState("");
  const [namaActive, setNamaActive] = useState("");
  const [usernameActive, setUsernameActive] = useState("");
  const [passwordActive, setPasswordActive] = useState("");

  useEffect(() => {
    const emailInput = document.getElementById("email");
    const namaInput = document.getElementById("nama");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    emailInput.addEventListener("focus", () => {
      setEmailActive(styles.aktif);
    });
    emailInput.addEventListener("blur", () => {
      setEmailActive("");
    });
    namaInput.addEventListener("focus", () => {
      setNamaActive(styles.aktif);
    });
    namaInput.addEventListener("blur", () => {
      setNamaActive("");
    });
    usernameInput.addEventListener("focus", () => {
      setUsernameActive(styles.aktif);
    });
    usernameInput.addEventListener("blur", () => {
      setUsernameActive("");
    });
    passwordInput.addEventListener("focus", () => {
      setPasswordActive(styles.aktif);
    });
    passwordInput.addEventListener("blur", () => {
      setPasswordActive("");
    });
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Masukkan email").email("Email tidak valid"),
    nama: Yup.string().required("Masukkan nama lengkap"),
    username: Yup.string()
      .max(20, "Username max. 20 karakter")
      .required("Masukkan username"),
    password: Yup.string()
      .min(9, "Password min. 8 karakter")
      .required("Masukkan Password"),
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
        <title>Daftar | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <FormDaftar>
          <form
            className={styles.forms__form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.forms__fieldBox}>
              <div className={cls(styles.forms__field, emailActive)}>
                <UilAt className={styles.icon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  {...register("email")}
                />
              </div>
              <p className={styles.forms__userMsg}>{errors.email?.message}</p>
            </div>

            <div className={styles.forms__fieldBox}>
              <div className={cls(styles.forms__field, namaActive)}>
                <UilUser className={styles.icon} />
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="nama lengkap"
                  {...register("nama")}
                />
              </div>
              <p className={styles.forms__userMsg}>{errors.nama?.message}</p>
            </div>

            <div className={styles.forms__fieldBox}>
              <div className={cls(styles.forms__field, usernameActive)}>
                <UilUserCircle className={styles.icon} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  maxLength={20}
                  {...register("username")}
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
                  {...register("password")}
                />
              </div>
              <p className={styles.forms__userMsg}>
                {errors.password?.message}
              </p>
            </div>

            <button className={styles.forms__submit_btn}>Daftar</button>
          </form>
        </FormDaftar>
      </main>

      <Footer />
    </div>
  );
}
