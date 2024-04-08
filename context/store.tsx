"use client";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from "react";

interface GlobalContextProviderProps {
  children?: React.ReactNode;
}

interface ResizableDimensions {
  width: number | string;
  height: number | string;
  top: number | string;
  left: number | string;
}

interface OptionTypes {
  filterType: number | string;
  resizeType: number | string;
}

interface Values {
  flip: number | string;
  blur: number | string;
  rotate: number | string;
}

interface Filters {
  contrast: number | string;
  grayscale: string;
  hue: number | string;
  saturation: number | string;
  lightness: number | string;
  opacity: number | string;
  // hueSaturatLight: {
  //   hue: number | string;
  //   saturation: number | string;
  //   lightness: number | string;
  // };
}

interface ApiUrls {
  resize: string;
  flip: string;
  blur: string;
  rotate: string;
  filter: string;
}

interface ContextProps {
  selectTab: string;
  setSelectTab: Dispatch<SetStateAction<string>>;
  optionType: OptionTypes;
  setOptionType: Dispatch<SetStateAction<OptionTypes>>;
  dimensions: ResizableDimensions;
  setDimensions: Dispatch<SetStateAction<ResizableDimensions>>;
  value: Values;
  setValue: Dispatch<SetStateAction<Values>>;
  filter: Filters;
  setFilter: Dispatch<SetStateAction<Filters>>;
  apiUrl: ApiUrls;
  setApiUrl: Dispatch<SetStateAction<ApiUrls>>;
}

const GlobalContext = createContext<ContextProps | undefined>(undefined);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [selectTab, setSelectTab] = useState<string>("Resize");
  const [optionType, setOptionType] = useState<OptionTypes>({
    filterType: "contrast",
    resizeType: "fitandfill",
  });
  const [dimensions, setDimensions] = useState<ResizableDimensions>({
    width: 292,
    height: 348,
    top: 0,
    left: 0,
  });

  const [value, setValue] = useState<Values>({
    flip: "horizontal",
    blur: 0,
    rotate: 0,
  });

  const [filter, setFilter] = useState<Filters>({
    contrast: 100, //%
    grayscale: "grayscale",
    hue: 0, //deg
    saturation: 100, //%
    lightness: 100, //%
    opacity: 1, //0 to 1
  });

  const [apiUrl, setApiUrl] = useState<ApiUrls>({
    resize: "http://localhost:3000/api/fitandfilld?width=292&height=348",
    flip: "http://localhost:3000/api/flip?value=horizontal",
    blur: "http://localhost:3000/api/blur?value=5",
    rotate: "http://localhost:3000/api/rotate?value=90",
    filter: "http://localhost:3000/api/filter?filtertype=contrast&value=0",
  });

  const contextValue = useMemo(
    () => ({
      selectTab,
      setSelectTab,
      optionType,
      setOptionType,
      dimensions,
      setDimensions,
      value,
      setValue,
      apiUrl,
      setApiUrl,
      filter,
      setFilter,
    }),
    [selectTab, optionType, dimensions, value, apiUrl, filter]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): ContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
