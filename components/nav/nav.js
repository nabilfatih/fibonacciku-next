import styles from "./nav.module.scss";
import cls from "classnames";
import Image from "next/image";
import {
  UilAngleDown,
  UilUserCircle,
  UilSetting,
  UilSignout,
  UilAngleUp,
  UilBookOpen,
  UilMoneyInsert,
  UilGraduationCap,
  UilEstate,
  UilEnvelopeEdit,
  UilUser,
} from "@iconscout/react-unicons";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/user.context";

const NavBar = () => {
  const router = useRouter();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const dropdown = useRef(null);
  const dropdownMobile = useRef(null);
  const dropdownProfileMobile = useRef(null);
  const [statusAktif, setStatusAktif] = useState(false);
  const [statusMobileAktif, setStatusMobileAktif] = useState(false);
  const [userState, setUserState] = useState("");
  const [iconStatus, setIconStatus] = useState(false);
  const [iconStatusMobile, setIconStatusMobile] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState("");

  useEffect(() => {
    currentUser ? setUserState(currentUser) : setUserState(null);
  }, [currentUser]);

  async function handleLogout(e) {
    e.preventDefault();
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    await router.push("/masuk");
    setCurrentUser(null);
    router.reload();
  }

  const handleBeranda = (e) => {
    e.preventDefault();
    userState ? router.push("/beranda") : router.push("/");
  };

  const handleDropdown = (e) => {
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

  const handleMobileDropdown = (e) => {
    e.preventDefault();
    setOpenHamburger(!openHamburger);
    setOpenMobileMenu("fade-in");
  };

  const handleProfileMobile = (e) => {
    e.preventDefault();
    setIconStatusMobile(!iconStatusMobile);
    setStatusMobileAktif(!statusMobileAktif);
  };

  useEffect(() => {
    if (!openHamburger) return;
    function handleClickMobile(event) {
      if (
        dropdownMobile.current &&
        !dropdownMobile.current.contains(event.target)
      ) {
        setOpenHamburger(false);
        setOpenMobileMenu("");
      }
    }
    window.addEventListener("click", handleClickMobile);
    return () => window.removeEventListener("click", handleClickMobile);
  }, [openHamburger]);

  return (
    <header className={cls(styles.header, openHamburger ? styles.open : "")}>
      <div className={cls(styles.overlay, "has-fade", openMobileMenu)}></div>
      <nav
        className={cls(
          styles.container,
          "container container--pall flex flex-jc-sb flex-ai-c"
        )}
      >
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
          className={cls(
            styles.header__toggle,
            styles.hamburger,
            "hide-for-desktop"
          )}
          onClick={handleMobileDropdown}
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
          <a
            href="https://saweria.co/Fibonacciku"
            target={"_blank"}
            rel="noreferrer"
          >
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
                    width={42}
                    height={42}
                  />
                  {iconStatus ? (
                    <UilAngleUp className={styles.uil} />
                  ) : (
                    <UilAngleDown className={styles.uil} />
                  )}
                </a>

                {statusAktif && (
                  <ul className={styles.dropdown_menu} ref={dropdown}>
                    <li
                      className={styles.profil_dropdown}
                      onClick={() => router.push(`/fibo/${userState.username}`)}
                    >
                      <a>
                        <UilUserCircle className={styles.uil} size={30} />
                        Profil
                      </a>
                    </li>
                    <li
                      className={styles.pengaturan_dropdown}
                      onClick={() => router.push("/pengaturan/akun")}
                    >
                      <a>
                        <UilSetting className={styles.uil} size={30} />
                        Pengaturan
                      </a>
                    </li>
                    <li className={styles.garis_batas}>
                      <hr className={styles.line} />
                    </li>
                    <li
                      className={styles.keluar_dropdown}
                      onClick={handleLogout}
                    >
                      <a>
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

      <div
        className={cls(
          styles.header__menu,
          "has-fade",
          openMobileMenu,
          "hide-for-desktop"
        )}
        ref={dropdownMobile}
      >
        {userState && (
          <div className={styles.profile}>
            <a onClick={handleProfileMobile}>
              <UilUserCircle className={styles.uil} />
              {userState.username}
            </a>

            {iconStatusMobile ? (
              <UilAngleUp className={styles.uilStatus} />
            ) : (
              <UilAngleDown className={styles.uilStatus} />
            )}
          </div>
        )}

        {statusMobileAktif && (
          <ul className={styles.dropdown_profile} ref={dropdownProfileMobile}>
            <li className={styles.profil}>
              <a
                onClick={() => router.push(`/fibo/${userState.username}`)}
                className={styles.pilihan}
              >
                <UilUser className={styles.uil} size={20} />
                Profil
              </a>
            </li>
            <li className={styles.pengaturan}>
              <a
                onClick={() => router.push("/pengaturan/akun")}
                className={styles.pilihan}
              >
                <UilSetting className={styles.uil} size={20} />
                Pengaturan
              </a>
            </li>
            <li className={styles.keluar}>
              <a onClick={handleLogout} className={styles.pilihan}>
                <UilSignout className={styles.uil} size={20} />
                Keluar
              </a>
            </li>
          </ul>
        )}

        <a onClick={handleBeranda}>
          <UilEstate className={styles.uil} /> Beranda
        </a>
        <a onClick={() => router.push("/mata-pelajaran")}>
          <UilBookOpen className={styles.uil} />
          Mata Pelajaran
        </a>
        <a onClick={() => router.push("/tentang")}>
          <UilGraduationCap className={styles.uil} />
          Tentang
        </a>
        <a onClick={() => router.push("/kontak")}>
          <UilEnvelopeEdit className={styles.uil} />
          Kontak
        </a>
        <a
          href="https://saweria.co/Fibonacciku"
          target={"_blank"}
          rel="noreferrer"
        >
          <UilMoneyInsert className={styles.uil} />
          Donasi
        </a>
      </div>
    </header>
  );
};

export default NavBar;
