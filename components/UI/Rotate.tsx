import { useEffect } from "react";
import Input from "../InputFields/Input";
import { useGlobalContext } from "@/context/store";
import ReadonlyField from "../ReadonlyField";

export default function Rotate() {
  const { value, setValue, apiUrl, setApiUrl } = useGlobalContext();

  const handleInputChange = (name: string, val: number | string) => {
    const numericValue: number = Number(val);
    const constrainedValue = Math.min(Math.max(numericValue, 0), 360);
    setValue((prev) => ({ ...prev, rotate: constrainedValue }));
  };

  useEffect(() => {
    const val = `http://localhost:3000/api/rotate?value=${value.rotate}`;
    setApiUrl((prev) => ({ ...prev, rotate: val }));
  }, [value.rotate]);

  return (
    <>
      <Input
        label="Rotate value (0deg to 180deg)"
        name="rotate"
        value={value.rotate}
        placeholder={"0"}
        rightSide=" | Deg"
        handleCallback={handleInputChange}
      />
      <ReadonlyField apiUrl={apiUrl.rotate} />
    </>
  );
}
