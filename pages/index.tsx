import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Banner, Header, Category } from "../components";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = (props: Props) => {
  const {
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow,
  } = props;
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="A netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Banner */}
        <Banner netflixOriginals={trendingNow} />
        <section className="space-y-12 md:space-y-24">
          <Category title="Netflix Originals" movies={netflixOriginals} />
          <Category title="Trending Now" movies={trendingNow} />
          <Category title="Top Rated" movies={topRated} />
          <Category title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Category title="My List" movies={list} />} */}

          <Category title="Comedies" movies={comedyMovies} />
          <Category title="Scary Movies" movies={horrorMovies} />
          <Category title="Romance Movies" movies={romanceMovies} />
          <Category title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
