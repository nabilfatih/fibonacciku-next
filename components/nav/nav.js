import styles from "./nav.module.scss";
import cls from "classnames";
import Image from "next/image";

import {
  UilAngleDown,
  UilUserCircle,
  UilSetting,
  UilSignout,
} from "@iconscout/react-unicons";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { toast } from "react-toastify";

const NavBar = () => {
  const { data: session } = useSession();
  const cookies = parseCookies();
  const router = useRouter();

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";

  const [statusAktif, setStatusAktif] = useState(false);
  const dropdown = useRef(null);
  const [userState, setUserState] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(true)

  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user);
  }, [router, setUserState]);

  useEffect(() => {
    if (user) {
      setisLoggedIn(true)
    }
    if (!user) {
      router.push("/masuk")
    }
  }, [isLoggedIn])

  const handleLogout = async () => {
    if (session) signOut();
    cookie.remove("token");
    cookie.remove("user");
    setisLoggedIn(false)
    setUserState("")
    await router.push("/masuk");
    toast.success("Sampai jumpa lagi 👻");
  };

  const handleDropdown = async (e) => {
    e.preventDefault();
    setStatusAktif(!statusAktif);
  };

  useEffect(() => {
    if (!statusAktif) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setStatusAktif(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [statusAktif]);

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
          <a onClick={() => router.push("/beranda")}>Beranda</a>
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
                  <UilAngleDown className={styles.uil} />
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
