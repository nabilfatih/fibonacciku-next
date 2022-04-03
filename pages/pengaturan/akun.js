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
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import { Slide, toast } from "react-toastify";
import axios from "axios";

export default function PengaturanAkun() {
  const router = useRouter();
  const cookies = parseCookies();

  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email tidak valid").required("Masukkan email"),
    nama: Yup.string().required("Masukkan nama lengkap"),
    username: Yup.string()
      .max(20, "Username max. 20 karakter")
      .required("Masukkan username"),
    bio: Yup.string().max(256, "Bio max. 256 karakter"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(datas) {
    const formData = datas;
  }

  return (
    <div>
      <Head>
        <title>Pengaturan Akun | FibonacciKu</title>
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
                      <div className={styles.pilihan_akun}>
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
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Nama Lengkap
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type="text"
                        id="nama"
                        name="nama"
                        {...register("nama")}
                      />
                      <p className={styles.pengaturan__userMsg}>
                        {errors.nama?.message}
                      </p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Username
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type="text"
                        id="username"
                        name="username"
                        {...register("username")}
                      />
                      <p className={styles.pengaturan__userMsg}>
                        {errors.username?.message}
                      </p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Email
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type="email"
                        id="email"
                        name="email"
                        {...register("email")}
                      />
                      <p className={styles.pengaturan__userMsg}>
                        {errors.email?.message}
                      </p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Bio
                      </label>
                      <textarea
                        className={styles.pengaturan__input}
                        id="bio"
                        name="bio"
                        cols={0}
                        rows={5}
                        maxLength="256"
                        {...register("bio")}
                      ></textarea>
                      <p className={styles.pengaturan__userMsg}>
                        {errors.bio?.message}
                      </p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Website
                      </label>
                      <label className={styles.deskripsi} htmlFor="deskripsi">
                        Tulis website kamu: websitekamu.com
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type="text"
                        id="web"
                        name="web"
                      />
                      <p className={styles.pengaturan__userMsg}></p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Instagram
                      </label>
                      <label className={styles.deskripsi} htmlFor="deskripsi">
                        Username saja tanpa @
                      </label>
                      <input className={styles.pengaturan__input} />
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Github
                      </label>
                      <label className={styles.deskripsi} htmlFor="deskripsi">
                        Username saja
                      </label>
                      <input className={styles.pengaturan__input} />
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label
                        className={cls(
                          styles.pengaturan__label,
                          styles.form_label
                        )}
                      >
                        Twitter
                      </label>
                      <label className={styles.deskripsi} htmlFor="deskripsi">
                        <label className={styles.deskripsi} htmlFor="deskripsi">
                          Username saja tanpa @
                        </label>
                      </label>
                      <input className={styles.pengaturan__input} />
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
