import styles from "./nav.module.scss";
import cls from "classnames";
import Image from "next/image";

import {
  UilAngleDown,
  UilUserCircle,
  UilSetting,
  UilSignout,
} from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const NavBar = (props) => {
  const { data: session, status } = useSession();
  // console.log({ session, status });

  const router = useRouter();
  const [statusAktif, setStatusAktif] = useState(false);

  const handleDropdown = (e) => {
    e.preventDefault();
    setStatusAktif(!statusAktif);
  };

  useEffect(() => {
    return () => {
      document.addEventListener("click", function (event) {
        if (!event.target.closest("#dropdowns")) {
          setStatusAktif(false);
        }
      });
    };
  });

  return (
    <header className={styles.header}>
      <div className={cls(styles.overlay, "has-fade")}></div>
      <nav className="container container--pall flex flex-jc-sb flex-ai-c">
        <a
          className={styles.header__logo}
          onClick={() => router.push("/beranda")}
        >
          <Image
            src={"/static/img/logofibonama.svg"}
            alt="Logo FibonacciKu"
            layout="fill"
            priority="true"
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
          <a onClick={() => router.push("/beranda")}>Beranda</a>
          <a onClick={() => router.push("/mata-pelajaran")}>Mata Pelajaran</a>
          <a onClick={() => router.push("/tentang")}>Tentang</a>
          <a onClick={() => router.push("/kontak")}>Kontak</a>
          <a href="https://saweria.co/Fibonacciku" target={"_blank"}>
            Donasi
          </a>
        </div>

        <div className={cls(styles.header__register, "hide-for-mobile")}>
          <div className={styles.no_user} style={{ display: "none" }}>
            <a
              className={cls("button", styles.header__cta)}
              onClick={() => router.push("/masuk")}
            >
              Masuk
            </a>

            <a
              className={cls("button", styles.header__cta)}
              onClick={() => router.push("/daftar")}
            >
              Daftar
            </a>
          </div>

          <div className={styles.menu_desktop}>
            <div id="dropdowns" className={cls(styles.dropdowns, statusAktif)}>
              <a
                id="drop_down"
                className={styles.drop_down}
                type="button"
                onClick={handleDropdown}
              >
                <Image
                  src={"/static/img/default-icon.png"}
                  className={styles.foto_profil}
                  width={48}
                  height={48}
                />
                <UilAngleDown className={styles.uil} />
              </a>

              {statusAktif && (
                <ul className={styles.dropdown_menu}>
                  <li className={styles.profil_dropdown}>
                    <a>
                      <UilUserCircle className={styles.uil} size={30} />
                      Profil
                    </a>
                  </li>
                  <li className={styles.pengaturan_dropdown}>
                    <a>
                      <UilSetting className={styles.uil} size={30} />
                      Pengaturan
                    </a>
                  </li>
                  <li className={styles.garis_batas}>
                    <hr className={styles.line} />
                  </li>
                  <li className={styles.keluar_dropdown}>
                    <a>
                      <UilSignout className={styles.uil} size={30} />
                      Keluar
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <div className={styles.display_username}>
              <span>nabilfatih</span>
            </div>
          </div>
        </div>
      </nav>

      <div className={cls(styles.header__menu, "has-fade", "hide-for-desktop")}>
        <a onClick={() => router.push("/beranda")}>Beranda</a>
        <a onClick={() => router.push("/mata-pelajaran")}>Mata Pelajaran</a>
        <a onClick={() => router.push("/tentang")}>Tentang</a>
        <a onClick={() => router.push("/kontak")}>Kontak</a>
        <a href="https://saweria.co/Fibonacciku" target={"_blank"}>
          Donasi
        </a>
      </div>
    </header>
  );
};

export default NavBar;
