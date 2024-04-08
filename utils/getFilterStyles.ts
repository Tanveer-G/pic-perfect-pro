import { useGlobalContext } from "@/context/store";

export const getFilterStyles = () => {
  const { value, filter, selectTab, optionType } = useGlobalContext();

  if (selectTab === "Filter") {
    switch (optionType.filterType) {
      case "contrast":
        return { filter: `contrast(${filter.contrast}%)` };
      case "grayscale":
        return { filter: `grayscale(100%)` };
      case "hue-saturation-light":
        return {
          filter: `hue-rotate(${filter.hue}deg) saturate(${filter.saturation}%) brightness(${filter.lightness}%)`,
        };
      case "opacity":
        return { opacity: filter.opacity };
    }
  } else if (selectTab === "Flip") {
    return {
      transform: value.flip === "vertical" ? `scaleY(-1)` : `scaleX(-1)`,
    };
  } else if (selectTab === "Blur") {
    return { filter: `blur(${value.blur}px)` };
  } else if (selectTab === "Rotate") {
    return { transform: `rotate(${value.rotate}deg)` };
  }

  return {};
};
