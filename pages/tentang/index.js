import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Bantuan from "../../components/tentang/bantuan";
import Founder from "../../components/tentang/founder";
import Story from "../../components/tentang/story";
import TentangFibo from "../../components/tentang/tentang";

export default function Tentang() {
  return (
    <div>
      <Head>
        <title>Tentang | FibonacciKu</title>

        <meta
          name="description"
          content="Belajar gratis dimanapun dan kapanpun di platform pendidikan terbaik di Indonesia - 100% Gratis!"
        />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
        <meta name="robots" content="all" />
      </Head>
      <NavBar />

      <main>
        <TentangFibo />
        <Story />
        <Founder />
        <Bantuan />
      </main>

      <Footer />
    </div>
  );
}
