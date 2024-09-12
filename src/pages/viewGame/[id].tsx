"use client";

import React, { useEffect, useState } from "react";
import InfoText from "~/components/InfoText";
import Review from "~/components/Review";
import Navbar from "~/components/navbar";
import ReviewModal from "~/components/ReviewModal";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import CountdownTimer from "~/components/Timer";
import { date } from "zod";

interface GameData {
  icebreakerID: number;
  title: string;
  description: string;
  duration: number;
  difficulty: number;
  publishdate: Date;
  userID: string;
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

const difficultyIndexMap: { [key: number]: string } = {
  1: "Lett",
  2: "Middels",
  3: "Vanskelig",
};

const ActionButton = ({ label }: { label: string }) => (
  <button className="group relative mb-2 me-2 inline-flex flex-grow justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800">
    <span className="relative flex-grow rounded-md bg-white px-5 py-2.5 text-black transition-all duration-75 ease-in group-hover:bg-opacity-0">
      {label}
    </span>
  </button>
);

const Reviews = (props: { gameId: number }) => {
  const { data, isLoading } = api.reviews.getReviewByGame.useQuery({ ibId: props.gameId })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col space-y-4 pb-4 ">
      {data?.map((review) => (
        <Review
          title={review.title}
          author={review.user}
          reviewtext={review.description}
        />
      ))}
    </div>
  );
}

const SingleGame = () => {
  const router = useRouter();
  const [ibID, setIbID] = useState<number>(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query) {
      setIbID(Number(router.query.id));
    }
  });

  const { data, isLoading, isError } = api.icebreakers.getGameById.useQuery({ id: ibID });
  const ibScore = api.reviews.getAvgScoreByGame.useQuery({ gameID: ibID }).data?._avg.score

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading game data.</div>;

  const {
    title: spillnavn,
    description: beskrivelse,
    duration: tidsestimat,
    category: kategori,
    difficulty: vanskelighetsgrad,
    publishdate: publiseringsdato,
    // rating: vurdering,
    userID: forfatter,
  } = data as GameData;

  const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('no-NB', options);
  };

  // For å åpne modalen
  const handleOpenReviewModal = () => {
    setShowReviewModal(true);
  };

  // For å lukke modalen
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleSubmitReview = (
    title: string,
    reviewText: string,
    rating: number,
    gameId: number,
  ) => {
    // Må lage en funksjon som sender inn review til databasen
    // Må huske å inkludere gameId (ibID) for å koble anmeldelsen til riktig spill

    // Forslag: Bruker cookie for å hente brukernavn til å sende til databasen
    const brukerNavn = Cookies.get("userName") ?? "Gjest";

    console.log(
      "Game id: ",
      gameId, // Should log 1
      "\nTitle: ",
      title, // Should log "Tittel"
      "\nReview: ",
      reviewText, // Should log "Begrunnelse"
      "\nRating: ",
      rating, // Should log 5
      "\nBruker: ",
      brukerNavn,
    );

    // Lukker modalen når anmeldelsen er sendt
    setShowReviewModal(false);
  };

  return (
    <div className="">
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
      <div className="mx-auto mt-4 flex w-2/5 flex-col items-center rounded-2xl bg-slate-100 p-14">
        <div>
          <h1 className="pb-8 text-6xl"> {spillnavn} </h1>
        </div>
        <div className="text-left w-full">
          <h6 className="">
            <b>Beskrivelse</b>
          </h6>
          <p className="pb-10 break-words">{beskrivelse}</p>
        </div>
        <div className="w-full">
          <div className="flex ">
            <InfoText
              title="Tidsestimat"
              value={tidsestimat.toString() + " minutter"}
            />
            <InfoText
              title="Kategori"
              value={categoryIndexMap[kategori] || ""}
            />
          </div>
          <div className="h-5"></div>
          <div className="flex pb-10">
            <InfoText
              title="Vanskelighetsgrad"
              value={difficultyIndexMap[vanskelighetsgrad] || ""}
            />
            <InfoText title="Vurdering" value={ibScore || "ikke vurdert"} />
          </div>
          <div className="flex pb-10">
            <InfoText
              title="Forfatter"
              value={forfatter}
            />
            <InfoText
              title="Publiseringsdato"
              value={formatDate(publiseringsdato) || ""}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-row justify-center space-x-8 pt-10">

          <button
            className="group relative mb-2 inline-flex flex-grow justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800"
            onClick={handleOpenReviewModal}
          >
            <span className="relative flex-grow rounded-md bg-white px-5 py-2.5 text-black transition-all duration-75 ease-in group-hover:bg-opacity-0">
              Gi vurdering
            </span>
          </button>

        </div>

        <CountdownTimer countdownTime={tidsestimat * 60} />

        {/* ReviewModal komponenten */}
        <ReviewModal
          isOpen={showReviewModal}
          onClose={handleCloseReviewModal}
          onSubmit={handleSubmitReview}
          gameId={ibID}
        />
      </div>

      <div className="mx-auto mt-4 flex w-2/5 flex-col rounded-2xl bg-slate-100 p-14">
        <div>
          {" "}
          <h2 className="pb-8 text-3xl">Anmeldelser</h2>
          <Reviews gameId={ibID}></Reviews>
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
