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
