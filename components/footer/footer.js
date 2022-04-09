import styles from "./footer.module.scss";
import cls from "classnames";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
  const cookies = parseCookies();
  const router = useRouter();

  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies?.token;
  const [userState, setUserState] = useState("");

  useEffect(() => {
    user && token ? setUserState(user) : setUserState("");
  }, [router]);

  const HandleClickBeranda = (e) => {
    e.preventDefault();
    userState ? router.push("/beranda") : router.push("/");
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
    router.push("/kebijakan-privasi");
  };
  const HandleClickSyarat = (e) => {
    e.preventDefault();
    router.push("/syarat-ketentuan");
  };

  return (
    <footer className={styles.footer}>
      <div className={cls(styles.container, "container")}>
        <a className={styles.footer__logo} onClick={HandleClickBeranda}>
          <Image
            src={"/static/img/logofibonama_footer.svg"}
            alt="Logo FibonacciKu"
            layout="fill"
          />
        </a>

        <div className={styles.footer__social}>
          <a
            href="https://www.instagram.com/fibonacciku.id/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/static/img/instagram.webp"}
              alt="Logo Instagram FibonacciKu"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/fibonacciku"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/static/img/linkedin.png"
              alt="Logo LinkedIn FibonacciKu"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://www.youtube.com/c/Fibonacciku"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/static/img/youtube.webp"
              alt="Logo YouTube FibonacciKu"
              width={24}
              height={24}
            />
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
            rel="noreferrer"
            className={cls(styles.button, "button")}
          >
            Donasi
          </a>
        </div>

        <div className={styles.footer__copyright}>
          <p>Jerman - Indonesia &copy; FibonacciKu 2022. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
