import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { Banner, Header, Category, Modal } from "../components";
import useAuth from "../hooks/useAuth";
import { modalState } from "../state/modalAtom";
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
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);

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

  // Custom loading here
  if (loading)
    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        Logging out...
      </div>
    );
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
      {showModal && (
        <div className="">
          <Modal />
        </div>
      )}
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
