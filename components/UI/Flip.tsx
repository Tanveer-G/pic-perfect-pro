import { useEffect } from "react";
import Dropdown from "../Dropdown";
import { flipOptions } from "@/utils/constant";
import { useGlobalContext } from "@/context/store";
import ReadonlyField from "../ReadonlyField";

export default function Flip() {
  const { value, setValue, apiUrl, setApiUrl } = useGlobalContext();

  const handleOptionType = (val: string) => {
    setValue((prev) => ({ ...prev, flip: val }));
  };

  useEffect(() => {
    const val = `http://localhost:3000/api/flip?value=${value.flip}`;
    setApiUrl((prev) => ({ ...prev, flip: val }));
  }, [value.flip]);

  return (
    <>
      <Dropdown
        label="Flip"
        options={flipOptions}
        optionType={handleOptionType}
        initialOption={{ label: "Horizontal", value: "horizontal" }}
      />
      <ReadonlyField apiUrl={apiUrl.flip} />
    </>
  );
}
