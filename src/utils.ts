import { VoiceProfile } from "./types";

export const VOICE_PROFILES: VoiceProfile[] = [
  {
    id: "Zephyr",
    name: "Tania",
    banglaName: "তানিয়া (বিজ্ঞাপন ও স্টোরি)",
    gender: "Female",
    category: "ads",
    banglaCategory: "বিজ্ঞাপন ও স্টোরি",
    avatarText: "টি",
    description: "Soft, warm, and highly expressive female voice. Perfect for storytelling, emotional narratives, and premium commercials.",
    banglaDescription: "কোমল, অত্যন্ত প্রকাশভঙ্গি-সমৃদ্ধ ও আকর্ষণীয় নারী কণ্ঠ। স্টোরিটেলিং, অনুভূতিপূর্ণ বিবরণ এবং প্রিমিয়াম বিজ্ঞাপনের জন্য অনন্য।"
  },
  {
    id: "Kore",
    name: "Sabiha",
    banglaName: "সাবিহা (সংবাদ ও ডকুমেন্টারি)",
    gender: "Female",
    category: "news",
    banglaCategory: "সংবাদ ও প্রাতিষ্ঠানিক",
    avatarText: "এস",
    description: "Clear, precise, and professional female voice. Best for news, training videos, and corporate presentations.",
    banglaDescription: "স্পষ্ট, নিখুঁত ও অত্যন্ত মার্জিত পেশাদার নারী কণ্ঠ। সংবাদ পাঠ, টিউটোরিয়াল এবং প্রাতিষ্ঠানিক প্রজেক্টের জন্য সেরা।"
  },
  {
    id: "Puck",
    name: "Rahat",
    banglaName: "রাহাত (বিজ্ঞাপন ও প্রচার)",
    gender: "Male",
    category: "ads",
    banglaCategory: "বিজ্ঞাপন ও প্রচার",
    avatarText: "আর",
    description: "Energetic, lively, and highly persuasive male voice. Ideal for commercial ads, YouTube intros, and announcements.",
    banglaDescription: "উদ্যমী, সজীব এবং দারুণ আকর্ষণীয় পুরুষ কণ্ঠ। বাণিজ্যিক বিজ্ঞাপন, ইউটিউব প্রচার এবং ঘোষণার জন্য দারুণ উপযোগী।"
  },
  {
    id: "Charon",
    name: "Sharif",
    banglaName: "শরিফ (অডিওবুক ও বর্ণনা)",
    gender: "Male",
    category: "story",
    banglaCategory: "গল্প ও কবিতা",
    avatarText: "এস",
    description: "Deep, resonant, and formal male voice. Perfect for historical documentaries, serious audiobooks, and deep narration.",
    banglaDescription: "গম্ভীর, প্রতিধ্বনিত ও শান্ত পুরুষ কণ্ঠ। প্রামাণ্যচিত্রের ধারাবর্ণনা, গুরুগম্ভীর অডিওবুক ও কবিতার জন্য চমৎকার।"
  },
  {
    id: "Hermes",
    name: "Soumya",
    banglaName: "সৌম্য (পডকাস্ট ও কথাবন্ধু)",
    gender: "Male",
    category: "casual",
    banglaCategory: "পডকাস্ট ও সাধারণ কথোপকথন",
    avatarText: "এস",
    description: "Friendly, casual, and completely natural male voice. Perfect for podcast hosting, casual conversations, and dialogues.",
    banglaDescription: "বন্ধুসুলভ, সাবলীল এবং সম্পূর্ণ প্রাকৃতিক পুরুষ কণ্ঠ। পডকাস্ট হোস্টিং, সাধারণ কথোপকথন এবং সংলাপের জন্য মানানসই।"
  },
  {
    id: "Aoede",
    name: "Ananya",
    banglaName: "অনন্যা (আবৃত্তি ও নাটক)",
    gender: "Female",
    category: "story",
    banglaCategory: "গল্প ও কবিতা",
    avatarText: "এ",
    description: "Highly artistic, emotional, and poetic female voice. Ideal for emotional dramas, romantic narratives, and poetry recitation.",
    banglaDescription: "অত্যন্ত শৈল্পিক ও আবেগপূর্ণ মিষ্টি নারী কণ্ঠ। আবেগঘন নাটকীয়তা, রোমান্টিক গল্প এবং কবিতা আবৃত্তির জন্য আদর্শ।"
  },
  {
    id: "Fenrir",
    name: "Ripon",
    banglaName: "রিপন (মোটিভেশনাল ও স্পিচ)",
    gender: "Male",
    category: "motivational",
    banglaCategory: "মোটিভেশনাল ও স্পিচ",
    avatarText: "আর",
    description: "Powerful, energetic, and commanding male voice. Designed for motivational speeches, dynamic coaching, and bold declarations.",
    banglaDescription: "বলিষ্ঠ, শক্তিশালী ও তেজস্বী পুরুষ কণ্ঠ। অনুপ্রেরণামূলক বক্তব্য, ডায়নামিক ট্রেইনিং এবং বলিষ্ঠ উপস্থাপনার জন্য সেরা।"
  },
  {
    id: "Anemone",
    name: "Nabila",
    banglaName: "নাবিলা (মেডিটেশন ও শান্ত কন্টেন্ট)",
    gender: "Female",
    category: "casual",
    banglaCategory: "মেডিটেশন ও সাধারণ কথোপকথন",
    avatarText: "এন",
    description: "Gentle, soothing, and sweet-toned female voice. Perfect for guided meditation, relaxing audiobooks, and wellness sleep guides.",
    banglaDescription: "পরম শান্ত, প্রশান্তিদায়ক ও মিষ্টি নারী কণ্ঠ। গাইডেড মেডিটেশন, রিল্যাক্সিং অডিওবুক এবং মানসিক সুস্থতার কন্টেন্টের জন্য উপযুক্ত।"
  }
];

