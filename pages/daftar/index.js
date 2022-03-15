import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import FormDaftar from "../../components/registration/form-daftar";

export default function Daftar() {
  return (
    <div>
      <Head>
        <title>Daftar | FibonacciKu</title>
      </Head>

      <NavBar />
      <FormDaftar />
      <Footer />
    </div>
  );
}
