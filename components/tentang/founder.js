import styles from "./founder.module.scss";
import cls from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

const Founder = () => {
  const router = useRouter();

  return (
    <section className={styles.founder}>
      <div className={cls(styles.founder__container, "container")}>
        <div className={styles.founder__judul}>
          <h3>Founder FibonacciKu</h3>

          <div className={styles.display}>
            <div className={styles.founder__card}>
              <div className={styles.konten}>
                <div className={styles.foto}>
                  <Image
                    className={styles.img}
                    src={"/static/img/Foto.JPG"}
                    layout="fill"
                    alt="Foto Nabil Founder FibonacciKu"
                    placeholder="blur"
                  />
                </div>

                <div className={styles.biodata}>
                  <h4>Nabil Fatih</h4>
                  <span>Founder</span>
                  <div className={styles.link}>
                    <a
                      target={"_blank"}
                      href="https://www.instagram.com/nabilfatih_"
                      rel="noreferrer"
                    >
                      <Image
                        className={styles.icon}
                        src={"/static/img/instagram-icon.webp"}
                        width={20}
                        height={20}
                        alt="Logo Instagram Founder FibonacciKu"
                        placeholder="blur"
                      />
                    </a>

                    <a
                      target={"_blank"}
                      href="https://www.linkedin.com/in/nabilfatih/"
                      rel="noreferrer"
                    >
                      <Image
                        className={styles.icon}
                        src={"/static/img/linkedin.webp"}
                        width={21}
                        height={21}
                        alt="Logo LinkedIn Founder FibonacciKu"
                        placeholder="blur"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.founder__card}>
              <div className={styles.pesan}>
                <p>
                  Bermula karena stress kuliah, alhamdulillah gua kepikiran buat
                  platform edukasi. Semoga ilmu yang kalian dapatkan berkah dan
                  bermanfaat buat masa depan kalian! 🥳
                </p>
                <p>Semangat belajar buat kalian semua!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
