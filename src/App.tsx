import { useState, useEffect } from "react";
import Header from "./components/Header";
import AudioGenerator from "./components/AudioGenerator";
import HistoryTab from "./components/HistoryTab";
import { AudioItem, VoiceId } from "./types";
import { 
  Sparkles, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  Volume2,
  Lock
} from "lucide-react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  // Active Tab: "generate" | "history"
  const [activeTab, setActiveTab] = useState<"generate" | "history">("generate");

  // History State loaded from LocalStorage
  const [historyItems, setHistoryItems] = useState<AudioItem[]>(() => {
    const saved = localStorage.getItem("audio_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Alert Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Apply dark mode theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Persist history logs to localStorage on change
  useEffect(() => {
    localStorage.setItem("audio_history", JSON.stringify(historyItems));
  }, [historyItems]);

  // Helper to trigger notifications
  const triggerNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type
    };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      dismissNotification(newNotification.id);
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Add generated audio to history
  const handleAudioGenerated = (
    text: string, 
    voiceId: VoiceId, 
    wavBase64: string, 
    mp3Base64?: string
  ) => {
    const newItem: AudioItem = {
      id: Math.random().toString(36).substring(2, 11),
      text,
      voiceId,
      voiceName: voiceId,
      createdAt: new Date().toLocaleTimeString("bn-BD", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }) + " - " + new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      wavBase64,
      mp3Base64
    };

    setHistoryItems((prev) => [newItem, ...prev]);
  };

  // Delete history item
  const handleDeleteItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    triggerNotification("অডিও ইতিহাস থেকে মুছে ফেলা হয়েছে।", "success");
  };

  // Clear all history
  const handleClearAllHistory = () => {
    setHistoryItems([]);
    triggerNotification("সকল অডিও ইতিহাস পরিষ্কার করা হয়েছে।", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 transition-colors duration-300">
      {/* Visual Header */}
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      />

      {/* Main Container */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Card / Welcome message */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 dark:shadow-none mb-8 relative overflow-hidden">
          {/* Subtle background glow pattern */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 pointer-events-none">
            <Volume2 className="w-64 h-64 -mr-16 -mb-16 text-white" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold backdrop-blur-sm uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              AI Powered Speech Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight mb-2">
              বাংলা টেক্সট-টু-ভয়েস জেনারেটর
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed font-medium">
              আপনার যেকোনো বাংলা লেখা ড্রপ করুন বা টাইপ করুন এবং মুহূর্তের মধ্যেই উচ্চমানের পুরুষ বা নারী কণ্ঠে রূপান্তর করুন। ব্যাকগ্রাউন্ডে MP3 ফাইলে সংরক্ষণ করুন এবং সরাসরি প্লে বা ডাউনলোড করুন।
            </p>
          </div>
        </div>

        {/* Tab Controls Navigation */}
        <div className="flex border-b border-gray-200 dark:border-zinc-800 mb-8" id="navigation-tabs">
          <button
            onClick={() => setActiveTab("generate")}
            id="tab-generator"
            className={`flex items-center gap-2 pb-4 px-6 text-sm sm:text-base font-bold transition-all border-b-2 relative -mb-[2px] cursor-pointer ${
              activeTab === "generate"
                ? "border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold"
                : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            ভয়েস তৈরি (Generator)
          </button>
          
          <button
            onClick={() => setActiveTab("history")}
            id="tab-history"
            className={`flex items-center gap-2 pb-4 px-6 text-sm sm:text-base font-bold transition-all border-b-2 relative -mb-[2px] cursor-pointer ${
              activeTab === "history"
                ? "border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold"
                : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100"
            }`}
          >
            <History className="w-4 h-4" />
            ইতিহাস ট্যাবে (History)
            {historyItems.length > 0 && (
              <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {historyItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Active Tab View */}
        <div className="transition-all duration-300">
          {activeTab === "generate" ? (
            <AudioGenerator 
              onAudioGenerated={handleAudioGenerated}
              triggerNotification={triggerNotification}
            />
          ) : (
            <HistoryTab 
              items={historyItems}
              onDeleteItem={handleDeleteItem}
              onClearAll={handleClearAllHistory}
              triggerNotification={triggerNotification}
            />
          )}
        </div>
      </main>

      {/* Floating Notifications Feed Container */}
      <div 
        id="notification-container" 
        className="fixed bottom-6 right-6 z-[100] space-y-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            id={`notification-${n.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md animate-slideIn transition-all duration-300 ${
              n.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-400"
                : n.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-400"
                  : "bg-sky-500/10 border-sky-500/20 text-sky-800 dark:text-sky-400"
            }`}
          >
            {n.type === "success" && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />}
            {n.type === "error" && <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />}
            {n.type === "info" && <Info className="w-5 h-5 shrink-0 text-sky-500" />}

            <div className="flex-grow text-xs font-semibold leading-relaxed">
              {n.message}
            </div>

            <button
              onClick={() => dismissNotification(n.id)}
              className="p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Elegant Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-850 mt-16 py-6 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 dark:text-zinc-500 leading-normal">
            Bangla Text-to-Voice Generator • Powered by Gemini AI Speech Synthesis
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 dark:text-zinc-500 font-mono mt-1">
            <Lock className="w-3 h-3" /> Secure Server-Side Operations
          </div>
        </div>
      </footer>
    </div>
  );
}
