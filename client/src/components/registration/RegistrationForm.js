import React, { useState } from "react";
import ErrorList from "../layout/ErrorList";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { username, email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match Password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Register</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <div className="mx-auto max-w-md">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Register an account
                  </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="username" className="sr-only">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-400 focus:outline-none focus:ring-yellow-400 sm:text-sm"
                        placeholder="Username"
                        value={userPayload.username}
                        onChange={onInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-400 focus:outline-none focus:ring-yellow-400 sm:text-sm"
                        placeholder="Email address"
                        value={userPayload.email}
                        onChange={onInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-400 focus:outline-none focus:ring-yellow-400 sm:text-sm"
                        placeholder="Password"
                        value={userPayload.password}
                        onChange={onInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="passwordConfirmation" className="sr-only">
                        Password confirmation
                      </label>
                      <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        autoComplete="new-password"
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-400 focus:outline-none focus:ring-yellow-400 sm:text-sm"
                        placeholder="Password confirmation"
                        value={userPayload.passwordConfirmation}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <ErrorList errors={errors} />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationForm;
