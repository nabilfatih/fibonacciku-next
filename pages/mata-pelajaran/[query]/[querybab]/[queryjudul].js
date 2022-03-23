import Head from "next/head";
import Footer from "../../../../components/footer/footer";
import NavBar from "../../../../components/nav/nav";

import dataKonten from "../../../../data/dataKonten.json";

export async function getStaticPaths() {
  return {
    paths: dataKonten.map((konten) => {
      return {
        params: {
          query: konten.query,
          querybab: konten.querybab,
          queryjudul: konten.queryjudul,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const konten = dataKonten.find(
    (konten) => konten.queryjudul === params.queryjudul
  );

  return {
    props: {
      konten,
    }, // will be passed to the page component as props
  };
}

export default function QueryJudul({ konten }) {
  return (
    <div>
      <Head>
        <title>{konten.judul}</title>
      </Head>
      <NavBar />
      <div>{konten.judul}</div>
      <Footer />
    </div>
  );
}
