import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BattleTile from "./BattleTile";

const BattleList = (props) => {
  const [battles, setBattles] = useState([]);

  const getBattles = async () => {
    try {
      const response = await fetch("/api/v1/battles");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const battleData = await response.json();
      setBattles(battleData.battles);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getBattles();
  }, []);

  console.log(battles);

  const battleListItems = battles.map((battle) => {
    return <BattleTile key={battle.id} id={battle.id} userId={battle.userId} />;
  });

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Battles</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div className="mx-auto">
              <div>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {battleListItems}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BattleList;
