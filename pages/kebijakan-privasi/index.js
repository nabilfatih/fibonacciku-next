import Head from "next/head";
import Footer from "../../components/footer/footer";
import KebijakanPrivasi from "../../components/kebijakan-privasi/kebijakan-privasi";
import NavBar from "../../components/nav/nav";
import checkCookie from "cookie";

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie
    ? checkCookie.parse(context.req.headers.cookie)
    : null;
  const user = cookies?.user ? JSON.parse(cookies.user) : null;
  const token = cookies?.token ? cookies.token : null;

  return {
    props: { user, token },
  };
}

export default function Kebijakan({ user, token }) {
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
