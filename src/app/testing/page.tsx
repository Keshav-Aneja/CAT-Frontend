/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { handleFormSubmission, HeadersSchemaType } from "@/actions/form";
import { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState<null | HeadersSchemaType>(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);  // This array will hold the audio data
  let chunks: BlobPart[] = [];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error('Error playing audio:', err);
            };
            audio.play();
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async function () {
                const base64Audio = (reader.result as string).split(',')[1]; // Remove the data URL prefix
                console.log(base64Audio)
                const response = await handleFormSubmission(base64Audio);
                setResult(response);
              }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch(err => console.error('Error accessing microphone:', err));
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
  return (
    <main className="">
      <div className="">
        <h2>
          Convert audio to text <span>-&gt;</span>
        </h2>
        <button onClick={recording ? stopRecording : startRecording} >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <p>Result: {JSON.stringify(result)}</p>
      </div>
    </main>
  )
}