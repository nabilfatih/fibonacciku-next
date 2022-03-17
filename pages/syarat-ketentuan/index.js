import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import SyaratKetentuan from "../../components/syarat-ketentuan/syarat-ketentuan";

export default function Syarat() {
  return (
    <div>
      <Head>
        <title>Syarat & Ketentuan | FibonacciKu</title>
      </Head>
      <NavBar />
      <SyaratKetentuan />
      <Footer />
    </div>
  );
}
