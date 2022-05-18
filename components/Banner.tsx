import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants";
import { Movie } from "../typings";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

interface Props {
  netflixOriginals: Movie[];
}

function Banner(props: Props) {
  const { netflixOriginals } = props;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col gap-y-2 py-16 md:gap-y-4 h-[70vh] justify-center md:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[60vh] md:h-[95vh] w-full -z-10">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title || movie?.name || movie?.original_name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full h-full bg-gradient-to-br from-[#141414] via-[#141414]/5 to-transparent" />
        <div className="absolute w-full h-full bg-gradient-to-t from-[#141414] via-[#141414]/5 to-transparent" />
      </div>

      <h1 className="font-bold text-2xl md:text-4xl lg:text-6xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl text-shadow-md ">
        {movie?.overview}
      </p>

      <div className="flex gap-3">
        <button className="bannerButton bg-white text-black ">
          <FaPlay className="w-2 h-2 md:h-4 md:w-4" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info <FaInfoCircle className="w-4 h-4 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
