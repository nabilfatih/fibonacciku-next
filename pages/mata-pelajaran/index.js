import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Pelajaran from "../../components/pelajaran-ujian/pelajaran";
import Ujian from "../../components/pelajaran-ujian/ujian";

import dataPelajaran from "../../data/dataPelajaran.json";

export async function getStaticProps(context) {
  return {
    props: {
      dataPelajaran,
    }, // will be passed to the page component as props
  };
}

export default function MataPelajaran(props) {
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
        <title>Mata Pelajaran | FibonacciKu</title>
      </Head>

      <NavBar />
      <Pelajaran
        data={props.dataPelajaran}
        key={createFromPattern("xxx-xxx")}
      />

      <Ujian data={props.dataPelajaran} key={createFromPattern("xxx-xxx")} />

      <Footer />
    </div>
  );
}
