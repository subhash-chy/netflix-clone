import { useRecoilState } from "recoil";
import { modalState, movieState } from "../state/modalAtom";
import { IoMdClose } from "react-icons/io";
import MuiModal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { Element, Genre } from "../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import {
  HiOutlineVolumeOff,
  HiOutlineVolumeUp,
  HiPlus,
  HiThumbUp,
} from "react-icons/hi";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      if (!movie) return;
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        // Key is responsible to generate youtube trailer link
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  // console.log(trailer);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 w-full mx-auto rounded-md max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 !z-40 bg-[#181818] h-9 w-9 flex items-center justify-center rounded-full hover:bg-[#2a2a2a]"
        >
          <IoMdClose className="h-6 w-6 " />
        </button>

        <div className="relative pt-[56.25%] bg-[#181818]">
          {/* React player */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            muted={muted}
            playing={false}
            style={{ position: "absolute", top: "0", left: "0" }}
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex gap-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-4 w-4 text-black" /> Play
              </button>

              <button className="rounded-full border-2 border-[gray] w-12 h-12 flex items-center justify-center bg-gray-600/50 hover:bg-white/30 transition">
                <HiPlus className="" />
              </button>

              <button className="rounded-full border-2 border-[gray] w-12 h-12 flex items-center justify-center bg-gray-600/50 hover:bg-white/30 transition">
                <HiThumbUp className="" />
              </button>
            </div>

            <div>
              {/* Mute or not? */}
              <button
                className="rounded-full border-2 border-[gray] w-12 h-12 flex items-center justify-center bg-gray-600/50 hover:bg-white/30 transition"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex gap-16 rounded-b-16 bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-2 text-sm">
              <p className="text-green-400 font-semibold">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex items-center justify-center rounded border border-white/30 h-4 px-1.5 text-xs">
                4k
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
