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
  const { text, voice, settings } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Text is required and must be a string." });
    return;
  }

  const selectedVoice = voice || "Zephyr";
  
  // Custom ElevenLabs-style modifiers
  const speed = settings?.speed !== undefined ? Number(settings.speed) : 1.0;
  const stability = settings?.stability !== undefined ? Number(settings.stability) : 0.75;
  const clarity = settings?.clarity !== undefined ? Number(settings.clarity) : 0.75;
  const styleExaggeration = settings?.styleExaggeration !== undefined ? Number(settings.styleExaggeration) : 0.75;
  const pitch = settings?.pitch !== undefined ? String(settings.pitch) : "Medium";
  const emotion = settings?.emotion !== undefined ? String(settings.emotion) : "Neutral";

  let modifier = "";
  
  if (speed < 0.85) {
    modifier += "Speak slowly and intentionally, with longer pacing and thoughtful pauses. ";
  } else if (speed > 1.15) {
    modifier += "Speak at a faster, highly energetic, rapid, and punchy pace. ";
  } else {
    modifier += "Speak at a steady, perfectly natural standard pace. ";
  }

  if (stability < 0.45) {
    modifier += "Deliver with high emotional modulation, dramatic transitions, theatrical expression, and deep human-like feeling. ";
  } else if (stability > 0.8) {
    modifier += "Maintain extreme vocal stability, a highly steady pace, consistent tone, and professional composure, avoiding emotional fluctuations. ";
  } else {
    modifier += "Maintain a beautifully balanced, stable, and natural tone with warm, expressive inflections. ";
  }

  if (clarity > 0.8) {
    modifier += "Ensure absolute clarity, extremely crisp consonants, immaculate articulation, and standard proshashoniki/formal pronunciation. ";
  } else if (clarity < 0.45) {
    modifier += "Speak with a relaxed, casual, everyday colloquial flow. ";
  } else {
    modifier += "Ensure clean, standard, and beautiful standard pronunciation. ";
  }

  if (styleExaggeration > 0.8) {
    modifier += "Fully amplify your unique signature voice artist personality, emphasizing your personal style, charisma, and expressiveness to the maximum limit. ";
  } else if (styleExaggeration < 0.4) {
    modifier += "Keep the delivery simple, direct, quiet, and beautifully understated. ";
  }

  // Pitch modifier
  if (pitch === "Low") {
    modifier += "Speak in a lower pitch register, emphasizing deep resonance and rich chest tones. ";
  } else if (pitch === "High") {
    modifier += "Speak in a higher pitch register, giving a brighter, lighter, and more vibrant vocal projection. ";
  } else {
    modifier += "Speak in your natural standard pitch register. ";
  }

  // Emotion modifier
  if (emotion === "Happy") {
    modifier += "Infuse your voice with warmth, delight, smiling vocal inflections, and joyful enthusiasm. ";
  } else if (emotion === "Sad") {
    modifier += "Deliver the text with a soft, melancholic, solemn tone, full of quiet empathy and gentle sadness. ";
  } else if (emotion === "Excited") {
    modifier += "Speak with peak high energy, dynamic passion, dramatic emphasis, and intense spirited excitement! ";
  } else if (emotion === "Narrative") {
    modifier += "Deliver in a clean, beautifully spaced storytelling voice, ideal for audiobooks or documentaries. ";
  } else if (emotion === "Dramatic") {
    modifier += "Speak with theatrical power, theatrical pacing, dramatic emphasis on key words, and deep expressive gravitas. ";
  }

  // Custom persona-based instructions for professional, human-like, non-robotic Bengali voice delivery
  let styledPrompt = `Say in clear Bengali/Bangla: ${text}`;
  
  switch (selectedVoice) {
    case "Zephyr": // Tania
      styledPrompt = `You are Tania, a professional Bengali/Bangla female voice artist. Speak the following text in a soft, warm, natural, and highly expressive tone, perfect for premium storytelling and narration. ${modifier} Avoid all robotic cadences, speak with human-like breathing pauses and standard pronunciation. Text: ${text}`;
      break;
    case "Kore": // Sabiha
      styledPrompt = `You are Sabiha, a professional Bengali/Bangla female news anchor and corporate presenter. Read the following text in a crystal clear, highly precise, professional, and formal tone. ${modifier} Keep pronunciation absolutely standard and articulate every word clearly. Text: ${text}`;
      break;
    case "Puck": // Rahat
      styledPrompt = `You are Rahat, an energetic, lively, and highly persuasive Bengali/Bangla male commercial voice artist. Read the following text with enthusiastic energy, friendly charm, and high confidence, perfect for commercial ads and announcements. ${modifier} Text: ${text}`;
      break;
    case "Charon": // Sharif
      styledPrompt = `You are Sharif, a professional Bengali/Bangla male voice artist with a deep, rich, and highly resonant voice. Read the following text with profound depth, serious authority, and deliberate dramatic pauses, perfect for history documentaries or deep storytelling. ${modifier} Text: ${text}`;
      break;
    case "Hermes": // Soumya
      styledPrompt = `You are Soumya, a warm, friendly, and completely casual Bengali/Bangla male podcaster. Speak the following text in a conversational, daily-life, natural, and friendly tone. ${modifier} Keep the cadence relaxed, warm, and highly relatable, like speaking to a friend. Text: ${text}`;
      break;
    case "Aoede": // Ananya
      styledPrompt = `You are Ananya, a highly creative and emotional Bengali/Bangla female voice artist. Read the following text with deep artistic sensitivity, beautiful poetic modulation, and sweet emotional resonance, perfect for poetry recitation and dramatic stories. ${modifier} Text: ${text}`;
      break;
    case "Fenrir": // Ripon
      styledPrompt = `You are Ripon, a highly powerful, bold, and motivational Bengali/Bangla male speaker. Read the following text with commanding passion, high energy, and inspiring confidence, perfect for public speeches and declarations. ${modifier} Text: ${text}`;
      break;
    case "Anemone": // Nabila
      styledPrompt = `You are Nabila, a sweet, soft, and exceptionally soothing female Bengali/Bangla voice artist. Read the following text in a quiet, peaceful, slow-paced, and relaxing whisper-like voice, perfect for guided meditations and calming stories. ${modifier} Text: ${text}`;
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
