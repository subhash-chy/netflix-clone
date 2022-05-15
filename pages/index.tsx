import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="A netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />

      <main className="h-[200vh]"></main>
    </>
  );
};

export default Home;
