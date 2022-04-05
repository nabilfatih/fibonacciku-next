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
              <Image
                className={cls(styles.img, "container")}
                src={"/static/img/default-background.webp"}
                layout="fill"
                alt={`Profil ${dataUser.username} Background`}
                priority
              />
            </div>

            <div className={cls(styles.container, "container container--px")}>
              <div className={styles.profil__info}>
                <div className={styles.profil__avatar}>
                  <Image
                    className={styles.img}
                    src={"/static/img/Foto.jpg"}
                    alt={`Foto Profile ${dataUser.username} FibonacciKu`}
                    width={128}
                    height={128}
                  />
                  <div className={styles.edit_foto}>
                    {user.username == dataUser.username ? (
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
                        />
                      </form>
                    ) : null}
                  </div>
                </div>

                <div className={styles.profil__username}>
                  <div className={styles.user}>
                    <h2>{username}</h2>
                    {user.username == dataUser.username ? (
                      <a>
                        <UilSetting
                          className={styles.uil}
                          size="30"
                          onClick={() => router.push("/pengaturan/akun")}
                        />
                      </a>
                    ) : null}
                  </div>

                  <div className={styles.nama}>
                    <h3>{dataUser.nama}</h3>
                    <p>{dataUser.bio}</p>
                    <a
                      href="https://www.fibonacciku.com"
                      className={styles.website}
                      target={"_blank"}
                    >
                      {user.website}
                    </a>
                    <div className={styles.link}>
                      <a
                        href={`https://www.instagram.com/${dataUser.instagram}`}
                        target={"_blank"}
                      >
                        <Image
                          src={"/static/img/instagram-icon.png"}
                          alt="Logo Instagram FibonacciKu"
                          width={24}
                          height={24}
                        />
                      </a>
                      <a
                        href={`https://www.instagram.com/${dataUser.github}`}
                        target={"_blank"}
                      >
                        <Image
                          src={"/static/img/github-icon.png"}
                          alt="Logo Github FibonacciKu"
                          width={24}
                          height={24}
                        />
                      </a>
                      <a
                        href={`https://www.instagram.com/${dataUser.twitter}`}
                        target={"_blank"}
                      >
                        <Image
                          src={"/static/img/twitter-icon.png"}
                          alt="Logo Twitter FibonacciKu"
                          width={24}
                          height={24}
                        />
                      </a>
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
