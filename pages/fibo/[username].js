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
import { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../contexts/user.context";

export async function getServerSideProps(context) {
  connectDB();

  const userName = context.params.username;
  const dataUser = await User.findOne({ username: userName });

  const { username, nama, avatar, _id } = dataUser;
  const userCookie = { username, nama, avatar, _id };
  if (!dataUser) {
    return { notFound: true };
  }
  return {
    props: {
      userCookie: JSON.parse(JSON.stringify(userCookie)),
      dataUser: JSON.parse(JSON.stringify(dataUser)),
    },
  };
}

export default function Profile({ dataUser, userCookie }) {
  const router = useRouter();
  const { username } = router.query;

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (dataUser.avatar.filename !== currentUser.avatar.filename) {
      setCurrentUser(userCookie);
    }
  }, [dataUser, currentUser, userCookie, setCurrentUser]);

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkInstagram, setCheckInstagram] = useState(false);
  const [checkGithub, setCheckGithub] = useState(false);
  const [checkTwitter, setCheckTwitter] = useState(false);
  const [usernameState, setUsernameState] = useState(null);

  useEffect(() => {
    currentUser
      ? setUsernameState(currentUser.username)
      : setUsernameState(null);
  }, [currentUser]);

  useEffect(() => {
    dataUser.username === usernameState
      ? setCheckUsername(true)
      : setCheckUsername(false);

    dataUser.instagram
      ? setCheckInstagram(dataUser.instagram)
      : setCheckInstagram(null);
    dataUser.github ? setCheckGithub(dataUser.github) : setCheckGithub(null);
    dataUser.twitter
      ? setCheckTwitter(dataUser.twitter)
      : setCheckTwitter(null);
  }, [
    usernameState,
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
        username: currentUser.username,
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
      setCurrentUser(data.user);
      await router.push(`/fibo/${currentUser.username}`);
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
