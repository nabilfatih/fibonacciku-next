import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import FormKontak from "../../components/form-kontak/form-kontak";
import NavBar from "../../components/nav/nav";

import styles from "./kontak.module.scss";
import cls from "classnames";

const Kontak = () => {
  const router = useRouter();

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

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/mail", formData, config);
      toast.success(data.success, toastConfig);
    } catch (e) {
      toast.error(e.response.data.error, toastConfig);
    }
  }

  return (
    <div>
      <Head>
        <title>Kontak | FibonacciKu</title>
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
    </div>
  );
};

export default Kontak;
