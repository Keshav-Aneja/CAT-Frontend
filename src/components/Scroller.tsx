"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface Props {
  children: React.ReactNode[];
  uniqueName: string;
  className?: string;
  style?: React.CSSProperties;
}
export default function HorizontalScrollMenu({
  children,
  uniqueName,
  style,
  className,
}: Props) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  return (
    <div className="w-full flex flex-col gap-4  relative">
      <div
        className={cn(
          `scroll-menu-2 w-full  scroll-snapper py-4 ${uniqueName} auto-cols-[48%] md:auto-cols-[18%] gap-[5%] md:gap-[2%]`,
          className
        )}
        onMouseDown={(e) => {
          setIsDown(true);
          const container = document.querySelector(
            `.${uniqueName}`
          ) as HTMLDivElement;
          if (container) {
            container.classList.add("active");
            setStartX(e.pageX - container.offsetLeft);
            setScrollLeft(container.scrollLeft);
          }
        }}
        style={{ ...style }}
        onMouseUp={() => {
          setIsDown(false);
          const container = document.querySelector(
            `.${uniqueName}`
          ) as HTMLDivElement;
          if (container) {
            container.classList.remove("active");
          }
        }}
        onMouseLeave={() => {
          setIsDown(false);
          const container = document.querySelector(
            `.${uniqueName}`
          ) as HTMLDivElement;
          if (container) {
            container.classList.remove("active");
          }
        }}
        onMouseMove={(e) => {
          if (!isDown) return;
          const container = document.querySelector(
            `.${uniqueName}`
          ) as HTMLDivElement;
          // e.preventDefault();
          if (container) {
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
          }
        }}
        onWheel={(e) => {
          // e.preventDefault();
          const container = document.querySelector(
            `.${uniqueName}`
          ) as HTMLDivElement;
          container.scrollLeft += e.deltaY;
        }}
      >
        {children}
        {/* <div className="absolute w-[5%] h-full top-0 left-0 bg-gradient-to-r from-[rgba(255,255,255,0.6)] dark:from-[rgba(0,0,0,0.6)] to-[rgba(255,255,255,0)] hidden md:block"></div>
        <div className="absolute w-[5%] h-full top-0 right-0 bg-gradient-to-l from-[rgba(255,255,255,0.6)] dark:from-[rgba(0,0,0,0.6)] to-[rgba(255,255,255,0)] hidden md:block"></div> */}
      </div>
    </div>
  );
}
