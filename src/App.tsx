import React, { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, 
  Mic, 
  Volume2, 
  FolderHeart, 
  History, 
  Download, 
  Flame, 
  Sliders, 
  Key, 
  HelpCircle, 
  LogOut, 
  Coins, 
  Database, 
  Sparkles, 
  Plus, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ChevronDown, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Check, 
  Trash2, 
  MoreHorizontal, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  ExternalLink, 
  Lock, 
  Settings, 
  CreditCard, 
  VolumeX, 
  Globe,
  Award,
  BookOpen,
  FolderDot,
  ArrowRight,
  UserCheck,
  Eye,
  EyeOff
} from "lucide-react";
import { AudioItem, VoiceId } from "./types";
import { VOICE_PROFILES, createMp3EncoderWorker, arrayBufferToBase64 } from "./utils";

// Custom ElevenLabs-Style Portrait Avatars mapping
const VOICE_IMAGES: Record<VoiceId, string> = {
  Puck: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", // Male 01
  Charon: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", // Male 02
  Hermes: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", // Male 03
  Fenrir: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80", // Male 04
  Zephyr: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", // Female 01
  Kore: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80", // Female 02
  Aoede: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", // Female 03
  Anemone: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" // Female 04
};

// Avatar representation for layout
const AVATAR_LIST = [
  { id: "Puck" as VoiceId, label: "Male 01", gender: "Male" },
  { id: "Charon" as VoiceId, label: "Male 02", gender: "Male" },
  { id: "Hermes" as VoiceId, label: "Male 03", gender: "Male" },
  { id: "Fenrir" as VoiceId, label: "Male 04", gender: "Male" },
  { id: "Zephyr" as VoiceId, label: "Female 01", gender: "Female" },
  { id: "Kore" as VoiceId, label: "Female 02", gender: "Female" },
  { id: "Aoede" as VoiceId, label: "Female 03", gender: "Female" },
  { id: "Anemone" as VoiceId, label: "Female 04", gender: "Female" }
];

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  time?: string;
}

