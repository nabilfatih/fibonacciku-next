import Head from "next/head";
import styles from "./reset.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Slide, toast, Zoom } from "react-toastify";
import axios from "axios";

export default function Reset() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password min. 8 karakter")
      .required("Masukkan password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password harus sama")
      .required("Masukkan konfirmasi password"),
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
        <title>Reset Password | FibonacciKu</title>
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
                  onClick={() => router.push("/")}
                />
              </div>
              <form
                className={styles.forgot__form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <legend>Reset Password</legend>

                <div className={styles.form_group}>
                  <div className={styles.forgot__password}>
                    <label htmlFor="description" className={styles.deskripsi}>
                      Masukkan password baru:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoFocus
                      placeholder="Password baru"
                      autoComplete="off"
                      {...register("password")}
                    />
                    <p className={styles.forgot__userMsg}>
                      {errors.password?.message}
                    </p>
                  </div>

                  <div className={styles.forgot__password}>
                    <label htmlFor="description" className={styles.deskripsi}>
                      Masukkan konfirmasi password baru:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Konfirmasi password"
                      autoComplete="off"
                      {...register("confirmPassword")}
                    />
                    <p className={styles.forgot__userMsg}>
                      {errors.confirmPassword?.message}
                    </p>
                  </div>
                </div>

                <div className={styles.forgot__button}>
                  <button className="button" type="submit">
                    Rubah Password
                  </button>
                </div>
              </form>

              <div className={styles.forgot__goBack}>
                <a onClick={() => router.push("/lupa-password")}>
                  Buat token lagi
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
