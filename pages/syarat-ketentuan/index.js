import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import SyaratKetentuan from "../../components/syarat-ketentuan/syarat-ketentuan";
import { parseCookies } from "nookies";

export default function Syarat() {
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";
  const token = cookies.token ? cookies.token : null;

  return (
    <div>
      <Head>
        <title>Syarat & Ketentuan | FibonacciKu</title>
      </Head>
      <NavBar user={user} token={token} />

      <main>
        <SyaratKetentuan />
      </main>

      <Footer user={user} token={token} />
    </div>
  );
}
