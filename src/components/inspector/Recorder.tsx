"use client";

import { handleFormSubmission } from "@/actions/form";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "../ui/button";
import images from "@/constants/images";
import Image from "next/image";
import { z } from "zod";
import { set } from "date-fns";

export const HeaderSchema = z.object({
  truckSerialNumber: z.string(),
  truckModel: z.string(),
  inspectionId: z.string(),
  inspectorName: z.string(),
  inspectionEmployeeId: z.string(),
  serviceMeterHours: z.number(),
  companyName: z.string(),
  CATCustomerId: z.string(),
});

export type HeadersSchemaType = z.infer<typeof HeaderSchema>;

export default function Recorder({
  setShow,
  setData,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<HeadersSchemaType | null>>;
}) {
  const [result, setResult] = useState<null | HeadersSchemaType>(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  ); // This array will hold the audio data
  let chunks: BlobPart[] = [];
  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error("Error playing audio:", err);
            };
            audio.play();
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async function () {
              const base64Audio = (reader.result as string).split(",")[1]; // Remove the data URL prefix
              console.log(base64Audio);
              const response = await handleFormSubmission(base64Audio);
              setResult(response);
            };
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch((err) => console.error("Error accessing microphone:", err));
    }
  }, []);
  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };
  useEffect(() => {
    if (result) {
      setData(result);
      setShow(true);
    }
  }, [result]);
  return (
    <main className="">
      <div
        className="  group w-full h-[50vh] flex flex-col text-3xl items-center justify-center gap-4 text-muted-foreground bg-primary/10 rounded-2xl hover:bg-primary/20 transition-all duration-200 ease-linear cursor-pointer"
        onClick={recording ? stopRecording : startRecording}
      >
        {!recording && <FaMicrophone size={70} />}
        {recording && (
          <Image
            src={images.Loader}
            alt=""
            width={200}
            height={100}
            className="w-16 invert-[60%]"
          />
        )}
        <h1 className="font-medium">
          {recording ? "Stop Recording" : "Start Recording"}
        </h1>
      </div>
    </main>
  );
}
