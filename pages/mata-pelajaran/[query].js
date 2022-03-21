import { useRouter } from "next/router";

import Head from "next/head";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/nav/nav";

import dataBab from "../../data/dataBab.json";

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}

const Query = () => {
  const router = useRouter();
  // console.log(getBabData);

  return (
    <div>
      <Head>
        <title> | FibonacciKu</title>
      </Head>

      <NavBar />

      <Footer />
    </div>
  );
};

export default Query;
