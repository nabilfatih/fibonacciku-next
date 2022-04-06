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
