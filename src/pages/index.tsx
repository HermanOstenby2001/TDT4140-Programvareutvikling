"use client";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/homePage.module.css";
import Navbar from "~/components/navbar";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Home = () => {
  const username = Cookies.get("username");

  const { data: playlists, isLoading } =
    api.playlists.getPlaylistsByUserId.useQuery({ id: username || "Default" });

  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(-1); // Oppdaterering av state for seleksjon av en playlist kat.
  const { data } = api.icebreakers.getAll.useQuery();

  const [searchIcebreakers, setSearchIcebreakers] = useState([] as any[]);

  const [selectedCategory, setSelectedCategory] = useState("0");

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) {
      setSearchIcebreakers(data);
    }
  }, [data]);

  useEffect(() => {
    searchForIcebreakers(search, selectedCategory);
  }, [selectedCategory, search]);

  const searchForIcebreakers = (search: string, fCategory: string) => {
    setSearch(search);
    setSelectedCategory(fCategory);
    let newData: any[] = [];
    newData = (data as any[])?.filter((post) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) &&
        !newData.includes(post) &&
        (post.category === parseInt(selectedCategory) ||
          selectedCategory == "0")
      );
    });
    setSearchIcebreakers(newData);
    console.log(newData);
  };

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setSearchIcebreakers(data);
    }

    const isLoggedIn = Cookies.get("userLoggedIn");
    if (!isLoggedIn) {
      // Hvis brukeren ikke er logget inn, omdiriger til innloggingssiden
      // window.location.href = '/login';   Kan bruke dettte også, men er tregere
      void router.push("/login");
      console.log("Bruker er ikke innlogget");
    } else {
      //console.log("Innlogget", Cookies.get('userLoggedIn'))

      console.log("Bruker: ", Cookies.get("username"));
    }
  }, [router, data]);

  return (
    <>
      <nav className="w-full bg-sky-50 shadow-xl">
        <Head>
          <title>Ice Breaker</title>
        </Head>

        <div>
          <Navbar // Henter fra navbar.tsx
            navItems={[
              { id: 1, name: "Hjem", path: "/" },
              { id: 2, name: "Opprett ny Lek", path: "/submit" }, // Legger til ref.link til siden de skal føre til
              { id: 3, name: "Opprett ny spilleliste", path: "/createNewPlaylist" },
              { id: 4, name: "Mine spillelister", path: "/myPlaylists" },
            ]}
          />
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-10 text-center text-7xl font-bold">Ice Breaker</h1>

          {/* Bruker sine kategorier */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">Dine spillelister</h2>

            <div className="flex">
              <div className="flex-none">
                <Link href="/createNewPlaylist">
                  <div
                    className={`flex h-48 w-72 items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 text-3xl text-white hover:text-black`}
                  >
                    + Ny spilleliste
                  </div>
                </Link>
              </div>

              <div className="flex gap-5 overflow-x-scroll pl-5">
                {playlists?.map((playlist) => (
                  <Link
                    key={playlist.playlistID}
                    href={"myPlaylists/" + playlist.playlistID}
                  >
                    <div
                      className={`flex h-48 w-64 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-3xl ${selectedPlaylistIndex === playlist.playlistID ? "text-black" : "text-white"} hover:text-black`}
                      onClick={() => {
                        setSelectedPlaylistIndex(playlist.playlistID);
                      }}
                    >
                      {playlist.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-5">
          <div className="my-10 max-w-full flex-1">
            <input
              onChange={(e) => {
                searchForIcebreakers(e.target.value, selectedCategory);
              }}
              type="text"
              placeholder="Søk..."
              className={styles.search_bar}
              id="searchbar"
              name="searchbar"
            />
          </div>
          <div className="my-10 max-w-full">
            <select
              id="kategori"
              className={styles.search_bar}
              onChange={(e) => {
                searchForIcebreakers(search, e.target.value);
              }}
            >
              {/* <option value="alle-leker">Alle leker</option> */}
              <option value="0">Alle leker</option>
              <option value="1">Musikkleker</option>
              <option value="2">Sports- og aktivitetsleker</option>
              <option value="3">Drikkeleker</option>
              <option value="4">Mimeleker</option>
              <option value="5">Quiz</option>
              <option value="6">Tegneleker</option>
              <option value="7">2 personer</option>
              <option value="8">Annet</option>
            </select>
          </div>
        </div>
        <h2 className="mb-6 text-3xl font-semibold">Icebreakers</h2>
        <div className="grid grid-cols-4 gap-5">
          {searchIcebreakers?.map((post) => (
            <Link
              key={post.icebreakerID}
              href={"viewGame/" + post.icebreakerID}
            >
              <div
                className={`flex h-48 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-3xl hover:text-black`}
              >
                <p className="text-white">{post.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
