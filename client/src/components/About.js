import React from "react";
import headshot from "../assets/img/justin_hiltz.jpg";

const About = (props) => {
  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-y-16 gap-x-8 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-96 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <img
                className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                src={headshot}
                alt=""
              />
              <div className="absolute inset-0 bg-gray-400 mix-blend-multiply" />
              <svg
                viewBox="0 0 1097 845"
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -ml-16 w-[68.5625rem] -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
              >
                <path
                  fill="url(#e7ccf164-908d-46dd-9194-2f8a16ad5a93)"
                  fillOpacity=".4"
                  d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
                />
                <defs>
                  <linearGradient
                    id="e7ccf164-908d-46dd-9194-2f8a16ad5a93"
                    x1="1097.04"
                    x2="-141.165"
                    y1=".22"
                    y2="363.075"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#881337" />
                    <stop offset={1} stopColor="#e11d48" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-rose-600">About the creator</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Justin Hiltz
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  I have had a deep fondness for computers for as long as I can remember. From my
                  very first pc (an IBM PS/2) at the age of 6, to now. I've spent the better part of
                  most days learning new software and operating systems. I would simply be lost
                  without some kind of computer in my life.
                </p>
                <p className="mt-8">
                  Upon the age of the early internet I began building websites. AngelFire to
                  Geocities, AOL Pages to Dreamweaver, to eventually creating my own websites from
                  scratch, I've seen it all when it comes to web development. Recently I've found
                  myself with 10+ years of e-commerce experience, having worked in e-commerce
                  management, project management, and production management. I'm a certified Shopify
                  expert and would love to continue working on that platform.
                </p>
                <p className="mt-8">
                  When I'm not using a computer I can be found playing games (tabletop and video),
                  discovering new music, watching movies, and hanging out with my dog, Izzie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
