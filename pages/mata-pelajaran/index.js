import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Pelajaran from "../../components/pelajaran-ujian/pelajaran";
import Ujian from "../../components/pelajaran-ujian/ujian";

export default function MataPelajaran() {
  return (
    <div>
      <Head>
        <title>Mata Pelajaran | FibonacciKu</title>
      </Head>

      <NavBar />
      <Pelajaran />
      <Ujian />
      <Footer />
    </div>
  );
}
