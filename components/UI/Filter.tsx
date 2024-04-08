import Dropdown from "../Dropdown";
import { filterOptions } from "@/utils/constant";
import Contrast from "./Filters/Contrast";
import Grayscale from "./Filters/Grayscale";
import Opacity from "./Filters/Opacity";
import HueSaturationLight from "./Filters/HueSaturationLight";
import { useGlobalContext } from "@/context/store";

export default function Filter() {
  const { optionType, setOptionType } = useGlobalContext();

  const handleOptionType = (val: string) => {
    setOptionType((prev) => ({ ...prev, filterType: val }));
  };

  const getActiveFilter = () => {
    switch (optionType.filterType) {
      case "contrast":
        return <Contrast />;
      case "grayscale":
        return <Grayscale />;
      case "opacity":
        return <Opacity />;
      case "hue-saturation-light":
        return <HueSaturationLight />;
      default:
        return <Contrast />;
    }
  };
  return (
    <>
      <Dropdown
        label="Type"
        options={filterOptions}
        optionType={handleOptionType}
        initialOption={{ label: "Contrast", value: "contrast" }}
      />
      <>{getActiveFilter()}</>
    </>
  );
}
