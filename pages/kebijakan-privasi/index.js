import Head from "next/head";
import Footer from "../../components/footer/footer";
import KebijakanPrivasi from "../../components/kebijakan-privasi/kebijakan-privasi";
import NavBar from "../../components/nav/nav";

export default function Kebijakan() {
  return (
    <div>
      <Head>
        <title>Kebijakan Privasi | FibonacciKu</title>
      </Head>
      <NavBar />
      <KebijakanPrivasi />
      <Footer />
    </div>
  );
}
