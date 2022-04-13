import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";
import Bantuan from "../../components/tentang/bantuan";
import Founder from "../../components/tentang/founder";
import Story from "../../components/tentang/story";
import TentangFibo from "../../components/tentang/tentang";
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

export default function Tentang({ user, token }) {
  return (
    <div>
      <Head>
        <title>Tentang | FibonacciKu</title>

        <meta name="description" content="Kenalan Tentang FibonacciKu!" />
        <meta property="og:title" content="FibonacciKu" />
        <meta
          property="og:description"
          content="Kenalan Tentang FibonacciKu!"
        />
        <meta property="og:url" content="https://fibonacciku.com/tentang" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="fibonacciku, fibonacciku.id, fibonacciku indonesia, belajar online, platform pendidikan, bimbel gratis, 
    bimbel gratis indonesia, patform pendidikan indonesia, platform belajar, belajar, start up muda, start up anak bangsa, bimbel,
    platform pendidikan gratis indonesia, platform pendidikan terbaik indonesia, belajar gratis indonesia, bimbel sd, bimbel smp, 
    bimbel sma, bimbel kuliah, belajar pelajaran gratis, bimbel utbk, bimbel utbk gratis, mata pelajaran"
        />
        <meta name="robots" content="all" />
      </Head>
      <NavBar user={user} token={token} />

      <main>
        <TentangFibo />
        <Story />
        <Founder />
        <Bantuan />
      </main>

      <Footer user={user} token={token} />
    </div>
  );
}
