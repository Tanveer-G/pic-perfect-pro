"use client";
import Image from "next/image";

interface Props {
  readonly label?: string;
  readonly apiUrl: string;
}
export default function ReadonlyField({
  label = "Copy URL",
  apiUrl = "http://localhost:3000/api/",
}: Props) {
  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex flex-col w-full">
      <button
        className="flex w-max gap-x-2 mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
        type="button"
        onClick={() => copyToClipboard(apiUrl)}
      >
        {label}
        <Image
          src="/copy-icon.svg"
          alt="copy icon for copy url"
          width={12}
          height={16}
        />
      </button>

      <div className="relative mb-6 flex justify-between min-h-25 max-h-35">
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2.5  dark:bg-[#4fa83d]/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          minLength={10}
          maxLength={50}
          value={apiUrl}
          readOnly
        />
      </div>
    </div>
  );
}
