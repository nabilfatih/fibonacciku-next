import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import styles from "./pengaturan.module.scss";
import cls from "classnames";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UilEyeSlash, UilEye } from "@iconscout/react-unicons";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import connectDB from "../../config/connectDB";
import User from "../../models/user";
import checkCookie from "cookie";
import { UserContext } from "../../contexts/user.context";
import { verifyToken } from "../../lib/utils";

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

export default function PengaturanPassword({ dataUser }) {
  const router = useRouter();

  const { currentUser } = useContext(UserContext);

  const [showPasswordLama, setShowPasswordLama] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showPasswordKonfirmasi, setShowPasswordKonfirmasi] = useState(false);
  const [showIconLama, setShowIconLama] = useState("password");
  const [showIconBaru, setShowIconBaru] = useState("password");
  const [showIconKonfirmasi, setShowIconKonfirmasi] = useState("password");

  const handleShowPasswordLama = (e) => {
    e.preventDefault();
    if (!showPasswordLama) {
      setShowPasswordLama(true);
      setShowIconLama("text");
    } else {
      setShowPasswordLama(false);
      setShowIconLama("password");
    }
  };
  const handleShowPasswordBaru = (e) => {
    e.preventDefault();
    if (!showPasswordBaru) {
      setShowPasswordBaru(true);
      setShowIconBaru("text");
    } else {
      setShowPasswordBaru(false);
      setShowIconBaru("password");
    }
  };
  const handleShowPasswordKonfirmasi = (e) => {
    e.preventDefault();
    if (!showPasswordKonfirmasi) {
      setShowPasswordKonfirmasi(true);
      setShowIconKonfirmasi("text");
    } else {
      setShowPasswordKonfirmasi(false);
      setShowIconKonfirmasi("password");
    }
  };

  const validationSchema = Yup.object().shape({
    passwordLama: Yup.string().required("Masukkan password lama"),
    passwordBaru: Yup.string()
      .min(8, "Password min. 8 karakter")
      .required("Masukkan password"),
    passwordKonfirmasi: Yup.string()
      .oneOf([Yup.ref("passwordBaru"), null], "Password harus sama")
      .required("Masukkan konfirmasi password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(datas) {
    const { passwordLama, passwordBaru, passwordKonfirmasi } = datas;
    const username = currentUser.username;
    const formData = {
      passwordLama,
      passwordBaru,
      passwordKonfirmasi,
      username,
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

      const { data } = await axios.put(
        `/api/setting/password`,
        formData,
        config
      );
      toast.dismiss(loading);
      await router.push("/pengaturan/password");
      toast.success(data.success, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e?.response?.data?.error, toastConfig);
    }
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
                      <label className={styles.pengaturan__label}>
                        Password Lama
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type={showIconLama}
                        id="passwordLama"
                        name="passwordLama"
                        autoComplete="off"
                        {...register("passwordLama")}
                      />
                      <div>
                        {!showPasswordLama ? (
                          <UilEyeSlash
                            size={20}
                            onClick={handleShowPasswordLama}
                            className={styles.uil}
                          />
                        ) : (
                          <UilEye
                            size={20}
                            onClick={handleShowPasswordLama}
                            className={styles.uil}
                          />
                        )}
                      </div>
                      <p className={styles.pengaturan__userMsg}>
                        {errors.passwordLama?.message}
                      </p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label className={styles.pengaturan__label}>
                        Password Baru
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type={showIconBaru}
                        id="passwordBaru"
                        name="passwordBaru"
                        autoComplete="off"
                        {...register("passwordBaru")}
                      />
                      <div>
                        {!showPasswordBaru ? (
                          <UilEyeSlash
                            size={20}
                            onClick={handleShowPasswordBaru}
                            className={styles.uil}
                          />
                        ) : (
                          <UilEye
                            size={20}
                            onClick={handleShowPasswordBaru}
                            className={styles.uil}
                          />
                        )}
                      </div>
                      <p className={styles.pengaturan__userMsg}>
                        {errors.passwordBaru?.message}
                      </p>
                    </div>

                    <div className={styles.pengaturan__konten}>
                      <label className={styles.pengaturan__label}>
                        Konfirmasi Password
                      </label>
                      <input
                        className={styles.pengaturan__input}
                        type={showIconKonfirmasi}
                        id="passwordKonfirmasi"
                        name="passwordKonfirmasi"
                        autoComplete="off"
                        {...register("passwordKonfirmasi")}
                      />
                      <div>
                        {!showPasswordKonfirmasi ? (
                          <UilEyeSlash
                            size={20}
                            onClick={handleShowPasswordKonfirmasi}
                            className={styles.uil}
                          />
                        ) : (
                          <UilEye
                            size={20}
                            onClick={handleShowPasswordKonfirmasi}
                            className={styles.uil}
                          />
                        )}
                      </div>
                      <p className={styles.pengaturan__userMsg}>
                        {errors.passwordKonfirmasi?.message}
                      </p>
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
