import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Slide, toast } from "react-toastify";
import axios from "axios";

import styles from "./lupa-password.module.scss";

export default function LupaPassword() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Masukkan email").email("Email tidak valid"),
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
        toast.error("Masukkan email 😡", toastConfig);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/forget`, formData, config);

      toast.dismiss(loading);
      toast.success(data.success, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e.response.data.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Lupa Password | FibonacciKu</title>
      </Head>

      <main>
        <section className={styles.forgot}>
          <div className={styles.forgot__image} />

          <div className={styles.forgot__container}>
            <div className={styles.forgot__box}>
              <div className={styles.icon}>
                <Image
                  src={"/static/img/logofibonama.svg"}
                  alt="Logo FibonacciKu"
                  width={256}
                  height={48}
                  placeholder="blur"
                  onClick={() => router.push("/")}
                />
              </div>
              <form
                className={styles.forgot__form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <legend>Lupa Password</legend>
                <div className={styles.form_group}>
                  <label htmlFor="email">Email</label>
                  <label className={styles.deskripsi} htmlFor="description">
                    Masukkan email untuk mereset password:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="emailkamu@contoh.com"
                    autoFocus
                    {...register("email")}
                  />
                  <p className={styles.forgot__userMsg}>
                    {errors.email?.message}
                  </p>
                </div>

                <div className={styles.forgot__button}>
                  <button className="button" type="submit">
                    Reset Password
                  </button>
                </div>
              </form>

              <div className={styles.forgot__goBack}>
                <a onClick={() => router.push("/masuk")}>Kembali untuk masuk</a>
                <span>Atau...</span>
                <a onClick={() => router.push("/daftar")}>Membuat akun baru</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
