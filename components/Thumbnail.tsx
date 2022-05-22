import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../state/modalAtom";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}

function Thumbnail(props: Props) {
  const { movie } = props;
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative overflow-hidden h-28 min-w-[180px] md:h-36 md:min-w-[260px]"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        className=" md:hover:scale-105 cursor-pointer transition duration-200 ease-out"
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt={movie?.title || movie?.name || movie?.original_name}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Thumbnail;