// Sparkline graph SVGs helpers
function ChartSparkline({ color }: { color: string }) {
  return (
    <svg className="w-16 h-8 shrink-0" viewBox="0 0 100 30" fill="none">
      <path
        d="M0 25 Q15 5 30 18 T60 8 T90 22 L100 5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function App() {
  // Theme state: default to beautiful midnight dark style
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // States mirroring screenshot variables
  const [text, setText] = useState<string>(
    "বাংলা ভাষায় লেখা লিখুন বা পেস্ট করুন...\nকৃত্রিম বুদ্ধিমত্তার সাহায্যে অত্যাধুনিক টেক্সট টু স্পিচ প্রযুক্তি। আপনার লেখা টেক্সটকে প্রাকৃতিক ও প্রাণবন্ত কণ্ঠে রূপান্তর করুন। আপনার প্রেজেন্টেশন, ভিডিও, পডকাস্ট বা যেকোনো কন্টেন্টের জন্য ব্যবহার করুন আমাদের উন্নতমানের ভয়েস টেকনোলজি।"
  );
  const [inputTextTab, setInputTextTab] = useState<"type" | "import">("type");
  const [selectedVoice, setSelectedVoice] = useState<VoiceId>("Charon"); // Male 02 is selected by default in screenshot
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Bengali");
  const [speakingSpeed, setSpeakingSpeed] = useState<number>(1.0); // 1x
  const [pitch, setPitch] = useState<string>("Medium");
  const [emotion, setEmotion] = useState<string>("Neutral");
  const [outputFormat, setOutputFormat] = useState<string>("MP3");
  const [quality, setQuality] = useState<string>("HD");
  
  // Analytics Counters
  const [generatedToday, setGeneratedToday] = useState<number>(42);
  const [totalVoices, setTotalVoices] = useState<number>(28);
  const [storageUsedGB, setStorageUsedGB] = useState<number>(1.8);
  const [availableCredits, setAvailableCredits] = useState<number>(9850);

  // Notification Feed State
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", message: "সিস্টেম সফলভাবে চালু হয়েছে।", type: "success", time: "এখনই" },
    { id: "2", message: "নতুন হাই-কোয়ালিটি স্টুডিও ভয়েস যুক্ত করা হয়েছে।", type: "info", time: "৫ মিনিট আগে" },
    { id: "3", message: "বাংলা TTS ল্যাটেন্সি কমে ২৫০ms করা হয়েছে।", type: "success", time: "১ ঘণ্টা আগে" }
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // File drag states
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals States
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showApiKeysModal, setShowApiKeysModal] = useState(false);
  const [customGeminiKey, setCustomGeminiKey] = useState<string>(() => localStorage.getItem("GEMINI_USER_API_KEY") || "");
  const [showGeminiKey, setShowGeminiKey] = useState<boolean>(false);
  const [testingVoiceId, setTestingVoiceId] = useState<string | null>(null);

  // Background Cloned Voices (Simulated addition)
  const [clonedVoices, setClonedVoices] = useState<{name: string, gender: string}[]>([]);

  // Generator & Playback states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState<"none" | "gemini" | "wav" | "mp3">("none");
  const [workerProgress, setWorkerProgress] = useState(0);

  // Previewer loaded audio state (matches Column 3)
  const [currentAudioItem, setCurrentAudioItem] = useState<{
    id: string;
    text: string;
    voiceId: VoiceId;
    voiceName: string;
    wavBase64: string;
    mp3Base64?: string;
    createdAt: string;
    speed: number;
    sizeMB: string;
    quality: string;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);

  // Sidebar navigation active state
  const [activeSidebar, setActiveSidebar] = useState<string>("Text to Speech");

  // History state loaded from local storage or pre-seeded
  const [historyItems, setHistoryItems] = useState<AudioItem[]>(() => {
    const saved = localStorage.getItem("audio_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Table filtering and search states
  const [historySearch, setHistorySearch] = useState("");
  const [historyLangFilter, setHistoryLangFilter] = useState("All");
  const [historyTimeFilter, setHistoryTimeFilter] = useState("All");
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);

  // Voice Library section tabs
  const [libraryCategoryFilter, setLibraryCategoryFilter] = useState<"All" | "Professional" | "Regional" | "Male" | "Female" | "Premium" | "Studio">("All");

  // Refs for audio objects and waveforms
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasAnimId = useRef<number | null>(null);

  // Handle system notification alerts
  const triggerNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
      time: "এখনই"
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
    }, 5000);
  };

  const handleDismissNotif = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Seed standard pre-populated logs inside history on first run
  useEffect(() => {
    if (historyItems.length === 0) {
      const seeded: AudioItem[] = [
        {
          id: "seed-1",
          text: "বাংলা ভাষায় লেখা লিখুন বা পেস্ট করুন... কৃত্রিম বুদ্ধিমত্তার সাহায্যে অত্যাধুনিক টেক্সট টু স্পিচ প্রযুক্তি। আপনার লেখা টেক্সটকে রূপান্তর করুন।",
          voiceId: "Charon",
          voiceName: "Male 02 (Sharif)",
          createdAt: "25 May, 2024 10:30 PM",
          wavBase64: "", // Seeds can generate sample speaking voice on-the-fly or fallback
          mp3Base64: ""
        },
        {
          id: "seed-2",
          text: "ইউটিউব ন্যারেশন প্রজেক্ট। স্বাগতম আমার নতুন বাংলা ইউটিউব চ্যানেলে। আজ আমরা কথা বলবো কৃত্রিম বুদ্ধিমত্তা নিয়ে।",
          voiceId: "Zephyr",
          voiceName: "Female 01 (Tania)",
          createdAt: "25 May, 2024 09:15 PM",
          wavBase64: "",
          mp3Base64: ""
        },
        {
          id: "seed-3",
          text: "কর্পোরেট বার্ষিক মিটিং উপস্থাপনা এবং ডাবিং ফাইল। আমাদের কোম্পানির লাভ গত ত্রৈমাসিকে ৩০% বৃদ্ধি পেয়েছে।",
          voiceId: "Puck",
          voiceName: "Male 01 (Rahat)",
          createdAt: "25 May, 2024 08:40 PM",
          wavBase64: "",
          mp3Base64: ""
        },
        {
          id: "seed-4",
          text: "পডকাস্ট এপিসোড ১০। হ্যালো বন্ধুরা, আজকে আমাদের স্টুডিওতে বিশেষ অতিথি সৌম্য আছেন।",
          voiceId: "Kore",
          voiceName: "Female 02 (Sabiha)",
          createdAt: "25 May, 2024 07:25 PM",
          wavBase64: "",
          mp3Base64: ""
        },
        {
          id: "seed-5",
          text: "শিক্ষামূলক ভিডিও - মাধ্যমিক স্কুল পদার্থবিজ্ঞান ক্লাস ১। বল এবং গতি বিষয়ক আলোচনা।",
          voiceId: "Hermes",
          voiceName: "Male 03 (Soumya)",
          createdAt: "24 May, 2024 11:10 PM",
          wavBase64: "",
          mp3Base64: ""
        }
      ];
      setHistoryItems(seeded);
      localStorage.setItem("audio_history", JSON.stringify(seeded));
    }
  }, []);

  // Sync state items to storage
  useEffect(() => {
    localStorage.setItem("audio_history", JSON.stringify(historyItems));
  }, [historyItems]);

  // Handle Play/Pause in preview card
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Waveform visualization drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bars: number[] = Array.from({ length: 42 }, () => Math.random() * 5 + 4);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#818cf8"); // Indigo
      gradient.addColorStop(0.5, "#a855f7"); // Purple
      gradient.addColorStop(1, "#c084fc"); // Violet

      const barWidth = 3;
      const barGap = 4;
      const startX = (canvas.width - (bars.length * (barWidth + barGap))) / 2;

      bars.forEach((barHeight, idx) => {
        let currentHeight = barHeight;
        if (isPlaying) {
          // Fluctuating dynamics
          currentHeight = barHeight + Math.sin(Date.now() * 0.005 + idx * 0.3) * 12;
          if (currentHeight < 4) currentHeight = 4;
          if (currentHeight > 32) currentHeight = 32;
        } else {
          // Slow breathing waveform
          currentHeight = 4 + Math.sin(idx * 0.2) * 8;
        }

        const x = startX + idx * (barWidth + barGap);
        const y = (canvas.height - currentHeight) / 2;

        ctx.fillStyle = isPlaying ? gradient : "#475569";
        ctx.beginPath();
        // Rounded bars
        ctx.roundRect(x, y, barWidth, currentHeight, 2);
        ctx.fill();
      });

      canvasAnimId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (canvasAnimId.current) cancelAnimationFrame(canvasAnimId.current);
    };
  }, [isPlaying]);

  // Set up audio play states listeners
  const setupAudioListeners = (audio: HTMLAudioElement) => {
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
  };

  // Skip Back / Skip Forward (Hops through history)
  const handleSkipPrev = () => {
    if (historyItems.length === 0) return;
    const currentIndex = historyItems.findIndex((item) => currentAudioItem && item.id === currentAudioItem.id);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = historyItems.length - 1;
    loadHistoryItem(historyItems[prevIndex]);
    triggerNotification("পূর্ববর্তী প্রজেক্ট লোড করা হয়েছে।", "info");
  };

  const handleSkipNext = () => {
    if (historyItems.length === 0) return;
    const currentIndex = historyItems.findIndex((item) => currentAudioItem && item.id === currentAudioItem.id);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= historyItems.length) nextIndex = 0;
    loadHistoryItem(historyItems[nextIndex]);
    triggerNotification("পরবর্তী প্রজেক্ট লোড করা হয়েছে।", "info");
  };

  // Load selected history row to player
  const loadHistoryItem = async (item: AudioItem) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);

    // If item has no base64 content (i.e. is a pre-populated seed), generate high quality audio on demand for maximum experience!
    let mp3Src = item.mp3Base64;
    let wavSrc = item.wavBase64;

    if (!mp3Src && !wavSrc) {
      // Trigger dynamic generation on the fly so seed actually PLAYS sounds!
      setIsGenerating(true);
      setGenerationPhase("gemini");
      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(localStorage.getItem("GEMINI_USER_API_KEY") ? { "x-api-key": localStorage.getItem("GEMINI_USER_API_KEY")! } : {})
          },
          body: JSON.stringify({
            text: item.text,
            voice: item.voiceId,
            settings: {
              speed: speakingSpeed,
              pitch,
              emotion
            }
          })
        });
        if (response.ok) {
          const data = await response.json();
          wavSrc = data.wavData;
          
          // Background compress to MP3
          const worker = createMp3EncoderWorker();
          worker.postMessage({ pcmBase64: data.pcmData, sampleRate: 24000, bitrate: 128 });
          worker.onmessage = (e) => {
            if (e.data.type === "done") {
              const base64Mp3 = arrayBufferToBase64(e.data.arrayBuffer);
              item.mp3Base64 = base64Mp3;
              item.wavBase64 = data.wavData;
              // Save updated seeds
              setHistoryItems((prev) => prev.map((hi) => hi.id === item.id ? { ...hi, wavBase64: data.wavData, mp3Base64: base64Mp3 } : hi));
            }
          };
        } else {
          const errData = await response.json();
          triggerNotification(errData.error || "অডিও প্লে করতে সমস্যা হয়েছে।", "error");
          setIsGenerating(false);
          setGenerationPhase("none");
          return;
        }
      } catch (err) {
        console.error(err);
      }
      setIsGenerating(false);
      setGenerationPhase("none");
    }

    const audioSrc = mp3Src 
      ? `data:audio/mp3;base64,${mp3Src}` 
      : wavSrc 
        ? `data:audio/wav;base64,${wavSrc}`
        : "data:audio/wav;base64,"; // Fallback placeholder

    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;
    newAudio.volume = volume;
    newAudio.playbackRate = speakingSpeed;
    setupAudioListeners(newAudio);

    const voiceName = VOICE_PROFILES.find((v) => v.id === item.voiceId)?.banglaName || item.voiceId;

    setCurrentAudioItem({
      id: item.id,
      text: item.text,
      voiceId: item.voiceId,
      voiceName: voiceName,
      wavBase64: wavSrc || "",
      mp3Base64: mp3Src || "",
      createdAt: item.createdAt,
      speed: speakingSpeed,
      sizeMB: "1.2 MB",
      quality: "HD"
    });

    setIsPlaying(true);
  };

  // Generate Bangla speech via Gemini backend
  const handleGenerateVoice = async () => {
    if (!text.trim()) {
      triggerNotification("অনুগ্রহ করে টেক্সট বক্সে কিছু বাংলা লিখুন।", "error");
      return;
    }

    setIsGenerating(true);
    setWorkerProgress(0);
    setGenerationPhase("gemini");
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(localStorage.getItem("GEMINI_USER_API_KEY") ? { "x-api-key": localStorage.getItem("GEMINI_USER_API_KEY")! } : {})
        },
        body: JSON.stringify({
          text: text.trim(),
          voice: selectedVoice,
          settings: {
            speed: speakingSpeed,
            stability: 0.75,
            clarity: 0.75,
            styleExaggeration: 0.75,
            pitch,
            emotion
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Speech generation failed.");
      }

      setGenerationPhase("wav");
      const { pcmData, wavData } = await response.json();

      setGenerationPhase("mp3");

      const encoderWorker = createMp3EncoderWorker();
      encoderWorker.postMessage({
        pcmBase64: pcmData,
        sampleRate: 24000,
        bitrate: 128
      });

      encoderWorker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === "progress") {
          setWorkerProgress(msg.progress);
        } else if (msg.type === "done") {
          const mp3Base64 = arrayBufferToBase64(msg.arrayBuffer);
          
          // 1. Save to History logs
          const timestamp = new Date().toLocaleString("bn-BD", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          });

          const profile = VOICE_PROFILES.find((v) => v.id === selectedVoice);
          const voiceLabel = profile ? `${profile.gender === "Male" ? "Male" : "Female"} ${profile.id === "Puck" ? "01" : profile.id === "Charon" ? "02" : profile.id === "Hermes" ? "03" : "04"}` : selectedVoice;

          const newItem: AudioItem = {
            id: Math.random().toString(36).substring(2, 11),
            text: text.trim(),
            voiceId: selectedVoice,
            voiceName: `${voiceLabel} (${profile?.name || selectedVoice})`,
            createdAt: timestamp,
            wavBase64: wavData,
            mp3Base64: mp3Base64
          };

          setHistoryItems((prev) => [newItem, ...prev]);

          // 2. Load into column 3 preview player immediately
          const audioSrc = `data:audio/mp3;base64,${mp3Base64}`;
          const newAudio = new Audio(audioSrc);
          audioRef.current = newAudio;
          newAudio.volume = volume;
          newAudio.playbackRate = speakingSpeed;
          setupAudioListeners(newAudio);

          setCurrentAudioItem({
            id: newItem.id,
            text: text.trim(),
            voiceId: selectedVoice,
            voiceName: `${voiceLabel} (${profile?.name || selectedVoice})`,
            wavBase64: wavData,
            mp3Base64: mp3Base64,
            createdAt: timestamp,
            speed: speakingSpeed,
            sizeMB: `${(mp3Base64.length * 0.75 / 1024 / 1024).toFixed(1)} MB`,
            quality: quality
          });

          // 3. Update dashboard analytics indicators
          setGeneratedToday((prev) => prev + 1);
          setStorageUsedGB((prev) => parseFloat((prev + 0.05).toFixed(2)));
          setAvailableCredits((prev) => Math.max(prev - 120, 0));

          setIsPlaying(true);
          triggerNotification("সফলভাবে অডিও তৈরি সম্পন্ন হয়েছে!", "success");
          
          // Cleanup
          setIsGenerating(false);
          setGenerationPhase("none");
          setWorkerProgress(0);
          encoderWorker.terminate();
        } else if (msg.type === "error") {
          throw new Error("Lame MP3 Encoder failed.");
        }
      };

    } catch (err: any) {
      console.error(err);
      triggerNotification(err.message || "ভয়েস জেনারেট করার সময় সমস্যা হয়েছে।", "error");
      setIsGenerating(false);
      setGenerationPhase("none");
    }
  };

  // Preview custom artist directly from Voice Library Card
  const handleTestVoiceSample = async (voiceId: VoiceId, e: React.MouseEvent) => {
    e.stopPropagation();
    if (testingVoiceId) return;
    
    setTestingVoiceId(voiceId);
    triggerNotification(`${voiceId} টেস্ট করার জন্য অডিও রেন্ডার করা হচ্ছে...`, "info");
    
    try {
      const sampleTexts: Record<string, string> = {
        Puck: "হ্যালো, আমি রাহাত। আমি খুব উদ্যমী এবং বিজ্ঞাপনের জন্য উপযুক্ত কণ্ঠস্বর।",
        Charon: "নমস্কার, আমি শরিফ। গভীর গম্ভীর ভাবপূর্ণ উচ্চারণে আপনার প্রামাণ্যচিত্র সাজাব।",
        Hermes: "হ্যালো বন্ধু, আমি সৌম্য। পডকাস্টের জন্য খুব সাধারণ ও ঘরোয়া কথা বলছি।",
        Fenrir: "স্বাগতম, আমি রিপন। গুরুত্বপূর্ণ ঘোষণা বা মোটিভেশনাল স্পিচ দিতে আমি প্রস্তুত।",
        Zephyr: "নমস্কার, আমি তানিয়া। আমি বিজ্ঞাপনের সাবলীল বাচনভঙ্গির জন্য উপযুক্ত।",
        Kore: "হ্যালো, আমি সাবিহা। খবর বা প্রাতিষ্ঠানিক বার্তা পাঠের জন্য আমার কণ্ঠস্বর প্রফেশনাল।",
        Aoede: "নমস্কার, আমি অনন্যা। গভীর আবেগ এবং শৈল্পিক সুরের সাথে আবৃত্তি করতে পারি।",
        Anemone: "শুভ দিন, আমি নাবিলা। পরম শান্ত ও প্রশান্তিদায়ক কণ্ঠে মেডিটেশন উপস্থাপন করব।"
      };

      let textToUse = sampleTexts[voiceId];
      if (!textToUse) {
        const profile = VOICE_PROFILES.find((v) => v.id === voiceId);
        const name = profile?.name || "শিল্পী";
        const dialectName = profile?.banglaCategory || "আঞ্চলিক ভাষা";
        textToUse = `নমস্কার, আমি ${name}। আমি ${dialectName} টানে কথা বলছি। কেমন আছেন আপনি?`;
      }

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(localStorage.getItem("GEMINI_USER_API_KEY") ? { "x-api-key": localStorage.getItem("GEMINI_USER_API_KEY")! } : {})
        },
        body: JSON.stringify({
          text: textToUse,
          voice: voiceId,
          settings: { speed: 1.0, pitch: "Medium", emotion: "Neutral" }
        })
      });

      if (response.ok) {
        const { wavData } = await response.json();
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);

        const testAudio = new Audio(`data:audio/wav;base64,${wavData}`);
        audioRef.current = testAudio;
        testAudio.volume = volume;
        setupAudioListeners(testAudio);

        const profile = VOICE_PROFILES.find((v) => v.id === voiceId);
        const idx = AVATAR_LIST.findIndex((a) => a.id === voiceId);
        const label = AVATAR_LIST[idx]?.label || voiceId;

        setCurrentAudioItem({
          id: `sample-${voiceId}`,
          text: textToUse,
          voiceId,
          voiceName: `${label} (${profile?.name || voiceId})`,
          wavBase64: wavData,
          createdAt: "নমুনা ফাইল",
          speed: 1.0,
          sizeMB: "0.2 MB",
          quality: "HD"
        });

        setIsPlaying(true);
        triggerNotification(`আর্টিস্ট ${profile?.banglaName || voiceId} এর ভয়েস চালু হয়েছে।`, "success");
      } else {
        const errorData = await response.json();
        triggerNotification(errorData.error || "টেস্ট ভয়েস জেনারেট করতে সমস্যা হয়েছে।", "error");
      }
    } catch (err) {
      triggerNotification("টেস্ট ভয়েস চালু করতে সমস্যা হয়েছে।", "error");
    } finally {
      setTestingVoiceId(null);
    }
  };

  // Drag over text file handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleTextFileImport(e.dataTransfer.files[0]);
    }
  };

  const handleTextFileImport = (file: File) => {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content.slice(0, 5000));
        setInputTextTab("type");
        triggerNotification("টেক্সট ফাইল সফলভাবে লোড করা হয়েছে!", "success");
      };
      reader.readAsText(file);
    } else {
      triggerNotification("শুধুমাত্র টেক্সট (.txt) ফাইল আপলোড করুন।", "error");
    }
  };

  // Helper to trigger direct downloads
  const handleDownloadFile = (base64Data: string, mimeType: string, filename: string) => {
    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerNotification(`${filename} ডাউনলোড শুরু হয়েছে।`, "success");
    } catch (err) {
      triggerNotification("ডাউনলোড ব্যর্থ হয়েছে।", "error");
    }
  };

  const handleDownloadActiveItem = () => {
    if (!currentAudioItem) return;
    const isWav = outputFormat === "WAV";
    const data = isWav ? currentAudioItem.wavBase64 : (currentAudioItem.mp3Base64 || currentAudioItem.wavBase64);
    const mime = isWav ? "audio/wav" : "audio/mp3";
    const ext = isWav ? "wav" : "mp3";
    handleDownloadFile(data, mime, `বাংলা_ভয়েস_প্রজেক্ট_${currentAudioItem.id}.${ext}`);
  };

  // Delete log row
  const handleDeleteRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    triggerNotification("অডিও ইতিহাস থেকে মুছে ফেলা হয়েছে।", "success");
  };

  // Filtered History list
  const filteredHistory = historyItems.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(historySearch.toLowerCase());
    const matchesLang = historyLangFilter === "All" || (historyLangFilter === "Bengali" && !item.text.match(/[a-zA-Z]{5,}/));
    return matchesSearch && matchesLang;
  });

  // Filtered Voice Library
  const filteredLibrary = VOICE_PROFILES.filter((voice) => {
    if (libraryCategoryFilter === "All") return true;
    if (libraryCategoryFilter === "Professional") return voice.id.startsWith("Pro_");
    if (libraryCategoryFilter === "Regional") return voice.id.includes("_") && !voice.id.startsWith("Pro_");
    if (libraryCategoryFilter === "Male") return voice.gender === "Male";
    if (libraryCategoryFilter === "Female") return voice.gender === "Female";
    if (libraryCategoryFilter === "Premium") return ["Zephyr", "Puck", "Fenrir"].includes(voice.id);
    if (libraryCategoryFilter === "Studio") return ["Charon", "Kore", "Aoede", "Anemone"].includes(voice.id);
    return true;
  });

  // Calculate format duration string
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  // Sync volume level to active audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync speaking speed level
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speakingSpeed;
    }
  }, [speakingSpeed]);

  // Simulated Voice Cloning Handler
  const handleCloneVoice = (name: string, gender: string) => {
    setClonedVoices((prev) => [...prev, { name, gender }]);
    triggerNotification(`ভয়েস '${name}' সফলভাবে ক্লোন করা হয়েছে! এটি এখন ভয়েস লাইব্রেরিতে প্রস্তুত।`, "success");
    setTotalVoices((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-zinc-100 font-sans antialiased overflow-x-hidden flex" id="main-ai-voice-studio">
      
      {/* SIDEBAR NAVIGATION PANEL (Styled exactly like the screenshot) */}
      <aside className="w-64 border-r border-[#151a30] bg-[#0b0e1a] shrink-0 p-5 flex flex-col justify-between hidden xl:flex">
        
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/30">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-sans font-extrabold text-sm text-white leading-tight uppercase tracking-wider">
                AI Voice Studio
              </h1>
              <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
                Text to Speech
              </p>
            </div>
          </div>

          {/* Nav Items list */}
          <nav className="space-y-1.5 pt-4">
            {[
              { label: "Dashboard", icon: LayoutDashboard },
              { label: "Text to Speech", icon: Mic },
              { label: "Voice Library", icon: FolderHeart },
              { label: "History", icon: History },
              { label: "Downloads", icon: Download },
              { label: "Favorites", icon: Flame },
              { label: "Settings", icon: Sliders },
              { label: "API Keys", icon: Key },
              { label: "Help & Support", icon: HelpCircle }
            ].map((item) => {
              const isSelected = activeSidebar === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSidebar(item.label);
                    if (item.label === "Settings") setShowSettingsModal(true);
                    if (item.label === "API Keys") setShowApiKeysModal(true);
                    if (item.label === "Help & Support") {
                      triggerNotification("হেল্প গাইড: টেক্সট লিখে জেনারেট করুন, অডিও ডাউনলোড করুন এবং ভয়েস কাস্টমাইজ করুন।", "info");
                    }
                    // Scroll to relevant section if on dashboard
                    if (item.label === "History") {
                      document.getElementById("recent-history-section")?.scrollIntoView({ behavior: "smooth" });
                    }
                    if (item.label === "Voice Library") {
                      document.getElementById("voice-library-section")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/20 text-indigo-400 font-extrabold shadow-inner" 
                      : "text-zinc-400 hover:bg-[#111629] hover:text-zinc-200 border border-transparent"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-zinc-400'}`} />
                  {item.label === "Text to Speech" ? "টেক্সট টু স্পিচ" : item.label === "Voice Library" ? "ভয়েস লাইব্রেরি" : item.label === "History" ? "ইতিহাস" : item.label === "Downloads" ? "ডাউনলোডস" : item.label === "Favorites" ? "ফেভারিটস" : item.label === "Settings" ? "সেটিংস" : item.label === "API Keys" ? "API কীসমূহ" : item.label === "Help & Support" ? "হেল্প ও সাপোর্ট" : item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Cards footer */}
        <div className="space-y-3.5 pt-6 border-t border-[#151a30]">
          {/* Available Credits Card */}
          <div 
            onClick={() => setShowUpgradeModal(true)}
            className="bg-[#111528] border border-[#1d2340] rounded-xl p-3.5 cursor-pointer hover:border-indigo-500/30 transition-all relative overflow-hidden group"
          >
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1 translate-y-1">
              <Coins className="w-12 h-12 text-yellow-400" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
              <span>Available Credits</span>
              <Coins className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/10 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-lg font-black text-white font-mono tracking-tight">{availableCredits.toLocaleString()}</div>
            <div className="text-[9px] text-zinc-500 mt-0.5">Valid until 20 May, 2025</div>
            {/* Progress indicator */}
            <div className="w-full bg-[#181f3b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "78%" }} />
            </div>
          </div>

          {/* Storage Used Card */}
          <div className="bg-[#111528] border border-[#1d2340] rounded-xl p-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
              <span>Storage Used</span>
              <Database className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xs font-black text-white font-mono">{storageUsedGB} GB <span className="text-[10px] text-zinc-500 font-normal">/ 10 GB</span></div>
            <div className="text-[9px] text-zinc-500 mt-0.5">18% of 10 GB used</div>
            {/* Progress indicator */}
            <div className="w-full bg-[#181f3b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "18%" }} />
            </div>
          </div>

          {/* Upgrade to Pro card */}
          <div className="bg-gradient-to-tr from-purple-950/50 to-indigo-950/50 border border-purple-500/20 rounded-xl p-3.5 text-center">
            <Award className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-black text-white">Upgrade to Pro</h4>
            <p className="text-[10px] text-zinc-400 mt-1 mb-2.5 leading-relaxed">
              Unlock premium voices, high quality audio & more features.
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-[10px] py-1.5 px-3 rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              Upgrade Now 👑
            </button>
          </div>
        </div>

      </aside>

      {/* MAIN VIEWPORT (With fully synchronized stats, studio grid, recent history, voice library) */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* HEADER / TOPBAR */}
        <header className="h-16 border-b border-[#151a30] bg-[#080b15] px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
          
          {/* Left panel showing brand in mobile/tablet, and search bar in desktop */}
          <div className="flex items-center gap-4 flex-grow max-w-lg">
            <div className="xl:hidden flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-indigo-500" />
              <span className="font-extrabold text-xs tracking-wider text-white">VOICE STUDIO</span>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full hidden md:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search your projects, files, voices..."
                className="w-full bg-[#111529] border border-[#1b213b] rounded-xl py-1.5 pl-9 pr-10 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <kbd className="text-[9px] font-mono bg-[#1c223f] px-1.5 py-0.5 rounded text-zinc-500">⌘ K</kbd>
              </span>
            </div>
          </div>

          {/* Right Panel Actions */}
          <div className="flex items-center gap-3">
            
            {/* Help Quick Guide */}
            <button 
              onClick={() => triggerNotification("হেল্প গাইড: বাংলা টেক্সট দিয়ে ভয়েস আর্টিস্ট চয়ন করুন এবং জেনারেট প্রেস করুন।", "info")}
              className="w-9 h-9 rounded-xl border border-[#1a213a] bg-[#111529] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Help Center"
            >
              <HelpCircle className="w-4.5 h-4.5" />
            </button>

            {/* Notifications Alert Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="w-9 h-9 rounded-xl border border-[#1a213a] bg-[#111529] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-[9px] font-black rounded-full px-1 py-0.5 min-w-[14px] text-center shadow">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2.5 w-80 bg-[#111529] border border-[#1f2647] rounded-xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-slideIn">
                  <div className="flex items-center justify-between border-b border-[#1f2647] pb-2">
                    <span className="font-extrabold text-white uppercase tracking-wider text-[10px]">সিস্টেম নোটিফিকেশন</span>
                    <button onClick={() => setNotifications([])} className="text-[10px] text-indigo-400 hover:underline">সব মুছুন</button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-zinc-500 text-center py-4">কোনো নোটিফিকেশন নেই</p>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2 rounded bg-[#181f3d]/60 hover:bg-[#181f3d] transition-all flex justify-between gap-1.5">
                          <div>
                            <p className="text-zinc-200 font-medium">{n.message}</p>
                            <span className="text-[9px] text-zinc-500 font-mono">{n.time}</span>
                          </div>
                          <button onClick={(e) => handleDismissNotif(n.id, e)} className="text-zinc-500 hover:text-rose-400">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle (Visual representation) */}
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                triggerNotification(isDarkMode ? "লাইট মুড লোড হচ্ছে..." : "ডার্ক মুড লোড হচ্ছে...", "info");
              }}
              className="w-9 h-9 rounded-xl border border-[#1a213a] bg-[#111529] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDarkMode ? <Moon className="w-4.5 h-4.5 text-indigo-400" /> : <Sun className="w-4.5 h-4.5 text-amber-500" />}
            </button>

            {/* Profile Avatar & Details Dropdown */}
            <div className="flex items-center gap-2.5 pl-1.5 border-l border-[#1b213b] h-8">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Mehedi Hasan"
                className="w-8 h-8 rounded-full object-cover border border-indigo-500/20"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-black text-zinc-100 font-sans leading-tight">Mehedi Hasan</span>
                <span className="block text-[9px] text-indigo-400 leading-none">Pro Member</span>
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-500 cursor-pointer" />
            </div>

          </div>
        </header>

        {/* WORKSPACE WORK AREA Scrollable */}
        <div className="flex-grow p-6 space-y-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          
          {/* ANALYTICS HEADER CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="analytics-statistics-row">
            
            {/* Generated Today Card */}
            <div className="bg-[#111529] border border-[#1b213b] rounded-2xl p-4.5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Generated Today</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">{generatedToday} <span className="text-xs text-zinc-400 font-normal">Files</span></div>
                <div className="text-[10px] text-indigo-400 font-semibold mt-1 flex items-center gap-1">
                  <span className="text-emerald-500">↑ 12%</span> from yesterday
                </div>
              </div>
              <ChartSparkline color="#6366f1" />
            </div>

            {/* Total Voices Card */}
            <div className="bg-[#111529] border border-[#1b213b] rounded-2xl p-4.5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Voices</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">{totalVoices} <span className="text-xs text-zinc-400 font-normal">Voices</span></div>
                <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                  <span className="text-indigo-400 font-semibold">+3</span> new voices added
                </div>
              </div>
              <ChartSparkline color="#a855f7" />
            </div>

            {/* Storage Used Circle Card */}
            <div className="bg-[#111529] border border-[#1b213b] rounded-2xl p-4.5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Storage Used</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">{storageUsedGB} <span className="text-xs text-zinc-400 font-normal">GB</span></div>
                <div className="text-[10px] text-zinc-500 mt-1">18% of 10 GB used</div>
              </div>
              {/* Radial Progress */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="18" stroke="#1c223c" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="#10b981" strokeWidth="4" fill="transparent" strokeDasharray="113" strokeDashoffset={113 - (113 * 0.18)} strokeLinecap="round" />
                </svg>
                <span className="absolute text-[10px] font-black text-white">18%</span>
              </div>
            </div>

            {/* Available Credits Card */}
            <div 
              onClick={() => setShowUpgradeModal(true)}
              className="bg-[#111529] border border-[#1b213b] rounded-2xl p-4.5 flex items-center justify-between cursor-pointer hover:border-purple-500/20 transition-all group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Available Credits</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">{availableCredits.toLocaleString()}</div>
                <div className="text-[10px] text-zinc-500 mt-1">Valid until 20 May, 2025</div>
              </div>
              <div className="flex items-center -space-x-1.5 shrink-0 bg-[#1d223c]/40 px-2 py-1 rounded-lg">
                <Coins className="w-5 h-5 text-yellow-500 fill-yellow-500/20 group-hover:scale-110 transition-transform" />
              </div>
            </div>

          </div>

          {/* MAIN 3-COLUMN STUDIO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="studio-core-workspace">
            
            {/* COLUMN 1: ENTER YOUR TEXT (Spans 4 columns) */}
            <section className="bg-[#111529] border border-[#1b213b] rounded-2xl p-5 lg:col-span-4 flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 border-b border-[#1b213b] pb-3">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold text-[10px]">১</span>
                    Enter Your Text
                  </h3>
                  {/* Text entry mode tabs */}
                  <div className="flex bg-[#1b213b]/60 p-1 rounded-lg">
                    <button
                      onClick={() => setInputTextTab("type")}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        inputTextTab === "type" ? "bg-[#232948] text-white" : "text-zinc-500"
                      }`}
                    >
                      Type Text
                    </button>
                    <button
                      onClick={() => setInputTextTab("import")}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        inputTextTab === "import" ? "bg-[#232948] text-white" : "text-zinc-500"
                      }`}
                    >
                      Import File
                    </button>
                  </div>
                </div>

                {inputTextTab === "type" ? (
                  <div className="space-y-3">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">বাংলা টেক্সট স্ক্রিপ্ট</label>
                    <div className="relative">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, 5000))}
                        placeholder="আপনার বাংলা বাক্য বা স্ক্রিপ্ট এখানে লিখুন..."
                        className="w-full h-56 bg-[#181e3a]/40 border border-[#21284a] rounded-xl p-3.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/40 resize-none font-sans leading-relaxed"
                        id="studio-script-textbox"
                      />
                      <span className="absolute bottom-3.5 right-3.5 text-[9px] font-mono text-zinc-500">
                        {text.length} / 5000
                      </span>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[10px] text-amber-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-xs">⚠️</span>
                      <div>
                        <strong>কোটা লিমিট (API Quota Limit):</strong> আপনি যদি 429 Quota Error পান, তার মানে Gemini TTS-এর ফ্রি লিমিট (দৈনিক ১০টি রিকোয়েস্ট) শেষ হয়ে গেছে। দয়া করে আপনার নিজের API Key সেটআপ করতে <strong>Settings &gt; Secrets</strong> মেনু ব্যবহার করুন।
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-3">
                    <div className="bg-[#181e3a]/20 border border-dashed border-[#242d54] rounded-xl p-6 text-center">
                      <FileText className="w-8 h-8 text-indigo-400 mx-auto mb-2.5 animate-bounce" />
                      <h4 className="text-xs font-bold text-white">Import Script File</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 mb-3">Load text from a .txt document directly</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Choose Text File
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Drag & drop helper box below */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border rounded-xl p-4 transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-[#1b213b] bg-[#151a31]/30 hover:bg-[#151a31]/60"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleTextFileImport(e.target.files[0])}
                  accept=".txt"
                  className="hidden"
                />
                <div className="w-9 h-9 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                  <Upload className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Drag & Drop files here</h4>
                  <p className="text-[9px] text-zinc-500 mt-0.5">TXT, DOCX, PDF (Max 10MB)</p>
                </div>
                <span className="text-[10px] text-indigo-400 font-bold ml-auto shrink-0">Browse Files</span>
              </div>

            </section>

            {/* COLUMN 2: CHOOSE VOICE & SETTINGS (Spans 4 columns) */}
            <section className="bg-[#111529] border border-[#1b213b] rounded-2xl p-5 lg:col-span-4 space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#1b213b] pb-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold text-[10px]">২</span>
                  Choose Voice & Settings
                </h3>
              </div>

              {/* Language & Voice Dropdowns */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Language Select */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Language</label>
                  <div className="relative">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-[#181e3a]/40 border border-[#21284a] rounded-xl py-2 pl-8 pr-3 text-xs text-white appearance-none focus:outline-none focus:border-indigo-500/40 cursor-pointer"
                    >
                      <option value="Bengali" className="bg-[#111529]">বাংলা (Bengali)</option>
                      <option value="English" className="bg-[#111529]">English (UK)</option>
                    </select>
                    <span className="absolute left-2.5 top-2.5 pointer-events-none text-indigo-400">
                      <Globe className="w-3.5 h-3.5" />
                    </span>
                    <span className="absolute right-2.5 top-3 pointer-events-none text-zinc-500">
                      <ChevronDown className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Voice Model Select */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Select Voices</label>
                  <div className="relative">
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value as VoiceId)}
                      className="w-full bg-[#181e3a]/40 border border-[#21284a] rounded-xl py-2 pl-3 pr-8 text-xs text-white appearance-none focus:outline-none focus:border-indigo-500/40 cursor-pointer"
                    >
                      {VOICE_PROFILES.map((p) => {
                        const isCore = !p.id.includes("_");
                        const labelText = p.banglaName || p.name;
                        const suffix = p.banglaCategory || (isCore ? "স্ট্যান্ডার্ড" : "আঞ্চলিক");
                        return (
                          <option key={p.id} value={p.id} className="bg-[#111529]">
                            {labelText} — ({suffix})
                          </option>
                        );
                      })}
                    </select>
                    <span className="absolute right-2.5 top-3 pointer-events-none text-zinc-500">
                      <ChevronDown className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>

              {/* Horizontal Voice Avatar Row */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                  <span>বাংলা কণ্ঠ (Bangla Voices)</span>
                  <button 
                    onClick={() => {
                      document.getElementById("voice-library-section")?.scrollIntoView({ behavior: "smooth" });
                      triggerNotification("নিচে ভয়েস লাইব্রেরি ট্যাব ফিল্টার করে সব ভয়েস নির্বাচন করতে পারেন।", "info");
                    }} 
                    className="text-indigo-400 hover:underline"
                  >
                    View All
                  </button>
                </div>

                {/* Avatar horizontal row */}
                <div className="flex items-center gap-1.5 bg-[#181e3a]/20 border border-[#1b213b] p-2 rounded-xl overflow-x-auto">
                  {AVATAR_LIST.map((av, index) => {
                    const isSelected = selectedVoice === av.id;
                    const voiceImg = VOICE_IMAGES[av.id];
                    
                    return (
                      <React.Fragment key={av.id}>
                        {/* Draw separator split before female voices */}
                        {index === 4 && (
                          <div className="w-[1px] h-8 bg-zinc-700 mx-1 shrink-0" />
                        )}
                        <div
                          onClick={() => {
                            setSelectedVoice(av.id);
                            const voiceName = VOICE_PROFILES.find((v) => v.id === av.id)?.banglaName || av.id;
                            triggerNotification(`ভয়েস আর্টিস্ট ${av.label} (${voiceName}) নির্বাচন করা হয়েছে।`, "success");
                          }}
                          className={`relative w-10 h-10 rounded-full cursor-pointer shrink-0 transition-all ${
                            isSelected 
                              ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0d1020]" 
                              : "opacity-60 hover:opacity-100"
                          }`}
                          title={`${av.label} (${av.id})`}
                        >
                          <img
                            src={voiceImg}
                            alt={av.label}
                            className="w-full h-full rounded-full object-cover"
                          />
                          {isSelected && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 border border-[#0d1020] rounded-full flex items-center justify-center text-[8px] text-white">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Segmented controls mirroring screenshot */}
              <div className="space-y-3 pt-1">
                
                {/* Speaking Speed */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Speaking Speed</label>
                  <div className="grid grid-cols-4 gap-1 bg-[#181e3a]/40 border border-[#21284a] p-1 rounded-xl">
                    {[
                      { label: "0.8x", val: 0.8 },
                      { label: "1x", val: 1.0 },
                      { label: "1.2x", val: 1.2 },
                      { label: "1.5x", val: 1.5 }
                    ].map((sp) => (
                      <button
                        key={sp.label}
                        onClick={() => setSpeakingSpeed(sp.val)}
                        className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                          speakingSpeed === sp.val ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pitch */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Pitch</label>
                  <div className="grid grid-cols-3 gap-1 bg-[#181e3a]/40 border border-[#21284a] p-1 rounded-xl">
                    {["Low", "Medium", "High"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPitch(p)}
                        className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                          pitch === p ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emotion Dropdown */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Emotion</label>
                  <div className="relative">
                    <select
                      value={emotion}
                      onChange={(e) => setEmotion(e.target.value)}
                      className="w-full bg-[#181e3a]/40 border border-[#21284a] rounded-xl py-2 pl-3 pr-8 text-xs text-white appearance-none focus:outline-none focus:border-indigo-500/40 cursor-pointer"
                    >
                      <option value="Neutral">Neutral (সাধারণ)</option>
                      <option value="Happy">Happy (আনন্দিত)</option>
                      <option value="Sad">Sad (দুঃখিত)</option>
                      <option value="Excited">Excited (উত্তেজিত)</option>
                      <option value="Narrative">Narrative (বর্ণনামূলক)</option>
                      <option value="Dramatic">Dramatic (নাটকীয়)</option>
                    </select>
                    <span className="absolute right-2.5 top-3 pointer-events-none text-zinc-500">
                      <ChevronDown className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Output Format</label>
                  <div className="grid grid-cols-3 gap-1 bg-[#181e3a]/40 border border-[#21284a] p-1 rounded-xl">
                    {["MP3", "WAV", "AAC"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setOutputFormat(f)}
                        className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                          outputFormat === f ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mb-1.5">Quality</label>
                  <div className="grid grid-cols-3 gap-1 bg-[#181e3a]/40 border border-[#21284a] p-1 rounded-xl">
                    {["Standard", "HD", "Studio"].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                          quality === q ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* ACTION GENERATE BUTTON */}
              <div className="pt-2">
                {isGenerating ? (
                  <div className="space-y-2 p-3 border border-[#26305a] bg-[#1a203f]/50 rounded-xl animate-fadeIn">
                    <div className="flex items-center justify-between text-[10px] font-bold text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        {generationPhase === "gemini" && "Gemini Speech Synth..."}
                        {generationPhase === "wav" && "lossless wav encoding..."}
                        {generationPhase === "mp3" && `compressing mp3: ${workerProgress}%`}
                      </span>
                      <span>{generationPhase === "mp3" ? `${workerProgress}%` : "সবুজ সংকেত..."}</span>
                    </div>
                    {/* Progress Bar bar */}
                    <div className="w-full bg-[#11152a] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                        style={{
                          width: 
                            generationPhase === "gemini" 
                              ? "33%" 
                              : generationPhase === "wav" 
                                ? "66%" 
                                : `${66 + (workerProgress * 0.34)}%`
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateVoice}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-900/30 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-widest transform hover:scale-[1.01]"
                    id="studio-generate-voice-btn"
                  >
                    <Sparkles className="w-4 h-4 fill-white/10" />
                    Generate Voice
                  </button>
                )}
              </div>

            </section>

            {/* COLUMN 3: PREVIEW & DOWNLOAD (Spans 4 columns) */}
            <section className="bg-[#111529] border border-[#1b213b] rounded-2xl p-5 lg:col-span-4 flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex items-center justify-between border-b border-[#1b213b] pb-3 mb-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold text-[10px]">৩</span>
                    Preview & Download
                  </h3>
                </div>

                {/* Animated Waveform Spectrum Visualizer */}
                <div className="bg-[#090b14]/80 border border-[#1b213b] rounded-2xl p-4.5 flex flex-col items-center justify-center relative overflow-hidden h-36">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={80}
                    className="w-full max-w-[320px] h-20"
                  />
                  
                  {/* Dynamic Time tracking indicator */}
                  <div className="flex justify-between w-full text-[9px] font-mono text-zinc-500 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Player Main buttons and volume control */}
                <div className="flex items-center justify-between gap-4 mt-4 bg-[#181e3a]/40 border border-[#21284a] rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {/* Skip back */}
                    <button
                      onClick={handleSkipPrev}
                      className="text-zinc-500 hover:text-white p-1 rounded transition-colors cursor-pointer"
                      title="Skip Backward"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    {/* Main play button */}
                    <button
                      onClick={() => {
                        if (!currentAudioItem) {
                          // Play first history item as fallback if player is empty
                          if (historyItems.length > 0) {
                            loadHistoryItem(historyItems[0]);
                          } else {
                            triggerNotification("প্লে করার জন্য প্রথমে একটি ভয়েস ফাইল জেনারেট করুন।", "info");
                          }
                          return;
                        }
                        setIsPlaying(!isPlaying);
                      }}
                      className="w-9 h-9 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105"
                      title={isPlaying ? "Pause" : "Play"}
                      id="studio-master-play-btn"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Skip forward */}
                    <button
                      onClick={handleSkipNext}
                      className="text-zinc-500 hover:text-white p-1 rounded transition-colors cursor-pointer"
                      title="Skip Forward"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Volume Slider controller */}
                  <div className="flex items-center gap-2 flex-grow max-w-[120px]">
                    <button
                      onClick={() => setVolume(volume === 0 ? 1.0 : 0)}
                      className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                      {volume === 0 ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-[#151a31] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* GENERATION PROGRESS SUB CARD */}
              <div className="bg-[#181e3a]/30 border border-[#21284a] rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <span>Generation Progress</span>
                  {currentAudioItem ? (
                    <span className="text-emerald-500 flex items-center gap-1 text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed
                    </span>
                  ) : (
                    <span className="text-zinc-500 text-[9px]">No File Loaded</span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[10px]">File Name</span>
                    <span className="text-zinc-200 font-semibold truncate max-w-[180px]" title={currentAudioItem?.text || "বাংলা ভয়েস_প্রজেক্ট.mp3"}>
                      {currentAudioItem ? `বাংলা_ভয়েস_${currentAudioItem.id}.${outputFormat.toLowerCase()}` : "বাংলা ভয়েস_প্রজেক্ট.mp3"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[10px]">Duration</span>
                    <span className="text-zinc-200 font-semibold font-mono">
                      {currentAudioItem ? formatTime(duration) : "00:45"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[10px]">File Size</span>
                    <span className="text-zinc-200 font-semibold font-mono">
                      {currentAudioItem?.sizeMB || "1.2 MB"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[10px]">Quality</span>
                    <span className="text-indigo-400 font-bold uppercase">
                      {currentAudioItem?.quality || quality}
                    </span>
                  </div>
                </div>
              </div>

              {/* DOWNLOAD COMPLETED FILE BUTTON */}
              <div className="relative group">
                <button
                  onClick={handleDownloadActiveItem}
                  disabled={!currentAudioItem}
                  className={`w-full text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider border ${
                    currentAudioItem
                      ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-500/20"
                      : "bg-[#181e3a]/40 border-[#21284a] text-zinc-600 cursor-not-allowed"
                  }`}
                  id="studio-download-btn"
                >
                  <Download className="w-4 h-4" />
                  Download {outputFormat}
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-white/50" />
                </button>
                {currentAudioItem && (
                  <div className="absolute left-0 right-0 bottom-full mb-1.5 hidden group-hover:block bg-[#111529] border border-[#1b213b] rounded-xl p-1 shadow-2xl z-20">
                    <button
                      onClick={() => {
                        if (currentAudioItem?.wavBase64) {
                          handleDownloadFile(currentAudioItem.wavBase64, "audio/wav", `বাংলা_স্টুডিও_${currentAudioItem.id}.wav`);
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-bold text-zinc-300 hover:bg-[#181e3a] hover:text-white rounded-lg flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5 text-indigo-400" /> Download lossless WAV
                    </button>
                    {currentAudioItem?.mp3Base64 && (
                      <button
                        onClick={() => {
                          handleDownloadFile(currentAudioItem.mp3Base64!, "audio/mp3", `বাংলা_লাইট_${currentAudioItem.id}.mp3`);
                        }}
                        className="w-full text-left px-3 py-2 text-[10px] font-bold text-zinc-300 hover:bg-[#181e3a] hover:text-white rounded-lg flex items-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5 text-purple-400" /> Download light MP3
                      </button>
                    )}
                  </div>
                )}
              </div>

            </section>

          </div>

          {/* BOTTOM ROW: RECENT HISTORY TABLE & VOICE LIBRARY PANEL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
            
            {/* RECENT HISTORY TABLE (Spans 8 columns) */}
            <section className="bg-[#111529] border border-[#1b213b] rounded-2xl p-5 lg:col-span-8 flex flex-col justify-between" id="recent-history-section">
              
              <div>
                {/* Header selectors mirroring screenshot */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#1b213b] pb-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-400" />
                    Recent History
                  </h3>

                  {/* Filters bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* Language Dropdown */}
                    <div className="relative">
                      <select
                        value={historyLangFilter}
                        onChange={(e) => setHistoryLangFilter(e.target.value)}
                        className="bg-[#181e3a]/40 border border-[#21284a] rounded-lg py-1 px-2.5 pr-7 text-[10px] text-zinc-300 appearance-none focus:outline-none cursor-pointer"
                      >
                        <option value="All" className="bg-[#111529]">All Languages</option>
                        <option value="Bengali" className="bg-[#111529]">Bengali (বাংলা)</option>
                      </select>
                      <span className="absolute right-2 top-2 pointer-events-none text-zinc-500">
                        <ChevronDown className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    {/* Time filter */}
                    <div className="relative">
                      <select
                        value={historyTimeFilter}
                        onChange={(e) => setHistoryTimeFilter(e.target.value)}
                        className="bg-[#181e3a]/40 border border-[#21284a] rounded-lg py-1 px-2.5 pr-7 text-[10px] text-zinc-300 appearance-none focus:outline-none cursor-pointer"
                      >
                        <option value="All" className="bg-[#111529]">All Time</option>
                        <option value="Today" className="bg-[#111529]">Today</option>
                        <option value="Week" className="bg-[#111529]">This Week</option>
                      </select>
                      <span className="absolute right-2 top-2 pointer-events-none text-zinc-500">
                        <ChevronDown className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    {/* Internal table Search */}
                    <div className="relative">
                      <input
                        type="text"
                        value={historySearch}
                        onChange={(e) => setHistorySearch(e.target.value)}
                        placeholder="Search files..."
                        className="bg-[#181e3a]/40 border border-[#21284a] rounded-lg py-1 pl-6 pr-2 text-[10px] text-zinc-300 placeholder-zinc-600 focus:outline-none w-32 focus:w-44 transition-all"
                      />
                      <span className="absolute left-1.5 top-1.5 text-zinc-500">
                        <Search className="w-3 h-3" />
                      </span>
                    </div>

                  </div>
                </div>

                {/* Main responsive table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1b213b] text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest">
                        <th className="py-3.5 px-3">File Name</th>
                        <th className="py-3.5 px-3">Language</th>
                        <th className="py-3.5 px-3">Voice</th>
                        <th className="py-3.5 px-3 text-center">Duration</th>
                        <th className="py-3.5 px-3 text-center">Size</th>
                        <th className="py-3.5 px-3 text-center">Quality</th>
                        <th className="py-3.5 px-3">Date</th>
                        <th className="py-3.5 px-3">Status</th>
                        <th className="py-3.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1b213b]/60 text-xs text-zinc-300">
                      {filteredHistory.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-8 text-center text-zinc-500">কোনো হিস্ট্রি রেকর্ড পাওয়া যায়নি।</td>
                        </tr>
                      ) : (
                        filteredHistory.map((item) => {
                          const isCurrentlyPlayingThis = currentAudioItem && currentAudioItem.id === item.id && isPlaying;
                          const hasDetailsExpanded = expandedTextId === item.id;
                          
                          return (
                            <React.Fragment key={item.id}>
                              <tr 
                                onClick={() => loadHistoryItem(item)}
                                className={`hover:bg-[#151a31]/50 transition-all cursor-pointer ${
                                  currentAudioItem?.id === item.id ? "bg-[#181e3a]/30" : ""
                                }`}
                              >
                                <td className="py-3 px-3 font-semibold text-zinc-100 flex items-center gap-2.5 max-w-[200px]">
                                  {/* Small Play action icon */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (currentAudioItem && currentAudioItem.id === item.id) {
                                        setIsPlaying(!isPlaying);
                                      } else {
                                        loadHistoryItem(item);
                                      }
                                    }}
                                    className="w-6.5 h-6.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                                  >
                                    {isCurrentlyPlayingThis ? (
                                      <Pause className="w-2.5 h-2.5 fill-current" />
                                    ) : (
                                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                                    )}
                                  </button>
                                  <div className="truncate text-zinc-200">
                                    {item.text.slice(0, 30)}...
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-zinc-400 text-[11px]">বাংলা</td>
                                <td className="py-3 px-3 font-semibold text-[11px] text-zinc-300">{item.voiceName}</td>
                                <td className="py-3 px-3 text-center font-mono text-[11px]">00:45</td>
                                <td className="py-3 px-3 text-center font-mono text-zinc-400 text-[11px]">1.2 MB</td>
                                <td className="py-3 px-3 text-center">
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-950/40 text-indigo-400 border border-indigo-900/30">
                                    HD
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-[10px] text-zinc-500 font-mono whitespace-nowrap">{item.createdAt}</td>
                                <td className="py-3 px-3">
                                  <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {/* Download icon */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const data = item.mp3Base64 || item.wavBase64;
                                        if (data) {
                                          handleDownloadFile(data, "audio/mp3", `বাংলা_ডাউনলোড_${item.id}.mp3`);
                                        } else {
                                          triggerNotification("ডাউনলোড শুরু করতে অডিওটি একবার প্লে করুন।", "info");
                                        }
                                      }}
                                      className="p-1.5 text-zinc-500 hover:text-white rounded hover:bg-[#1d223f] transition-all cursor-pointer"
                                      title="Download File"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Expand info */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedTextId(hasDetailsExpanded ? null : item.id);
                                      }}
                                      className="p-1.5 text-zinc-500 hover:text-white rounded hover:bg-[#1d223f] transition-all cursor-pointer"
                                      title="View Details"
                                    >
                                      <MoreHorizontal className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Delete icon */}
                                    <button
                                      onClick={(e) => handleDeleteRow(item.id, e)}
                                      className="p-1.5 text-zinc-500 hover:text-rose-400 rounded hover:bg-rose-950/10 transition-all cursor-pointer"
                                      title="Delete File"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {/* Details Expanded Scripts row */}
                              {hasDetailsExpanded && (
                                <tr className="bg-[#181e3a]/10">
                                  <td colSpan={9} className="py-3 px-6 text-zinc-400 text-xs leading-relaxed border-l-2 border-indigo-500">
                                    <span className="font-bold text-zinc-300 block mb-1 uppercase tracking-wider text-[9px]">সম্পূর্ণ অডিও স্ক্রিপ্ট:</span>
                                    <p className="bg-[#13172e] p-3 rounded-lg border border-[#1b213b] text-zinc-200">
                                      {item.text}
                                    </p>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* View More Button */}
              <div className="pt-4 border-t border-[#1b213b] text-center">
                <button
                  onClick={() => {
                    triggerNotification("সকল প্রজেক্টের অডিও ইতিহাস লোড করা রয়েছে।", "info");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 text-zinc-400 hover:text-indigo-400 text-[11px] font-black uppercase tracking-wider py-2 px-6 rounded-xl bg-[#181e3a]/30 hover:bg-[#181e3a]/60 border border-[#1b213b] transition-all cursor-pointer"
                >
                  View More History
                </button>
              </div>

            </section>

            {/* VOICE LIBRARY SECTION (Spans 4 columns) */}
            <section className="bg-[#111529] border border-[#1b213b] rounded-2xl p-5 lg:col-span-4 flex flex-col justify-between" id="voice-library-section">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1b213b] pb-3">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <FolderHeart className="w-4 h-4 text-purple-400" />
                    Voice Library
                  </h3>
                  <button 
                    onClick={() => triggerNotification("৮টি স্টুডিও লেভেল প্রফেশনাল বাংলা ভয়েস লোড করা আছে।", "info")}
                    className="text-indigo-400 text-[10px] hover:underline"
                  >
                    View All
                  </button>
                </div>

                {/* Sub category filter tabs */}
                <div className="flex items-center gap-1 bg-[#181e3a]/40 border border-[#21284a] p-1 rounded-xl overflow-x-auto scrollbar-none">
                  {["All", "Professional", "Regional", "Male", "Female", "Premium", "Studio"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setLibraryCategoryFilter(cat as any)}
                      className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        libraryCategoryFilter === cat ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {cat === "All" ? "All" : cat === "Professional" ? "Pro" : cat === "Regional" ? "Regional" : cat === "Male" ? "Male" : cat === "Female" ? "Female" : cat === "Premium" ? "Premium" : "Studio"}
                    </button>
                  ))}
                </div>

                {/* Vertical Voice Profiles List Grid */}
                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {filteredLibrary.map((voice) => {
                    const isSelected = selectedVoice === voice.id;
                    const idx = AVATAR_LIST.findIndex((a) => a.id === voice.id);
                    const avLabel = AVATAR_LIST[idx]?.label || voice.id;
                    const isPremium = ["Zephyr", "Puck", "Fenrir"].includes(voice.id);
                    const isStudio = ["Charon", "Kore", "Aoede", "Anemone"].includes(voice.id);

                    return (
                      <div
                        key={voice.id}
                        onClick={() => {
                          setSelectedVoice(voice.id);
                          triggerNotification(`ভয়েস আর্টিস্ট ${avLabel} (${voice.banglaName}) নির্বাচন করা হয়েছে।`, "success");
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-indigo-950/20 border-indigo-500/30"
                            : "bg-[#181e3a]/20 border-[#1b213b] hover:bg-[#181e3a]/55"
                        }`}
                      >
                        {/* Avatar Image + Voice tag details */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          {VOICE_IMAGES[voice.id] ? (
                            <img
                              src={VOICE_IMAGES[voice.id]}
                              alt={voice.name}
                              className="w-9 h-9 rounded-full object-cover border border-indigo-500/15"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs shrink-0 select-none">
                              {voice.avatarText || voice.name.slice(0, 2)}
                            </div>
                          )}
                          <div className="text-left min-w-0">
                            <h4 className="text-xs font-black text-white leading-tight truncate">
                              {voice.banglaName || voice.name}
                            </h4>
                            <span className="block text-[9px] text-zinc-400 leading-none truncate mt-1">
                              {voice.name} • {voice.gender === "Male" ? "পুরুষ" : "নারী"} • {voice.banglaCategory || "স্ট্যান্ডার্ড"}
                            </span>
                          </div>
                        </div>

                        {/* Action play preview and status checks */}
                        <div className="flex items-center gap-1.5">
                          {isPremium && (
                            <span className="text-[8px] font-black bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded border border-purple-900/30 uppercase tracking-widest">
                              Premium
                            </span>
                          )}
                          {isStudio && (
                            <span className="text-[8px] font-black bg-indigo-950 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-900/30 uppercase tracking-widest">
                              Studio
                            </span>
                          )}

                          {/* Preview Play audio circle icon */}
                          <button
                            onClick={(e) => handleTestVoiceSample(voice.id, e)}
                            disabled={testingVoiceId !== null}
                            className={`w-6.5 h-6.5 rounded-full border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                              testingVoiceId === voice.id 
                                ? "bg-amber-500/20 border-amber-500/30 text-amber-400 cursor-wait animate-pulse" 
                                : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white"
                            }`}
                            title={testingVoiceId === voice.id ? "লোডিং হচ্ছে..." : "Play sample"}
                          >
                            {testingVoiceId === voice.id ? (
                              <svg className="animate-spin w-3.5 h-3.5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            )}
                          </button>
                        </div>

                      </div>
                    );
                  })}

                  {/* Add any background simulated cloned voices */}
                  {clonedVoices.map((cv, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl border bg-emerald-950/20 border-emerald-500/30 animate-slideIn"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow">
                          {cv.name.slice(0, 2)}
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-black text-white leading-tight">{cv.name}</h4>
                          <span className="block text-[9px] text-zinc-400 leading-none mt-0.5">Cloned Voice • {cv.gender}</span>
                        </div>
                      </div>
                      <span className="text-[8px] font-black bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900/30 uppercase tracking-widest">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#1b213b]">
                <button
                  onClick={() => setShowCloneModal(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                  id="studio-clone-voice-btn"
                >
                  <Plus className="w-4 h-4" />
                  Clone Your Voice
                </button>
              </div>

            </section>

          </div>

        </div>

        {/* Elegant Footer */}
        <footer className="border-t border-[#141a2e] py-5 px-6 bg-[#080b14] text-center text-zinc-600 text-[10px] font-mono mt-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AI Voice Studio • All Rights Reserved © 2026</span>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Secure Enterprise Level AES-256 Voice Safeguards</span>
          </div>
        </footer>

      </div>

      {/* FLOATING SYSTEM NOTIFICATION ALERTS */}
      <div className="fixed bottom-6 right-6 z-[100] space-y-3.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
        {notifications.slice(0, 3).map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl border shadow-2xl backdrop-blur-md animate-slideIn transition-all duration-300 ${
              n.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : n.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-[#181e3d]/80 border-[#21284a] text-zinc-100"
            }`}
          >
            {n.type === "success" && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />}
            {n.type === "error" && <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />}
            {n.type === "info" && <Info className="w-5 h-5 shrink-0 text-indigo-400" />}

            <div className="flex-grow text-xs font-semibold leading-relaxed">
              {n.message}
            </div>

            <button
              onClick={(e) => handleDismissNotif(n.id, e)}
              className="p-1 rounded-full hover:bg-white/5 text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* MODAL 1: UPGRADE TO PRO */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#111529] border border-[#1f2647] rounded-3xl p-6 max-w-md w-full relative space-y-5 shadow-2xl animate-slideIn">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#181e3a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Award className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-lg font-black text-white">Upgrade to Premium Pro Plan</h3>
              <p className="text-xs text-zinc-400">Unlock maximum output limits, low-latency API networks, and pristine voice cloning.</p>
            </div>

            <div className="space-y-2.5">
              {[
                "Unlimited dynamic character synthesis",
                "HD + Studio level master voice outputs",
                "Advanced voice cloning & custom modulation",
                "Prioritized high-speed servers (250ms rendering)"
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#181e3a]/40 border border-[#21284a] p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-zinc-500 uppercase font-bold">Monthly subscription</span>
                <span className="text-2xl font-black text-white font-mono">$19 <span className="text-xs text-zinc-400 font-normal">/ month</span></span>
              </div>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">Save 20%</span>
            </div>

            <button
              onClick={() => {
                triggerNotification("প্রিমিয়াম প্র অ্যাকাউন্ট অ্যাক্টিভ করা হয়েছে! ধন্যবাদ।", "success");
                setShowUpgradeModal(false);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-widest"
            >
              Get Pro Now 👑
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: CLONE YOUR VOICE */}
      {showCloneModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#111529] border border-[#1f2647] rounded-3xl p-6 max-w-md w-full relative space-y-4 shadow-2xl animate-slideIn">
            <button
              onClick={() => setShowCloneModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#181e3a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-white">Clone Your Voice</h3>
              <p className="text-xs text-zinc-400">Create an identical high-fidelity digital duplicate of any human voice.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("clonename") as string;
                const gender = formData.get("clonegender") as string;
                if (!name) return;
                handleCloneVoice(name, gender);
                setShowCloneModal(false);
              }}
              className="space-y-4 pt-2"
            >
              <div>
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Voice Name</label>
                <input
                  type="text"
                  name="clonename"
                  required
                  placeholder="e.g. My Custom Voice"
                  className="w-full bg-[#181e3a]/40 border border-[#21284a] rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Voice Gender</label>
                <select
                  name="clonegender"
                  className="w-full bg-[#181e3a]/40 border border-[#21284a] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500/40 cursor-pointer"
                >
                  <option value="Male" className="bg-[#111529]">Male</option>
                  <option value="Female" className="bg-[#111529]">Female</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Audio Sample File</label>
                <div className="border border-dashed border-[#242d54] rounded-xl p-5 text-center bg-[#151a31]/20">
                  <Upload className="w-7 h-7 text-indigo-400 mx-auto mb-2" />
                  <p className="text-[10px] text-zinc-400 font-bold">Upload a clean 10-30s recording</p>
                  <span className="text-[9px] text-zinc-600">MP3, WAV or M4A (Max 25MB)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                Start Cloning Process
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#111529] border border-[#1f2647] rounded-3xl p-6 max-w-md w-full relative space-y-4 shadow-2xl animate-slideIn">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#181e3a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1 pb-2 border-b border-[#1b213b]">
              <h3 className="text-base font-black text-white">System Settings</h3>
              <p className="text-xs text-zinc-400">Configure core server rendering properties.</p>
            </div>

            <div className="space-y-3 text-xs text-zinc-300 pt-1">
              <div className="flex justify-between items-center py-2 border-b border-[#1b213b]/55">
                <span>Default TTS Model version</span>
                <span className="font-mono text-[11px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded">Gemini-2.1-TTS-v2</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#1b213b]/55">
                <span>Background Thread Compression</span>
                <span className="text-emerald-500 font-bold">Enabled (LameJS WebWorker)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#1b213b]/55">
                <span>Lossless studio WAV bitrate</span>
                <span className="font-mono">768 kbps (24kHz Mono 16-bit)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Local Session Cache retention</span>
                <span className="text-zinc-400">Infinite (LocalStorage Saved)</span>
              </div>
            </div>

            <button
              onClick={() => {
                triggerNotification("সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।", "success");
                setShowSettingsModal(false);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center uppercase tracking-wider"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: API KEYS */}
      {showApiKeysModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#111529] border border-[#1f2647] rounded-3xl p-6 max-w-md w-full relative space-y-4 shadow-2xl animate-slideIn">
            <button
              onClick={() => setShowApiKeysModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#181e3a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1 pb-2 border-b border-[#1b213b]">
              <h3 className="text-base font-black text-white">API Keys & Credentials</h3>
              <p className="text-xs text-zinc-400">কনফিগার করুন এবং ভয়েস জেনারেশন করুন আপনার নিজস্ব কী-এর মাধ্যমে।</p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Custom Gemini API Key configuration */}
              <div className="space-y-3 bg-[#161a35]/40 border border-[#21284a] rounded-2xl p-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#21284a]">
                  <h4 className="text-xs font-black text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Gemini API Key কনফিগারেশন
                  </h4>
                  {customGeminiKey ? (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      সক্রিয় (Active)
                    </span>
                  ) : (
                    <span className="bg-[#1d244a] text-zinc-400 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      ডিফল্ট ফ্রি কী (Default Key)
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  আপনার নিজস্ব Gemini API Key যোগ করলে দৈনিক ফ্রি ১০টি জেনারেশনের লিমিট উঠে যাবে এবং আপনি সম্পূর্ণ আনলিমিটেড ভাবে আমাদের সব ভয়েস ব্যবহার করতে পারবেন।
                </p>

                <div>
                  <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Your Gemini API Key</label>
                  <div className="flex gap-1.5 relative">
                    <input
                      type={showGeminiKey ? "text" : "password"}
                      value={customGeminiKey}
                      onChange={(e) => setCustomGeminiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-grow bg-[#0f1325] border border-[#21284a] focus:border-indigo-500/50 rounded-xl py-2 pl-3 pr-10 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowGeminiKey(!showGeminiKey)}
                      className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showGeminiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-1.5">
                  <button
                    onClick={() => {
                      if (customGeminiKey.trim()) {
                        localStorage.setItem("GEMINI_USER_API_KEY", customGeminiKey.trim());
                        triggerNotification("Gemini API Key সফলভাবে সংরক্ষণ করা হয়েছে!", "success");
                      } else {
                        triggerNotification("অনুগ্রহ করে একটি সঠিক API Key লিখুন।", "error");
                      }
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center uppercase"
                  >
                    Save Key
                  </button>
                  {customGeminiKey && (
                    <button
                      onClick={() => {
                        localStorage.removeItem("GEMINI_USER_API_KEY");
                        setCustomGeminiKey("");
                        triggerNotification("Gemini API Key সফলভাবে মুছে ফেলা হয়েছে এবং ডিফল্ট কী সচল হয়েছে।", "success");
                      }}
                      className="bg-[#1c223f] hover:bg-red-950/20 hover:text-red-400 text-zinc-400 border border-[#21284a] font-bold text-[10px] px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Developer Client API Access Token */}
              <div>
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Studio API Token</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    readOnly
                    value="sk_studio_8a3f72e9c9104b2b8e3"
                    className="flex-grow bg-[#181e3a]/40 border border-[#21284a] rounded-xl p-2.5 text-xs text-zinc-400 font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("sk_studio_8a3f72e9c9104b2b8e3");
                      triggerNotification("API কী ক্লিপবোর্ডে কপি করা হয়েছে।", "success");
                    }}
                    className="bg-[#181e3a] hover:bg-indigo-600 text-zinc-200 hover:text-white px-3 py-2 text-xs rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-indigo-950/20 border border-indigo-900/30 p-3 rounded-xl text-[10px] text-indigo-300 leading-relaxed">
                <span className="font-bold block uppercase mb-1">Developer Notice:</span>
                API requests can trigger programmatic TTS generations and will consume available credits on this master profile automatically.
              </div>
            </div>

            <button
              onClick={() => setShowApiKeysModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
