"use client";
import { handleEnumSubmission } from "@/actions/convert";
import { handleFormSubmission } from "@/actions/form";
import Recorder, { HeadersSchemaType } from "@/components/inspector/Recorder";
import { ReportHeader } from "@/components/inspector/ReportHeader";
import { cn } from "@/lib/utils";
import GeneralInfo from "@/sections/inspector/GeneralInfo";
import React, { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const CreateReportPage = () => {
  const [data, setData] = useState<HeadersSchemaType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [enumRecorded, setEnumRecorded] = useState("");
  const [autoRecord, setAutoRecord] = useState(false);
  useEffect(() => {
    if (showForm) {
      setAutoRecord(true);
    }
  }, [showForm]);
  return (
    <div className="w-[85%] mx-auto flex flex-col gap-12 ">
      <ReportHeader />
      <main
        className={cn(
          showForm && "w-full flex items-start justify-between gap-4"
        )}
      >
        {!showForm && (
          <Recorder
            setData={setData}
            setShow={setShowForm}
            action={handleFormSubmission}
          />
        )}
        {showForm && data && <GeneralInfo data={data} />}
        {showForm && (
          <Recorder
            setData={setEnumRecorded}
            action={handleEnumSubmission}
            autoStart={autoRecord}
            autoStop={true}
          />
        )}
        {enumRecorded}
      </main>
    </div>
  );
};

export default CreateReportPage;
