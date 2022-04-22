import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Hero from "../../components/hero/hero";
import Features from "../../components/features/features";
import Donasi from "../../components/donasi/donasi";
import { verifyToken } from "../../lib/utils";
import cookie from "cookie";

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)
    : null;
  const token = cookies?.token ? cookies.token : null;
  const userId = await verifyToken(token);

  if (!userId) {
    return {
      redirect: {
        destination: "/masuk",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}

export default function Beranda({ token }) {
  return (
    <>
      <Head>
        <title>FibonacciKu</title>

        <meta
          name="description"
          content="Belajar gratis dimanapun dan kapanpun di platform pendidikan terbaik di Indonesia - 100% Gratis!"
        />
        <meta property="og:title" content="FibonacciKu" />
        <meta
          property="og:description"
          content="Belajar gratis di FibonacciKu dimanapun kapanpun!"
        />
        <meta property="og:url" content="https://fibonacciku.com/beranda" />
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
        <Hero />
        <Features />
        <Donasi />
      </main>

      <Footer />
    </>
  );
}
