import Head from "next/head";
import styles from "./reset.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Slide, toast, Zoom } from "react-toastify";
import axios from "axios";

export default function Reset() {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password min. 8 karakter")
      .required("Masukkan password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords harus sama")
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
                      Masukkan password baru kamu:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      {...register("password")}
                      autofocus
                      placeholder="Password baru"
                    />
                    <p className={styles.forgot__userMsg}>
                      {errors.password?.message}
                    </p>
                  </div>

                  <div className={styles.forgot__password}>
                    <label htmlFor="description" className={styles.deskripsi}>
                      Masukkan konfirmasi password baru kamu:
                    </label>
                    <input
                      type="password"
                      id="confirm"
                      name="confirm"
                      placeholder="Konfirmasi password"
                      {...register("confirmation")}
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
