import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "~/components/navbar"; // Antar at denne importen er korrekt
import { api } from "~/utils/api";

const App = () => {
  const username = Cookies.get("username");

  const { data: playlists, isLoading } =
    api.playlists.getPlaylistsByUserId.useQuery({ id: username || "Default" });

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<
    number | null
  >(null);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 ">
      <Navbar
        navItems={[
          { id: 1, name: "Hjem", path: "/" },
          { id: 2, name: "Opprett ny Lek", path: "/submit" }, // Legger til ref.link til siden de skal føre til
          { id: 3, name: "Opprett ny spilleliste", path: "/createNewPlaylist" },
          { id: 4, name: "Mine spillelister", path: "/myPlaylists" },
        ]}
      />
      <h2
        className="ml- mb-10 pt-10 text-6xl font-semibold"
        style={{ color: "#A39AFF" }}
      >
        Dine Spillelister
      </h2>
      <div className="flex w-full flex-wrap justify-center px-5">
        {playlists?.map((playlist, index) => (
          <Link
            key={playlist.playlistID}
            href={"myPlaylists/" + playlist.playlistID}
          >
            <div
              key={index}
              className={`m-2.5 flex h-48 w-64 cursor-pointer items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-lg uppercase text-white hover:text-black ${selectedPlaylistIndex === index ? "text-black" : "text-white"} rounded-lg shadow-lg transition-all duration-300 ease-in-out`}
              onClick={() => setSelectedPlaylistIndex(index)}
            >
              {playlist.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
