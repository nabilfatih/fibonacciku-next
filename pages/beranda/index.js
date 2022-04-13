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
  const user = cookies?.user ? JSON.parse(cookies.user) : null;
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
    props: { user, token },
  };
}

export default function Beranda({ user, token }) {
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

      <NavBar user={user} token={token} />

      <main>
        <Hero user={user} token={token} />
        <Features />
        <Donasi />
      </main>

      <Footer user={user} token={token} />
    </div>
  );
}
