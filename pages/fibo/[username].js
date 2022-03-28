import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  const { username } = router.query;
  return (
    <div>
      <Head>
        <title>{username} | FibonacciKu</title>
      </Head>

      <NavBar />

      <main></main>

      <Footer />
    </div>
  );
}
