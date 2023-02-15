import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faMastodon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "mailto:justin@dumbstuff.net" },
    { name: "Blog", href: "https://dumbstuff.net" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/justinhiltz/",
      icon: (props) => <i className="fa-brands fa-instagram fa-lg" />,
    },
    {
      name: "Mastodon",
      href: "https://mstdn.social/@justinhiltz",
      icon: (props) => <i className="fa-brands fa-mastodon fa-lg" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/justinhiltz",
      icon: (props) => <i className="fa-brands fa-github fa-lg" />,
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-rose-800">
      <div className="mx-auto max-w-7xl overflow-hidden py-16 px-6 sm:py-18 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-rose-100 hover:text-rose-300">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-rose-100 hover:text-rose-400">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-rose-400">
          Made with fun by Justin Hiltz
        </p>
      </div>
    </footer>
  );
};

export default Footer;
