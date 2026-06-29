import React, { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
  Play, 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  AudioLines,
  Clipboard
} from "lucide-react";
import { VoiceId, VoiceProfile } from "../types";
import { VOICE_PROFILES, createMp3EncoderWorker, arrayBufferToBase64 } from "../utils";

interface AudioGeneratorProps {
  onAudioGenerated: (
    text: string, 
    voiceId: VoiceId, 
    wavBase64: string, 
    mp3Base64?: string
  ) => void;
  triggerNotification: (message: string, type: "success" | "error" | "info") => void;
}

export default function AudioGenerator({ 
  onAudioGenerated, 
  triggerNotification 
}: AudioGeneratorProps) {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<VoiceId>("Zephyr");
  const [genderFilter, setGenderFilter] = useState<"All" | "Female" | "Male">("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "ads" | "story" | "news" | "casual" | "motivational">("All");
  
  // Statuses
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState<"none" | "gemini" | "wav" | "mp3">("none");
  const [workerProgress, setWorkerProgress] = useState(0);
  const [previewingVoice, setPreviewingVoice] = useState<VoiceId | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sample texts for previewing voices
  const PREVIEW_TEXTS: Record<VoiceId, string> = {
    Zephyr: "নমস্কার, আমি তানিয়া। আমি বিজ্ঞাপনের সাবলীল বাচনভঙ্গি এবং গল্প বলার জন্য উপযুক্ত কণ্ঠস্বর।",
    Kore: "হ্যালো, আমি সাবিহা। প্রাতিষ্ঠানিক বার্তা বা খবর পাঠের জন্য আমার প্রফেশনাল কণ্ঠস্বর নির্বাচন করুন।",
    Puck: "সুপ্রভাত, আমি রাহাত। আমি খুবই উদ্যমী এবং আপনার পণ্যের বিজ্ঞাপনকে আকর্ষণীয় করে তুলব!",
    Charon: "নমস্কার, আমি শরিফ। গভীর গম্ভীরতা এবং ভাবপূর্ণ উচ্চারণে আপনার প্রামাণ্যচিত্র বা অডিওবুক সাজাব।",
    Hermes: "হ্যালো বন্ধু, আমি সৌম্য। কোনো ফর্মালিটি ছাড়াই খুব সহজ ও ঘরোয়া পডকাস্টের জন্য আমার কণ্ঠ মানানসই।",
    Aoede: "নমস্কার, আমি অনন্যা। গভীর আবেগ এবং শৈল্পিক সুরের সাথে কবিতা আবৃত্তি বা নাটক পাঠ করতে পারি।",
    Fenrir: "স্বাগতম, আমি রিপন। যেকোনো গুরুত্বপূর্ণ ঘোষণা বা মোটিভেশনাল স্পিচ দিতে আমি প্রস্তুত।",
    Anemone: "শুভ দিন, আমি নাবিলা। পরম শান্ত ও প্রশান্তিদায়ক কণ্ঠে আপনার গাইডেড মেডিটেশন উপস্থাপন করব।"
  };

  const currentProfile = VOICE_PROFILES.find(p => p.id === selectedVoice);

  // Paste from clipboard utility
  const handlePasteFromClipboard = async () => {
    try {
      if (!navigator.clipboard) {
        triggerNotification("আপনার ব্রাউজারে ক্লিপবোর্ড অ্যাক্সেস সমর্থন করে না। সরাসরি কন্ট্রোল+ভি (Ctrl+V) চাপুন।", "info");
        return;
      }
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        if (clipboardText.length > 1000) {
          setText(clipboardText.slice(0, 1000));
          triggerNotification("ক্লিপবোর্ড থেকে প্রথম ১০০০টি অক্ষর পেস্ট করা হয়েছে।", "info");
        } else {
          setText(clipboardText);
          triggerNotification("ক্লিপবোর্ড থেকে লেখা পেস্ট করা হয়েছে!", "success");
        }
      } else {
        triggerNotification("ক্লিপবোর্ডে কোনো লেখা পাওয়া যায়নি।", "info");
      }
    } catch (err) {
      triggerNotification("ক্লিপবোর্ড রিড করার অনুমতি পাওয়া যায়নি। সরাসরি এখানে টেক্সট পেস্ট করুন।", "info");
    }
  };

  // Handle text files drag over
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
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const processFiles = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];
    
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content.length > 1000) {
          setText(content.slice(0, 1000));
          triggerNotification("ফাইল বড় হওয়ায় প্রথম ১০০০টি অক্ষর নেওয়া হয়েছে।", "info");
        } else {
          setText(content);
          triggerNotification("টেক্সট ফাইল সফলভাবে লোড হয়েছে!", "success");
        }
      };
      reader.onerror = () => {
        triggerNotification("ফাইল পড়তে ত্রুটি হয়েছে।", "error");
      };
      reader.readAsText(file);
    } else {
      triggerNotification("অনুগ্রহ করে শুধুমাত্র টেক্সট (.txt) ফাইল ব্যবহার করুন।", "error");
    }
  };

  // Preview Voice Sample
  const handlePreviewVoice = async (voiceId: VoiceId, e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewingVoice) return;
    
    setPreviewingVoice(voiceId);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: PREVIEW_TEXTS[voiceId],
          voice: voiceId
        }),
      });

      if (!response.ok) {
        throw new Error("TTS preview failed.");
      }

      const data = await response.json();
      if (data.wavData) {
        if (previewAudioRef.current) {
          previewAudioRef.current.pause();
        }
        const audioUrl = `data:audio/wav;base64,${data.wavData}`;
        const audio = new Audio(audioUrl);
        previewAudioRef.current = audio;
        audio.play();
        audio.onended = () => setPreviewingVoice(null);
      } else {
        setPreviewingVoice(null);
      }
    } catch (err) {
      setPreviewingVoice(null);
      triggerNotification("কণ্ঠস্বরটি টেস্ট করা সম্ভব হয়নি। সার্ভার ত্রুটি।", "error");
    }
  };

  // Generate Speech Call
  const handleGenerate = async () => {
    if (!text.trim()) {
      triggerNotification("অনুগ্রহ করে কিছু বাংলা টেক্সট লিখুন বা পেস্ট করুন।", "error");
      return;
    }

    setIsGenerating(true);
    setWorkerProgress(0);
    setGenerationPhase("gemini");

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          voice: selectedVoice
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate audio from Gemini.");
      }

      setGenerationPhase("wav");
      const { pcmData, wavData } = await response.json();

      setGenerationPhase("mp3");
      
      // Instantiate background web worker for high performance MP3 encoding
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
          
          onAudioGenerated(text.trim(), selectedVoice, wavData, mp3Base64);
          triggerNotification("কণ্ঠস্বর সফলভাবে তৈরি এবং ডাউনলোডযোগ্য করা হয়েছে!", "success");
          cleanupGeneration();
          encoderWorker.terminate();
        } else if (msg.type === "error") {
          console.error("Worker Error:", msg.error);
          triggerNotification("MP3 রূপান্তরে ব্যাকগ্রাউন্ড সমস্যা হয়েছে। শুধুমাত্র WAV সংরক্ষণ করা হলো।", "info");
          
          onAudioGenerated(text.trim(), selectedVoice, wavData);
          cleanupGeneration();
          encoderWorker.terminate();
        }
      };

    } catch (err: any) {
      console.error("Audio Generation Fail:", err);
      triggerNotification(err.message || "কণ্ঠস্বর তৈরি করা যায়নি। পুনরায় চেষ্টা করুন।", "error");
      cleanupGeneration();
    }
  };

  const cleanupGeneration = () => {
    setIsGenerating(false);
    setGenerationPhase("none");
    setWorkerProgress(0);
  };

  // Comprehensive filters for Category & Gender
  const filteredVoices = VOICE_PROFILES.filter((voice) => {
    const matchesGender = genderFilter === "All" || voice.gender === genderFilter;
    const matchesCategory = categoryFilter === "All" || voice.category === categoryFilter;
    return matchesGender && matchesCategory;
  });

  return (
    <div className="space-y-8" id="audio-generator-module">
      
      {/* Prime Focus Textbox & Controls (No confusing drag/drop as primary layout) */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <label className="text-sm font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
            <AudioLines className="w-4 h-4 text-indigo-500" />
            বাংলা টেক্সট লিখুন বা পেস্ট করুন (Write or Paste Bangla Text)
          </label>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Direct Paste Button */}
            <button
              onClick={handlePasteFromClipboard}
              id="clipboard-paste-btn"
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/30 transition-all cursor-pointer shadow-sm"
              title="Click to paste text from your clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              কপি করা লেখা পেস্ট করুন (Paste)
            </button>

            {/* Minor Upload Trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-750 border border-gray-200 dark:border-zinc-700 transition-all cursor-pointer shadow-sm"
              title="Import from TXT file"
            >
              <Upload className="w-3.5 h-3.5" />
              ফাইল আপলোড (.txt)
            </button>
          </div>
        </div>

        {/* Textarea wrapped in a clean container that STILL supports drag-and-drop if they wish */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border rounded-xl transition-all duration-300 min-h-[180px] flex flex-col ${
            isDragging 
              ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10 ring-2 ring-indigo-500/50" 
              : "border-gray-200 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-950/30"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".txt"
            className="hidden"
            id="file-input"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 1000))}
            placeholder="আপনার বাংলা বাক্য বা স্ক্রিপ্ট এখানে লিখুন অথবা উপরে ক্লিক করে পেস্ট করুন..."
            className="w-full flex-grow p-4 bg-transparent text-gray-800 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 resize-none border-0 focus:outline-none focus:ring-0 text-base leading-relaxed"
            style={{ minHeight: "180px" }}
            id="text-generator-area"
          />

          {/* Bottom Bar inside Text Box */}
          <div className="border-t border-gray-100 dark:border-zinc-850/50 px-4 py-2 flex items-center justify-between text-xs text-gray-400 dark:text-zinc-500 font-mono">
            <span>ফাইল ড্রপ করেও লেখা যুক্ত করতে পারেন</span>
            <span className="font-semibold text-gray-500 dark:text-zinc-400">
              {text.length}/1000 ক্যারেক্টার
            </span>
          </div>

          {text && (
            <button
              onClick={() => setText("")}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-500 hover:text-red-500 transition-colors"
              title="Clear Text"
              id="clear-text-btn"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Voice Profiles Selector with Expanded 8 Artists */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-zinc-850/50">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 dark:text-zinc-50">
              বাংলা ভয়েজ আর্টিস্ট নির্বাচন করুন (Bangla Voice Artists)
            </h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
              প্রফেশনাল বিজ্ঞাপন, স্টোরিটেলিং এবং ডাবিংয়ের জন্য অত্যন্ত বাস্তবসম্মত (Human-like) ভয়েজ আর্টিস্ট
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Style Filter */}
            <div className="flex flex-wrap bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
              {[
                { id: "All", label: "সব ক্যাটাগরি" },
                { id: "ads", label: "বিজ্ঞাপন/প্রমো" },
                { id: "story", label: "গল্প ও কবিতা" },
                { id: "news", label: "সংবাদ/ফর্মাল" },
                { id: "casual", label: "পডকাস্ট ও সাধারণ" },
                { id: "motivational", label: "মোটিভেশনাল" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as any)}
                  id={`filter-cat-${cat.id}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-zinc-100 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Gender Filter */}
            <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
              {(["All", "Female", "Male"] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setGenderFilter(gender)}
                  id={`filter-gen-${gender.toLowerCase()}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    genderFilter === gender
                      ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-zinc-100 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {gender === "All" ? "সব জেন্ডার" : gender === "Female" ? "নারী" : "পুরুষ"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        {filteredVoices.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400 dark:text-zinc-500 font-medium">
            নির্বাচিত ক্যাটাগরি ও জেন্ডারে কোনো ভয়েজ আর্টিস্ট পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredVoices.map((voice) => {
              const isSelected = selectedVoice === voice.id;
              const isPlayingPreview = previewingVoice === voice.id;

              return (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  id={`voice-card-${voice.id.toLowerCase()}`}
                  className={`relative border rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-start gap-4 hover:scale-[1.01] ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 shadow-md ring-2 ring-indigo-500/50"
                      : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-transparent"
                  }`}
                >
                  {/* Human-like Avatar circle based on gender */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0 shadow-sm ${
                    voice.gender === "Female"
                      ? "bg-gradient-to-tr from-pink-500 to-rose-400"
                      : "bg-gradient-to-tr from-blue-600 to-indigo-500"
                  }`}>
                    {voice.avatarText}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="font-sans font-bold text-gray-900 dark:text-zinc-50 text-sm sm:text-base truncate">
                          {voice.banglaName}
                        </h3>
                      </div>
                      
                      {/* Test Voice Button */}
                      <button
                        onClick={(e) => handlePreviewVoice(voice.id, e)}
                        id={`test-btn-${voice.id.toLowerCase()}`}
                        disabled={isPlayingPreview}
                        className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border shadow-sm transition-all shrink-0 cursor-pointer ${
                          isPlayingPreview
                            ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 border-indigo-200 animate-pulse"
                            : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-750"
                        }`}
                        title="Test Audio Voice"
                      >
                        {isPlayingPreview ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3 fill-current" />
                        )}
                        {isPlayingPreview ? "শুনুন..." : "টেস্ট ভয়েজ"}
                      </button>
                    </div>

                    {/* Meta information indicators */}
                    <div className="flex flex-wrap gap-1.5 my-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        voice.gender === "Female"
                          ? "bg-pink-100 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400"
                          : "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                      }`}>
                        {voice.gender === "Female" ? "নারী কণ্ঠ" : "পুরুষ কণ্ঠ"}
                      </span>
                      
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                        {voice.banglaCategory}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                      {voice.banglaDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Voice Meta Display */}
        {currentProfile && (
          <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-zinc-950/30 border border-gray-100 dark:border-zinc-850/60 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-zinc-200">
                নির্বাচিত ভয়েজ আর্টিস্ট: {currentProfile.banglaName} ({currentProfile.gender})
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                {currentProfile.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls & Generate Button & Progress State */}
      <div className="flex flex-col items-center">
        {isGenerating ? (
          <div className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                  {generationPhase === "gemini" && "জেমিআই স্পিচ ইঞ্জিন কাজ করছে..."}
                  {generationPhase === "wav" && "উচ্চ মানের স্টুডিও WAV তৈরি হচ্ছে..."}
                  {generationPhase === "mp3" && `ব্যাকগ্রাউন্ডে MP3 রূপান্তর হচ্ছে: ${workerProgress}%`}
                </span>
              </div>
              <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 font-bold">
                {generationPhase === "mp3" ? `${workerProgress}%` : "অপেক্ষা করুন..."}
              </span>
            </div>

            {/* Premium Animated Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
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

            <p className="text-xs text-center text-gray-400 dark:text-zinc-500 leading-relaxed">
              {generationPhase === "gemini" && "Gemini 3.1-TTS AI বাংলায় প্রাকৃতিক উচ্চারণে আপনার কথা সাজাচ্ছে।"}
              {generationPhase === "wav" && "লপলেস স্টুডিও ফরম্যাটে অডিও রেন্ডার সম্পন্ন হচ্ছে।"}
              {generationPhase === "mp3" && "একটি ডেডিকেটেড ব্যাকগ্রাউন্ড ওয়েব ওয়ার্কার আপনার MP3 কম্প্রেস করছে যাতে ইউআই আটকে না যায়।"}
            </p>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!text.trim()}
            id="generate-voice-btn"
            className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold tracking-wide text-white transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer ${
              text.trim()
                ? "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:scale-[1.02] shadow-indigo-100 dark:shadow-none"
                : "bg-gray-300 dark:bg-zinc-800 text-gray-500 dark:text-zinc-600 cursor-not-allowed shadow-none"
            }`}
          >
            <Sparkles className="w-5 h-5 fill-current" />
            ভয়েস জেনারেট করুন (Generate Bangla Voice)
          </button>
        )}
      </div>
    </div>
  );
}
