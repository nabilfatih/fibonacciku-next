import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import styles from "./pengaturan.module.scss";
import cls from "classnames";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Slide, toast } from "react-toastify";
import axios from "axios";
import connectDB from "../../config/connectDB";
import User from "../../models/user";
import { Form, Formik } from "formik";
import { verifyToken } from "../../lib/utils";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import checkCookie from "cookie";

export async function getServerSideProps(context) {
  connectDB();
  const cookies = context.req.headers.cookie
    ? checkCookie.parse(context.req.headers.cookie)
    : null;
  const token = cookies?.token ? cookies.token : null;
  const userId = await verifyToken(token);

  const dataUser = await User.findOne({ _id: userId });
  if (!dataUser) {
    return { notFound: true };
  }
  return {
    props: {
      dataUser: JSON.parse(JSON.stringify(dataUser)),
    },
  };
}

export default function PengaturanAkun({ dataUser }) {
  const router = useRouter();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email tidak valid").required("Masukkan email"),
    nama: Yup.string().required("Masukkan nama lengkap"),
    username: Yup.string()
      .max(20, "Username max. 20 karakter")
      .required("Masukkan username"),
    bio: Yup.string().max(256, "Bio max. 256 karakter"),
    website: Yup.string(),
    instagram: Yup.string(),
    github: Yup.string(),
    twitter: Yup.string(),
  });

  async function onSubmit(datas) {
    const { nama, username, email, bio, website, instagram, github, twitter } =
      datas;
    const formData = {
      usernameLama: currentUser.username,
      nama,
      username,
      email,
      bio,
      website,
      instagram,
      github,
      twitter,
    };

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
      const { data } = await axios.put(`/api/setting/akun`, formData, config);
      setCurrentUser(data.user);
      toast.dismiss(loading);
      await router.push("/pengaturan/akun");
      toast.success(data.success, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e?.response?.data?.error, toastConfig);
    }
  }

  return (
    <>
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
                  <Formik
                    initialValues={{
                      nama: dataUser.nama,
                      username: dataUser.username,
                      email: dataUser.email,
                      bio: dataUser.bio,
                      website: dataUser.website,
                      instagram: dataUser.instagram,
                      github: dataUser.github,
                      twitter: dataUser.twitter,
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, handleChange, handleBlur, errors }) => (
                      <Form className={styles.pengaturan__form}>
                        <div className={styles.judul}>
                          <div className={styles.pilihan_akun}>
                            <a onClick={() => router.push("/pengaturan/akun")}>
                              <h3 className={styles.akun}>Akun</h3>
                            </a>
                            <a
                              onClick={() =>
                                router.push("/pengaturan/password")
                              }
                            >
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nama}
                          />
                          <p className={styles.pengaturan__userMsg}>
                            {errors.nama}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <p className={styles.pengaturan__userMsg}>
                            {errors.username}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <p className={styles.pengaturan__userMsg}>
                            {errors.email}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bio}
                          ></textarea>
                          <p className={styles.pengaturan__userMsg}>
                            {errors.bio}
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
                          <label
                            className={styles.deskripsi}
                            htmlFor="deskripsi"
                          >
                            Tulis website kamu: websitekamu.com
                          </label>
                          <input
                            className={styles.pengaturan__input}
                            type="text"
                            id="website"
                            name="website"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.website}
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
                          <label
                            className={styles.deskripsi}
                            htmlFor="deskripsi"
                          >
                            Username saja tanpa @
                          </label>
                          <input
                            className={styles.pengaturan__input}
                            id="instagram"
                            name="instagram"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.instagram}
                          />
                        </div>

                        <div className={styles.pengaturan__konten}>
                          <label
                            className={cls(
                              styles.pengaturan__label,
                              styles.form_label
                            )}
                          >
                            GitHub
                          </label>
                          <label
                            className={styles.deskripsi}
                            htmlFor="deskripsi"
                          >
                            Username saja
                          </label>
                          <input
                            className={styles.pengaturan__input}
                            id="github"
                            name="github"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.github}
                          />
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
                          <label
                            className={styles.deskripsi}
                            htmlFor="deskripsi"
                          >
                            <label
                              className={styles.deskripsi}
                              htmlFor="deskripsi"
                            >
                              Username saja tanpa @
                            </label>
                          </label>
                          <input
                            className={styles.pengaturan__input}
                            id="twitter"
                            name="twitter"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.twitter}
                          />
                        </div>

                        <button className={"button"} type="submit">
                          Simpan
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
