import { useEffect } from "react";
import { useGlobalContext } from "@/context/store";
import Input from "../../InputFields/Input";
import ReadonlyField from "../../ReadonlyField";

// Define a type for the ranges object
type Range = {
  min: number;
  max: number;
};

// Define a type for the filter state
type FilterState = {
  hue: number;
  saturation: number;
  lightness: number;
};

const ranges: Record<string, Range> = {
  hue: { min: 0, max: 360 },
  saturation: { min: 0, max: 100 },
  lightness: { min: 0, max: 100 },
};

export default function HueSaturationLight() {
  const { filter, setFilter, apiUrl, setApiUrl } = useGlobalContext();

  const handleInputChange = (name: string, val: number | string) => {
    let numericValue: number = Number(val);
    let constrainedValue: number = numericValue;

    if (ranges.hasOwnProperty(name)) {
      constrainedValue = Math.min(
        Math.max(numericValue, ranges[name].min),
        ranges[name].max
      );
    }

    setFilter((prev) => ({ ...prev, [name]: constrainedValue }));
  };

  useEffect(() => {
    const val = `http://localhost:3000/api/filter?filtertype=hue-saturation-light&hue=${filter.hue}&saturation=${filter.saturation}&light=${filter.lightness}`;
    setApiUrl((prev) => ({ ...prev, filter: val }));
  }, [filter.hue, filter.saturation, filter.lightness]);

  return (
    <>
      <div className="flex justify-between gap-x-3">
        <Input
          label="Hue"
          name="hue"
          step={0.1}
          value={filter.hue}
          placeholder={"0"}
          rightSide=" | deg"
          handleCallback={handleInputChange}
        />
        <Input
          label="Saturation"
          name="saturation"
          step={0.1}
          value={filter.saturation}
          placeholder={"0"}
          rightSide=" | %"
          handleCallback={handleInputChange}
        />
        <Input
          label="Lightness"
          name="lightness"
          step={0.1}
          value={filter.lightness}
          placeholder={"0"}
          rightSide=" | %"
          handleCallback={handleInputChange}
        />
      </div>
      <ReadonlyField apiUrl={apiUrl.filter} />
    </>
  );
}
