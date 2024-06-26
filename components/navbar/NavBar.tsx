import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white flex justify-around py-4 shadow-md border-t border-gray-300">
      <Link href="/map" passHref>
        <div
          className={`nav-item ${
            router.pathname === "/" ? "font-bold" : ""
          } text-purple-700 text-center cursor-pointer flex flex-col items-center hover:bg-gray-200 p-4 rounded`}
        >
          <i className="bi bi-map-fill text-2xl mb-1"></i>
          <span>Maps</span>
        </div>
      </Link>
      <Link href="/schedule" passHref>
        <div
          className={`nav-item ${
            router.pathname === "/schedule" ? "font-bold" : ""
          } text-purple-700 text-center cursor-pointer flex flex-col items-center hover:bg-gray-200 p-4 rounded`}
        >
          <i className="bi bi-calendar-fill text-2xl mb-1"></i>
          <span>Schedule</span>
        </div>
      </Link>
      <Link href="/raffle" passHref>
        <div
          className={`nav-item ${
            router.pathname === "/raffle" ? "font-bold" : ""
          } text-purple-700 text-center cursor-pointer flex flex-col items-center hover:bg-gray-200 p-4 rounded`}
        >
          <i className="bi bi-ticket-fill text-2xl mb-1"></i>
          <span>Raffle</span>
        </div>
      </Link>
      <Link href="/account" passHref>
        <div
          className={`nav-item ${
            router.pathname === "/account" ? "font-bold" : ""
          } text-purple-700 text-center cursor-pointer flex flex-col items-center hover:bg-gray-200 p-4 rounded`}
        >
          <i className="bi bi-person-fill text-2xl mb-1"></i>
          <span>Account</span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
