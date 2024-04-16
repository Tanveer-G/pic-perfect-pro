"use client";

import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "@/context/store"; // Import useGlobalContext hook from your store


interface ResizableDivProps {
  children?: React.ReactNode; // Make children optional
}

const ResizableDiv: React.FC<ResizableDivProps> = ({ children }) => {
  const resizableRef = useRef<HTMLDivElement>(null);
  const { dimensions, setDimensions } = useGlobalContext(); // Access global dimensions state and setter

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    position: string
  ) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const resizable = resizableRef.current;

    if (!resizable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizable) return;

      const deltaWidth = e.clientX - startX;
      const deltaHeight = e.clientY - startY;

      let newWidth: number = dimensions.width as number;
      let newHeight: number = dimensions.height as number;
      let newLeft: number = dimensions.left as number;
      let newTop: number = dimensions.top as number;

      switch (position) {
        case "top-left":
          newWidth = (dimensions.width as number) - deltaWidth;
          newHeight = (dimensions.height as number) - deltaHeight;
          newLeft = (dimensions.left as number) + deltaWidth;
          newTop = (dimensions.top as number) + deltaHeight;
          break;
        case "top-right":
          newWidth = (dimensions.width as number) + deltaWidth;
          newHeight = (dimensions.height as number) - deltaHeight;
          newTop = (dimensions.top as number) + deltaHeight;
          break;
        case "bottom-left":
          newWidth = (dimensions.width as number) - deltaWidth;
          newHeight = (dimensions.height as number) + deltaHeight;
          newLeft = (dimensions.left as number) + deltaWidth;
          break;
        case "bottom-right":
          newWidth = (dimensions.width as number) + deltaWidth;
          newHeight = (dimensions.height as number) + deltaHeight;
          break;
        default:
          break;
      }

      // Enforce minimum width and height
      newWidth = Math.max(20, newWidth);
      newHeight = Math.max(20, newHeight);

      // Enforce maximum width and height based on outer container
      newWidth = Math.min(292, newWidth);
      newHeight = Math.min(348, newHeight);

      // Adjust left and top positions to ensure the div remains within the container
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newTop < 0) {
        newTop = 0;
      }
      if (newLeft + newWidth > 292) {
        newLeft = 292 - newWidth;
      }
      if (newTop + newHeight > 348) {
        newTop = 348 - newHeight;
      }

      // Update dimensions in the global state
      setDimensions({
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const resizable = resizableRef.current;
    if (resizable) {
      resizable.style.width = `${dimensions.width}px`;
      resizable.style.height = `${dimensions.height}px`;
      resizable.style.top = `${dimensions.top}px`;
      resizable.style.left = `${dimensions.left}px`;
    }
  }, [dimensions]);

  return (
    <div
      ref={resizableRef}
      className={`resizable`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        top: `${dimensions.top}px`,
        left: `${dimensions.left}px`,
        position: "absolute",
        border: "1px solid #4fa83d", // Optional border style
      }}
    >
      <div className="resizers">
        <div
          role="button"
          className="resizer top-left"
          onMouseDown={(e) => onMouseDown(e, "top-left")}
        />
        <div
          role="button"
          className="resizer top-right z-50"
          onMouseDown={(e) => onMouseDown(e, "top-right")}
        />
        <div
          role="button"
          className="resizer bottom-left"
          onMouseDown={(e) => onMouseDown(e, "bottom-left")}
        />
        <div
          role="button"
          className="resizer bottom-right"
          onMouseDown={(e) => onMouseDown(e, "bottom-right")}
        />
        <div className="innerContent inset-0 mx-auto container max-w-[292px] max-h-[348px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResizableDiv;
