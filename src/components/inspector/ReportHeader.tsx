"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export const ReportHeader = () => {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div className="w-full grid grid-cols-7 gap-4">
      {headerData.map((item, index) => (
        <HeaderBtn
          title={item.title}
          id={index + 1}
          key={index}
          selected={currentTab === index + 1}
        />
      ))}
    </div>
  );
};

function HeaderBtn({
  title,
  id,
  selected,
}: {
  title: string;
  id: number;
  selected: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full py-2 bg-muted rounded-lg border-[2px] border-[#aeaeae50] text-center cursor-pointer",
        selected && "bg-main border-0"
      )}
    >
      <h1 className="text-xl font-bold">0{id}</h1>
      <p className="text-sm">{title}</p>
    </div>
  );
}

const headerData = [
  {
    title: "General",
    action: () => {},
  },
  {
    title: "Tires",
    action: () => {},
  },
  {
    title: "Battery",
    action: () => {},
  },
  {
    title: "Exterior",
    action: () => {},
  },
  {
    title: "Breaks",
    action: () => {},
  },
  {
    title: "Engine",
    action: () => {},
  },
  {
    title: "Customer",
    action: () => {},
  },
];
