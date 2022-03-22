import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Hero from "../../components/hero/hero";
import Features from "../../components/features/features";
import Donasi from "../../components/donasi/donasi";

export default function Beranda() {
  return (
    <div>
      <Head>
        <title>FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <Hero />
        <Features />
        <Donasi />
      </main>

      <Footer />
    </div>
  );
}
