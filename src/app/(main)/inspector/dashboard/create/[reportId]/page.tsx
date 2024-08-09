"use client";
import Recorder, { HeadersSchemaType } from "@/components/inspector/Recorder";
import { ReportHeader } from "@/components/inspector/ReportHeader";
import GeneralInfo from "@/sections/inspector/GeneralInfo";
import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const CreateReportPage = () => {
  const [data, setData] = useState<HeadersSchemaType | null>(null);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-[85%] mx-auto flex flex-col gap-12 ">
      <ReportHeader />
      <main>
        {!showForm && <Recorder setData={setData} setShow={setShowForm} />}
        {showForm && data && <GeneralInfo data={data} />}
      </main>
    </div>
  );
};

export default CreateReportPage;
