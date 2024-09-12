import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface NavBarProps {
  navItems: { id: number; name: string; path: string }[]; //['Hjem', 'Opprett ny Lek', 'Mine spillelister', 'Favoritter']; // Liste over de ulike delene vi ønkser å vise i nav-bar
}

function Navbar({ navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1); // Holder styr på hvilken item som er valgt ved å oppdatere state'en ved funksjonen (setSelectedIndeks). Default state er -1
  const [userName, setUserName] = useState("");

  // Funksjon for å håndtere logg-ut
  const handleLogout = () => {
    Cookies.remove("userLoggedIn"); // Fjern eller oppdater innloggingscookie
    Cookies.remove("username");
    window.location.href = "/login"; // Omdiriger til login-siden
  };

  useEffect(() => {
    const brukerNavn = Cookies.get("username") ?? "Gjest";
    setUserName(brukerNavn);
  }, []);

  return (
    <nav className="w-full bg-sky-200 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-2 py-4">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/images/icebreakerLogo.png" // Updated path to match your project structure
              alt="Icebreaker Logo"
              width={40}
              height={40}
              className="mr-3 h-10"
            />
          </div>
        </Link>

        <ul className="space-x 12 flex flex">
          {/* Liste over de ulike nav-itemsene */}
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${selectedIndex === item.id ? "text-blue-600" : "text-black-600 font"} mx-10`}
              onClick={() => {
                setSelectedIndex(item.id); // Oppdaterer state'en til valgte item
                console.log(item);
              }}
            >
              <Link href={item.path} className="hover:text-blue-600">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          {/* Brukerinformasjon og logg-ut-lenke */}
          <div className="mr-4 flex flex-col">
            <span className="text-black-600">{userName}</span>
            <a
              href="#"
              onClick={handleLogout}
              className="cursor-pointer text-sm text-blue-600 underline"
            >
              Logg ut
            </a>
          </div>

          {/* Brukerikon */}
          <div className="relative ml-2 h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-300">
            <svg
              className="h-full w-full text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
