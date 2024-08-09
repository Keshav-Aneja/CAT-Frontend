"use server";
import { Searcher } from 'fast-fuzzy';

import fs from "fs";
import openai from "@/config/openai";

enum Acceptable {
    ok = "ok",
    record = "record"
}

export async function handleEnumSubmission(audioBlob: string) {
  const buffer = Buffer.from(audioBlob, "base64");

  const tempFilePath = `/tmp/recording-${Date.now()}.webm`;
  fs.writeFileSync(tempFilePath, buffer);

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(tempFilePath),
    model: "whisper-1",
  });
  const splitText = transcription.text.split(" ")
  fs.unlinkSync(tempFilePath);
  const searcher = new Searcher(splitText)
  for (const word of Object.values(Acceptable)) {
    const fuzzyScore = searcher.search(word, {returnMatchData: true})
    if (fuzzyScore.length > 0 && fuzzyScore[0].score > 0.6) {
      return word
    }
  }
  return "no match"
}
