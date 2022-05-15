import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiBell, FiSearch } from "react-icons/fi";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup Function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"} `}>
      <div className="flex items-center gap-2 md:gap-10">
        {/* <p className="text-2xl font-bold">Netflix</p> */}
        <div className="relative w-24 h-10">
          <Image
            className="cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            objectFit="contain"
            layout="fill"
            alt="Netflix logo"
          />
        </div>
        <ul className="hidden md:flex gap-3">
          <li className="header-link">Home</li>
          <li className="header-link">TV Shows</li>
          <li className="header-link">Movies</li>
          <li className="header-link">News & Popular</li>
          <li className="header-link">My List</li>
        </ul>
      </div>

      <div className="flex items-center gap-4 text-sm font-light">
        <FiSearch className="hidden sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <FiBell />
        <Link href="/account">
          <Image
            className="rounded"
            src="https://rb.gy/g1pwyx"
            alt="account"
            width={30}
            height={30}
            objectFit="contain"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
