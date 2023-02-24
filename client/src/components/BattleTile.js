import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const BattleTile = (props) => {
  const [battle, setBattle] = useState({
    id: "",
    userId: "",
    verses: [],
  });

  const getBattle = async () => {
    try {
      const response = await fetch(`/api/v1/battles/${props.id}`);
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

  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-100 text-center shadow">
      <Link to={`/battles/${battle.id}`}>
        <div className="flex flex-1 flex-col p-8">
          <FontAwesomeIcon
            icon={faRobot}
            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full text-yellow-500"
            title="Robot Avatar"
          />
          {battle.verses.length > 0 && (
            <h3 className="text-2xl font-bold text-gray-900">{battle.verses[0].sentence1}</h3>
          )}
          <div className="mt-1 flex flex-grow flex-col justify-between">
            <p className="text-sm text-gray-500">Emcee'd by {battle.username}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default BattleTile;
