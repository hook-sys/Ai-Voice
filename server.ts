import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize the Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

/**
 * Packs 16-bit Mono Little-Endian PCM data into a standard WAV container.
 */
function pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000): Buffer {
  const numOfChannels = 1;
  const bitsPerSample = 16;
  const wavBuffer = Buffer.alloc(44 + pcmBuffer.length);

  // RIFF identifier
  wavBuffer.write("RIFF", 0);
  // File length
  wavBuffer.writeUInt32LE(36 + pcmBuffer.length, 4);
  // RIFF type
  wavBuffer.write("WAVE", 8);
  // Format chunk identifier
  wavBuffer.write("fmt ", 12);
  // Format chunk length
  wavBuffer.writeUInt32LE(16, 16);
  // Sample format (1 is PCM)
  wavBuffer.writeUInt16LE(1, 20);
  // Channel count
  wavBuffer.writeUInt16LE(numOfChannels, 22);
  // Sample rate
  wavBuffer.writeUInt32LE(sampleRate, 24);
  // Byte rate (sample rate * block align)
  wavBuffer.writeUInt32LE(sampleRate * numOfChannels * (bitsPerSample / 8), 28);
  // Block align (channel count * bytes per sample)
  wavBuffer.writeUInt16LE(numOfChannels * (bitsPerSample / 8), 32);
  // Bits per sample
  wavBuffer.writeUInt16LE(bitsPerSample, 34);
  // Data chunk identifier
  wavBuffer.write("data", 36);
  // Chunk length
  wavBuffer.writeUInt32LE(pcmBuffer.length, 40);

  // Copy raw PCM data
  pcmBuffer.copy(wavBuffer, 44);

  return wavBuffer;
}

// API endpoint for Text-to-Speech
app.post("/api/tts", async (req, res) => {
  const { text, voice } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Text is required and must be a string." });
    return;
  }

  const selectedVoice = voice || "Zephyr";
  
  // Custom persona-based instructions for professional, human-like, non-robotic Bengali voice delivery
  let styledPrompt = `Say in clear Bengali/Bangla: ${text}`;
  
  switch (selectedVoice) {
    case "Zephyr": // Tania
      styledPrompt = `You are Tania, a professional Bengali/Bangla female voice artist. Speak the following text in a soft, warm, natural, and highly expressive tone, perfect for premium storytelling and narration. Avoid all robotic cadences, speak with human-like breathing pauses and standard pronunciation. Text: ${text}`;
      break;
    case "Kore": // Sabiha
      styledPrompt = `You are Sabiha, a professional Bengali/Bangla female news anchor and corporate presenter. Read the following text in a crystal clear, highly precise, professional, and formal tone. Keep pronunciation absolutely standard and articulate every word clearly. Text: ${text}`;
      break;
    case "Puck": // Rahat
      styledPrompt = `You are Rahat, an energetic, lively, and highly persuasive Bengali/Bangla male commercial voice artist. Read the following text with enthusiastic energy, friendly charm, and high confidence, perfect for commercial ads and announcements. Text: ${text}`;
      break;
    case "Charon": // Sharif
      styledPrompt = `You are Sharif, a professional Bengali/Bangla male voice artist with a deep, rich, and highly resonant voice. Read the following text with profound depth, serious authority, and deliberate dramatic pauses, perfect for history documentaries or deep storytelling. Text: ${text}`;
      break;
    case "Hermes": // Soumya
      styledPrompt = `You are Soumya, a warm, friendly, and completely casual Bengali/Bangla male podcaster. Speak the following text in a conversational, daily-life, natural, and friendly tone. Keep the cadence relaxed, warm, and highly relatable, like speaking to a friend. Text: ${text}`;
      break;
    case "Aoede": // Ananya
      styledPrompt = `You are Ananya, a highly creative and emotional Bengali/Bangla female voice artist. Read the following text with deep artistic sensitivity, beautiful poetic modulation, and sweet emotional resonance, perfect for poetry recitation and dramatic stories. Text: ${text}`;
      break;
    case "Fenrir": // Ripon
      styledPrompt = `You are Ripon, a highly powerful, bold, and motivational Bengali/Bangla male speaker. Read the following text with commanding passion, high energy, and inspiring confidence, perfect for public speeches and declarations. Text: ${text}`;
      break;
    case "Anemone": // Nabila
      styledPrompt = `You are Nabila, a sweet, soft, and exceptionally soothing female Bengali/Bangla voice artist. Read the following text in a quiet, peaceful, slow-paced, and relaxing whisper-like voice, perfect for guided meditations and calming stories. Text: ${text}`;
      break;
    default:
      styledPrompt = `Say in a clear and natural Bengali/Bangla human-like voice: ${text}`;
  }
  
  try {
    // Call the Gemini TTS API model
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: styledPrompt }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const firstPart = candidate?.content?.parts?.[0];
    const base64Pcm = firstPart?.inlineData?.data;

    if (!base64Pcm) {
      res.status(500).json({
        error: "Failed to generate audio. No audio content returned from Gemini.",
      });
      return;
    }

    // Convert PCM data buffer to WAV buffer
    const pcmBuffer = Buffer.from(base64Pcm, "base64");
    const wavBuffer = pcmToWav(pcmBuffer, 24000);
    const base64Wav = wavBuffer.toString("base64");

    res.json({
      success: true,
      pcmData: base64Pcm,
      wavData: base64Wav,
      voice: selectedVoice,
    });
  } catch (err: any) {
    console.error("Gemini TTS Error:", err);
    res.status(500).json({
      error: err?.message || "An unexpected error occurred while generating speech.",
    });
  }
});

// Setup Vite Dev server or Production static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
