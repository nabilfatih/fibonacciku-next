import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";

export default function Beranda() {
  return (
    <div>
      <Head>
        <title>FibonacciKu</title>
      </Head>

      <NavBar />
      <Footer />
    </div>
  );
};
