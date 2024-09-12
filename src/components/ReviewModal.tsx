import React, { useState } from "react";
import styles from "./SubmitPage.module.css";
import { api } from "~/utils/api";
import Cookies from "js-cookie";
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    title: string,
    reviewText: string,
    rating: number,
    gameId: number,
  ) => void; // Funksjon som submitter anmeldelsen
  gameId: number; // ID for spillet som anmeldelsen skal knyttes til
}
// Title, description, author, icebreaker
// Modal for registrering av anmeldelser
function ReviewModal({ isOpen, onClose, onSubmit, gameId }: ReviewModalProps) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const reviewTitle = "title";
  const postReview = api.reviews.postReview.useMutation();
  const [title, setTitle] = useState("");
  
  // Håndterer submit av anmeldelsen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, reviewText, rating, gameId);

    postReview.mutate({
      title: title,
      description: reviewText,
      gameID: gameId,
      author: Cookies.get("username") || "Default",
      score: rating
    })

    setReviewText(""); // Resetter reviewText
    setRating(0); // Resetter ratingen
    setTitle(""); // Resetter tittelen
  };

  // Hvis modalen ikke skal vises, returner null
  if (!isOpen) return null;

  return (
    //TO-DO
    //Legg til et felt for tittel på reviews (er bare en const over per nå)
    <div className="bg-smoke-light fixed inset-0 z-50 flex overflow-auto">
      <div className="relative m-auto flex w-full max-w-md flex-col rounded-lg border border-gray-500 bg-gradient-to-b from-sky-50 to-sky-300 p-8">
        <h2 className="mb-10 text-3xl font-bold">Gi en vurdering</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center">
            <label
              htmlFor="title"
              className="mr-4 flex-shrink-0 text-lg"
              style={{ width: "100px" }}
            >
              Tittel:
            </label>
            <input
              id="title"
              className="flex-grow rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <label
              htmlFor="rating"
              className="mr-4 flex-shrink-0 text-lg"
              style={{ width: "100px" }}
            >
              Vurdering:
            </label>
            <select
              id="rating"
              className="w-1/4 rounded-lg"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8 ,9, 10].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 flex items-start">
            <label
              htmlFor="reason"
              className="mr-4 flex-shrink-0 text-lg"
              style={{ width: "100px" }}
            >
              Begrunnelse:
            </label>
            <textarea
              id="reason"
              className="h-32 w-full rounded-lg"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text cursor-pointer text-blue-600 underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" rounded border border-gray-500 bg-gray-200 px-2 py-2 text-black hover:bg-gray-300"
            >
              Registrer vurdering
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
