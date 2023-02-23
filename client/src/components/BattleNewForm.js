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

  useEffect(() => {
    console.log("Verses:", verses);
  }, [verses]);

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
      const response = await fetch("/api/v1/verses", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ...newWord, lineId: newLine.id, currentUserId: currentUser.id }),
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
                  <div>
                    {verseTileComponents}
                    <div className="mx-auto mt-10 text-center flex justify-center">
                      <form onSubmit={addWord}>
                        <div>
                          <p>
                            {newLine.line}{" "}
                            <label htmlFor="word" className="sr-only">
                              Word
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
                            className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          >
                            <FontAwesomeIcon
                              icon={faMicrophone}
                              className="h-4 w-4 text-black"
                              title="Mic Drop"
                            />{" "}
                            Spit it
                          </button>
                          <button
                            type="button"
                            value="Mic Drop"
                            onClick={handleRedirect}
                            className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-base font-medium text-black shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            <FontAwesomeIcon
                              icon={faMicrophoneSlash}
                              className="h-4 w-4 text-black"
                              title="Mic Drop"
                            />{" "}
                            Mic Drop
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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
