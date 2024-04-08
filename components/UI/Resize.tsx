"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/store";
import Dropdown from "../Dropdown";
import Input from "../InputFields/Input";
import ReadonlyField from "../ReadonlyField";
import { resizeOptions } from "@/utils/constant";

const maxWidth = 292;
const maxHeight = 348;
const minValue = 19;

export default function Resize() {
  const {
    dimensions,
    setDimensions,
    optionType,
    setOptionType,
    apiUrl,
    setApiUrl,
  } = useGlobalContext();

  const handleInputChange = (name: string, val: number | string) => {
    let constrainedValue: number;
    const numericValue: number = Number(val);
    if (name === "width") {
      constrainedValue = Math.min(Math.max(numericValue, minValue), maxWidth);
    } else if (name === "height") {
      constrainedValue = Math.min(Math.max(numericValue, minValue), maxHeight);
    } else {
      constrainedValue = numericValue;
    }

    setDimensions((prev) => ({ ...prev, [name]: constrainedValue }));
  };

  const handleOptionType = (val: string) => {
    setOptionType((prev) => ({ ...prev, resizeType: val }));
  };

  useEffect(() => {
    const baseUrl = ` http://localhost:3000/api/${optionType.resizeType}?width=${dimensions.width}&height=${dimensions.height}`;
    const val =
      optionType.resizeType !== "crop"
        ? baseUrl
        : `${baseUrl}&left=${dimensions.left}&top=${dimensions.top}`;
    setApiUrl((prev) => ({ ...prev, resize: val }));
  }, [dimensions, optionType]);

  return (
    <>
      <Dropdown
        label="Type"
        options={resizeOptions}
        optionType={handleOptionType}
        initialOption={{ label: "Fit And Fill", value: "fitandfill" }}
      />

      <div className="flex justify-between gap-x-3">
        <Input
          label="width"
          name="width"
          value={dimensions.width}
          placeholder={"0"}
          rightSide=" | Px"
          handleCallback={handleInputChange}
        />
        <Input
          label="height"
          name="height"
          value={dimensions.height}
          placeholder={"0"}
          rightSide=" | Px"
          handleCallback={handleInputChange}
        />
      </div>
      <ReadonlyField apiUrl={apiUrl.resize} />
    </>
  );
}
