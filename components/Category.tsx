import { Movie } from "../typings";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

interface Props {
  title: string;
  movies: Movie[];
}

function Category(props: Props) {
  const { title, movies } = props;

  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 1.4
          : scrollLeft + clientWidth / 1.7;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="font-semibold text-sm md:text-2xl">{title}</h2>

      <div className="group relative">
        <FiChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center gap-2 overflow-x-scroll md:gap-3 scrollbar-hide "
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <FiChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
      {/* <div className="flex items-center overflow-x-scroll flex-nowrap flex-grow-0">
        {movies.map((movie) => (
          // <h1>{movie?.title}</h1>
          <div className="relative w-40 h-40">
            <Image
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Category;
