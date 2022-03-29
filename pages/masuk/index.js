import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./masuk.module.scss";
import cls from "classnames";
import axios from "axios";
import cookie from "js-cookie";
import { Slide, toast } from "react-toastify";
import { parseCookies } from "nookies";

import Head from "next/head";
import FormMasuk from "../../components/registration/form-masuk";

import {
  UilUserCircle,
  UilLockAlt,
  UilEyeSlash,
  UilEye,
} from "@iconscout/react-unicons";

export default function Masuk() {
  const router = useRouter();
  const cookies = parseCookies();

  const [usernameActive, setUsernameActive] = useState("");
  const [passwordActive, setPasswordActive] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [typePassword, setTypePassword] = useState("password");

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

  const handleShowPassword = (e) => {
    e.preventDefault();
    if (!showPassword) {
      setShowPassword(true);
      setTypePassword("text");
    } else {
      setShowPassword(false);
      setTypePassword("password");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Masukkan username"),
    password: Yup.string().required("Masukkan password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    const formData = data;

    const toastConfig = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const loading = toast.loading("Mohon tunggu...", { transition: Slide });

    try {
      if (!formData) {
        toast.error("Masukkan data 😡", toastConfig);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/login`, formData, config);

      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));
      toast.dismiss(loading);
      await router.push("/mata-pelajaran");
      toast.success(data.message, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e.response.data.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Masuk | FibonacciKu</title>
      </Head>

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
                  {...register("username")}
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
                  type={typePassword}
                  id="password"
                  name="password"
                  placeholder="password"
                  autoComplete="off"
                  {...register("password")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className={styles.eye_btn} onClick={handleShowPassword}>
                  {showPassword ? (
                    <UilEye className={styles.icon} />
                  ) : (
                    <UilEyeSlash className={styles.icon} />
                  )}
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
    </div>
  );
}
