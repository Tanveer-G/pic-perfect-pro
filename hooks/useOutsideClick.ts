import { useEffect, RefObject } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void
): void => {
  useEffect(() => {
    const clickHandler = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return (): void => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
