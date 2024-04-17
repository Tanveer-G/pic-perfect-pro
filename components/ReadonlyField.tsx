"use client";
import Image from "next/image";

interface Props {
  readonly label?: string;
  readonly apiUrl: string;
}

export default function ReadonlyField({
  label = "Copy URL",
  apiUrl = `${window.location.href}/api/`,
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
    <div className="flex flex-col w-full text-white">
      <button
        className="flex w-max gap-x-2 mb-2 text-sm font-medium capitalize"
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

      <div className="relative mb-6 flex justify-between min-h-25 max-h-35 rounded-[6.95598px] border-[#606060] border-[0.632362px] bg-[#202224]">
        <textarea
          className="text-sm focus:ring-[#4fa83d] block w-full px-2.5 py-2.5 h-full rounded-[6.95598px] bg-[#202224]"
          minLength={10}
          maxLength={50}
          value={apiUrl}
          readOnly
        />
      </div>
    </div>
  );
}
