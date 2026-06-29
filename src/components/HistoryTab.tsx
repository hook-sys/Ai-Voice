import React, { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Search, 
  VolumeX, 
  Calendar, 
  CheckCircle2, 
  Sliders, 
  Music, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { AudioItem, VoiceId } from "../types";
import { VOICE_PROFILES } from "../utils";

interface HistoryTabProps {
  items: AudioItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  triggerNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function HistoryTab({ 
  items, 
  onDeleteItem, 
  onClearAll, 
  triggerNotification 
}: HistoryTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVoiceFilter, setSelectedVoiceFilter] = useState<string>("All");
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);

  // Audio Playback States
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  // Filtered items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVoice = selectedVoiceFilter === "All" || item.voiceId === selectedVoiceFilter;
    return matchesSearch && matchesVoice;
  });

  // Handle Play/Pause of a history item
  const handlePlayPause = (item: AudioItem) => {
    // If clicking the currently playing item, toggle it
    if (playingId === item.id) {
      if (audioRef.current?.paused) {
        audioRef.current.play();
        setPlayingId(item.id);
      } else {
        audioRef.current?.pause();
        setPlayingId(null);
      }
      return;
    }

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Load new audio (use MP3 if available, fallback to WAV)
    const audioSrc = item.mp3Base64 
      ? `data:audio/mp3;base64,${item.mp3Base64}` 
      : `data:audio/wav;base64,${item.wavBase64}`;

    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;
    setPlayingId(item.id);

    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(newAudio.duration);
    });

    newAudio.addEventListener("timeupdate", () => {
      setCurrentTime(newAudio.currentTime);
    });

    newAudio.addEventListener("ended", () => {
      setPlayingId(null);
      setCurrentTime(0);
    });

    newAudio.play().catch(() => {
      triggerNotification("অডিও প্লে করতে সমস্যা হয়েছে।", "error");
      setPlayingId(null);
    });
  };

  // Seek audio track
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Helper to trigger direct downloads
  const downloadFile = (base64Data: string, mimeType: string, filename: string) => {
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
    } catch (err) {
      triggerNotification("ডাউনলোড শুরু করা সম্ভব হয়নি।", "error");
    }
  };

  const handleDownloadWav = (item: AudioItem) => {
    const name = `bangla_voice_${item.voiceId}_${item.id.slice(0, 6)}.wav`;
    downloadFile(item.wavBase64, "audio/wav", name);
    triggerNotification("WAV (স্টুডিও লসলেস) ডাউনলোড সম্পন্ন!", "success");
  };

  const handleDownloadMp3 = (item: AudioItem) => {
    if (!item.mp3Base64) {
      triggerNotification("অডিওটির MP3 সংস্করণ রেন্ডার করা নেই।", "error");
      return;
    }
    const name = `bangla_voice_${item.voiceId}_${item.id.slice(0, 6)}.mp3`;
    downloadFile(item.mp3Base64, "audio/mp3", name);
    triggerNotification("MP3 (উচ্চ সামঞ্জস্যপূর্ণ) ডাউনলোড সম্পন্ন!", "success");
  };

  // Format Time (seconds to mm:ss)
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="space-y-6" id="history-tab-module">
      {/* Filters bar */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ইতিহাস খুঁজুন... (Search history...)"
            id="history-search-input"
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-zinc-100 placeholder-gray-400"
          />
        </div>

        {/* Filters and Deletions */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Voice select */}
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-gray-400" />
            <select
              value={selectedVoiceFilter}
              onChange={(e) => setSelectedVoiceFilter(e.target.value)}
              id="history-voice-filter"
              className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">সকল কণ্ঠস্বর (All Voices)</option>
              {VOICE_PROFILES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("আপনি কি সব অডিও ইতিহাস মুছে ফেলতে চান?")) {
                  onClearAll();
                }
              }}
              id="clear-all-history-btn"
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/10 hover:bg-red-100 dark:hover:bg-red-950/20 text-xs font-bold transition-colors cursor-pointer"
            >
              সব পরিষ্কার করুন
            </button>
          )}
        </div>
      </div>

      {/* History Items List */}
      {filteredItems.length === 0 ? (
        <div className="bg-gray-50 dark:bg-zinc-950/20 border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl py-12 px-4 text-center">
          <VolumeX className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <h3 className="font-sans font-bold text-gray-700 dark:text-zinc-300 text-base">
            কোন অডিও ইতিহাস পাওয়া যায়নি
          </h3>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 max-w-sm mx-auto">
            {searchTerm || selectedVoiceFilter !== "All"
              ? "ফিল্টারটি পরিবর্তন করে পুনরায় অনুসন্ধান করুন।"
              : "নতুন অডিও তৈরি করলে সেটি এই ইতিহাস ট্যাবে দেখতে পাবেন।"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isPlaying = playingId === item.id;
            const profile = VOICE_PROFILES.find((v) => v.id === item.voiceId);
            const isExpanded = expandedTextId === item.id;

            return (
              <div
                key={item.id}
                id={`history-item-${item.id}`}
                className={`bg-white dark:bg-zinc-900 border rounded-2xl p-5 shadow-sm transition-all duration-200 ${
                  isPlaying 
                    ? "border-indigo-400 bg-indigo-50/5 dark:bg-indigo-950/5 ring-1 ring-indigo-400" 
                    : "border-gray-200 dark:border-zinc-800"
                }`}
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-zinc-850/60 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-extrabold text-sm text-gray-900 dark:text-zinc-50 flex items-center gap-1.5">
                      <Music className="w-4 h-4 text-indigo-500" />
                      {profile?.banglaName || item.voiceId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      profile?.gender === "Female"
                        ? "bg-pink-100 dark:bg-pink-950/20 text-pink-700 dark:text-pink-400"
                        : "bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
                    }`}>
                      {profile?.gender === "Female" ? "নারী" : "পুরুষ"}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-gray-400 dark:text-zinc-500 gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.createdAt}
                  </div>
                </div>

                {/* Text Snippet */}
                <div className="mb-4">
                  <p className={`text-sm text-gray-700 dark:text-zinc-200 leading-relaxed ${
                    !isExpanded ? "line-clamp-2" : ""
                  }`}>
                    {item.text}
                  </p>
                  
                  {item.text.length > 140 && (
                    <button
                      onClick={() => setExpandedTextId(isExpanded ? null : item.id)}
                      className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 mt-2 flex items-center gap-1 hover:underline"
                    >
                      {isExpanded ? (
                        <>আড়াল করুন <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>সবটুকু দেখুন <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Audio Custom Player (Only displays fully when active/playing) */}
                {isPlaying && (
                  <div className="bg-gray-50 dark:bg-zinc-950/40 rounded-xl p-3 mb-4 flex items-center gap-4 transition-all animate-fadeIn">
                    <span className="text-xs font-mono text-gray-500 dark:text-zinc-400">
                      {formatTime(currentTime)}
                    </span>
                    
                    <input
                      type="range"
                      ref={progressBarRef}
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-grow accent-indigo-500 h-1 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />

                    <span className="text-xs font-mono text-gray-500 dark:text-zinc-400">
                      {formatTime(duration)}
                    </span>
                  </div>
                )}

                {/* Foot Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Left Controls: Play / Pause */}
                  <button
                    onClick={() => handlePlayPause(item)}
                    id={`play-btn-${item.id}`}
                    className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border shadow-sm transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-amber-500 text-white border-amber-400 hover:bg-amber-600"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500"
                    }`}
                  >
                    {isPlaying && !audioRef.current?.paused ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        অডিও থামান
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        প্লে করুন
                      </>
                    )}
                  </button>

                  {/* Right Controls: Downloads & Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadWav(item)}
                      id={`dl-wav-btn-${item.id}`}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-750 transition-all cursor-pointer shadow-sm"
                      title="Download Lossless Studio WAV"
                    >
                      <Download className="w-3.5 h-3.5" />
                      WAV
                    </button>

                    {item.mp3Base64 && (
                      <button
                        onClick={() => handleDownloadMp3(item)}
                        id={`dl-mp3-btn-${item.id}`}
                        className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-950/40 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-all cursor-pointer shadow-sm"
                        title="Download Highly Compatible MP3"
                      >
                        <Download className="w-3.5 h-3.5" />
                        MP3
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      id={`delete-btn-${item.id}`}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
