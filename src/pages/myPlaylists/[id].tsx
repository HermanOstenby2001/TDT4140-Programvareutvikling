import { PrismaClient } from '@prisma/client';
import React from 'react';
import Navbar from '~/components/navbar';
import { ISpinWheelProps } from "spin-wheel-game";
import dynamic from "next/dynamic";

interface Icebreaker {
  icebreakerID: number;
  title: string;
  description: string;
  duration: number;
  difficulty: number;
  category: number;
  publishdate: Date;
  userID: string;
}

interface PlaylistData {
  playlistID: number;
  title: string;
  user: string;
  icebreakers: Icebreaker[];
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

const SinglePlaylist = ({ playlistData }: { playlistData: PlaylistData }) => {
  if (!playlistData) return <div>Loading...</div>;

  const { title: spillnavn, icebreakers } = playlistData;

  // Function to generate a random RGB color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256); // Random between 0-255
    const g = Math.floor(Math.random() * 256); // Random between 0-255
    const b = Math.floor(Math.random() * 256); // Random between 0-255
    return `rgb(${r},${g},${b})`; // Return RGB color string
  };

  const SpinWheel = dynamic(
    () => import("spin-wheel-game").then((mod) => mod.SpinWheel),
    { ssr: false }, // This line disables server-side rendering
  );

  const segments = icebreakers.map((icebreaker, index) => ({
    segmentText: icebreaker.title,
    segColor: getRandomColor(),
  }));

  const MySpinWheel: React.FC = () => {
    const handleSpinFinish = (result: string) => {
      console.log(`Spun to: ${result}`);
      // Handle the result as needed
    };

    const spinWheelProps: ISpinWheelProps = {
      segments,
      onFinished: handleSpinFinish,
      primaryColor: "white",
      contrastColor: "black",
      buttonText: "Spin",
      isOnlyOnce: false,
      size: 200,
      upDuration: 100,
      downDuration: 600,
      fontFamily: "Arial",
      arrowLocation: "top",
      showTextOnSpin: true,
      isSpinSound: true,
    };

    return <SpinWheel {...spinWheelProps} />;
  };

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
        <h1 className="mx-auto my-8 w-2/3 pt-6 text-5xl font-bold text-purple-500">
          {spillnavn}
        </h1>
        <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100">
          <div className="mx-auto w-3/4 justify-start rounded-md">
            <div className="max-w-screen flex justify-center space-x-20 py-2">
              <div className="mx-auto w-1/2 rounded-md bg-white">
                <div className="mx-4 flex justify-between pt-1">
                  <p className="p-3 text-xs">Tittel</p>
                  <p className="p-3 text-xs">Kategori</p>
                </div>

                <hr className="border-t border-gray-300"></hr>

                <ul className="p-4">
                  {icebreakers.map((icebreaker) => (
                    <li key={icebreaker.icebreakerID} className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-200">
                      <p>{icebreaker.title}</p>
                      <p>{categoryIndexMap[icebreaker.category]}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-min-full ">
                <h1 className="mb-4 pt-8 text-center text-3xl font-semibold leading-none tracking-tight text-gray-900 ">
                  Spin the <span className="text-blue-600">wheel</span>
                </h1>
                <div className="h-min-full">
                  <MySpinWheel />
                  <></>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient();
  const { id } = context.query;

  let playlistData = await prisma.playlist.findUnique({
    where: {
      playlistID: Number(id),
    },
    include: {
      icebreakers: true,
    },
  });

  if (playlistData?.icebreakers) {
    playlistData = JSON.parse(JSON.stringify(playlistData, (key, value) =>
      value instanceof Date ? value.toISOString() : value
    ));
  }

  return {
    props: {
      playlistData, // Pass the data as props to the page component
    },
  };
}

export default SinglePlaylist;
