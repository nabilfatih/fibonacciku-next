import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./daftar.module.scss";
import cls from "classnames";
import axios from "axios";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useSession, getSession } from "next-auth/react";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import FormDaftar from "../../components/registration/form-daftar";

import {
  UilAt,
  UilUser,
  UilUserCircle,
  UilLockAlt,
} from "@iconscout/react-unicons";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Daftar() {
  const router = useRouter();

  const { data: session } = useSession();
  const cookies = parseCookies;

  useEffect(() => {
    if (session) {
      toast.success("Login Success");
      router.push("/mata-pelajaran");
    }

    if (cookies?.user) {
      router.push("/");
    }
  }, [router]);

  const [emailActive, setEmailActive] = useState("");
  const [namaActive, setNamaActive] = useState("");
  const [usernameActive, setUsernameActive] = useState("");
  const [passwordActive, setPasswordActive] = useState("");

  const handleFocus = (e) => {
    e.preventDefault();
    const target = e.target.id;
    if (target == "email") setEmailActive(styles.aktif);
    if (target == "nama") setNamaActive(styles.aktif);
    if (target == "username") setUsernameActive(styles.aktif);
    if (target == "password") setPasswordActive(styles.aktif);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const target = e.target.id;
    if (target == "email") setEmailActive("");
    if (target == "nama") setNamaActive("");
    if (target == "username") setUsernameActive("");
    if (target == "password") setPasswordActive("");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email tidak valid").required("Masukkan email"),
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

  async function onSubmit(datas) {
    const formData = datas;

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
      if (!formData) {
        toast.error("Masukkan data!", toastConfig);
        // console.log("passwords do not match")
        return;
      }
      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : "";

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/register`, formData, config);

      toast.success(data?.message, toastConfig);
    } catch (error) {
      // console.log(error.response);
      toast.error(error.response.data.error, toastConfig);
    }
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
            noValidate
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
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
