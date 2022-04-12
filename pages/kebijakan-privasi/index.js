import Head from "next/head";
import Footer from "../../components/footer/footer";
import KebijakanPrivasi from "../../components/kebijakan-privasi/kebijakan-privasi";
import NavBar from "../../components/nav/nav";
import { parseCookies } from "nookies";

export default function Kebijakan() {
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

  return (
    <div>
      <Head>
        <title>Kebijakan Privasi | FibonacciKu</title>
      </Head>
      <NavBar user={user} token={token} />

      <main>
        <KebijakanPrivasi />
      </main>

      <Footer user={user} token={token} />
    </div>
  );
}
