import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./masuk.module.scss";
import cls from "classnames";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import Head from "next/head";
import FormMasuk from "../../components/registration/form-masuk";
import {
  UilUserCircle,
  UilLockAlt,
  UilEyeSlash,
  UilEye,
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

export default function Masuk({ token }) {
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
  }, [token, setCurrentUser]);

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
      setCurrentUser(data.user);
      toast.dismiss(loading);
      if (data.referer.includes("/masuk")) {
        await router.push("/beranda");
        toast.success(data?.message, toastConfig);
      } else {
        router.reload();
      }
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e.response.data.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Masuk | FibonacciKu</title>

        <meta name="description" content="Masuk Sekarang ke FibonacciKu!" />
        <meta property="og:title" content="Masuk" />
        <meta
          property="og:description"
          content="Masuk Sekarang ke FibonacciKu!"
        />
        <meta property="og:url" content="https://fibonacciku.com/masuk" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
        <meta name="robots" content="all" />
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
                <UilLockAlt className={cls(styles.icon, styles.icon__user)} />
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
