import styles from "./footer.module.scss";
import cls from "classnames";
import Image from "next/image";

import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  const HandleClickBeranda = (e) => {
    e.preventDefault();
    router.push("/beranda");
  };
  const HandleClickKarir = (e) => {
    e.preventDefault();
    router.push("/karir");
  };
  const HandleClickKontak = (e) => {
    e.preventDefault();
    router.push("/kontak");
  };
  const HandleClickTim = (e) => {
    e.preventDefault();
    router.push("/tentang/tim");
  };
  const HandleClickTentang = (e) => {
    e.preventDefault();
    router.push("/tentang");
  };
  const HandleClickKebijakan = (e) => {
    e.preventDefault();
    router.push("/kebijakan");
  };
  const HandleClickSyarat = (e) => {
    e.preventDefault();
    router.push("/syarat");
  };

  return (
    <footer className={styles.footer}>
      <div className={cls(styles.container, "container")}>
        <a className={styles.footer__logo} onClick={HandleClickBeranda}>
          <img
            src="/static/img/logofibonama_footer.svg"
            alt="Logo FibonacciKu"
          ></img>
        </a>

        <div className={styles.footer__social}>
          <a href="https://www.instagram.com/fibonacciku.id/" target="_blank">
            <img
              src="/static/img/instagram.png"
              alt="Logo Instagram FibonacciKu"
            ></img>
          </a>
          <a
            href="https://www.linkedin.com/company/fibonacciku"
            target="_blank"
          >
            <img
              src="/static/img/linkedin.png"
              alt="Logo LinkedIn FibonacciKu"
            ></img>
          </a>
          <a href="https://www.youtube.com/c/Fibonacciku" target="_blank">
            <img
              src="/static/img/youtube.png"
              alt="Logo YouTube FibonacciKu"
            ></img>
          </a>
        </div>

        <div className={cls(styles.footer__links, styles.col1)}>
          <a onClick={HandleClickKarir}>Karir</a>
          <a onClick={HandleClickKontak}>Kontak</a>
          <a onClick={HandleClickTim}>Tim Kita</a>
        </div>

        <div className={cls(styles.footer__links, styles.col2)}>
          <a onClick={HandleClickTentang}>Tentang Kita</a>
          <a onClick={HandleClickKebijakan}>Kebijakan Privasi</a>
          <a onClick={HandleClickSyarat}>Syarat & Ketentuan</a>
        </div>

        <div className={styles.footer__cta}>
          <a
            href="https://saweria.co/Fibonacciku"
            target="_blank"
            className={cls(styles.button, "button")}
          >
            Donasi
          </a>
        </div>

        <div className={styles.footer__copyright}>
          Jerman - Indonesia &copy; FibonacciKu 2022. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
