import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./daftar.module.scss";
import cls from "classnames";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Head from "next/head";
import FormDaftar from "../../components/registration/form-daftar";
import {
  UilAt,
  UilUser,
  UilUserCircle,
  UilLockAlt,
  UilLockAccess,
} from "@iconscout/react-unicons";
import checkCookie from "cookie";
import { verifyToken } from "../../lib/utils";
import { UserContext } from "../../contexts/user.context";

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie
    ? checkCookie.parse(context.req.headers.cookie)
    : null;
  const token = cookies?.token ? cookies.token : null;
  const userId = await verifyToken(token);

  if (userId) {
    return {
      redirect: {
        destination: "/beranda",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}

export default function Daftar({ token }) {
  const router = useRouter();

  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/verify`, { token: token }, config);
      const tokens = data.userId;
      if (!tokens) {
        await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        setCurrentUser(null);
      }
    }
    fetchData();
  }, [setCurrentUser, token]);

  const [emailActive, setEmailActive] = useState("");
  const [namaActive, setNamaActive] = useState("");
  const [usernameActive, setUsernameActive] = useState("");
  const [passwordActive, setPasswordActive] = useState("");
  const [passwordConfirmActive, setPasswordConfirmActive] = useState("");

  const handleFocus = (e) => {
    e.preventDefault();
    const target = e.target.id;
    if (target == "email") setEmailActive(styles.aktif);
    if (target == "nama") setNamaActive(styles.aktif);
    if (target == "username") setUsernameActive(styles.aktif);
    if (target == "password") setPasswordActive(styles.aktif);
    if (target == "passwordConfirm") setPasswordConfirmActive(styles.aktif);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const target = e.target.id;
    if (target == "email") setEmailActive("");
    if (target == "nama") setNamaActive("");
    if (target == "username") setUsernameActive("");
    if (target == "password") setPasswordActive("");
    if (target == "passwordConfirm") setPasswordConfirmActive("");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email tidak valid").required("Masukkan email"),
    nama: Yup.string().required("Masukkan nama lengkap"),
    username: Yup.string()
      .max(20, "Username max. 20 karakter")
      .required("Masukkan username"),
    password: Yup.string()
      .min(8, "Password min. 8 karakter")
      .required("Masukkan Password"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password harus sama")
      .required("Masukkan konfirmasi password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(datas) {
    const formData = datas;

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

      const { data } = await axios.post(`/api/register`, formData, config);
      toast.dismiss(loading);
      toast.success(data?.message, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e.response.data.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Daftar | FibonacciKu</title>

        <meta
          name="description"
          content="Daftar Sekarang Gratis di FibonacciKu!"
        />
        <meta property="og:title" content="Daftar" />
        <meta
          property="og:description"
          content="Daftar Sekarang Gratis di FibonacciKu!"
        />
        <meta property="og:url" content="https://fibonacciku.com/daftar" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
      </Head>

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

            <div className={styles.forms__fieldBox}>
              <div className={cls(styles.forms__field, passwordConfirmActive)}>
                <UilLockAccess className={styles.icon} />
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="konfirmasi password"
                  autoComplete="off"
                  {...register("passwordConfirm")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <p className={styles.forms__userMsg}>
                {errors.passwordConfirm?.message}
              </p>
            </div>

            <span className={styles.forms__syarat}>
              Dengan mendaftar, kamu setuju dengan{" "}
              <a onClick={() => router.push("/syarat-ketentuan")}>
                syarat ketentuan
              </a>{" "}
              &{" "}
              <a onClick={() => router.push("/kebijakan-privasi")}>
                kebijakan privasi
              </a>{" "}
              FibonacciKu
            </span>

            <button className={styles.forms__submit_btn}>Daftar</button>
          </form>
        </FormDaftar>
      </main>
    </div>
  );
}
