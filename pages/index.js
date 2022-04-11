import Head from "next/head";
import Footer from "../components/footer/footer";
import NavBar from "../components/nav/nav";
import Hero from "../components/hero/hero";
import Features from "../components/features/features";
import Donasi from "../components/donasi/donasi";
import { parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const cookies = parseCookies();
  const router = useRouter();

  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/verify`, { token: token }, config);
      const tokens = data.userId;
      if (tokens || user) {
        router.push("/beranda");
      }
    }
    fetchData();
  }, [router, token, user]);

  return (
    <div>
      <Head>
        <title>FibonacciKu | Belajar Gratis Kapanpun Dimanapun</title>
        <meta
          name="description"
          content="Belajar gratis dimanapun dan kapanpun di platform pendidikan terbaik di Indonesia - 100% Gratis!"
        />
        <meta
          property="og:title"
          content="FibonacciKu | Belajar Gratis Kapanpun Dimanapun"
        />
        <meta
          property="og:description"
          content="Belajar gratis dimanapun dan kapanpun di platform pendidikan terbaik di Indonesia - 100% Gratis!"
        />
        <meta property="og:url" content="https://fibonacciku.com" />
        <meta property="og:type" content="website" />
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

      <Hero />
      <Features />
      <Donasi />

      <Footer />
    </div>
  );
}
