import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import styles from "./pengaturan.module.scss";
import cls from "classnames";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function PengaturanPassword() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    passwordLama: Yup.string().required("Masukkan password lama"),
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
  }

  return (
    <div>
      <Head>
        <title>Pengaturan Password | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <section className={styles.pengaturans}>
          <div className={cls(styles.pengaturan, "container container--px")}>
            <div className={styles.pengaturan__intro}>
              <h1>Pengaturan</h1>
            </div>

            <div className={styles.pengaturan__grid}>
              <div className={styles.pengaturan__card}>
                <div className={styles.pengaturan__isi}>
                  <form
                    className={styles.pengaturan__form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className={styles.judul}>
                      <div className={styles.pilihan_password}>
                        <a onClick={() => router.push("/pengaturan/akun")}>
                          <h3 className={styles.akun}>Akun</h3>
                        </a>
                        <a onClick={() => router.push("/pengaturan/password")}>
                          <h3 className={styles.password}>Password</h3>
                        </a>
                      </div>
                      <hr className={styles.line} />
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label></label>
                      <input />
                      <div />
                      <p className={styles.pengaturan__userMsg}>{errors.passwordLama?.message}</p>
                    </div>

                    <button className={"button"}>Simpan</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
