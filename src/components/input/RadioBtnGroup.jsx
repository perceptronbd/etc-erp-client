// RadioBtnGroup.jsx
//A reusable component for rendering a group of radio buttons with customizable options.

// Props:
// options - An array of options to be rendered as radio buttons.
// selectedOption - The currently selected option.
// setSelectedOption - A function to handle selection of an option.

import React from "react";

const RadioBtnGroup = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center text-sm font-medium capitalize"
        >
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={(e) => setSelectedOption(e.target.value)}
            name="branchSelection"
            className="sr-only" // Hide the default radio button
          />
          <div className={`mr-2 h-4 w-4 rounded-full border border-black p-[2px]`}>
            <div
              className={`h-full w-full rounded-full ${
                selectedOption === option ? "bg-black" : "bg-white"
              }`}
            ></div>
          </div>
          <span className={`${selectedOption === option ? "font-semibold" : " "}`}>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioBtnGroup;
