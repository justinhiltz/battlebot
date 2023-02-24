import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import VerseTile from "./VerseTile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
// import ErrorList from "./layout/ErrorList";

const BattleNewForm = ({ currentUser }) => {
  const [newLine, setNewLine] = useState({
    id: "",
    line: "",
  });
  const [newWord, setNewWord] = useState({ word: "" });
  const [newPunctuation, setNewPunctuation] = useState("");
  const [verses, setVerses] = useState([]);
  const [errors, setErrors] = useState({});
  const [battleId, setBattleId] = useState(null);

  const getLine = async () => {
    try {
      const response = await fetch("/api/v1/lines", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        }
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      } else {
        const body = await response.json();
        const punctuation = body.line.line.slice(-1);
        setNewPunctuation(punctuation);
        const replacedString = body.line.line.replace(/<\|REPLACE\|>/g, "").slice(0, -1);
        setNewLine({ id: body.line.id, line: replacedString });
        setErrors({});
      }
    } catch (error) {}
  };

  useEffect(() => {
    getLine();
  }, []);

  /*   useEffect(() => {
    console.log("Verses:", verses);
  }, [verses]); */

  const handleWordChange = (event) => {
    event.preventDefault();
    setNewWord({
      ...newWord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const addWord = async (event) => {
    event.preventDefault();

    let submitErrors = {};
    if (newWord.word.trim() === "") {
      submitErrors = {
        ...submitErrors,
        word: "Word cannot be blank",
      };
    }
    if (Object.keys(submitErrors).length !== 0) {
      return setErrors(submitErrors);
    }

    try {
      let response;
      if (battleId) {
        response = await fetch(`/api/v1/verses?battleId=${battleId}`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ ...newWord, lineId: newLine.id, currentUserId: currentUser.id }),
        });
      } else {
        response = await fetch("/api/v1/verses", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ ...newWord, lineId: newLine.id, currentUserId: currentUser.id }),
        });
      }

      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        }
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      } else {
        const body = await response.json();
        console.log("IN THE BODY", body);
        setBattleId(body.battleId);
        setNewWord({ word: "" });
        setErrors({});
        setVerses([...verses, body.verse]);
        const punctuation = body.line.line.slice(-1);
        setNewPunctuation(punctuation);
        const replacedString = body.line.line.replace(/<\|REPLACE\|>/g, "").slice(0, -1);
        setNewLine({ id: body.line.id, line: replacedString });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/battles/${verses[0].battleId}`);
  };

  const unauthenticatedView = (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-4xl font-bold tracking-tight text-gray-900">
          You must be logged in to create a battle
        </h3>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Please Sign In or Register to continue using Hip-Hop Battlebots
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <a
            href="/user-sessions/new"
            className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            Sign In
          </a>
          <a
            href="/users/new"
            className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );

  const authenticatedView = (
    <div className="mx-auto mt-10 text-center flex justify-center">
      <form onSubmit={addWord}>
        <div>
          <p className="text-md font-medium">
            {newLine.line}{" "}
            <label htmlFor="word" className="sr-only">
              enter a single word
            </label>
            <input
              type="text"
              id="word"
              name="word"
              onChange={handleWordChange}
              value={newWord.word}
              placeholder="enter a single word"
              className="p-0 border-b border-0 focus:border-yellow-400 focus:outline-none focus:ring-yellow-400"
            />{" "}
            {newPunctuation}
          </p>
        </div>
        <div className="mt-4 justify-center flex gap-x-4">
          <button
            type="submit"
            value="Spit it"
            className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon icon={faMicrophone} className="h-4 w-4 text-black" title="Mic Drop" />{" "}
            Spit it
          </button>
          <button
            type="button"
            value="Mic Drop"
            onClick={handleRedirect}
            className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-base font-medium text-black shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon
              icon={faMicrophoneSlash}
              className="h-5 w-5 mr-1 text-black"
              title="Mic Drop"
            />{" "}
            Mic Drop
          </button>
        </div>
      </form>
    </div>
  );

  const verseTileComponents = verses.map((verse) => {
    return (
      <VerseTile
        key={verse.id}
        id={verse.id}
        sentence1={verse.sentence1}
        sentence2={verse.sentence2}
      />
    );
  });

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Battle</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div className="mx-auto max-w-lg">
              <div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                  Create a new battle
                </h2>
                <div className="mx-auto max-w-lg">
                  {verseTileComponents}
                  {currentUser ? authenticatedView : unauthenticatedView}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BattleNewForm;
