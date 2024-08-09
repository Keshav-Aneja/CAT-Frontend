import InspectorHeader from "@/components/inspector/InspectorHeader";
import Navbar from "@/components/inspector/Navbar";
import React from "react";
import { formatDistance } from "date-fns";
import Button from "@/components/ui/buttons/Button";
import { FaPlus } from "react-icons/fa";

export default function InpectorDashboard() {
  return (
    <div className="flex flex-col gap-16">
      <Navbar />
      <main className="w-[80%] mx-auto flex flex-col gap-16">
        <InspectorHeader />

        <div className="w-full flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Recent Reports</h1>
          <div className="w-full grid grid-cols-3 gap-4">
            <ReportCard
              title="Report 1"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, possimus obcaecati? Eligendi, repellat quas? Est quae in dignissimos quis facilis!"
              date="2021-09-01"
            />
            <ReportCard
              title="Report 1"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, possimus obcaecati? Eligendi, repellat quas? Est quae in dignissimos quis facilis!"
              date="2021-09-01"
            />
            <ReportCard
              title="Report 1"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, possimus obcaecati? Eligendi, repellat quas? Est quae in dignissimos quis facilis!"
              date="2021-09-01"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function ReportCard({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) {
  return (
    <div className="bg-muted rounded-xl border-[2px]  overflow-hidden rounded-t-none border-t-[0px] flex flex-col gap-4 border-[#aeaeae50] p-4 relative">
      <div className="w-full h-[5px] bg-main absolute top-0 left-0"></div>
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {formatDistance(new Date(), date)}
        </p>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}
