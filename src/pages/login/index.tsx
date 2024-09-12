"use client";

import { api } from "src/utils/api";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = () => {
  const postUser = api.users.createUser.useMutation();

  const [submittedUsername, setSubmittedUsername] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [newUserCreated, setNewUserCreated] = useState(false); // State to track if a new user is created
  const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State to track if password should be shown

  const [dbForm, setDbForm] = useState({ username: "", password: "" });
  const [triggerCheck, setTriggerCheck] = useState(false);

  //Return value for user exists arrives here
  const { data: userData, isSuccess } = api.users.findUser.useQuery(dbForm, {
    enabled: triggerCheck,
    onSettled: () => setTriggerCheck(false), // Reset trigger after query
  });

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("userLoggedIn", "true");
      Cookies.set("username", submittedUsername);
      // alert("Successfully logged in");
      //window.location.href = '/';
      void router.push("/");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (!isSuccess) {
      if (triggerCheck) {
        // Check if the login attempt was made and failed
        setLoginError("Feil brukernavn eller passord.");
      }
    }
  }, [isSuccess, triggerCheck]);

  const checkUser = () => {
    // Set credentials and trigger the query
    setDbForm({ username: submittedUsername, password: submittedPassword });
    setTriggerCheck(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Use local state value for submission
    const form = {
      username: submittedUsername,
      password: submittedPassword,
    };

    postUser.mutate({
      username: form.username,
      password: form.password,
    });

    // Also reset the local submittedNavn state if the form is being cleared
    setSubmittedUsername("");
    setSubmittedPassword("");
    setLoginError("");
    setNewUserCreated(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-cyan-400 to-blue-600">
      <div className="flex min-h-screen flex-row items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className="w-3/7 flex flex-col justify-center rounded-lg bg-white shadow-xl ">
            <div className="flex items-center justify-center p-8">
              <Image
                src="/images/icebreakerLogo.png" // Updated path to match your project structure
                alt="Icebreaker Logo"
                width={70}
                height={70}
                className="h-auto hover:animate-spin"
              />
            </div>
            <label
              htmlFor="navn"
              className="p-7 text-5xl font-semibold text-blue-500"
            >
              {" "}
              Logg inn / Opprett bruker{" "}
            </label>
            {loginError && (
              <div className="pl-6 text-left text-red-500">{loginError}</div>
            )}
            {newUserCreated && (
              <div className="pl-6 text-left text-green-500">
                <p>Bruker opprettet!</p>
              </div>
            )}
            <input
              type="text"
              placeholder="Brukernavn"
              required
              id="username"
              className="m-4 rounded-md bg-slate-200 p-4"
              onChange={(e) => {
                setSubmittedUsername(e.target.value);
                setLoginError(""); // Clear the login error message when input changes
                setNewUserCreated(false); // Clear the successful user crated message when input changes
              }}
              value={submittedUsername}
            />
            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                placeholder="Passord"
                required
                id="password"
                className="m-4 w-5/6 rounded-md bg-slate-200 p-4" // Added padding on the right to make space for the button
                onChange={(e) => {
                  setSubmittedPassword(e.target.value);
                  setLoginError(""); // Clear the login error message when input changes
                  setNewUserCreated(false); // Clear the successful user crated message when input changes
                }}
                value={submittedPassword}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 m-4 flex cursor-pointer items-center rounded-md bg-slate-200 p-4"
              >
                {showPassword ? (
                  <img
                    src="/svg/open-eye.svg"
                    alt="Open Eye"
                    className="h-6 w-6"
                  />
                ) : (
                  <img
                    src="/svg/closed-eye.svg"
                    alt="Closed Eye"
                    className="h-6 w-6"
                  />
                )}
              </div>
            </div>
            <div className="flex">
              <button
                onClick={checkUser}
                type="button"
                className="m-4 flex-1 rounded-md bg-sky-500 p-3 text-white hover:bg-blue-400"
              >
                Logg inn
              </button>
              <input
                type="submit"
                className="m-4 flex-1 cursor-pointer rounded-md border-2 border-sky-500 p-3 text-sky-500 hover:bg-slate-100 "
                value="Opprett bruker"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
