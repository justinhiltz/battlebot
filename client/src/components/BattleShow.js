import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VerseTile from "./VerseTile";

const BattleShow = (props) => {
  const [battle, setBattle] = useState({ verses: [] });

  const getBattle = async () => {
    try {
      const id = props.match.params.id;
      const response = await fetch(`/api/v1/battles/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const battleData = await response.json();
      setBattle(battleData.battle);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getBattle();
  }, []);

  const verseTileComponents = battle.verses.map((verse) => {
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Battle</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div className="mx-auto max-w-md">
              <div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                  Tonight's Main Event
                </h2>
                <Link to={`/users/${battle.userId}`}>
                  <h3 className="text-center text-xl tracking-tight text-gray-600">
                    Emcee'd by {battle.username}
                  </h3>
                </Link>
                <div>{verseTileComponents}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BattleShow;
