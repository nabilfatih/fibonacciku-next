import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Hero from "../../components/hero/hero";
import Features from "../../components/features/features";
import Donasi from "../../components/donasi/donasi";
import { parseCookies } from "nookies";

export default function Beranda() {
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

  return (
    <div>
      <Head>
        <title>FibonacciKu</title>

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
        <Hero user={user} token={token} />
        <Features />
        <Donasi />
      </main>

      <Footer />
    </div>
  );
}
