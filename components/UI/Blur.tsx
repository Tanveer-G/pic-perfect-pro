import { useEffect } from "react";
import Input from "../InputFields/Input";
import { useGlobalContext } from "@/context/store";
import ReadonlyField from "../ReadonlyField";

export default function Blur() {
  const { value, setValue, apiUrl, setApiUrl } = useGlobalContext();

  const handleInputChange = (name: string, val: number | string) => {
    const numericValue: number = Number(val);
    const constrainedValue = Math.min(Math.max(numericValue, 0), 10);
    setValue((prev) => ({ ...prev, blur: constrainedValue }));
  };

  useEffect(() => {
    const val = `http://localhost:3000/api/blur?value=${value.blur}`;
    setApiUrl((prev) => ({ ...prev, blur: val }));
  }, [value.blur]);

  return (
    <>
      <Input
        label="Blur value (0 to 10)"
        name="blur"
        value={value.blur}
        placeholder={"0"}
        rightSide=" | Nm"
        handleCallback={handleInputChange}
      />
      <ReadonlyField apiUrl={apiUrl.blur} />
    </>
  );
}
