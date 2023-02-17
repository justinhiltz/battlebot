import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const VerseTile = (props) => {
  let verseTile;
  if (props.id % 2 === 0) {
    verseTile = (
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="text-md font-medium text-right text-sky-500">{props.sentence1}</p>
                <p className="text-md font-medium text-right text-sky-500">{props.sentence2}</p>
              </div>
              <div className="flex-shrink-0">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="h-10 w-10 lg:hidden text-sky-500"
                  title="Robot 2"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  } else {
    verseTile = (
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="h-10 w-10 lg:hidden text-red-500"
                  title="Robot 2"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-md font-medium text-red-600">{props.sentence1}</p>
                <p className="text-md font-medium text-red-600">{props.sentence2}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return <div>{verseTile}</div>;
};

export default VerseTile;
