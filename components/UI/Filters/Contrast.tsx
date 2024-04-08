import { useEffect } from "react";
import Input from "../../InputFields/Input";
import { useGlobalContext } from "@/context/store";
import ReadonlyField from "../../ReadonlyField";

export default function Contrast() {
  const { filter, setFilter, apiUrl, setApiUrl } = useGlobalContext();

  const handleInputChange = (name: string, val: number | string) => {
    const numericValue: number = Number(val);
    const constrainedValue = Math.min(Math.max(numericValue, 0), 100);
    setFilter((prev) => ({ ...prev, contrast: constrainedValue }));
  };

  useEffect(() => {
    const val = `http://localhost:3000/api/filter?filtertype=contrast&value=${filter.contrast}`;
    setApiUrl((prev) => ({ ...prev, filter: val }));
  }, [filter.contrast]);

  return (
    <>
      <Input
        label="Contrast (0 to 100)"
        name="contrast"
        step={0.1}
        value={filter.contrast}
        placeholder={"0"}
        rightSide=" | %"
        handleCallback={handleInputChange}
      />
      <ReadonlyField apiUrl={apiUrl.filter} />
    </>
  );
}
