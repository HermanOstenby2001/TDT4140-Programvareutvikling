import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import styles from "../../styles/homePage.module.css";
import Navbar from "~/components/navbar";
import { api } from "~/utils/api";


// Antar at de standard kategoriene vil holdes const
const defaultCategories = [
  { id: 1, name: "Alle bli-kjent leker", path: "" },
  { id: 2, name: "Populære leker", path: "" },
  { id: 3, name: "2-4 personer", path: "/submit" },
  { id: 4, name: "+5 personer", path: "" },
];

// Må kunne bli dynamisk med bruker, men dette er en midlertidig visualisering
const playlistCategories = [
  { id: 1, name: "Gjemsel", path: "", rating: 5, comment: "Veldig gøy!" },
  { id: 2, name: "Alias", path: "", rating: 1, comment: "Spillet er gøy med mindre partneren din er en tåpelig idiot. Makan til fjols har jeg aldri vert borti før. Hvis du ikke vet hvordan å mime ambivalens kan du dra til helvette, det er jo det enkleste på jord for faen. Nei nei, spill det her med smarte folk du så slipper du en like bedriten helg som jeg hadde" },
  { id: 3, name: "Interessebingo", path: "", rating: 3, comment: "Hva i huleste er interessebingo??" },
  { id: 4, name: "TEST HVA", path: "", rating: 1, comment: "Denne leken må slettes, her er det noen som har misbrukt innsendingssystemet! For Pokker heller jeg vil ikke se sånne søppelleker på nettsiden!!!" },
];

//stjerner SVG magi hva???
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
</svg>

const renderStars = (rating: number) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    );
  }
  return stars;
};



const Home = () => {
  const [selectedDefaultIndex, setSelectedDefaultIndex] = useState(-1); // Oppdaterering av state for seleksjon av en kategori
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(-1); // Oppdaterering av state for seleksjon av en playlist kat.

  return (
    <>
      <nav className="w-full bg-sky-50 shadow-lg">
        <Head>
          <title>Mine Vurderinger</title>
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
          <h1 className="mb-10 text-center text-7xl font-bold"></h1>

          {/* Hoved kategorier
          <section className="mb-8">
            <div className="grid grid-cols-4 gap-4">
              {defaultCategories.map((category) => (
                <div
                  key={category.id}
                  className={`flex h-48 items-center justify-center rounded-lg bg-gray-300 text-3xl ${selectedDefaultIndex === category.id ? "text-blue-600" : "text-black"} hover:text-blue-600`}
                  onClick={() => {
                    setSelectedDefaultIndex(category.id);
                    console.log(category);
                  }}
                >
                  <Link href={category.path} className="hover:text-blue-600">
                    {category.name}
                  </Link>

                </div>
              ))}
            </div>
          </section> */}

          {/* Bruker sine kategorier */}
          <section>
            <h2 className="mb-6 ml-10 text-6xl font-semibold" style={{ color: "#A39AFF" }}>Dine vurderinger</h2>
            <div className="flex flex-col">
              {playlistCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`flex h-auto items-center justify-left p-6 padding-10px text-3xl w-1/2 ml-10 text-black hover:text-black ${index === 0 ? "rounded-t-lg" : index === playlistCategories.length - 1 ? "rounded-b-lg" : ""
                    } bg-gradient-to-r from-cyan-100 to-blue-100`}

                  onClick={() => {
                    setSelectedPlaylistIndex(category.id);
                    console.log(category);
                  }}
                >
                  <div className="flex flex-col">
                    <Link href={category.path} className="hover:text-black font-bold">
                      {category.name}
                    </Link>
                    <div className="flex items-center mt-2">
                      <span className="mr-2">Rating: {category.rating}/5</span>
                      {renderStars(category.rating)}
                    </div>
                    <span className="text-base mt-4">
                      Comment: {category.comment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>




          <div className="flex gap-5">
            {/* Søkebaren (kun visuell) */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Home;  
