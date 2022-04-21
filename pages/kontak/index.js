import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, Slide } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import Footer from "../../components/footer/footer";
import FormKontak from "../../components/form-kontak/form-kontak";
import NavBar from "../../components/nav/nav";
import styles from "./kontak.module.scss";
import cls from "classnames";

const Kontak = () => {
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Masukkan nama"),
    email: Yup.string().required("Masukkan email").email("Email tidak valid"),
    subjek: Yup.string().required("Masukkan subjek pesan"),
    pesan: Yup.string().required("Masukkan pesan"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    const formData = data;

    const toastConfig = {
      position: "top-center",
      autoClose: 5000,
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

      const { data } = await axios.post("/api/mail", formData, config);
      toast.dismiss(loading);
      toast.success(data.success, toastConfig);
    } catch (e) {
      toast.dismiss(loading);
      toast.error(e.response.data.error, toastConfig);
    }
  }

  return (
    <>
      <Head>
        <title>Kontak | FibonacciKu</title>

        <meta name="description" content="Kontak Kita!" />
        <meta property="og:title" content="Kontak" />
        <meta property="og:description" content="Kontak Kita!" />
        <meta property="og:url" content="https://fibonacciku.com/kontak" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
      </Head>
      <NavBar />

      <main>
        <FormKontak>
          <form
            className={cls(styles.kontak__form)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Nama Lengkap</label>
              <input
                className={cls(styles.kontak__input)}
                type="text"
                id="nama"
                name="nama"
                {...register("nama")}
              />
              <p className={styles.kontak__userMsg}>{errors.nama?.message}</p>
            </div>
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Email</label>
              <input
                className={cls(styles.kontak__input)}
                type="email"
                id="email"
                name="email"
                {...register("email")}
              />
              <p className={styles.kontak__userMsg}>{errors.email?.message}</p>
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Subjek</label>
              <input
                className={cls(styles.kontak__input)}
                type="text"
                id="subject"
                name="subjek"
                {...register("subjek")}
              />
              <p className={styles.kontak__userMsg}>{errors.subjek?.message}</p>
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Pesan</label>
              <textarea
                className={cls(styles.kontak__input)}
                type="text"
                id="pesan"
                cols="0"
                rows="9"
                name="pesan"
                {...register("pesan")}
              ></textarea>
              <p className={styles.kontak__userMsg}>{errors.pesan?.message}</p>
            </div>

            <div className={styles.kontak__button}>
              <button className="button" type="submit">
                Kirim Pesan
              </button>
              <p className={cls(styles.kontak__userMsg, styles.submit)}></p>
            </div>
          </form>
        </FormKontak>
      </main>

      <Footer />
    </>
  );
};

export default Kontak;
