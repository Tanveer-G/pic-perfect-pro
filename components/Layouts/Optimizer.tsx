"use client";
import { useGlobalContext } from "@/context/store";
import { getFilterStyles } from "@/utils/getFilterStyles";
import ResizableDiv from "../ResizableDiv";
import Menu from "../Menu";
import Image from "next/image";
import CropResizable from "../CropResizable";

export default function Optimizer() {
  const { selectTab, optionType } = useGlobalContext();
  let styles = getFilterStyles();

  return (
    <main className="flex flex-col lg:flex-row container mx-auto">
      <section className="flex flex-1 justify-center items-center">
        <div className="shadow-[0_1px_4px_#b7b0b0] min-w-[308px] min-h-[365px] rounded-sm relative overflow-hidden">
          <div
            className={`${selectTab === "Resize" ? "absolute" : ""} left-[8px] top-[8px]`}
          >
            {selectTab === "Resize" ? (
              optionType.resizeType !== "crop" ? (
                <ResizableDiv>
                  <Image
                    src="/resizer-image.avif"
                    alt="example painting for optimizer's demo"
                    width={292}
                    height={348}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      scale: 0.9999,
                    }}
                  />
                </ResizableDiv>
              ) : (
                <CropResizable>
                  <Image
                    src="/resizer-image.avif"
                    alt="example painting for optimizer's demo"
                    width={292}
                    height={348}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      scale: 0.9999,
                    }}
                  />
                </CropResizable>
              )
            ) : (
              <Image
                className="resizable-image"
                src="/resizer-image.avif"
                alt="example painting for optimizer's demo"
                width={292}
                height={348}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  scale: 0.9999,
                  ...styles,
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col flex-1 w-full h-25rem p-2 content-between my-4">
        <Menu />
      </section>
    </main>
  );
}
