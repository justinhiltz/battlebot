import React, { useState } from "react";

const Rhyme = (props) => {
  const [word, setWord] = useState("");
  const [rhyme, setRhyme] = useState("");

  const getRhyme = async () => {
    try {
      const response = await fetch(`/api/v1/rhymes/${word}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const rhymeData = await response.json();
      setRhyme(rhymeData.rhyme);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getRhyme();
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rhyme</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div className="mx-auto max-w-md">
              <form onSubmit={handleSubmit}>
                <label htmlFor="word" className="block text-sm font-medium text-rose-700">
                  Enter a word you'd like to rhyme:
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="word"
                    id="word"
                    onChange={(event) => {
                      setWord(event.target.value);
                    }}
                    className="block w-full rounded-md border-rose-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                    placeholder="pickle"
                    aria-describedby="word-description"
                  />
                  <div className="py-5">
                    <div className="flex justify-center">
                      <input
                        type="submit"
                        value="Get a rhyme"
                        className="inline-flex items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <p className="text-2xl font-bold tracking-tight text-rose-600 text-center">{word}</p>
              <p className="text-2xl font-bold tracking-tight text-rose-400 text-center">
                {rhyme.word && "rhymes with"}
              </p>
              <p className="text-2xl font-bold tracking-tight text-rose-600 text-center">
                {rhyme.word}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rhyme;
