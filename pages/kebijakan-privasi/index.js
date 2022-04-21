import Head from "next/head";
import Footer from "../../components/footer/footer";
import KebijakanPrivasi from "../../components/kebijakan-privasi/kebijakan-privasi";
import NavBar from "../../components/nav/nav";

export default function Kebijakan() {
  return (
    <>
      <Head>
        <title>Kebijakan Privasi | FibonacciKu</title>
      </Head>
      <NavBar />

      <main>
        <KebijakanPrivasi />
      </main>

      <Footer />
    </>
  );
}
