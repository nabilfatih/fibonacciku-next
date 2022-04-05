import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import { useRouter } from "next/router";
import styles from "./fibo.module.scss";
import Image from "next/image";
import cls from "classnames";
import { UilSetting } from "@iconscout/react-unicons";

export default function Profile() {
  const router = useRouter();

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
                alt={`Profil ${username} Background`}
                priority
              />
            </div>

            <div className={cls(styles.container, "container container--px")}>
              <div className={styles.profil__info}>
                <div className={styles.profil__avatar}>
                  <Image
                    className={styles.img}
                    src={"/static/img/Foto.jpg"}
                    alt={`Foto Profile ${username} FibonacciKu`}
                    width={128}
                    height={128}
                  />
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
                      />
                    </form>
                  </div>
                </div>

                <div className={styles.profil__username}>
                  <div className={styles.user}>
                    <h2>{username}</h2>
                    <a>
                      <UilSetting
                        className={styles.uil}
                        size="30"
                        onClick={() => router.push("/pengaturan/akun")}
                      />
                    </a>
                  </div>

                  <div className={styles.nama}>
                    <h3>Nabil Akbarazzima Fatih</h3>
                    <p>bla bla bla bla</p>
                    <a
                      href="https://www.fibonacciku.com"
                      className={styles.website}
                      target={"_blank"}
                    >
                      fibonacciku.com
                    </a>
                    <div className={styles.link}>
                      <a target={"_blank"}>
                        <Image
                          src={"/static/img/instagram-icon.png"}
                          alt="Logo Instagram FibonacciKu"
                          width={24}
                          height={24}
                        />
                      </a>
                      <a target={"_blank"}>
                        <Image
                          src={"/static/img/github-icon.png"}
                          alt="Logo Github FibonacciKu"
                          width={24}
                          height={24}
                        />
                      </a>
                      <a target={"_blank"}>
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
