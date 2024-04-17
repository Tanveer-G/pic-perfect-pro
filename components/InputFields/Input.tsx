"use client";

interface Props {
  readonly label?: string;
  readonly name?: string;
  readonly value?: string | number;
  readonly placeholder?: string;
  readonly type?: string;
  readonly step?: number;
  readonly rightSide?: string;
  readonly handleCallback: (arg1: string, arg2: number | string) => void;
}

export default function Input({
  label = "input",
  name = "input",
  placeholder = "0",
  type = "number",
  step = 1,
  rightSide = "",
  value,
  handleCallback,
}: Props) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCallback(e.target.name, e.target.value);
  };
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="input-filed"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
      >
        {label}
      </label>

      <div className="relative mb-6 flex justify-between max-h-[50px] rounded-[6.95598px] h-[50px] border-[#606060] border-[0.632362px] bg-[#202224]">
        <input
          type={type}
          step={step}
          id="input-filed"
          className="block w-full px-2.5 py-2.5 h-full bg-[#202224] rounded-[6.95598px] text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          onChange={handleValueChange}
          value={value}
          name={name}
        />

        {/* right side */}
        <div className="absolute inset-y-0 end-0 flex justify-end items-center px-2.5 pointer-events-none text-gray-900 dark:text-white">
          {rightSide}
        </div>
      </div>
    </div>
  );
}
