import { useEffect } from "react";
import Input from "../../InputFields/Input";
import { useGlobalContext } from "@/context/store";
import ReadonlyField from "../../ReadonlyField";

export default function Opacity() {
  const { filter, setFilter, apiUrl, setApiUrl } = useGlobalContext();

  const handleInputChange = (name: string, val: number | string) => {
    const numericValue: number = Number(val);
    const constrainedValue = Math.min(Math.max(numericValue, 0), 1);
    setFilter((prev) => ({ ...prev, opacity: constrainedValue }));
  };

  useEffect(() => {
    const val = `http://localhost:3000/api/filter?filtertype=opacity&value=${filter.opacity}`;
    setApiUrl((prev) => ({ ...prev, filter: val }));
  }, [filter.opacity]);

  return (
    <>
      <Input
        label="Opacity (0 to 1)"
        name="opacity"
        step={0.1}
        value={filter.opacity}
        placeholder={"0"}
        rightSide=" | Nm"
        handleCallback={handleInputChange}
      />
      <ReadonlyField apiUrl={apiUrl.filter} />
    </>
  );
}
