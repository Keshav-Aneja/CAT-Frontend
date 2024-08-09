"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import Scroller from "../Scroller";
import Button from "../ui/buttons/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { createReport } from "@/services/reports.service";
import { useRouter } from "next/navigation";
const InspectorHeader = () => {
  const router = useRouter();
  const [reportTitle, setReportTitle] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          console.log(position);
        },
        (error) => {
          setPosition([28.5355, 77.391]);
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);
  async function handleSubmit() {
    try {
      if (!(reportTitle.length > 0)) {
        toast({
          title: "Invalid Report name",
          variant: "destructive",
        });
      }
      const response = await createReport({
        name: reportTitle,
        location: JSON.stringify(position),
      });
      toast({
        title: "Success",
        description: "Report created successfully!",
      });
      router.push(`/dashboard/create/${response.data.reportId}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }
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
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="px-6 py-3  rounded-sm bg-primary text-white ">
              <div className="w-full flex  items-center gap-4">
                <FaPlus size={24} />
                <p>Generate new Report</p>
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create a New Report</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="w-full">
              <Input
                placeholder="Enter name for report"
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
