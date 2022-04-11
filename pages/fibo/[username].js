import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import { useRouter } from "next/router";
import styles from "./fibo.module.scss";
import Image from "next/image";
import cls from "classnames";
import { UilSetting } from "@iconscout/react-unicons";
import connectDB from "../../config/connectDB";
import User from "../../models/user";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { storage } from "../../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import crypto from "crypto";
import { Slide, toast } from "react-toastify";
import axios from "axios";
import cookie from "js-cookie";

export async function getServerSideProps(context) {
  connectDB();
  const username = context.params.username;
  const dataUser = await User.findOne({ username: username });
  if (!dataUser) {
    return { notFound: true };
  }
  return {
    props: {
      dataUser: JSON.parse(JSON.stringify(dataUser)),
    },
  };
}

export default function Profile({ dataUser }) {
  const router = useRouter();
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const { username } = router.query;

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkInstagram, setCheckInstagram] = useState(false);
  const [checkGithub, setCheckGithub] = useState(false);
  const [checkTwitter, setCheckTwitter] = useState(false);

  useEffect(() => {
    dataUser.username === user.username
      ? setCheckUsername(true)
      : setCheckUsername(false);

    dataUser.instagram ? setCheckInstagram(dataUser.instagram) : null;
    dataUser.github ? setCheckGithub(dataUser.github) : null;
    dataUser.twitter ? setCheckTwitter(dataUser.twitter) : null;
  }, [
    router,
    user.username,
    dataUser.username,
    dataUser.instagram,
    dataUser.github,
    dataUser.twitter,
  ]);

  const handleAvatar = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];

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
      const codeName = crypto.randomBytes(20).toString("hex");
      const imageRef = ref(storage, `avatar-fibo/${codeName}`);

      await uploadBytes(imageRef, file);

      if (dataUser.avatar.filename) {
        await deleteObject(
          ref(storage, `avatar-fibo/${dataUser.avatar.filename}`)
        );
      }

      let url = await getDownloadURL(imageRef);

      const formData = {
        username: user.username,
        filename: codeName,
        path: url,
      };
      file = null;
      url = null;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(`/api/updatePhoto`, formData, config);
      cookie.set("token", data?.token, { expires: 3 });
      cookie.set("user", JSON.stringify(data?.user), { expires: 3 });
      await router.push(`/fibo/${user.username}`);
      toast.dismiss(loading);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e?.response?.data?.error, toastConfig);
    }
  };

  return (
    <div>
      <Head>
        <title>{username} | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <section className={styles.profils}>
          <div className={styles.profil}>
            <div className={cls(styles.profil__background)}>
              <div
                className={styles.background}
                style={{
                  backgroundImage: `url("/static/img/default-background.webp")`,
                }}
              />
            </div>

            <div className={cls(styles.container, "container container--px")}>
              <div className={styles.profil__info}>
                <div className={styles.profil__avatar}>
                  <Image
                    className={styles.img}
                    src={dataUser.avatar.path}
                    alt={`Foto Profile ${dataUser.username} FibonacciKu`}
                    width={128}
                    height={128}
                  />
                  {checkUsername && (
                    <div className={styles.edit_foto}>
                      <form>
                        <label
                          className={styles.custom_foto_upload}
                          htmlFor="avatar"
                          name="avatar"
                        >
                          Ganti Foto
                        </label>
                        <input
                          className={styles.custom_file_input}
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={handleAvatar}
                        />
                      </form>
                    </div>
                  )}
                </div>

                <div className={styles.profil__username}>
                  <div className={styles.user}>
                    <h2>{username}</h2>
                    {checkUsername && (
                      <a>
                        <UilSetting
                          className={styles.uil}
                          size="30"
                          onClick={() => router.push("/pengaturan/akun")}
                        />
                      </a>
                    )}
                  </div>

                  <div className={styles.nama}>
                    <h3>{dataUser.nama}</h3>
                    <p>{dataUser.bio}</p>
                    <a
                      href="https://www.fibonacciku.com"
                      className={styles.website}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {dataUser.website}
                    </a>
                    <div className={styles.link}>
                      {checkInstagram && (
                        <a
                          href={`https://www.instagram.com/${dataUser.instagram}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Image
                            src={"/static/img/instagram-icon.png"}
                            alt="Logo Instagram FibonacciKu"
                            width={24}
                            height={24}
                          />
                        </a>
                      )}
                      {checkGithub && (
                        <a
                          href={`https://www.github.com/${dataUser.github}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Image
                            src={"/static/img/github-icon.png"}
                            alt="Logo Github FibonacciKu"
                            width={24}
                            height={24}
                          />
                        </a>
                      )}
                      {checkTwitter && (
                        <a
                          href={`https://www.twitter.com/${dataUser.twitter}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Image
                            src={"/static/img/twitter-icon.png"}
                            alt="Logo Twitter FibonacciKu"
                            width={24}
                            height={24}
                          />
                        </a>
                      )}
                    </div>
                  </div>
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
