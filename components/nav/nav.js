import styles from "./nav.module.scss";
import cls from "classnames";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

const NavBar = (props) => {
  const router = useRouter();

  const HandleClickBeranda = (e) => {
    e.preventDefault();
    router.push("/beranda");
  };
  const HandleClickPelajaran = (e) => {
    e.preventDefault();
    router.push("/mata-pelajaran");
  };
  const HandleClickTentang = (e) => {
    e.preventDefault();
    router.push("/tentang");
  };
  const HandleClickKontak = (e) => {
    e.preventDefault();
    router.push("/kontak");
  };
  const HandleClickMasuk = (e) => {
    e.preventDefault();
    router.push("/masuk");
  };
  const HandleClickDaftar = (e) => {
    e.preventDefault();
    router.push("/masuk");
  };

  return (
    <header className={styles.header}>
      <div className={cls(styles.overlay, "has-fade")}></div>
      <nav className="container flex flex-jc-sb flex-ai-c">
        <a className={styles.header__logo} onClick={HandleClickBeranda}>
          <Image
            src={"/static/img/logofibonama.svg"}
            alt="Logo FibonacciKu"
            layout="fill"
          />
        </a>

        <a
          id="btnHamburger"
          type="button"
          className={cls(styles.header__toggle, "hide-for-desktop")}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>

        <div className={cls(styles.header__links, "hide-for-mobile")}>
          <a onClick={HandleClickBeranda}>Beranda</a>
          <a onClick={HandleClickPelajaran}>Mata Pelajaran</a>
          <a onClick={HandleClickTentang}>Tentang</a>
          <a onClick={HandleClickKontak}>Kontak</a>
          <a href="https://saweria.co/Fibonacciku" target={"_blank"}>
            Donasi
          </a>
        </div>

        <div className={cls(styles.header__register, "hide-for-mobile")}>
          <a
            className={cls("button", styles.header__cta)}
            onClick={HandleClickMasuk}
          >
            Masuk
          </a>

          <a
            className={cls("button", styles.header__cta)}
            onClick={HandleClickDaftar}
          >
            Daftar
          </a>
        </div>
      </nav>

      <div className={cls(styles.header__menu, "has-fade", "hide-for-desktop")}>
        <Link href={"/"}>
          <a>Beranda</a>
        </Link>
        <Link href={"/mata-pelajaran"}>
          <a>Mata Pelajaran</a>
        </Link>
        <Link href={"/tentang"}>
          <a>Tentang</a>
        </Link>
        <Link href={"/kontak"}>
          <a>Kontak</a>
        </Link>
        <a href="https://saweria.co/Fibonacciku" target={"_blank"}>
          Donasi
        </a>
      </div>
    </header>
  );
};

export default NavBar;
