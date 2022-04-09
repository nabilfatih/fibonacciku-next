import styles from "./story.module.scss";
import cls from "classnames";

const Story = () => {
  return (
    <section className={styles.story}>
      <div className={cls(styles.story__container, "container")}>
        <div className={styles.story__judul}>
          <h3>Cerita Fibo</h3>

          <div className={styles.story__card}>
            <p style={{ marginBottom: 1 + "rem" }}>
              FibonacciKu didirikan pada bulan Februari 2021 oleh Nabil
              Akbarazzima Fatih. Mempunyai visi yang besar, FibonacciKu bermula
              sebagai channel YouTube. Lalu setahun kemudian, Nabil mempunyai
              visi baru untuk membuat platform edukasi tidak hanya melalui
              YouTube, melainkan dengan membuat website sendiri.
            </p>
            <p>
              Dengan Keterbatasan yang ada, perlahan-lahan website FibonacciKu
              berhasil dibuat dan akan terus meningkatkan kualitas
              pendidikannya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
