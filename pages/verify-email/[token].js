import { useRouter } from "next/router";
import styles from "./verifiy-email.module.scss";
import Head from "next/head";
import Image from "next/image";
import { Slide, toast } from "react-toastify";
import axios from "axios";

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;

  async function onSubmit(e) {
    e.preventDefault();

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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/verify-email/${token}`,
        {},
        config
      );
      toast.dismiss(loading);
      await router.push("/masuk");
      toast.success(data.success, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e?.response?.data?.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Verifikasi Email | FibonacciKu</title>
      </Head>

      <main>
        <section className={styles.verifikasi}>
          <div className={styles.verifikasi__image} />

          <div className={styles.verifikasi__container}>
            <div className={styles.verifikasi__box}>
              <div className={styles.icon}>
                <Image
                  src={"/static/img/logofibonama.svg"}
                  alt="Logo FibonacciKu"
                  width={256}
                  height={48}
                />
              </div>

              <form className={styles.verifikasi__form} onSubmit={onSubmit}>
                <legend>Verifikasi Email</legend>
                <div className={styles.form_group}>
                  <label className={styles.deskripsi} htmlFor="description">
                    Klik konfirmasi verifikasi email dibawah:
                  </label>
                </div>

                <div className={styles.verifikasi__button}>
                  <button className="button" type="submit">
                    Konfirmasi Verifikasi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