/**
 * Creates an inline Web Worker to perform PCM-to-MP3 encoding using lamejs.
 * This runs in a separate thread so the UI thread is never blocked.
 */
export function createMp3EncoderWorker(): Worker {
  const workerCode = `
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.all.min.js');

    self.onmessage = function(e) {
      try {
        const { pcmBase64, sampleRate, bitrate } = e.data;
        
        if (!pcmBase64) {
          throw new Error("PCM data is missing.");
        }

        // Decode base64 to binary string, then to Uint8Array buffer
        const binaryString = self.atob(pcmBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // 16-bit PCM little-endian values
        const pcmData = new Int16Array(bytes.buffer);
        
        const rate = sampleRate || 24000;
        const bit = bitrate || 128;
        
        const mp3encoder = new self.lamejs.Mp3Encoder(1, rate, bit);
        const mp3Data = [];
        
        const sampleBlockSize = 1152;
        const totalSamples = pcmData.length;
        
        for (let i = 0; i < totalSamples; i += sampleBlockSize) {
          const sampleChunk = pcmData.subarray(i, i + sampleBlockSize);
          const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
          if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
          }
          
          // Post progress back to main thread
          const progress = Math.min(Math.round((i / totalSamples) * 100), 99);
          self.postMessage({ type: 'progress', progress: progress });
        }
        
        const mp3buf = mp3encoder.flush();
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
        
        self.postMessage({ type: 'progress', progress: 100 });
        
        // Create an MP3 blob inside the worker
        const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' });
        
        // Convert blob to ArrayBuffer so it can be transferred fast
        const reader = new FileReader();
        reader.onload = function(event) {
          const arrayBuffer = event?.target?.result;
          if (arrayBuffer) {
            self.postMessage({ type: 'done', arrayBuffer: arrayBuffer }, [arrayBuffer]);
          } else {
            self.postMessage({ type: 'error', error: 'Failed to read generated MP3 array buffer.' });
          }
        };
        reader.onerror = function() {
          self.postMessage({ type: 'error', error: 'FileReader failed to convert MP3 blob.' });
        };
        reader.readAsArrayBuffer(mp3Blob);

      } catch (error) {
        self.postMessage({ type: 'error', error: error.message || 'An error occurred during encoding.' });
      }
    };
  `;
  
  const blob = new Blob([workerCode], { type: "application/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

/**
 * ArrayBuffer helper to base64 string
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
