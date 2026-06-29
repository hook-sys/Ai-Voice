import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Setup file-based caching directory for TTS audio files to save free quota (10 requests/day)
const CACHE_DIR = path.join(process.cwd(), "tts-cache");
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function getCacheFilename(text: string, voice: string, settings: any): string {
  const normalizedText = text.trim();
  const serializedSettings = JSON.stringify(settings || {});
  const dataToHash = `${normalizedText}|${voice}|${serializedSettings}`;
  const hash = crypto.createHash("sha256").update(dataToHash).digest("hex");
  return path.join(CACHE_DIR, `${hash}.json`);
}

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
  const customApiKey = req.headers["x-api-key"] as string | undefined;

  const clientAI = customApiKey 
    ? new GoogleGenAI({
        apiKey: customApiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : ai;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Text is required and must be a string." });
    return;
  }

  const selectedVoice = voice || "Zephyr";

  const cachePath = getCacheFilename(text, selectedVoice, settings);
  if (fs.existsSync(cachePath)) {
    try {
      const cachedData = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
      console.log(`[Cache Hit] Serving audio from cache for voice: ${selectedVoice}`);
      res.json(cachedData);
      return;
    } catch (e) {
      console.error("Failed to read TTS cache:", e);
    }
  }

  let baseVoice = selectedVoice;
  let dialectPrompt = "";
  let textToSpeak = text;

  if (selectedVoice.startsWith("Pro_")) {
    const voiceMapping: Record<string, { base: string, instruction: string }> = {
      Pro_Female_1: {
        base: "Kore",
        instruction: "You are Sultana, a highly professional Bengali female news anchor. Speak with clear standard pronunciation, formal tone, excellent articulation, and newsroom pacing."
      },
      Pro_Male_1: {
        base: "Charon",
        instruction: "You are Mansur, a professional male voiceover artist with a deep and authoritative voice. Deliver the text with standard news anchor pacing and serious formal tone."
      },
      Pro_Female_2: {
        base: "Zephyr",
        instruction: "You are Farhana, an educational tutor. Deliver in a clear, friendly, structured, and easy-to-follow female voice, perfect for student lectures and online courses."
      },
      Pro_Male_2: {
        base: "Hermes",
        instruction: "You are Zubair, an e-learning training specialist. Speak in an encouraging, clear, and perfectly spaced male voice, ideal for professional tutorials."
      },
      Pro_Female_3: {
        base: "Kore",
        instruction: "You are Tasnim, a corporate female presenter. Speak with business-like confidence, professional clarity, and modern presentation style."
      },
      Pro_Male_3: {
        base: "Puck",
        instruction: "You are Riaz, a male corporate board presenter. Speak with peak professionalism, professional authority, and confident corporate pacing."
      },
      Pro_Female_4: {
        base: "Anemone",
        instruction: "You are Nusrat, a polite customer service agent. Speak in a helpful, warm, gentle, and highly supportive female voice."
      },
      Pro_Male_4: {
        base: "Hermes",
        instruction: "You are Sajid, a polite male customer support executive. Speak with a friendly, helpful, respectful, and smooth tone."
      },
      Pro_Female_5: {
        base: "Zephyr",
        instruction: "You are Israt, a professional commercial ad voiceover female artist. Deliver with highly persuasive charm, exciting energy, and modern radio style."
      },
      Pro_Male_5: {
        base: "Puck",
        instruction: "You are Tanvir, an energetic male advertisement voiceover artist. Deliver with enthusiastic, punchy, persuasive, and dynamic brand energy."
      },
      Pro_Female_6: {
        base: "Aoede",
        instruction: "You are Afsana, a literary voice artist. Deliver with artistic sensitivity, deep emotion, and poetic rhythm, perfect for high literature and drama."
      },
      Pro_Male_6: {
        base: "Charon",
        instruction: "You are Mahbub, an expert poetry reciter. Speak with deep dramatic resonance, theatrical modulation, and artistic pause styling."
      },
      Pro_Female_7: {
        base: "Aoede",
        instruction: "You are Mehnaz, a documentary female narrator. Deliver with deep narration pacing, natural warmth, and informative authority."
      },
      Pro_Male_7: {
        base: "Charon",
        instruction: "You are Kibriya, a male documentary narrator. Speak with a profound, deep, historical, and intellectual tone."
      },
      Pro_Female_8: {
        base: "Zephyr",
        instruction: "You are Sadia, a conversational female podcaster. Speak in a casual, daily-life, friendly, and completely natural tone."
      },
      Pro_Male_8: {
        base: "Hermes",
        instruction: "You are Adnan, a casual male talk show host. Speak in a relaxed, friendly, and relatable conversational pacing."
      },
      Pro_Female_9: {
        base: "Anemone",
        instruction: "You are Monira, a meditation guide. Speak in an exceptionally quiet, slow-paced, soothing, and serene whisper-like voice."
      },
      Pro_Male_9: {
        base: "Fenrir",
        instruction: "You are Zahid, a passionate motivational speaker. Speak with high-intensity inspiration, high-spirit, and empowering masculine energy."
      },
      Pro_Female_10: {
        base: "Aoede",
        instruction: "You are Jannat, a childrens story narrator. Speak in a playful, lively, expressive, and magical sweet tone."
      },
      Pro_Male_10: {
        base: "Charon",
        instruction: "You are Ashraf, a suspense/thriller narrator. Speak with a low, tense, thrilling, dramatic, and highly engaging tone."
      },
      Pro_Female_11: {
        base: "Kore",
        instruction: "You are Farida, a senior female news presenter. Speak with immaculate classical Bangla pronunciation, high gravity, and serious broadcast cadence."
      },
      Pro_Male_11: {
        base: "Charon",
        instruction: "You are Aslam, a senior male news presenter. Deliver the text with an authoritative, clear, and perfectly spaced newsroom cadence."
      },
      Pro_Female_12: {
        base: "Aoede",
        instruction: "You are Sabina, a professional female documentary narrator. Deliver with warmth, natural informative tone, and beautiful descriptive intonation."
      },
      Pro_Male_12: {
        base: "Charon",
        instruction: "You are Kabir, a mature male documentary narrator. Deliver with a deep, resonant, historical, and highly authoritative tone."
      },
      Pro_Female_13: {
        base: "Zephyr",
        instruction: "You are Rifat, an IT and technology tutor. Deliver in a clear, friendly, and highly steady academic voice."
      },
      Pro_Male_13: {
        base: "Hermes",
        instruction: "You are Tareq, a science and IT instructor. Deliver in an engaging, highly structured, clear, and easy-to-follow male tutorial voice."
      },
      Pro_Female_14: {
        base: "Anemone",
        instruction: "You are Shamima, a polite customer service representative. Speak with welcoming, smooth, and highly supportive soft tones."
      },
      Pro_Male_14: {
        base: "Hermes",
        instruction: "You are Rafiq, a polite male support supervisor. Speak with friendly, helpful, and smooth conversational cadence."
      },
      Pro_Female_15: {
        base: "Kore",
        instruction: "You are Nusrat, a business pitch presenter. Speak with modern, confident, energetic marketing tones and professional pitch cadence."
      },
      Pro_Male_15: {
        base: "Puck",
        instruction: "You are Jamil, a financial presenter. Speak with absolute professional authority, financial clarity, and confident presentation style."
      },
      Pro_Female_16: {
        base: "Aoede",
        instruction: "You are Mahjabin, a literary recite artist. Deliver with deep poetic resonance, dramatic warm inflections, and artistic timing."
      },
      Pro_Male_16: {
        base: "Charon",
        instruction: "You are Sourav, an expert theatrical poetry reciter. Speak with deep dramatic resonance, poetic pauses, and rich classical modulation."
      },
      Pro_Female_17: {
        base: "Zephyr",
        instruction: "You are Nargis, a lively podcast co-host. Deliver with highly energetic, conversational, friendly, and completely casual tone."
      },
      Pro_Male_17: {
        base: "Hermes",
        instruction: "You are Nahid, a casual tech podcaster. Speak in a relaxed, friendly, and relatable conversational pacing."
      },
      Pro_Female_18: {
        base: "Zephyr",
        instruction: "You are Keya, a premium commercial advertisement voiceover female artist. Deliver with highly persuasive charm, modern radio style, and vibrant brand energy."
      },
      Pro_Male_18: {
        base: "Puck",
        instruction: "You are Imtiaz, an energetic commercial narrator. Deliver with enthusiastic, punchy, persuasive, and dynamic brand promo energy."
      },
      Pro_Female_19: {
        base: "Anemone",
        instruction: "You are Rumana, a soft meditation instructor. Speak in an exceptionally calm, slow-paced, serene, whisper-like, and comforting voice."
      },
      Pro_Male_19: {
        base: "Fenrir",
        instruction: "You are Zakir, a voiceover artist for mindfulness. Speak in a low-pitch, calming, extremely steady, and soothing male voice."
      },
      Pro_Female_20: {
        base: "Aoede",
        instruction: "You are Mimi, a children story narrator. Speak with extremely lively, highly expressive, playful, and cheerful magical tones."
      },
      Pro_Male_20: {
        base: "Charon",
        instruction: "You are Shohel, a dramatic suspense narrator. Speak with low, tense, thrilling, dramatic, and highly engaging mystery audiobook tone."
      }
    };

    const config = voiceMapping[selectedVoice];
    if (config) {
      baseVoice = config.base;
      dialectPrompt = config.instruction;
    }
  } else if (selectedVoice.includes("_")) {
    const isFemale = selectedVoice.toLowerCase().includes("female");
    if (isFemale) {
      if (selectedVoice.includes("story")) {
        baseVoice = "Aoede";
      } else if (selectedVoice.includes("ads")) {
        baseVoice = "Kore";
      } else {
        baseVoice = "Zephyr";
      }
    } else {
      if (selectedVoice.includes("story")) {
        baseVoice = "Charon";
      } else if (selectedVoice.includes("ads")) {
        baseVoice = "Fenrir";
      } else {
        baseVoice = "Hermes";
      }
    }

    let dialectName = "";
    if (selectedVoice.startsWith("Noakhali")) {
      dialectName = "Noakhali regional dialect (নোয়াখালীর আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Chittagong")) {
      dialectName = "Chittagong regional dialect (চাটগাঁইয়া আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Sylhet")) {
      dialectName = "Sylhet regional dialect (সিলেটি আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Barisal")) {
      dialectName = "Barisal regional dialect (বরিশালের আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Comilla")) {
      dialectName = "Comilla regional dialect (কুমিল্লার আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Dhaka")) {
      dialectName = "Old Dhaka dialect (পুরান ঢাকাইয়া কুত্তি ভাষা)";
    } else if (selectedVoice.startsWith("Kolkata")) {
      dialectName = "Kolkata accent/dialect (কলকাতার কথ্য বাংলা)";
    } else if (selectedVoice.startsWith("Mymensingh")) {
      dialectName = "Mymensingh regional dialect (ময়মনসিংহের আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Khulna")) {
      dialectName = "Khulna regional dialect (খুলনার আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Rajshahi")) {
      dialectName = "Rajshahi regional dialect (রাজশাহীর আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Rangpur")) {
      dialectName = "Rangpur regional dialect (রংপুরের বাহে আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Jessore")) {
      dialectName = "Jessore regional dialect (যশোরের আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Midnapore")) {
      dialectName = "Midnapore regional dialect (মেদিনীপুরের আঞ্চলিক ভাষা)";
    } else if (selectedVoice.startsWith("Purulia")) {
      dialectName = "Purulia regional dialect (পুরুলিয়ার আঞ্চলিক ভাষা)";
    }

    if (dialectName) {
      dialectPrompt = `Speak strictly in the standard pronunciation of the following translated words in ${dialectName}.`;
      try {
        console.log(`Rewriting text to ${dialectName} using gemini-2.5-flash...`);
        const rewriteResponse = await clientAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `You are an expert linguist specializing in Bengali regional dialects and colloquial phonetics. 
Translate and rewrite the following standard Bengali text into authentic, extremely natural, and pure ${dialectName}.
Write the output using Bengali script, capturing the exact regional vocabulary, grammar, pronunciation, local idioms, and phonetic spelling of the dialect.
For example, if Noakhali dialect is selected, rewrite 'পানি' as 'হানি', 'আমি' as 'আঁই', 'পাগল' as 'হাগল', and change standard sentence structures to natural Noakhali colloquial structures.
Provide ONLY the translated regional text. Do not include any explanations, standard text, introduction, or markdown formatting.

Standard Bengali Text: ${text}`
        });

        const rewritten = rewriteResponse.text?.trim();
        if (rewritten) {
          textToSpeak = rewritten;
          console.log(`Original text: ${text}`);
          console.log(`Rewritten text: ${textToSpeak}`);
        }
      } catch (err) {
        console.error("Failed to rewrite text for dialect:", err);
      }
    }
  }

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
  let styledPrompt = "";
  
  const voiceInstructions: Record<string, string> = {
    Zephyr: "You are Tania, a professional Bengali/Bangla female voice artist. Speak in a soft, warm, natural, and highly expressive tone, perfect for premium storytelling and narration.",
    Kore: "You are Sabiha, a professional Bengali/Bangla female news anchor and corporate presenter. Read in a crystal clear, highly precise, professional, and formal tone.",
    Puck: "You are Rahat, an energetic, lively, and highly persuasive Bengali/Bangla male commercial voice artist. Read with enthusiastic energy, friendly charm, and high confidence, perfect for commercial ads and announcements.",
    Charon: "You are Sharif, a professional Bengali/Bangla male voice artist with a deep, rich, and highly resonant voice. Read with profound depth, serious authority, and deliberate dramatic pauses, perfect for history documentaries or deep storytelling.",
    Hermes: "You are Soumya, a warm, friendly, and completely casual Bengali/Bangla male podcaster. Speak in a conversational, daily-life, natural, and friendly tone.",
    Aoede: "You are Ananya, a highly creative and emotional Bengali/Bangla female voice artist. Read with deep artistic sensitivity, beautiful poetic modulation, and sweet emotional resonance, perfect for poetry recitation and dramatic stories.",
    Fenrir: "You are Ripon, a highly powerful, bold, and motivational Bengali/Bangla male speaker. Read with commanding passion, high energy, and inspiring confidence, perfect for motivational speeches, dynamic coaching, and bold declarations.",
    Anemone: "You are Nabila, a sweet, soft, and exceptionally soothing female Bengali/Bangla voice artist. Read in a quiet, peaceful, slow-paced, and relaxing whisper-like voice, perfect for guided meditation, relaxing audiobooks, and wellness sleep guides."
  };

  const baseInstruction = voiceInstructions[baseVoice] || "Speak in a clear, natural Bengali/Bangla human-like voice.";
  
  if (dialectPrompt) {
    styledPrompt = `${baseInstruction} CRITICAL: ${dialectPrompt} ${modifier} Avoid all robotic cadences, speak with human-like breathing pauses. Text: ${textToSpeak}`;
  } else {
    styledPrompt = `${baseInstruction} ${modifier} Avoid all robotic cadences, speak with human-like breathing pauses and standard pronunciation. Text: ${textToSpeak}`;
  }
  
  try {
    // Call the Gemini TTS API model
    const response = await clientAI.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: styledPrompt }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: baseVoice },
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

    const responseData = {
      success: true,
      pcmData: base64Pcm,
      wavData: base64Wav,
      voice: selectedVoice,
    };

    // Save to cache asynchronously
    fs.writeFile(cachePath, JSON.stringify(responseData), (err) => {
      if (err) console.error("Failed to write to TTS cache:", err);
    });

    res.json(responseData);
  } catch (err: any) {
    console.error("Gemini TTS Error:", err);
    
    const errMsg = err?.message || (typeof err === "object" ? JSON.stringify(err) : String(err)) || "";
    const isQuotaError = errMsg.includes("429") || 
                        errMsg.includes("quota") || 
                        errMsg.includes("RESOURCE_EXHAUSTED") || 
                        errMsg.includes("limit: 10") ||
                        errMsg.includes("Quota exceeded");

    if (isQuotaError) {
      res.status(429).json({
        error: "দুঃখিত, Gemini TTS-এর দৈনিক ফ্রি ব্যবহারের লিমিট (১০টি রিকোয়েস্ট) শেষ হয়ে গেছে। দয়া করে Settings > Secrets-এ গিয়ে আপনার নিজের API Key যোগ করুন, অথবা আগামীকালের জন্য অপেক্ষা করুন।",
        isQuotaExceeded: true
      });
      return;
    }

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
