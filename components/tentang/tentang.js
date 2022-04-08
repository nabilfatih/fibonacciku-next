import styles from "./tentang.module.scss";
import cls from "classnames";

const TentangFibo = () => {
  return (
    <section className={styles.tentangFibo}>
      <div className={cls(styles.tentangFibo__container, "container")}>
        <div className={styles.tentangFibo__intro}>
          <h1>Tentang FibonacciKu</h1>
        </div>

        <div className={styles.tentangFibo__judul}>
          <h3>Tempat belajar gratis untuk orang Indonesia di seluruh dunia</h3>

          <div className={styles.tentangFibo__card}>
            <p>
              Kita bermimpi untuk mewujudkan pendidikan gratis agar semua orang
              bisa menikmati pendidikan yang berkualitas tanpa perlu memikirkan
              biaya. Kita ingin menjadi menjadi wadah pendidikan untuk
              semua umur dan kalangan, dengan menyediakan pembelajaran tanpa
              membedakan kelas. Oleh karena itu, kalian bisa belajar sesuai
              keinginan kalian.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangFibo;
