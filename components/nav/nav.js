import styles from "./nav.module.scss";
import cls from "classnames";
import Image from "next/image";
import { verifyToken } from "../../lib/utils";
import {
  UilAngleDown,
  UilUserCircle,
  UilSetting,
  UilSignout,
  UilAngleUp,
} from "@iconscout/react-unicons";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { toast } from "react-toastify";

const NavBar = () => {
  const cookies = parseCookies();
  const router = useRouter();

  const user = cookies?.user ? JSON.parse(cookies.user) : "";

  const [statusAktif, setStatusAktif] = useState(false);
  const dropdown = useRef(null);
  const [userState, setUserState] = useState("");
  const [iconStatus, setIconStatus] = useState(false);

  useEffect(() => {
    verifyToken(cookies.token) ? setUserState(user) : setUserState("");
  }, [router, setUserState]);

  const handleLogout = async () => {
    cookie.remove("token");
    cookie.remove("user");
    setUserState("");
    await router.push("/masuk");
    toast.success("Sampai jumpa lagi 👻");
  };

  const handleDropdown = async (e) => {
    e.preventDefault();
    setStatusAktif(!statusAktif);
    setIconStatus(!iconStatus);
  };

  useEffect(() => {
    if (!statusAktif) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setStatusAktif(false);
        setIconStatus(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [statusAktif]);

  const handleBeranda = (e) => {
    e.preventDefault();
    userState ? router.push("/beranda") : router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={cls(styles.overlay, "has-fade")}></div>
      <nav className="container container--pall flex flex-jc-sb flex-ai-c">
        <a className={styles.header__logo} onClick={handleBeranda}>
          <Image
            src={"/static/img/logofibonama.svg"}
            alt="Logo FibonacciKu"
            layout="fill"
            priority
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
          <a onClick={handleBeranda}>Beranda</a>
          <a onClick={() => router.push("/mata-pelajaran")}>Mata Pelajaran</a>
          <a onClick={() => router.push("/tentang")}>Tentang</a>
          <a onClick={() => router.push("/kontak")}>Kontak</a>
          <a href="https://saweria.co/Fibonacciku" target={"_blank"}>
            Donasi
          </a>
        </div>

        <div className={cls(styles.header__register, "hide-for-mobile")}>
          {!userState ? (
            <div className={styles.no_user}>
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
          ) : (
            <div className={styles.menu_desktop}>
              <div
                id="dropdowns"
                className={cls(styles.dropdowns, statusAktif)}
              >
                <a
                  id="drop_down"
                  className={styles.drop_down}
                  type="button"
                  onClick={handleDropdown}
                >
                  <Image
                    src={userState.avatar.path}
                    alt={`Logo ${userState.nama} Profile FibonacciKu`}
                    className={styles.foto_profil}
                    width={48}
                    height={48}
                  />
                  {iconStatus ? (
                    <UilAngleUp className={styles.uil} />
                  ) : (
                    <UilAngleDown className={styles.uil} />
                  )}
                </a>

                {statusAktif && (
                  <ul className={styles.dropdown_menu} ref={dropdown}>
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
                      <a onClick={handleLogout}>
                        <UilSignout className={styles.uil} size={30} />
                        Keluar
                      </a>
                    </li>
                  </ul>
                )}
              </div>

              <div className={styles.display_username}>
                <span>{userState.username}</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className={cls(styles.header__menu, "has-fade", "hide-for-desktop")}>
        <a onClick={handleBeranda}>Beranda</a>
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
