import { useRouter } from "next/router";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";

import dataBab from "../../data/dataBab.json";

export async function getStaticPaths() {
  return {
    paths: dataBab.map((bab) => {
      return {
        params: {
          query: bab.query,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pelajaran = dataBab.find((bab) => bab.query === params.query);
  const babs = dataBab.filter((bab) => bab.query === params.query);

  return {
    props: {
      babs,
      pelajaran,
    }, // will be passed to the page component as props
  };
}

const Query = ({ babs, pelajaran }) => {
  const router = useRouter();

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
        <title>{pelajaran.pelajaran} | FibonacciKu</title>
      </Head>

      <NavBar />

      <div>
        {babs.map((bab) => {
          return <div>{bab.bab}</div>;
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Query;
