import React, { useEffect, useState } from "react";

const Battle1stSentenceForm = (props) => {
  const [newLine, setNewLine] = useState({
    id: "",
    line: "",
  });
  const [newWord, setNewWord] = useState({ word: "" });
  const [newPunctuation, setNewPunctuation] = useState("");
  const [newSentence, setNewSentence] = useState({});
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
    console.log("new sentence", newSentence);
  }, [newSentence]);

  const addWord = async (wordPayload) => {
    const fullSentencePayload = { word: wordPayload, line: newLine };

    try {
      const response = await fetch("/api/v1/words", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(fullSentencePayload),
      });
      // nick says: consider adding the line and persisting both at the same time
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

        // we dont need another post request anymore, we can just set the retrieved sentence in state
        // you could pass down state setters from the parent component

        const newWordId = body.word.id;
        const newLineId = newLine.id;
        const sentenceResponse = await fetch("/api/v1/sentences", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            wordId: newWordId,
            lineId: newLineId,
          }),
        });

        if (!sentenceResponse.ok) {
          const errorMessage = `${sentenceResponse.status} (${sentenceResponse.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }

        const sentenceBody = await sentenceResponse.json();
        setNewSentence(sentenceBody.sentence);
        console.log("new sentence", newSentence);

        setErrors({});
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleWordChange = (event) => {
    event.preventDefault();
    setNewWord({
      ...newWord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addWord(newWord);

    try {
      const response = await fetch(`/api/v1/sentences/${newSentence.id}`, {
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
        props.setSentences(body.sentences);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  /*   let verse
  if (Object.keys(newSentence).length > 0){
    verse = <Verse newSentence={newSentence}
  } */

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
                    {/* {verse} */}

                    <form onSubmit={handleSubmit}>
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
                            className="p-0 border-b border-0 focus:border-yellow-400 focus:outline-none focus:ring-yellow-400"
                          />{" "}
                          {newPunctuation}
                        </p>
                      </div>
                      <input className="button" type="submit" value="Submit" />
                    </form>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Battle1stSentenceForm;

// # PErsisting one Verse
// update the Battle1stStenceForm to only have one POST
// this should
// make a new word
// associate that word with the already existing line
// make a new Sentence out of the word and line

// in the same router endpoint, create a new sentence that rhymes
// make the Verse that joins the two sentences

// # Get the Verse(s) to display
// conditionally render verses if there are any present (which should happen after we submit the form once)
// "verses" state should be an array of verse objects

// # reshow the form once more for the next verse (and the cycle begins again
// when you make a new POST make sure you send the BattleId as well, so that we can add this new sentence/verse to an existing one )

// # render a "stop" battle button that brings you to the battle show page for all of the verses

// # usershow page to review all created battles

//  # fix the