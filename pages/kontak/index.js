import Head from "next/head";
import Footer from "../../components/footer/footer";
import FormKontak from "../../components/form-kontak/form-kontak";
import NavBar from "../../components/nav/nav";

const Kontak = () => {
  return (
    <div>
      <Head>
        <title>Kontak | FibonacciKu</title>
      </Head>
      <NavBar />
      <FormKontak />
      <Footer />
    </div>
  );
};

export default Kontak;
