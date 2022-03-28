import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Profile | FibonacciKu</title>
      </Head>

      <NavBar />

      <main></main>

      <Footer />
    </div>
  );
}
