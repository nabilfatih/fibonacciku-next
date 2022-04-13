import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import SyaratKetentuan from "../../components/syarat-ketentuan/syarat-ketentuan";
import cookie from "cookie";

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)
    : null;
  const user = cookies?.user ? JSON.parse(cookies.user) : null;
  const token = cookies?.token ? cookies.token : null;

  return {
    props: { user, token },
  };
}

export default function Syarat({ user, token }) {
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
