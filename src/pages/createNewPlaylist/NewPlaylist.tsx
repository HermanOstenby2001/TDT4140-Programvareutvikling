"use client";

import React, { useState } from "react";
import Navbar from "~/components/navbar";
import { api } from "~/utils/api";
import router from "next/router";
import Cookies from "js-cookie";

interface Icebreaker {
  icebreakerID: number;
  title: string;
  category: number;
}

const categoryIndexMap: { [key: number]: string } = {
  1: "musikkleker",
  2: "sports- og aktivitetsleker",
  3: "drikkeleker",
  4: "mimeleker",
  5: "quiz",
  6: "tegneleker",
  7: "2 personer",
};

interface ActionButtonProps {
  label: string;
  onClick: () => void; // Adding onClick prop
}

const ActionButton = ({ label, onClick }: ActionButtonProps) => (
  <button
    type="button"
    //className=" border-white-500 mx-auto rounded-lg border-2 border-sky-300 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800"
    className="rounded-lg border border-cyan-500 bg-transparent px-5 py-2.5 text-center text-lg font-medium text-cyan-500 hover:border-transparent hover:bg-cyan-500 hover:text-white"
    onClick={onClick}
  >
    {label}
  </button>
);

const NewPlaylist = () => {
  const postPlaylist = api.playlists.postPlaylist.useMutation();

  const [form, setForm] = useState({
    PlaylistTitle: "",
  });

  const { data: allIcebreakers, isLoading } = api.icebreakers.getAll.useQuery();
  const [selectedIcebreakers, setSelectedIcebreakers] = useState<Icebreaker[]>(
    [],
  );
  const [submittedPlaylistTitle, setSubmittedPlaylistTitle] = useState("");

  const addToSelected = (icebreaker: Icebreaker) => {
    setSelectedIcebreakers((current) => [...current, icebreaker]);
  };

  const removeFromSelected = (icebreaker: Icebreaker) => {
    setSelectedIcebreakers((current) =>
      current.filter((item) => item.icebreakerID !== icebreaker.icebreakerID),
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Use local state value for submission
    const updatedForm = {
      PlaylistTitle: submittedPlaylistTitle,
    };

    // Optionally reset form state here if needed
    setForm({
      PlaylistTitle: "",
    });
    // Also reset the local submittedNavn state if the form is being cleared
    setSubmittedPlaylistTitle("");
  };

  const handleCreatePlaylist = () => {
    if (selectedIcebreakers.length === 0) {
      alert("Kan ikke opprette tomme spillelister");
    } else if (submittedPlaylistTitle === "") {
      alert("Velg et navn til spillelisten");
    } else {
      console.log("Creating playlist...");
      postPlaylist.mutate(
        {
          title: submittedPlaylistTitle,
          user: Cookies.get("username") || "",
          icebreakerIDs: selectedIcebreakers.map(
            (icebreaker) => icebreaker.icebreakerID,
          ),
        },
        {
          onSuccess: () => {
            router.push("/");
          },
        },
      );
    }
  };

  if (isLoading) {
    return <div>Loading icebreakers...</div>;
  }

  return (
    <div className="">
      <div>
        <Navbar
          navItems={[
            { id: 1, name: "Hjem", path: "/" },
            { id: 2, name: "Opprett ny Lek", path: "/submit" }, // Legger til ref.link til siden de skal føre til
            { id: 3, name: "Opprett ny spilleliste", path: "/createNewPlaylist" },
            { id: 4, name: "Mine spillelister", path: "/myPlaylists" },
          ]}
        />
      </div>

      <div className="">
        <h1
          className="mx-auto my-8 w-7/12 pt-6 text-center text-6xl font-bold"
          style={{ color: "#A39AFF" }}
        >
          Opprett ny spilleliste
        </h1>
        <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100">
          <div className="mx-auto w-7/12 justify-start rounded-md">
            <div className="max-w-screen justify-start py-2">
              <form onSubmit={handleSubmit} className="pt-6">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  Navn på spilleliste:
                </h2>
                <input
                  type="text"
                  className="h-2/6 w-full flex-wrap rounded-md p-4"
                  onChange={(e) => setSubmittedPlaylistTitle(e.target.value)}
                  value={submittedPlaylistTitle}
                />
              </form>
            </div>
            <div className="mx-px rounded-md bg-slate-100">
              <div className="flex items-end justify-center rounded-md bg-slate-200 text-gray-500">
                <p className="text-decoration-line: flex w-1/3 justify-start p-3 pl-8 text-xs">
                  Tittel
                </p>
                <p className="text-decoration-line: flex w-1/3 justify-center p-3 text-xs">
                  Kategori
                </p>
                <p className="text-decoration-line: flex w-1/3 justify-end p-3 pr-4 text-xs">
                  Fjern / legg til
                </p>
                <div className="w-3"></div>
              </div>
              <div className="mx-8">
                <h2 className="pt-6 font-bold" style={{ color: "#A39AFF" }}>
                  Valgte icebreakers
                </h2>
                <ul className=" divide-y divide-gray-200  dark:divide-gray-700">
                  {selectedIcebreakers.length === 0 && (
                    <li className="flex items-center justify-center py-3 sm:py-4">
                      <p className="italic text-black ">
                        Du har ingen icebreakers i spillelisten din.
                      </p>
                    </li>
                  )}
                  {selectedIcebreakers.map((icebreaker) => (
                    <li
                      key={icebreaker.icebreakerID}
                      className="flex items-end justify-center py-3 sm:py-4"
                    >
                      <p className="w-1/3 font-medium">{icebreaker.title}</p>
                      <p className="w-1/3 text-center font-light">
                        {categoryIndexMap[icebreaker.category]}
                      </p>
                      <div className="flex w-1/3 justify-end">
                        <button
                          className=" rounded-full border border-red-500 bg-transparent px-4 py-2 font-semibold text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white "
                          onClick={() => removeFromSelected(icebreaker)}
                        >
                          Fjern
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <h2 className="pt-6 font-bold" style={{ color: "#A39AFF" }}>
                  Velg icebreaker
                </h2>
                <ul className=" divide-y divide-gray-200  dark:divide-gray-700">
                  {allIcebreakers
                    ?.filter(
                      (icebreaker) =>
                        !selectedIcebreakers.find(
                          (selected) =>
                            selected.icebreakerID === icebreaker.icebreakerID,
                        ),
                    )
                    .map((icebreaker) => (
                      <li
                        key={icebreaker.icebreakerID}
                        className="flex items-end justify-center py-3 sm:py-4 "
                      >
                        <p className="w-1/3 font-medium text-gray-500">
                          {icebreaker.title}
                        </p>
                        <p className="w-1/3 text-center font-light text-gray-500">
                          {categoryIndexMap[icebreaker.category]}
                        </p>
                        <div className="flex w-1/3 justify-end">
                          <button
                            className="rounded-full border border-purple-400 bg-transparent px-4 py-2 font-semibold text-purple-400 hover:border-transparent hover:bg-purple-400 hover:text-white "
                            onClick={() => addToSelected(icebreaker)}
                          >
                            Legg til
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="flex justify-center p-8 ">
                  <ActionButton
                    onClick={handleCreatePlaylist}
                    label="Opprett spilleliste"
                  ></ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlaylist;
