import React from "react";
import CreateForm from "./CreateForm";
import Navbar from "~/components/navbar";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SubmitPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get("userLoggedIn");
    if (!isLoggedIn) {
      // Hvis brukeren ikke er logget inn, omdiriger til innloggingssiden
      console.log("Bruker er ikke innlogget");
      //window.location.href = '/login';
      void router.push("/login");
    } else {
      console.log("Innlogget", Cookies.get("userLoggedIn"));
    }
  }, [router]);

  return (
    <>
      <nav className="w-full bg-sky-50 shadow-lg">
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
        <h2
          className="mb-10 ml-8 pl-8 pt-10 text-6xl font-semibold"
          style={{ color: "#A39AFF" }}
        >
          Opprett Ny Lek
        </h2>

        <CreateForm />
      </nav>
    </>
  );
};

export default SubmitPage;
