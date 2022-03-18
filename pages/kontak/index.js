import { useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import FormKontak from "../../components/form-kontak/form-kontak";
import NavBar from "../../components/nav/nav";

import styles from "./kontak.module.scss";
import cls from "classnames";

const Kontak = () => {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [namaMsg, setNamaMsg] = useState("");
  const [subjekMsg, setSubjekMsg] = useState("");
  const [pesanMsg, setPesanMsg] = useState("");
  const [submitMsg, setSubmitMsg] = useState("");
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleOnChangeEmail = (e) => {
    const email = e.target.value;
    email.match(mailformat)
      ? setEmailMsg("")
      : setEmailMsg("Masukkan email yang valid");
    setEmail(email);
  };

  const handleOnChangeNama = (e) => {
    const nama = e.target.value;
    nama ? setNamaMsg("") : setNamaMsg("Masukkan nama kamu");
    setNama(nama);
  };

  const handleOnChangeSubjek = (e) => {
    const subjek = e.target.value;
    subjek ? setSubjekMsg("") : setSubjekMsg("Masukkan subjek pesan");
    setSubjek(subjek);
  };

  const handleOnChangePesan = (e) => {
    const pesan = e.target.value;
    pesan ? setPesanMsg("") : setPesanMsg("Masukkan pesan kamu");
    setPesan(pesan);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!nama) {
      setNamaMsg("Masukkan nama kamu");
    }
    if (!email.match(mailformat)) {
      setEmailMsg("Masukkan email yang valid");
    }
    if (!subjek) {
      setSubjekMsg("Masukkan subjek pesan");
    }
    if (!pesan) {
      setPesanMsg("Masukkan pesan kamu");
    }
    if (nama && email.match(mailformat) && subjek && pesan) {
      try {
      } catch (e) {
        setSubmitMsg("Ada yang error!");
      }
    }

    const formData = {
      nama,
      email,
      subjek,
      pesan,
    };

    console.log(formData);

    // fetch("/api/mail", {
    //   method: "post",
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <div>
      <Head>
        <title>Kontak | FibonacciKu</title>
      </Head>
      <NavBar />

      <main>
        <FormKontak>
          <form
            method="POST"
            className={cls(styles.kontak__form)}
            // onSubmit={handleOnSubmit}
          >
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Nama Lengkap</label>
              <input
                className={cls(styles.kontak__input)}
                type="text"
                id="nama"
                name="nama"
                required
                onChange={handleOnChangeNama}
              />
              <p className={styles.kontak__userMsg}>{namaMsg}</p>
            </div>
            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Email</label>
              <input
                className={cls(styles.kontak__input)}
                type="email"
                id="email"
                name="email"
                required
                onChange={handleOnChangeEmail}
              />
              <p className={styles.kontak__userMsg}>{emailMsg}</p>
            </div>

            <div className={styles.kontak__konten}>
              <label className={cls(styles.kontak__label)}>Subjek</label>
              <input
                className={cls(styles.kontak__input)}
                type="text"
                id="subject"
                name="subjek"
                required
                onChange={handleOnChangeSubjek}
              />
              <p className={styles.kontak__userMsg}>{subjekMsg}</p>
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
                required
                onChange={handleOnChangePesan}
              ></textarea>
              <p className={styles.kontak__userMsg}>{pesanMsg}</p>
            </div>

            <div className={styles.kontak__button}>
              <button type="submit" onClick={handleOnSubmit}>
                Kirim Pesan
              </button>
              <p className={cls(styles.kontak__userMsg, styles.submit)}>
                {submitMsg}
              </p>
            </div>
          </form>
        </FormKontak>
      </main>

      <Footer />
    </div>
  );
};

export default Kontak;
