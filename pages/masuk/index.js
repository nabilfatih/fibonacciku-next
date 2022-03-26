import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./masuk.module.scss";
import cls from "classnames";
import { getProviders, getSession, useSession } from "next-auth/react";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import FormMasuk from "../../components/registration/form-masuk";

import {
  UilUserCircle,
  UilLockAlt,
  UilEyeSlash,
} from "@iconscout/react-unicons";

Masuk.getInitialProps = async (context) => {
  return {
    providers: await getProviders(context),
    sessions: await getSession(context),
  };
};

export default function Masuk({ providers, sessions }) {
  const router = useRouter();

  const cookies = parseCookies();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      toast.success("Anda sudah masuk");
      router.push("/mata-pelajaran");
    }

    if (cookies?.user) {
      router.push("/mata-pelajaran");
    }
  }, [router, session]);

  // if (sessions) return null;

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
    password: Yup.string().required("Masukkan password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  
  async function onSubmit(data) {
    const formData = data;

    const toastConfig = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/login`, formData, config);

      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));
      await router.push("/mata-pelajaran");
      toast.success(data.message, toastConfig);
    } catch (error) {
      toast.error(error.response.data.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Masuk | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <FormMasuk provider={providers}>
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
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  autoComplete="off"
                  {...register("password")}
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
