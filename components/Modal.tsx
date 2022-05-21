import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState } from "../state/modalAtom";
import { IoMdClose } from "react-icons/io";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Movie } from "../typings";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchMovie() {
      if (!movie) return;
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());

      // if (data?.videos) {
      //   const index = data.videos.results.findIndex()
      // }
      setData(data);
    }

    fetchMovie();
  }, [movie]);

  console.log(data);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 !z-40 bg-[#181818] h-9 w-9 flex items-center justify-center rounded-full hover:bg-[#2a2a2a]"
        >
          <IoMdClose className="h-6 w-6 " />
        </button>

        <div></div>
      </>
    </MuiModal>
  );
}

export default Modal;
