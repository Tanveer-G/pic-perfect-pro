"use client";
import { useState, useRef, FunctionComponent } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  optionType: (arg: string) => void;
  options: Option[];
  initialOption: Option;
}

const Dropdown: FunctionComponent<Props> = ({
  label = "options",
  options,
  optionType,
  initialOption,
}) => {
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(initialOption);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(menuRef, () => setIsMenuShow(false));

  const handleClick = (): void => {
    setIsMenuShow(!isMenuShow);
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const name = e.target.name;
    setSelectedOption({ label: name, value: val });
    optionType(val);
  };

  return (
    <div ref={menuRef}>
      <div className="flex flex-col w-full">
        <label
          htmlFor="input-filed"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
        >
          {label}
        </label>

        <div className="relative mb-2.5 flex justify-between max-h-10">
          <button
            onClick={handleClick}
            id="dropdownRadioBgHoverButton"
            data-dropdown-toggle="dropdownRadioBgHover"
            className="flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full px-2.5 py-2.5  dark:bg-[#4fa83d]/30 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="button"
          >
            {selectedOption.label}
            <svg
              className={`w-2.5 h-2.5 ms-3 ${isMenuShow ? "rotate-180" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      <div
        id="dropdownRadioBgHover"
        className={`${isMenuShow ? "block scale-100 translate-y-0" : "scale-0 -translate-y-8"} backdrop-blur-md transition-all duration-300 relative z-50 w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul
          className="absolute w-full z-50 p-1.5 space-y-1 text-sm backdrop-blur-lg text-gray-700 dark:text-gray-200 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-[#4fa83d]/20 dark:divide-gray-600"
          aria-labelledby="dropdownRadioBgHoverButton"
        >
          {options.map((option: Option) => (
            <li
              key={option.value}
              className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-[#4fa83d]/30"
            >
              <input
                value={option.value}
                id="menu"
                type="radio"
                checked={option.value === selectedOption.value}
                name={option.label}
                className="w-4 h-4 text-[#4FA83D] bg-gray-100 border-gray-300 focus:ring-[#4FA83D] dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={handleChangeOption}
              />
              <label
                htmlFor="menu"
                className="w-full capitalize ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
