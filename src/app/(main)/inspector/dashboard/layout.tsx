import Navbar from "@/components/inspector/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full  flex flex-col max-auto gap-12">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
