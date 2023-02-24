import React from "react";

const Home = (props) => {
  return (
    <div className="bg-white">
      <main>
        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <div className="relative shadow-xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1671490290326-28a64453dec9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                  alt="robots fighting"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-800 to-rose-700 mix-blend-multiply" />
              </div>
              <div className="relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Have you ever wanted to see</span>
                  <span className="block text-rose-200">robots have a rap battle?</span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-rose-200 sm:max-w-3xl">
                  Hip-Hop Battlebots lets you emcee a rap battle between two robots
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/battles/new"
                    className="flex items-center justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-400 sm:px-8"
                  >
                    Create a battle
                  </a>
                  <a href="/battles" className="text-sm font-semibold leading-6 text-yellow-500">
                    View some battles <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
