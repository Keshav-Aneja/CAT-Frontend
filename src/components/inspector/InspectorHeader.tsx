import React from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import Scroller from "../Scroller";
import Button from "../ui/buttons/Button";
const InspectorHeader = () => {
  return (
    <div className=" flex flex-col gap-8">
      <div className="flex items-center justify-between w-full font-roboto text-[#232323]">
        <span className="flex items-center gap-2 text-3xl font-semibold">
          <FaUserCircle className="text-6xl" />
          <div className="flex flex-col relative">
            <p className="text-sm font-normal text-muted-foreground">
              Welcome back,
            </p>
            <h1>Keshav Aneja</h1>
            <div className="w-[60%] h-[3px] bg-main absolute -bottom-1 left-0"></div>
          </div>
        </span>
        <div className="">
          <Button className="py-3  rounded-sm bg-primary text-white ">
            <div className="w-full flex  items-center gap-4">
              <FaPlus size={24} />
              <p>Generate new Report</p>
            </div>
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        <div className="w-full border-[2px] border-[#aeaeae50] rounded-xl p-4 flex flex-col items-center bg-muted gap-2 ">
          <h1 className="text-xl font-medium">Total Reports</h1>
          <p className="text-4xl font-semibold">46</p>
        </div>
        <div className="w-full border-[2px] border-[#aeaeae50] rounded-xl p-4 flex flex-col items-center bg-muted gap-2 ">
          <h1 className="text-xl font-medium">Accepted Reports</h1>
          <p className="text-4xl font-semibold">37</p>
        </div>
        <div className="w-full border-[2px] border-[#aeaeae50] rounded-xl p-4 flex flex-col items-center bg-muted gap-2 ">
          <h1 className="text-xl font-medium">Time Invested</h1>
          <p className="text-4xl font-semibold">3hrs 42mins</p>
        </div>
      </div>
    </div>
  );
};

export default InspectorHeader;
