import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "@/context/store"; // Import useGlobalContext hook from your store

interface CropResizableProps {
  children?: React.ReactNode; // Make children optional
}

const CropResizable: React.FC<CropResizableProps> = ({ children }) => {
  const resizableRef = useRef<HTMLDivElement>(null);
  const { dimensions, setDimensions } = useGlobalContext(); // Access global dimensions state and setter

  const onStartResize = (startX: number, startY: number, position: string) => {
    const handleResize = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaWidth = clientX - startX;
      const deltaHeight = clientY - startY;

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

    const onStopResize = () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("touchmove", handleResize);
      document.removeEventListener("mouseup", onStopResize);
      document.removeEventListener("touchend", onStopResize);
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("touchmove", handleResize);
    document.addEventListener("mouseup", onStopResize);
    document.addEventListener("touchend", onStopResize);
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
        overflow: "hidden",
        border: "1px solid #4fa83d",
        boxSizing: "content-box",
      }}
    >
      <div className="resizers">
        <div
          role="button"
          className="resizer top-left crop-corner"
          onMouseDown={(e) => onStartResize(e.clientX, e.clientY, "top-left")}
          onTouchStart={(e) =>
            onStartResize(
              e.touches[0].clientX,
              e.touches[0].clientY,
              "top-left"
            )
          }
        />
        <div
          role="button"
          className="resizer top-right crop-corner"
          onMouseDown={(e) => onStartResize(e.clientX, e.clientY, "top-right")}
          onTouchStart={(e) =>
            onStartResize(
              e.touches[0].clientX,
              e.touches[0].clientY,
              "top-right"
            )
          }
        />
        <div
          role="button"
          className="resizer bottom-left crop-corner"
          onMouseDown={(e) =>
            onStartResize(e.clientX, e.clientY, "bottom-left")
          }
          onTouchStart={(e) =>
            onStartResize(
              e.touches[0].clientX,
              e.touches[0].clientY,
              "bottom-left"
            )
          }
        />
        <div
          role="button"
          className="resizer bottom-right crop-corner"
          onMouseDown={(e) =>
            onStartResize(e.clientX, e.clientY, "bottom-right")
          }
          onTouchStart={(e) =>
            onStartResize(
              e.touches[0].clientX,
              e.touches[0].clientY,
              "bottom-right"
            )
          }
        />
        <div className="innerContent inset-0 mx-auto container max-w-[292px] max-h-[348px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CropResizable;
