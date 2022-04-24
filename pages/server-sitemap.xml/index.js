import { getServerSideSitemap } from "next-sitemap";
import dataPelajaran from "../../data/dataPelajaran.json";

export async function getServerSideProps(context) {
  const fields = dataPelajaran.map((pelajaran) => ({
    loc: `https://www.fibonacciku.com/${pelajaran.query}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(context, fields);
}

export default function Site() {}
