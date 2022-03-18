import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import FormMasuk from "../../components/registration/form-masuk";

export default function Masuk() {
  return (
    <div>
      <Head>
        <title>Masuk | FibonacciKu</title>
      </Head>

      <NavBar />

      <main>
        <FormMasuk />
      </main>

      <Footer />
    </div>
  );
}
