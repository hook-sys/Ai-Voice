export type VoiceId = string;

export interface VoiceProfile {
  id: VoiceId;
  name: string;
  banglaName: string;
  gender: "Male" | "Female";
  category: "ads" | "story" | "news" | "casual" | "motivational" | "documentary" | "education" | "support" | "presentation" | "poetry" | "podcast" | "meditation";
  banglaCategory: string;
  avatarText: string;
  description: string;
  banglaDescription: string;
}

export interface AudioItem {
  id: string;
  text: string;
  voiceId: VoiceId;
  voiceName: string;
  createdAt: string;
  wavBase64: string; // Used to play and download lossless studio audio
  mp3Base64?: string; // Cache the encoded MP3 base64 if generated
  pcmBase64?: string; // Used to regenerate MP3 or in background worker
}
