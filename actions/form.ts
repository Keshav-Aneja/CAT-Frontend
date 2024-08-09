"use server";

import fs from "fs";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import openai from "@/config/openai";

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

export async function handleFormSubmission(audioBlob: string) {
  const buffer = Buffer.from(audioBlob, "base64");

  const tempFilePath = `/tmp/recording-${Date.now()}.webm`;
  fs.writeFileSync(tempFilePath, buffer);

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(tempFilePath),
    model: "whisper-1",
  });

  fs.unlinkSync(tempFilePath);
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    response_format: zodResponseFormat(HeaderSchema, "header_schema"),
    messages: [
      {
        role: "system",
        content:
          "You are an expert at structured data extraction. You will be given unstructured text from an audio recording and should convert it into the given structure. Leave unspecified fields as empty string",
      },
      {
        role: "user",
        content: `"${transcription.text}"`,
      },
    ],
  });
  return completion.choices[0].message.parsed
}
