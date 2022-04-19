import Head from "next/head";
import Footer from "../../../components/footer/footer";
import NavBar from "../../../components/nav/nav";
import { useRouter } from "next/router";
import styles from "./pelajaranku.module.scss";
import Image from "next/image";
import cls from "classnames";
import connectDB from "../../../config/connectDB";
import User from "../../../models/user";
import PelajaranKu from "../../../models/pelajaranku";
import { useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import Link from "next/link";

export async function getServerSideProps(context) {
  connectDB();

  const userName = context.params.username;
  const dataUser = await User.findOne({ username: userName });
  const pelajaranKu = await PelajaranKu.find({ username: userName });

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const listPelajaran = getUniqueListBy(pelajaranKu, "pelajaran");

  const { username, nama, avatar, _id } = dataUser;
  const userCookie = { username, nama, avatar, _id };

  if (!dataUser) {
    return { notFound: true };
  }
  return {
    props: {
      listPelajaran: JSON.parse(JSON.stringify(listPelajaran)),
      pelajaranKu: JSON.parse(JSON.stringify(pelajaranKu)),
      userCookie: JSON.parse(JSON.stringify(userCookie)),
      dataUser: JSON.parse(JSON.stringify(dataUser)),
    },
  };
}

export default function Profile({
  dataUser,
  pelajaranKu,
  listPelajaran,
  userCookie,
}) {
  const router = useRouter();
  const { username } = router.query;

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (
      dataUser.avatar.filename !== currentUser.avatar.filename ||
      dataUser.username !== currentUser.username
    ) {
      setCurrentUser(userCookie);
    }
  }, [dataUser, currentUser, userCookie, setCurrentUser]);

  function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
  }
  function createFromPattern(pattern) {
    pattern = pattern.split("");
    return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
  }

  return (
    <div>
      <Head>
        <title>{username} - PelajaranKu | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <section className={styles.pelajarankus}>
          <div className={styles.pelajaranku}>
            <div className={styles.pelajaranku__header}>
              <div className="container container--px">
                <div className={styles.pelajaranku__list}>
                  <Image
                    className={styles.foto}
                    src={dataUser.avatar.path}
                    width={85}
                    height={85}
                    alt={`Logo Profil ${username} FibonacciKu`}
                  />
                  <div className={styles.header__list}>
                    <Link href={`/fibo/${username}`}>
                      <a>
                        <h3>{username}</h3>
                      </a>
                    </Link>
                    <h1>PelajaranKu</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className={cls("container container--px")}>
              {listPelajaran.map((listpelajaran) => {
                return (
                  <div
                    className={styles.pelajaranku__daftar}
                    key={createFromPattern("xxx-xxx")}
                  >
                    <h2>{listpelajaran.pelajaran}</h2>

                    <div className={styles.pelajaranku__grid}>
                      {pelajaranKu.map((pelajaranku) => {
                        if (pelajaranku.query === listpelajaran.query) {
                          return (
                            <div
                              className={styles.pelajaranku__card}
                              key={createFromPattern("xxx-xxx")}
                              onClick={() => {
                                router.push(
                                  `/pelajaran/${pelajaranku.query}/${pelajaranku.querybab}`
                                );
                              }}
                            >
                              <div className={styles.pelajaranku__icon}>
                                <a>
                                  <Image
                                    src={pelajaranku.icon}
                                    alt={`Logo ${pelajaranku.bab} FibonacciKu`}
                                    width={128}
                                    height={128}
                                  />
                                </a>
                              </div>

                              <a className={styles.pelajaranku__bab}>
                                <h3>{pelajaranku.bab}</h3>
                              </a>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
