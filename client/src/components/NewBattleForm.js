import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "./../services/translateServerErrors";

const NewBattleForm = ({ currentUser }) => {
  const [newBattle, SetNewBattle] = useState({
    title: "",
  });

  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState({
    status: false,
    id: null,
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    SetNewBattle({
      ...newBattle,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const addBattle = async (event) => {
    event.preventDefault();

    let submitErrors = {};
    if (newBattle.title.trim() === "") {
      submitErrors = {
        ...submitErrors,
        title: "Title can't be blank",
      };
    }

    const newBattleBody = new FormData();
    newBattleBody.append("title", newBattle.title);
    newBattleBody.append("userId", currentUser.id);
    console.log("newBattleBody: ", newBattleBody);

    try {
      const response = await fetch("/api/v1/battles", {
        method: "POST",
        body: newBattleBody,
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
        setShouldRedirect({ status: true, id: body.battle.id });
        setErrors({});
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  if (shouldRedirect.status) {
    return <Redirect to={`/battles/${shouldRedirect.id}`} />;
  }

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
                <ErrorList errors={errors} />
                <form onSubmit={addBattle}>
                  <label>Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleInputChange}
                    value={newBattle.title}
                  />
                  <div className="button-group">
                    <input className="button" type="submit" value="Add Battle" />
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewBattleForm;
