import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

const ErrorList = (props) => {
  const errantFields = Object.keys(props.errors);
  if (errantFields.length > 0) {
    let index = 0;
    const listItems = errantFields.map((field) => {
      index++;
      return (
        <li key={index}>
          {field} {props.errors[field]}
        </li>
      );
    });
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            {/* return the number of errors instead of hardcoding a number */}
            <h3 className="text-sm font-medium text-red-800">
              There {errantFields.length > 1 ? "were" : "was"} {errantFields.length} error
              {errantFields.length > 1 ? "s" : ""} with your submission
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                {listItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default ErrorList;
