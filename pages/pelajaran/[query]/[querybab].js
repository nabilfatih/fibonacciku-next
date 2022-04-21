import dataBab from "../../../data/dataBab.json";
import dataSubBab from "../../../data/dataSubbab.json";
import dataKonten from "../../../data/dataKonten.json";
import NavBar from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import Image from "next/image";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import styles from "./querybab.module.scss";
import Link from "next/link";
import Head from "next/head";
import { UilCloudDownload, UilCloudCheck } from "@iconscout/react-unicons";
import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/user.context";
import { toast, Slide } from "react-toastify";

export async function getStaticPaths() {
  return {
    paths: dataBab.map((bab) => {
      return {
        params: {
          query: bab.query,
          querybab: bab.querybab,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const bab = dataBab.find((bab) => bab.querybab === params.querybab);
  const subBabs = dataSubBab.filter(
    (subbab) => subbab.querybab === params.querybab
  );
  const kontens = dataKonten.filter(
    (konten) => konten.querybab === params.querybab
  );

  return {
    props: {
      bab,
      subBabs,
      kontens,
    },
  };
}

export default function QueryBab({ bab, subBabs, kontens }) {
  const router = useRouter();

  const { currentUser } = useContext(UserContext);

  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

  const [statusPelajaranKu, setStatusPelajaranKu] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!statusPelajaranKu) {
        const dataPelajaranKu = {
          userId: currentUser._id,
          username: currentUser.username,
          pelajaran: bab.pelajaran,
          bab: bab.bab,
          query: bab.query,
          querybab: bab.querybab,
          icon: bab.icon,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.put(
          `/api/checkPelajaranku`,
          dataPelajaranKu,
          config
        );
        if (data?.success === "ada") {
          setStatusPelajaranKu(true);
        } else {
          setStatusPelajaranKu(false);
        }
      }
    }
    fetchData();
  }, [statusPelajaranKu, currentUser, bab]);

  async function handlePelajaranKu() {
    const dataPelajaranKu = {
      userId: currentUser._id,
      username: currentUser.username,
      pelajaran: bab.pelajaran,
      bab: bab.bab,
      query: bab.query,
      querybab: bab.querybab,
      icon: bab.icon,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const toastConfig = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const loading = toast.loading("Mohon tunggu...", { transition: Slide });

    if (statusPelajaranKu) {
      try {
        const { data } = await axios.put(
          `/api/pelajaranku`,
          dataPelajaranKu,
          config
        );
        toast.dismiss(loading);
        setStatusPelajaranKu(false);
      } catch (e) {
        toast.dismiss(loading);
        toast.error(e.response.data.error, toastConfig);
      }
    }

    if (!statusPelajaranKu) {
      try {
        const { data } = await axios.post(
          `/api/pelajaranku`,
          dataPelajaranKu,
          config
        );
        toast.dismiss(loading);
        setStatusPelajaranKu(true);
      } catch (e) {
        toast.dismiss(loading);
        toast.error(e.response.data.error, toastConfig);
      }
    }
  }

  return (
    <>
      <Head>
        <title>{bab.bab} | FibonacciKu</title>

        <meta
          name="description"
          content={`Belajar ${bab.bab} Gratis di FibonacciKu!`}
        />
        <meta property="og:title" content={`${bab.bab}`} />
        <meta
          property="og:description"
          content={`Belajar ${bab.bab} Gratis di FibonacciKu!`}
        />
        <meta
          property="og:url"
          content={`https://fibonacciku.com/pelajaran/${bab.query}/${bab.querybab}`}
        />
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
        <section className={styles.belajar}>
          <div className={styles.shows}>
            <div className={styles.shows__header}>
              <div className="container container--px">
                <div className={styles.shows__pelajaran}>
                  <Image
                    src={bab.icon}
                    width={85}
                    height={85}
                    alt={`Logo ${bab.bab} FibonacciKu`}
                  />
                  <div className={styles.header__belajar}>
                    <Link href={`/pelajaran/${bab.query}`}>
                      <a>
                        <h3>{bab.pelajaran}</h3>
                      </a>
                    </Link>
                    <h1>{bab.bab}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className={cls(styles.shows__pelajaranku)}>
              <div className={cls(styles.add, "container container--px")}>
                {!statusPelajaranKu ? (
                  <UilCloudDownload
                    size={30}
                    className={styles.icon}
                    onClick={handlePelajaranKu}
                  />
                ) : (
                  <UilCloudCheck
                    size={30}
                    className={styles.icon}
                    onClick={handlePelajaranKu}
                  />
                )}

                <p onClick={handlePelajaranKu}>PelajaranKu</p>
              </div>
            </div>

            <div className="container container--px">
              <div className={styles.belajar__grid}>
                {subBabs.map((subbab) => {
                  return (
                    <div
                      className={styles.belajar__card}
                      key={createFromPattern("xxx-xxx")}
                    >
                      <div className={styles.belajar__subbab}>
                        <h3>{subbab.subbab}</h3>
                      </div>

                      <div className={styles.belajar__konten}>
                        <div className={styles.belajar__keterangan}>
                          <h4>Belajar</h4>
                        </div>

                        <div className={styles.belajar__videos}>
                          {kontens.map((konten) => {
                            if (subbab.querysubbab === konten.querysubbab) {
                              return (
                                <div
                                  className={styles.konten}
                                  key={createFromPattern("xxx-xxx")}
                                >
                                  <UilPlayCircle className={styles.icon} />
                                  <div className={styles.judul}>
                                    <a
                                      onClick={() =>
                                        router.push(
                                          `/pelajaran/${konten.query}/${konten.querybab}/${konten.queryjudul}`
                                        )
                                      }
                                    >
                                      {konten.judul}
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
