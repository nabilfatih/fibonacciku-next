import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Bantuan from "../../components/tentang/bantuan";
import Founder from "../../components/tentang/founder";
import Story from "../../components/tentang/story";
import TentangFibo from "../../components/tentang/tentang";

export default function Tentang() {
  return (
    <>
      <Head>
        <title>Tentang | FibonacciKu</title>

        <meta name="description" content="Kenalan Tentang FibonacciKu!" />
        <meta property="og:title" content="Tentang | FibonacciKu" />
        <meta
          property="og:description"
          content="Kenalan Tentang FibonacciKu!"
        />
        <meta property="og:url" content="https://fibonacciku.com/tentang" />
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
        <TentangFibo />
        <Story />
        <Founder />
        <Bantuan />
      </main>

      <Footer />
    </>
  );
}
