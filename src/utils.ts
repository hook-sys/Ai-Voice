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
  },
  {
    id: "Noakhali_Female_1",
    name: "Rokeya",
    banglaName: "রোকেয়া (নোয়াখালী)",
    gender: "Female",
    category: "casual",
    banglaCategory: "নোয়াখালী আঞ্চলিক",
    avatarText: "ন",
    description: "Expressive female voice with distinct Noakhali regional tone.",
    banglaDescription: "নোয়াখালীর ঐতিহ্যবাহী আঞ্চলিক নারী কণ্ঠ। অত্যন্ত মিষ্টি ও প্রাণবন্ত বাচনভঙ্গি।"
  },
  {
    id: "Noakhali_Male_1",
    name: "Belal",
    banglaName: "বেলাল (নোয়াখালী)",
    gender: "Male",
    category: "casual",
    banglaCategory: "নোয়াখালী আঞ্চলিক",
    avatarText: "ন",
    description: "Natural male voice with standard Noakhali regional accent.",
    banglaDescription: "নোয়াখালীর খাঁটি আঞ্চলিক পুরুষ কণ্ঠ। সাধারণ পডকাস্ট ও বিনোদনের জন্য উপযোগী।"
  },
  {
    id: "Noakhali_Female_2",
    name: "Sayeeda",
    banglaName: "সাইদা (নোয়াখালী গল্পকার)",
    gender: "Female",
    category: "story",
    banglaCategory: "নোয়াখালী আঞ্চলিক",
    avatarText: "সা",
    description: "Storyteller female voice speaking with a warm Noakhali dialect.",
    banglaDescription: "নোয়াখালীর আঞ্চলিক ভাষায় গল্প ও নাটক উপস্থাপনের জন্য উপযুক্ত নারী কণ্ঠ।"
  },
  {
    id: "Noakhali_Male_2",
    name: "Milon",
    banglaName: "মিলন (নোয়াখালী স্পিচ)",
    gender: "Male",
    category: "motivational",
    banglaCategory: "নোয়াখালী আঞ্চলিক",
    avatarText: "মি",
    description: "Bold male voice speaking in highly localized Noakhali language.",
    banglaDescription: "নোয়াখালীর জোরালো আঞ্চলিক টান ও বাচনভঙ্গি সমৃদ্ধ পুরুষ কণ্ঠ।"
  },
  {
    id: "Chittagong_Female_1",
    name: "Yasmin",
    banglaName: "ইয়াসমিন (চট্টগ্রাম)",
    gender: "Female",
    category: "casual",
    banglaCategory: "চট্টগ্রাম আঞ্চলিক",
    avatarText: "চ",
    description: "Traditional Chatgaiya regional female voice, perfect for local storytelling.",
    banglaDescription: "চট্টগ্রামের চাটগাঁইয়া ভাষার মিষ্টি নারী কণ্ঠ। অত্যন্ত সাবলীল ও স্পষ্ট।"
  },
  {
    id: "Chittagong_Male_1",
    name: "Nizam",
    banglaName: "নিজাম (চট্টগ্রাম)",
    gender: "Male",
    category: "casual",
    banglaCategory: "চট্টগ্রাম আঞ্চলিক",
    avatarText: "চ",
    description: "Authentic Chatgaiya dialect male voice for fun, energetic conversations.",
    banglaDescription: "চট্টগ্রামের আদি চাটগাঁইয়া ভাষার পুরুষ কণ্ঠ। কৌতুক ও পডকাস্টে দারুণ।"
  },
  {
    id: "Chittagong_Female_2",
    name: "Shahnaz",
    banglaName: "শাহনাজ (চট্টগ্রাম বিজ্ঞাপন)",
    gender: "Female",
    category: "ads",
    banglaCategory: "চট্টগ্রাম আঞ্চলিক",
    avatarText: "শা",
    description: "Chittagong dialect commercial specialist female voice.",
    banglaDescription: "চট্টগ্রামের আঞ্চলিক টান যুক্ত চমৎকার বাণিজ্যিক ও বিজ্ঞাপনধর্মী নারী কণ্ঠ।"
  },
  {
    id: "Chittagong_Male_2",
    name: "Iqbal",
    banglaName: "ইকবাল (চট্টগ্রাম গল্প)",
    gender: "Male",
    category: "story",
    banglaCategory: "চট্টগ্রাম আঞ্চলিক",
    avatarText: "ই",
    description: "Chittagong regional dramatic male voice.",
    banglaDescription: "চট্টগ্রামের চাটগাঁইয়া টানে আবেগঘন গল্প বা নাটক পাঠের উপযোগী পুরুষ কণ্ঠ।"
  },
  {
    id: "Sylhet_Female_1",
    name: "Selina",
    banglaName: "সেলিনা (সিলেট)",
    gender: "Female",
    category: "casual",
    banglaCategory: "সিলেট আঞ্চলিক",
    avatarText: "স",
    description: "Melodious Sylheti dialect female voice.",
    banglaDescription: "সিলেটি আঞ্চলিক ভাষার অত্যন্ত চমৎকার ও সুরেলা মিষ্টি নারী কণ্ঠ।"
  },
  {
    id: "Sylhet_Male_1",
    name: "Ronggo",
    banglaName: "রঙ্গ (সিলেট)",
    gender: "Male",
    category: "casual",
    banglaCategory: "সিলেট আঞ্চলিক",
    avatarText: "র",
    description: "Authentic Sylheti regional male voice with original Sylhet vibe.",
    banglaDescription: "সিলেটের নিজস্ব কথ্য ভাষার সাবলীল ও ঘরোয়া পুরুষ কণ্ঠ।"
  },
  {
    id: "Sylhet_Female_2",
    name: "Tazmeen",
    banglaName: "তাজমিন (সিলেট গল্প)",
    gender: "Female",
    category: "story",
    banglaCategory: "সিলেট আঞ্চলিক",
    avatarText: "তা",
    description: "Warm storyteller voice in traditional Sylheti accent.",
    banglaDescription: "সিলেটি ভাষার ঐতিহ্যবাহী অডিওবুক এবং রোমান্টিক গল্প বর্ণনার জন্য নারী কণ্ঠ।"
  },
  {
    id: "Sylhet_Male_2",
    name: "Jamil",
    banglaName: "জামিল (সিলেট বিজ্ঞাপন)",
    gender: "Male",
    category: "ads",
    banglaCategory: "সিলেট আঞ্চলিক",
    avatarText: "জা",
    description: "Sylheti commercial male voice.",
    banglaDescription: "সিলেটি আঞ্চলিক ভাষায় যেকোনো প্রচার ও বিজ্ঞাপনের জন্য চমৎকার পুরুষ কণ্ঠ।"
  },
  {
    id: "Barisal_Female_1",
    name: "Halima",
    banglaName: "হালিমা (বরিশাল)",
    gender: "Female",
    category: "casual",
    banglaCategory: "বরিশাল আঞ্চলিক",
    avatarText: "ব",
    description: "Traditional energetic Barisali dialect female voice.",
    banglaDescription: "বরিশালের আসল আঞ্চলিক রূপ ও টানের অত্যন্ত হাস্যোজ্জ্বল ও চটপটে নারী কণ্ঠ।"
  },
  {
    id: "Barisal_Male_1",
    name: "Hasan",
    banglaName: "হাসান (বরিশাল)",
    gender: "Male",
    category: "casual",
    banglaCategory: "বরিশাল আঞ্চলিক",
    avatarText: "ব",
    description: "Perfect colloquial Barisali accent male voice.",
    banglaDescription: "বরিশালের ঐতিহ্যবাহী রসাত্মক ও সাবলীল কথ্য ভাষার পুরুষ কণ্ঠ।"
  },
  {
    id: "Barisal_Female_2",
    name: "Kohinoor",
    banglaName: "কোহিনূর (বরিশাল বিজ্ঞাপন)",
    gender: "Female",
    category: "ads",
    banglaCategory: "বরিশাল আঞ্চলিক",
    avatarText: "কো",
    description: "Commercial female voice with authentic Barisali style.",
    banglaDescription: "বরিশাল অঞ্চলের মিষ্টি হাসিমাখা প্রচার ও প্রমোショナル বিজ্ঞাপনের উপযোগী কণ্ঠ।"
  },
  {
    id: "Barisal_Male_2",
    name: "Bashar",
    banglaName: "বাশার (বরিশাল গল্প)",
    gender: "Male",
    category: "story",
    banglaCategory: "বরিশাল আঞ্চলিক",
    avatarText: "বা",
    description: "Storyteller male voice with expressive Barisali accent.",
    banglaDescription: "বরিশাল টানে থিয়েটার নাটক, কৌতুক এবং মজাদার লোক-গল্পের জন্য সেরা।"
  },
  {
    id: "Comilla_Female_1",
    name: "Amena",
    banglaName: "আমেনা (কুমিল্লা)",
    gender: "Female",
    category: "casual",
    banglaCategory: "কুমিল্লা আঞ্চলিক",
    avatarText: "কু",
    description: "Sweet, rhythmic Comillan accent female voice.",
    banglaDescription: "কুমিল্লার অঞ্চলের নিজস্ব টান ও চমৎকার উচ্চারণের মিষ্টি নারী কণ্ঠ।"
  },
  {
    id: "Comilla_Male_1",
    name: "Arif",
    banglaName: "আরিফ (কুমিল্লা)",
    gender: "Male",
    category: "casual",
    banglaCategory: "কুমিল্লা আঞ্চলিক",
    avatarText: "আ",
    description: "Rhythmic Comillan regional male voice.",
    banglaDescription: "কুমিল্লার কথ্য বাচনভঙ্গির অত্যন্ত ভদ্র ও নিখুঁত আঞ্চলিক পুরুষ কণ্ঠ।"
  },
  {
    id: "Comilla_Female_2",
    name: "Ruma",
    banglaName: "রুমা (কুমিল্লা গল্প)",
    gender: "Female",
    category: "story",
    banglaCategory: "কুমিল্লা আঞ্চলিক",
    avatarText: "রু",
    description: "Expressive Comillan dialect female voice.",
    banglaDescription: "কুমিল্লার টানে সাহিত্য পাঠ এবং নাট্য সংলাপ উপস্থাপনের জন্য চমৎকার।"
  },
  {
    id: "Comilla_Male_2",
    name: "Tipu",
    banglaName: "টিপু (কুমিল্লা বিজ্ঞাপন)",
    gender: "Male",
    category: "ads",
    banglaCategory: "কুমিল্লা আঞ্চলিক",
    avatarText: "টি",
    description: "Energetic Comillan advertiser voice.",
    banglaDescription: "কুমিল্লার আঞ্চলিক ঢঙে সজীব বিজ্ঞাপন ও ঘোষণার জন্য উপযুক্ত কণ্ঠ।"
  },
  {
    id: "Dhaka_Male_1",
    name: "Imran",
    banglaName: "ইমরান (পুরান ঢাকা)",
    gender: "Male",
    category: "casual",
    banglaCategory: "পুরান ঢাকা",
    avatarText: "ঢা",
    description: "Hilarious, high-spirited Old Dhaka Kutti dialect male voice.",
    banglaDescription: "পুরান ঢাকার ঐতিহ্যবাহী হাসিখুশি ও মজাদার কুত্তি ভাষার আসল পুরুষ কণ্ঠ।"
  },
  {
    id: "Dhaka_Female_1",
    name: "Jhumur",
    banglaName: "ঝুমুর (পুরান ঢাকা)",
    gender: "Female",
    category: "casual",
    banglaCategory: "পুরান ঢাকা",
    avatarText: "ঝু",
    description: "Sprightly and sassy Old Dhaka regional female voice.",
    banglaDescription: "পুরান ঢাকার মিষ্টি ও প্রাণবন্ত ঢাকাইয়া নারী কণ্ঠ। লোকাল ডাবিংয়ের জন্য সেরা।"
  },
  {
    id: "Dhaka_Male_2",
    name: "Kashem",
    banglaName: "কাসেম (পুরান ঢাকা বিজ্ঞাপন)",
    gender: "Male",
    category: "ads",
    banglaCategory: "পুরান ঢাকা",
    avatarText: "কা",
    description: "Attracting Old Dhaka commercial male voice.",
    banglaDescription: "পুরান ঢাকাইয়া রসাত্মক ঢঙে বিজ্ঞাপন ও পণ্য প্রচারের জন্য অনন্য কণ্ঠ।"
  },
  {
    id: "Dhaka_Female_2",
    name: "Shamoly",
    banglaName: "শ্যামলী (পুরান ঢাকা গল্প)",
    gender: "Female",
    category: "story",
    banglaCategory: "পুরান ঢাকা",
    avatarText: "শ্যা",
    description: "Dramatic storyteller voice in classic Old Dhaka accent.",
    banglaDescription: "ঢাকাইয়া ভাষার নাটকীয় ও ঐতিহ্যবাহী গল্প উপস্থাপক নারী কণ্ঠ।"
  },
  {
    id: "Kolkata_Female_1",
    name: "Sreemoyee",
    banglaName: "শ্রীময়ী (কলকাতা)",
    gender: "Female",
    category: "casual",
    banglaCategory: "কলকাতা আঞ্চলিক",
    avatarText: "ক",
    description: "Sweet, gentle female voice speaking in standard Kolkata (West Bengal) accent.",
    banglaDescription: "কলকাতার আধুনিক ও মিষ্টি মার্জিত কথ্য ভাষার অত্যন্ত সাবলীল নারী কণ্ঠ।"
  },
  {
    id: "Kolkata_Male_1",
    name: "Rohan",
    banglaName: "রোহান (কলকাতা)",
    gender: "Male",
    category: "casual",
    banglaCategory: "কলকাতা আঞ্চলিক",
    avatarText: "র",
    description: "Cool, urban male voice speaking with typical South Kolkata accent.",
    banglaDescription: "কলকাতার তরুণ প্রজন্মের ফ্যাশনেবল ও অত্যন্ত বন্ধুসুলভ স্মার্ট পুরুষ কণ্ঠ।"
  },
  {
    id: "Kolkata_Female_2",
    name: "Payel",
    banglaName: "পায়েল (কলকাতা বিজ্ঞাপন)",
    gender: "Female",
    category: "ads",
    banglaCategory: "কলকাতা আঞ্চলিক",
    avatarText: "পা",
    description: "Premium Kolkata accent corporate and commercial female voice.",
    banglaDescription: "কলকাতার প্রিমিয়াম এফএম রেডিও ঢঙে চমৎকার বিজ্ঞাপন ও প্রচারধর্মী নারী কণ্ঠ।"
  },
  {
    id: "Kolkata_Male_2",
    name: "Souvik",
    banglaName: "সৌভিক (কলকাতা সংবাদ)",
    gender: "Male",
    category: "news",
    banglaCategory: "কলকাতা আঞ্চলিক",
    avatarText: "সৌ",
    description: "Formal, clean and highly professional West Bengal news anchor style.",
    banglaDescription: "কলকাতার প্রাতিষ্ঠানিক সংবাদপাঠ এবং তথ্যচিত্র উপস্থাপনার জন্য চমৎকার পুরুষ কণ্ঠ।"
  },
  {
    id: "Kolkata_Female_3",
    name: "Ananya_Kolkata",
    banglaName: "অনন্যা (কলকাতা গল্পকার)",
    gender: "Female",
    category: "story",
    banglaCategory: "কলকাতা আঞ্চলিক",
    avatarText: "অ",
    description: "Poetic and dramatic storytelling voice with West Bengal intonations.",
    banglaDescription: "পশ্চিমবঙ্গের মার্জিত উচ্চারণে অডিওবুক এবং রোমান্টিক গল্প বলার জন্য আদর্শ কণ্ঠ।"
  },
  {
    id: "Kolkata_Male_3",
    name: "Debasish",
    banglaName: "দেবাশীষ (কলকাতা আবৃত্তি)",
    gender: "Male",
    category: "story",
    banglaCategory: "কলকাতা আঞ্চলিক",
    avatarText: "দে",
    description: "Deep artistic recitation specialist male voice from Kolkata.",
    banglaDescription: "কলকাতার জলদগম্ভীর কণ্ঠস্বর, কবিতা আবৃত্তি ও গভীর শ্রুতিনাটকের জন্য সেরা।"
  },
  {
    id: "Mymensingh_Male_1",
    name: "Sajid",
    banglaName: "সাজিদ (ময়মনসিংহ)",
    gender: "Male",
    category: "casual",
    banglaCategory: "ময়মনসিংহ আঞ্চলিক",
    avatarText: "ম",
    description: "Colloquial Mymensingh regional male voice.",
    banglaDescription: "ময়মনসিংহ অঞ্চলের খাঁটি মিষ্টি গ্রামীণ টান ও উচ্চারণ সমৃদ্ধ পুরুষ কণ্ঠ।"
  },
  {
    id: "Mymensingh_Female_1",
    name: "Moriom",
    banglaName: "মরিয়ম (ময়মনসিংহ)",
    gender: "Female",
    category: "casual",
    banglaCategory: "ময়মনসিংহ আঞ্চলিক",
    avatarText: "ম",
    description: "Warm Mymensingh regional female voice.",
    banglaDescription: "ময়মনসিংহের সহজ-সরল ও ঐতিহ্যবাহী টানের মিষ্টতাভরা চমৎকার নারী কণ্ঠ।"
  },
  {
    id: "Mymensingh_Male_2",
    name: "Rafiq",
    banglaName: "রফিক (ময়মনসিংহ গল্প)",
    gender: "Male",
    category: "story",
    banglaCategory: "ময়মনসিংহ আঞ্চলিক",
    avatarText: "র",
    description: "Storyteller with Mymensingh regional dialect.",
    banglaDescription: "ময়মনসিংহ টানে রূপকথা ও ঐতিহাসিক গ্রামীণ পটভূমির গল্প বলার জন্য সেরা।"
  },
  {
    id: "Mymensingh_Female_2",
    name: "Bilkis",
    banglaName: "বিলকিস (ময়মনসিংহ বিজ্ঞাপন)",
    gender: "Female",
    category: "ads",
    banglaCategory: "ময়মনসিংহ আঞ্চলিক",
    avatarText: "বি",
    description: "Regional ad voice from Mymensingh.",
    banglaDescription: "ময়মনসিংহের কথ্য স্টাইলে হাসিখুশি প্রচার বিজ্ঞাপনের অনন্য নারী কণ্ঠ।"
  },
  {
    id: "Khulna_Male_1",
    name: "Sohail",
    banglaName: "সোহেল (খুলনা)",
    gender: "Male",
    category: "casual",
    banglaCategory: "খুলনা আঞ্চলিক",
    avatarText: "খ",
    description: "Khulna regional male voice, steady and pleasant.",
    banglaDescription: "খুলনা ও রূপসা অঞ্চলের নিজস্ব সহজ কথ্য ঢঙের চমৎকার পুরুষ কণ্ঠ।"
  },
  {
    id: "Khulna_Female_1",
    name: "Sabina",
    banglaName: "সাবিনা (খুলনা)",
    gender: "Female",
    category: "casual",
    banglaCategory: "খুলনা আঞ্চলিক",
    avatarText: "খ",
    description: "Gentle Khulna dialect female voice.",
    banglaDescription: "দক্ষিণাঞ্চলের তথা খুলনার সুমিষ্ট ও অত্যন্ত ভদ্র বাচনভঙ্গির নারী কণ্ঠ।"
  },
  {
    id: "Khulna_Male_2",
    name: "Zia",
    banglaName: "জিয়া (খুলনা খবর)",
    gender: "Male",
    category: "news",
    banglaCategory: "খুলনা আঞ্চলিক",
    avatarText: "জি",
    description: "Clear West Bengal border-style regional news voice.",
    banglaDescription: "খুলনা অঞ্চলের মার্জিত ও আনুষ্ঠানিক কণ্ঠস্বর, সংবাদ ও প্রামাণ্যচিত্রের উপযোগী।"
  },
  {
    id: "Khulna_Female_2",
    name: "Lipi",
    banglaName: "লিপি (খুলনা গল্প)",
    gender: "Female",
    category: "story",
    banglaCategory: "খুলনা আঞ্চলিক",
    avatarText: "লি",
    description: "Calm Khulna style audiobook reader.",
    banglaDescription: "সুন্দরবন ও উপকূলীয় লোকগাঁথা বর্ণনার জন্য উপযুক্ত আবেগপূর্ণ শান্ত নারী কণ্ঠ।"
  },
  {
    id: "Rajshahi_Male_1",
    name: "Latif",
    banglaName: "লতিফ (রাজশাহী)",
    gender: "Male",
    category: "casual",
    banglaCategory: "রাজশাহী আঞ্চলিক",
    avatarText: "রা",
    description: "Amiable Rajshahi regional dialect male voice.",
    banglaDescription: "বরেন্দ্র অঞ্চলের তথা রাজশাহীর আসল প্রাণবন্ত কথ্য টান সমৃদ্ধ চমৎকার পুরুষ কণ্ঠ।"
  },
  {
    id: "Rajshahi_Female_1",
    name: "Reshma",
    banglaName: "রেশমা (রাজশাহী)",
    gender: "Female",
    category: "casual",
    banglaCategory: "রাজশাহী আঞ্চলিক",
    avatarText: "রা",
    description: "Gentle Rajshahi regional dialect female voice.",
    banglaDescription: "রাজশাহীর মিষ্টি সুমিষ্ট ও অত্যন্ত চমৎকার টান যুক্ত মিষ্টি নারী কণ্ঠ।"
  },
  {
    id: "Rajshahi_Male_2",
    name: "Shafi",
    banglaName: "শাফি (রাজশাহী গল্প)",
    gender: "Male",
    category: "story",
    banglaCategory: "রাজশাহী আঞ্চলিক",
    avatarText: "শা",
    description: "Rajshahi storyteller male voice.",
    banglaDescription: "রাজশাহীর আঞ্চলিক টানে গম্ভীর ও রসাত্মক গল্প নাটক পরিবেশনার জন্য দারুণ।"
  },
  {
    id: "Rajshahi_Female_2",
    name: "Poly",
    banglaName: "পলি (রাজশাহী বিজ্ঞাপন)",
    gender: "Female",
    category: "ads",
    banglaCategory: "রাজশাহী আঞ্চলিক",
    avatarText: "প",
    description: "Rajshahi style promotional female voice.",
    banglaDescription: "রাজশাহীর স্থানীয় বিজ্ঞাপনী ও বাণিজ্যিক প্রচারের জন্য আকর্ষণীয় নারী কণ্ঠ।"
  },
  {
    id: "Rangpur_Male_1",
    name: "Moynal",
    banglaName: "ময়নাল (রংপুর)",
    gender: "Male",
    category: "casual",
    banglaCategory: "রংপুর আঞ্চলিক",
    avatarText: "রং",
    description: "Traditional Rangpur regional dialect male voice.",
    banglaDescription: "রংপুর ও বাহে অঞ্চলের অত্যন্ত মিষ্টি আঞ্চলিক সুরেলা পুরুষ কণ্ঠ।"
  },
  {
    id: "Rangpur_Female_1",
    name: "Rahima",
    banglaName: "রহিমা (রংপুর)",
    gender: "Female",
    category: "casual",
    banglaCategory: "রংপুর আঞ্চলিক",
    avatarText: "রং",
    description: "Hearty Rangpuri dialect female voice.",
    banglaDescription: "উত্তরবঙ্গের সুমিষ্ট বাহে টানের অত্যন্ত অমায়িক ও চমৎকার নারী কণ্ঠ।"
  },
  {
    id: "Rangpur_Male_2",
    name: "Dulal",
    banglaName: "দুলাল (রংপুর গল্প)",
    gender: "Male",
    category: "story",
    banglaCategory: "রংপুর আঞ্চলিক",
    avatarText: "দু",
    description: "Rangpur dramatic storytelling male voice.",
    banglaDescription: "রংপুর আঞ্চলিক নাট্য রূপের জন্য অত্যন্ত চমৎকার আবেগময় কণ্ঠ।"
  },
  {
    id: "Rangpur_Female_2",
    name: "Shefali",
    banglaName: "শেফালী (রংপুর বিজ্ঞাপন)",
    gender: "Female",
    category: "ads",
    banglaCategory: "রংপুর আঞ্চলিক",
    avatarText: "শে",
    description: "Rangpur style advertiser female voice.",
    banglaDescription: "রংপুরের আঞ্চলিক টানে বাণিজ্যিক বিজ্ঞাপন প্রচারের জন্য আকর্ষক নারী কণ্ঠ।"
  },
  {
    id: "Jessore_Male_1",
    name: "Sumon",
    banglaName: "সুমন (যশোর)",
    gender: "Male",
    category: "casual",
    banglaCategory: "যশোর আঞ্চলিক",
    avatarText: "য",
    description: "Amiable Jessore regional dialect male voice.",
    banglaDescription: "যশোর অঞ্চলের নিজস্ব সুন্দর ও মিষ্ট কথ্য টানের চমৎকার পুরুষ কণ্ঠ।"
  },
  {
    id: "Jessore_Female_1",
    name: "Jharna",
    banglaName: "ঝর্ণা (যশোর)",
    gender: "Female",
    category: "casual",
    banglaCategory: "যশোর আঞ্চলিক",
    avatarText: "য",
    description: "Jessore regional female voice.",
    banglaDescription: "যশোর অঞ্চলের অতি মনোরম ও মিষ্ট কথ্য বাচনভঙ্গির চমৎকার নারী কণ্ঠ।"
  },
  {
    id: "Midnapore_Male_1",
    name: "Sanjoy",
    banglaName: "সঞ্জয় (মেদিনীপুর)",
    gender: "Male",
    category: "casual",
    banglaCategory: "মেদিনীপুর আঞ্চলিক",
    avatarText: "মে",
    description: "Midnaporian dialect voice, with standard local phrasing.",
    banglaDescription: "পশ্চিমবঙ্গের মেদিনীপুর লোকাল টানের দারুণ ও প্রাণবন্ত পুরুষ কণ্ঠ।"
  },
  {
    id: "Midnapore_Female_1",
    name: "Tumpa",
    banglaName: "টুম্পা (মেদিনীপুর)",
    gender: "Female",
    category: "casual",
    banglaCategory: "মেদিনীপুর আঞ্চলিক",
    avatarText: "টু",
    description: "Sweet Midnaporian regional dialect female voice.",
    banglaDescription: "মেদিনীপুর আঞ্চলিক টানের লোকাল নাটক ও ডাবিং উপযোগী মিষ্টি নারী কণ্ঠ।"
  },
  {
    id: "Purulia_Male_1",
    name: "Bikram",
    banglaName: "বিক্রম (পুরুলিয়া)",
    gender: "Male",
    category: "casual",
    banglaCategory: "পুরুলিয়া আঞ্চলিক",
    avatarText: "পু",
    description: "Rustic and earthy Purulian accent male voice.",
    banglaDescription: "পশ্চিমবঙ্গের পুরুলিয়া ও মানভূম অঞ্চলের লোকজ ভাষার টানে সজীব পুরুষ কণ্ঠ।"
  },
  {
    id: "Purulia_Female_1",
    name: "Parbati",
    banglaName: "পার্বতী (পুরুলিয়া)",
    gender: "Female",
    category: "casual",
    banglaCategory: "পুরুলিয়া আঞ্চলিক",
    avatarText: "পা",
    description: "Rustic and sweet Purulian female voice.",
    banglaDescription: "পুরুলিয়ার আঞ্চলিক সংস্কৃতির আদলে মিষ্টি ও অতি প্রাকৃতিক গ্রামীণ টান সমৃদ্ধ নারী কণ্ঠ।"
  },
  {
    id: "Pro_Female_1",
    name: "Sultana",
    banglaName: "সুলতানা (সংবাদ ও প্রাতিষ্ঠানিক)",
    gender: "Female",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "সু",
    description: "Highly professional female news anchor. Perfect for news broadcasts, documentaries, and formal voiceovers.",
    banglaDescription: "অত্যন্ত পেশাদার নারী সংবাদ উপস্থাপক। খবর পাঠ, ডকুমেন্টারি এবং গুরুত্বপূর্ণ প্রাতিষ্ঠানিক ঘোষণার জন্য দারুণ উপযুক্ত।"
  },
  {
    id: "Pro_Male_1",
    name: "Mansur",
    banglaName: "মনসুর (সংবাদ ও উপস্থাপনা)",
    gender: "Male",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "মন",
    description: "Deep, resonant male voice with perfect news anchor pacing and formal authority.",
    banglaDescription: "গুরুগম্ভীর ও রাজকীয় পুরুষ সংবাদ পাঠক। দীর্ঘ বিবরণ, তথ্যচিত্র এবং প্রাতিষ্ঠানিক প্রজেক্টের জন্য চমৎকার।"
  },
  {
    id: "Pro_Female_2",
    name: "Farhana",
    banglaName: "ফারহানা (শিক্ষামূলক ও টিউটোরিয়াল)",
    gender: "Female",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "ফা",
    description: "Clear, friendly, and structured female voice, perfect for online lectures, e-learning courses, and training videos.",
    banglaDescription: "স্পষ্ট, বন্ধুসুলভ ও অত্যন্ত সহজবোধ্য শিক্ষামূলক নারী কণ্ঠ। অনলাইন টিউটোরিয়াল, ই-লার্নিং এবং কোর্সের লেকচারের জন্য আদর্শ।"
  },
  {
    id: "Pro_Male_2",
    name: "Zubair",
    banglaName: "জুবায়ের (ই-লার্নিং ও টিউটোরিয়াল)",
    gender: "Male",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "জু",
    description: "Clear, educational, and perfectly paced male voice, perfect for professional corporate training and tutorial narration.",
    banglaDescription: "সহজবোধ্য, স্পষ্ট ও চমৎকার গতিসম্পন্ন পুরুষ ই-লার্নিং কণ্ঠ। কর্পোরেট ট্রেনিং, প্রফেশনাল প্রেজেন্টেশন ও টিউটোরিয়ালের জন্য সেরা।"
  },
  {
    id: "Pro_Female_3",
    name: "Tasnim",
    banglaName: "তাসনিম (কর্পোরেট প্রেজেন্টেশন)",
    gender: "Female",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "তা",
    description: "Confident, articulate, and modern female voice for high-level business presentations and executive briefings.",
    banglaDescription: "আত্মবিশ্বাসী, স্পষ্ট উচ্চারণের আধুনিক নারী কণ্ঠ। বিজনেস প্রেজেন্টেশন, বোর্ড মিটিং এবং প্রাতিষ্ঠানিক কন্টেন্টের জন্য অসাধারণ।"
  },
  {
    id: "Pro_Male_3",
    name: "Riaz",
    banglaName: "রিয়াজ (কর্পোরেট ও বোর্ডরুম)",
    gender: "Male",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "রি",
    description: "Confident and sharp corporate male presenter voice, suitable for professional business profiles and commercials.",
    banglaDescription: "আত্মবিশ্বাসী ও ধারালো পুরুষ কর্পোরেট কণ্ঠ। স্টার্টআপ প্রেজেন্টেশন, বিজনেস প্রমোশন এবং ব্র্যান্ডিংয়ের জন্য জুতসই।"
  },
  {
    id: "Pro_Female_4",
    name: "Nusrat",
    banglaName: "নুসরাত (কাস্টমার কেয়ার ও অ্যাসিস্ট্যান্ট)",
    gender: "Female",
    category: "casual",
    banglaCategory: "প্রফেশনাল",
    avatarText: "নু",
    description: "Extremely polite, gentle, and helpful female voice, designed for smart assistant prompts and IVR telephone systems.",
    banglaDescription: "অত্যন্ত বিনয়ী, মিষ্টি ও ভদ্র কাস্টমার কেয়ার কণ্ঠ। ভয়েস অ্যাসিস্ট্যান্ট, ফোন বুথ বা আইভিআর (IVR) হেল্পলাইনের জন্য জাদুকরী।"
  },
  {
    id: "Pro_Male_4",
    name: "Sajid_Pro",
    banglaName: "সাজিদ (স্মার্ট অ্যাসিস্ট্যান্ট ও সাপোর্ট)",
    gender: "Male",
    category: "casual",
    banglaCategory: "প্রফেশনাল",
    avatarText: "সা",
    description: "Friendly, modern, and helpful male assistant voice for customer support and interactive systems.",
    banglaDescription: "বন্ধুসুলভ, মার্জিত ও আধুনিক পুরুষ আইভিআর কণ্ঠ। কাস্টমার সাপোর্ট এবং ভয়েস-অ্যাসিস্ট্যান্ট ইন্টারেকশনের জন্য মানানসই।"
  },
  {
    id: "Pro_Female_5",
    name: "Israt",
    banglaName: "ইসরাত (বিজ্ঞাপন ও রেডিও জকি)",
    gender: "Female",
    category: "ads",
    banglaCategory: "প্রফেশনাল",
    avatarText: "ইস",
    description: "Sparkling, highly persuasive, and fast-paced female voice. Perfect for modern FM radio ads and digital marketing video voiceover.",
    banglaDescription: "সজীব, প্রানোচ্ছল ও দারুণ আকর্ষণীয় নারী বিজ্ঞাপন কণ্ঠ। এফএম রেডিও, সামাজিক যোগাযোগ মাধ্যমের স্পনসরড অ্যাড এবং প্রমোশনাল কন্টেন্টের জন্য উপযুক্ত।"
  },
  {
    id: "Pro_Male_5",
    name: "Tanvir",
    banglaName: "তানভীর (বিজ্ঞাপন ও সেলস)",
    gender: "Male",
    category: "ads",
    banglaCategory: "প্রফেশনাল",
    avatarText: "তা",
    description: "High-energy, persuasive, and dynamic male voice, designed to maximize sales Conversions in commercial ads and promos.",
    banglaDescription: "অত্যন্ত এনার্জেটিক, গতিশীল ও তেজস্বী পুরুষ বিজ্ঞাপন কণ্ঠ। নতুন ব্র্যান্ড লঞ্চ, ধামাকা অফার ও আকর্ষণীয় বিজ্ঞাপনের প্রচারণার জন্য চমৎকার।"
  },
  {
    id: "Pro_Female_6",
    name: "Afsana",
    banglaName: "আফসানা (সাহিত্য পাঠ ও আবৃত্তি)",
    gender: "Female",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "আ",
    description: "Highly artistic female narrator with perfect poetic cadence and emotional depth, ideal for literature and reciting poems.",
    banglaDescription: "শৈল্পিক অনুভূতিসমৃদ্ধ আবৃত্তিকার কণ্ঠ। ধীর ও শান্ত সাহিত্য পাঠ, রবীন্দ্র-নজরুল কবিতা আবৃত্তি এবং নাটকের সংলাপে অনন্য।"
  },
  {
    id: "Pro_Male_6",
    name: "Mahbub",
    banglaName: "মাহবুব (কবিতা আবৃত্তি ও থিয়েটার)",
    gender: "Male",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "মা",
    description: "Deep dramatic male voice with deep emotional modulation, designed for professional reciting and serious theater dramas.",
    banglaDescription: "উচ্চ কণ্ঠস্বরের গুরুগম্ভীর ও আবেগঘন আবৃত্তিকার। থিয়েটার, ঐতিহাসিক কবিতা আবৃত্তি এবং গম্ভীর উপন্যাস পাঠে চমৎকার।"
  },
  {
    id: "Pro_Female_7",
    name: "Mehnaz",
    banglaName: "মেহনাজ (তথ্যচিত্র ও ধারাবর্ণনা)",
    gender: "Female",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "মে",
    description: "Informative, engaging, and elegant female narrator for natural history and scientific documentaries.",
    banglaDescription: "আকর্ষণীয় ও সাবলীল নারী ধারাবর্ণনা কণ্ঠ। ট্রাভেল ভ্লগ, বিজ্ঞান ও প্রকৃতি বিষয়ক চমৎকার তথ্যচিত্র এবং ডকুমেন্টারির জন্য সেরা।"
  },
  {
    id: "Pro_Male_7",
    name: "Kibriya",
    banglaName: "কিবরিয়া (ডকুমেন্টারি ও ইতিহাস)",
    gender: "Male",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "কি",
    description: "Deep, knowledgeable, and intellectual male narrator voice for historical biographics and deep documentaries.",
    banglaDescription: "গভীর, বিদগ্ধ ও তথ্যসমৃদ্ধ পুরুষ ডকুমেন্টারি ন্যারেটর। চমৎকার ইতিহাস পাঠ, ঐতিহাসিক চরিত্রের ধারাবর্ণনা এবং সুগম্ভীর বাচনের জন্য সেরা।"
  },
  {
    id: "Pro_Female_8",
    name: "Sadia",
    banglaName: "সাদিয়া (পডকাস্ট ও আড্ডা)",
    gender: "Female",
    category: "casual",
    banglaCategory: "প্রফেশনাল",
    avatarText: "সা",
    description: "Natural, engaging, and friendly female podcaster voice, great for interviews, talk shows, and casual storytelling.",
    banglaDescription: "স্বাভাবিক, প্রাণবন্ত ও বন্ধুবৎসল নারী পডকাস্ট কণ্ঠ। আড্ডার মেজাজ, লাইভ শো, দীর্ঘ সাক্ষাৎকার এবং টকশো হোস্টিংয়ের জন্য উপযুক্ত।"
  },
  {
    id: "Pro_Male_8",
    name: "Adnan",
    banglaName: "আদনান (পডকাস্ট ও টকশো হোস্ট)",
    gender: "Male",
    category: "casual",
    banglaCategory: "প্রফেশনাল",
    avatarText: "আ",
    description: "Highly relatable, modern, and engaging male podcast host voice, perfect for daily talk shows and friendly interviews.",
    banglaDescription: "আন্তরিক, আধুনিক ও বুদ্ধিদীপ্ত পডকাস্টার কণ্ঠ। সমসাময়িক বিভিন্ন টকশো, রোমাঞ্চকর আড্ডা এবং বন্ধুত্বপূর্ণ আলোচনার জন্য দারুণ।"
  },
  {
    id: "Pro_Female_9",
    name: "Monira",
    banglaName: "মনিরা (মেডিটেশন ও মাইন্ডফুলনেস)",
    gender: "Female",
    category: "casual",
    banglaCategory: "প্রফেশনাল",
    avatarText: "ম",
    description: "Soothing, angelic, and whispering female voice for mindfulness sessions, yoga instruction, and relaxing sleep guides.",
    banglaDescription: "পরম শান্ত ও দেবীসুলভ প্রশান্তিময় কণ্ঠ। মাইন্ডফুলনেস অনুশীলন, যোগব্যায়াম এবং ঘুম ও ধ্যানের জন্য অসাধারণ রিল্যাক্সিং কণ্ঠ।"
  },
  {
    id: "Pro_Male_9",
    name: "Zahid",
    banglaName: "জাহিদ (লাইফ কোচ ও মোটিভেশন)",
    gender: "Male",
    category: "motivational",
    banglaCategory: "প্রফেশনাল",
    avatarText: "জা",
    description: "Highly inspiring, high-intensity male speaker designed for powerful motivational, sales rallies, and lifestyle coaching.",
    banglaDescription: "প্রেরণাদায়ক, দীপ্ত ও শক্তিশালী মোটিভেশনাল স্পিকার কণ্ঠ। যুবসমাজকে উৎসাহিত করতে, লাইফ কোচিং এবং সাহসী বক্তব্যে অদ্বিতীয়।"
  },
  {
    id: "Pro_Female_10",
    name: "Jannat",
    banglaName: "জান্নাত (রূপকথা ও গল্প কথন)",
    gender: "Female",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "জা",
    description: "Warm, sweet, and highly animated storytelling female voice, perfect for kids stories, fairy tales, and preschool books.",
    banglaDescription: "মিষ্টি ও আদুরে গল্প দাদু কণ্ঠ। রূপকথার গল্প, শিশুদের কার্টুন ডাবিং ও প্রাক-প্রাথমিক রূপকথা শোনানোর জন্য অতুলনীয়।"
  },
  {
    id: "Pro_Male_10",
    name: "Ashraf",
    banglaName: "আশরাফ (রহস্য ও হরর থ্রিলার)",
    gender: "Male",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "আ",
    description: "Mysterious, intense, and suspenseful male voice, ideal for horror audiobooks, thriller narration, and mystery stories.",
    banglaDescription: "রোমাঞ্চকর, গা শিউরে ওঠা রহস্যময় থ্রিলার কণ্ঠ। ভৌতিক গল্প, গোয়েন্দা উপন্যাস ও হরর অডিওবুকের আবহ সৃষ্টি করতে সক্ষম।"
  },
  {
    id: "Pro_Female_11",
    name: "Farida",
    banglaName: "ফরিদা (সংবাদ উপস্থাপক ২)",
    gender: "Female",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "ফ",
    description: "Senior news presenter voice, featuring immaculate classical Bangla pronunciation and serious delivery.",
    banglaDescription: "প্রবীণ নারী সংবাদ পাঠক কণ্ঠ। অত্যন্ত প্রাঞ্জল, গম্ভীর ও মার্জিত বাংলা বাচনভঙ্গি।"
  },
  {
    id: "Pro_Male_11",
    name: "Aslam",
    banglaName: "আসলাম (সংবাদ উপস্থাপক ২)",
    gender: "Male",
    category: "news",
    banglaCategory: "প্রফেশনাল",
    avatarText: "আ",
    description: "Senior male news presenter, offering deep authority and newsroom cadence.",
    banglaDescription: "প্রবীণ পুরুষ সংবাদ পাঠক কণ্ঠ। অসাধারণ শব্দ উচ্চারণ ও গম্ভীর বাচনভঙ্গি।"
  },
  {
    id: "Pro_Female_12",
    name: "Sabina",
    banglaName: "সাবিনা (ডকুমেন্টারি ও তথ্যচিত্র)",
    gender: "Female",
    category: "documentary",
    banglaCategory: "প্রফেশনাল",
    avatarText: "সা",
    description: "Warm, professional female documentary narrator with clean informative tone.",
    banglaDescription: "আকর্ষক তথ্যচিত্র বর্ণনাকারী নারী কণ্ঠ। ইতিহাস, ভ্রমণ ও তথ্যচিত্রের জন্য সেরা।"
  },
  {
    id: "Pro_Male_12",
    name: "Kabir",
    banglaName: "কবীর (ডকুমেন্টারি ও ইতিহাস)",
    gender: "Male",
    category: "documentary",
    banglaCategory: "প্রফেশনাল",
    avatarText: "ক",
    description: "Deep, mature, and resonant documentary narrator voice.",
    banglaDescription: "ভারী ও চমৎকার ইতিহাস বর্ণনাকারী পুরুষ কণ্ঠ। গম্ভীর ও তথ্যবহুল বর্ণনায় মানানসই।"
  },
  {
    id: "Pro_Female_13",
    name: "Rifat",
    banglaName: "রিফাত (আইটি ও প্রযুক্তি টিউটর)",
    gender: "Female",
    category: "education",
    banglaCategory: "প্রফেশনাল",
    avatarText: "রি",
    description: "Educational IT tutor voice, clear, helpful, and steady.",
    banglaDescription: "বিজ্ঞান, ফ্রিল্যান্সিং ও আইটি টিউটোরিয়াল উপযোগী স্পষ্ট ও সহযোগী নারী কণ্ঠ।"
  },
  {
    id: "Pro_Male_13",
    name: "Tareq",
    banglaName: "তারেক (বিজ্ঞান ও আইটি টিউটর)",
    gender: "Male",
    category: "education",
    banglaCategory: "প্রফেশনাল",
    avatarText: "তা",
    description: "Educational instructor voice with high structural clarity.",
    banglaDescription: "শিক্ষামূলক ও প্রফেশনাল অনলাইন কোর্স উপস্থাপনার জন্য চমৎকার পুরুষ কণ্ঠ।"
  },
  {
    id: "Pro_Female_14",
    name: "Shamima",
    banglaName: "শামীমা (গ্রাহক সেবা প্রতিনিধি ২)",
    gender: "Female",
    category: "support",
    banglaCategory: "প্রফেশনাল",
    avatarText: "শা",
    description: "Polite customer support agent, soft-spoken, comforting, and helpful.",
    banglaDescription: "পরম বিনয়ী কাস্টমার কেয়ার প্রতিনিধি কণ্ঠ। সেবা ও সমাধানমূলক কণ্ঠস্বর।"
  },
  {
    id: "Pro_Male_14",
    name: "Rafiq",
    banglaName: "রফিক (सहায়ক সেবা প্রতিনিধি)",
    gender: "Male",
    category: "support",
    banglaCategory: "প্রফেশনাল",
    avatarText: "র",
    description: "Polite, supportive male customer executive voice.",
    banglaDescription: "বিনয়ী ও পরম সহযোগী কাস্টমার কেয়ার ও সাপোর্ট প্রতিনিধি পুরুষ কণ্ঠ।"
  },
  {
    id: "Pro_Female_15",
    name: "Nusrat",
    banglaName: "নুসরাত (বিজনেস ও পিচ উপস্থাপক)",
    gender: "Female",
    category: "presentation",
    banglaCategory: "প্রফেশনাল",
    avatarText: "নু",
    description: "Corporate business presenter with modern, confident marketing tone.",
    banglaDescription: "কর্পোরেট আইডিয়া ও স্টার্টআপ পিচ উপস্থাপনার জন্য আত্মবিশ্বাসী ও আধুনিক নারী কণ্ঠ।"
  },
  {
    id: "Pro_Male_15",
    name: "Jamil",
    banglaName: "জামিল (কর্পোরেট ফাইন্যান্স)",
    gender: "Male",
    category: "presentation",
    banglaCategory: "প্রফেশনাল",
    avatarText: "জা",
    description: "Confident corporate advisor voice, perfect for financial presentations.",
    banglaDescription: "কর্পোরেট বোর্ড মিটিং, বাজেট বিশ্লেষণ ও ফাইন্যান্স উপস্থাপনার জন্য গম্ভীর পুরুষ কণ্ঠ।"
  },
  {
    id: "Pro_Female_16",
    name: "Mahjabin",
    banglaName: "মেহজাবিন (কবিতা আবৃত্তি ও নাটক)",
    gender: "Female",
    category: "poetry",
    banglaCategory: "প্রফেশনাল",
    avatarText: "মে",
    description: "Poetic and highly emotional recitation artist voice.",
    banglaDescription: "আবেগময় কবিতা আবৃত্তি, নাটকের সংলাপ ও শ্রুতি নাটকের জন্য দারুণ সমৃদ্ধ কণ্ঠ।"
  },
  {
    id: "Pro_Male_16",
    name: "Sourav",
    banglaName: "সৌরভ (আবৃত্তি ও কবিতা)",
    gender: "Male",
    category: "poetry",
    banglaCategory: "প্রফেশনাল",
    avatarText: "সৈ",
    description: "Theatrical poetry reciter with beautiful rhythm and deep pitch.",
    banglaDescription: "কাব্যিক ছন্দোময় উচ্চ নাটকীয়তা সম্পন্ন আবৃত্তি ও আবহের জন্য অসাধারণ কণ্ঠ।"
  },
  {
    id: "Pro_Female_17",
    name: "Nargis",
    banglaName: "নার্গিস (পডকাস্ট সহ-হোস্ট)",
    gender: "Female",
    category: "podcast",
    banglaCategory: "প্রফেশনাল",
    avatarText: "না",
    description: "Energetic and lively conversational podcast voice.",
    banglaDescription: "প্রাণবন্ত পডকাস্ট, আড্ডা ও লাইভ টকশো-এর জন্য অত্যন্ত চমৎকার দৈনিক কথ্য কণ্ঠ।"
  },
  {
    id: "Pro_Male_17",
    name: "Nahid",
    banglaName: "নাহিদ (টেক পডকাস্টার)",
    gender: "Male",
    category: "podcast",
    banglaCategory: "প্রফেশনাল",
    avatarText: "না",
    description: "Casual, relatable tech podcaster with friendly pacing.",
    banglaDescription: "প্রযুক্তি পডকাস্ট ও সমসাময়িক বিষয়ে আড্ডার ছলে কথা বলার উপযোগী প্রফেশনাল পুরুষ কণ্ঠ।"
  },
  {
    id: "Pro_Female_18",
    name: "Keya",
    banglaName: "কেয়া (বাণিজ্যিক বিজ্ঞাপন ২)",
    gender: "Female",
    category: "ads",
    banglaCategory: "প্রফেশনাল",
    avatarText: "কে",
    description: "High-energy commercial advertisement voiceover female artist.",
    banglaDescription: "নতুন পণ্য প্রচার ও উৎসবের অফার ঘোষণার জন্য অত্যন্ত মার্জিত ও প্রলুব্ধকর নারী কণ্ঠ।"
  },
  {
    id: "Pro_Male_18",
    name: "Imtiaz",
    banglaName: "ইমতিয়াজ (ব্র্যান্ড প্রোমোশন)",
    gender: "Male",
    category: "ads",
    banglaCategory: "প্রফেশনাল",
    avatarText: "ই",
    description: "Energetic and persuasive brand ad promoter male voice.",
    banglaDescription: "পণ্য ও ব্র্যান্ডের প্রচারের জন্য আকর্ষণীয়, আত্মবিশ্বাসী ও শক্তিশালী প্রচার কণ্ঠ।"
  },
  {
    id: "Pro_Female_19",
    name: "Rumana",
    banglaName: "রুমানা (ধ্যান ও ইয়োগা গাইড)",
    gender: "Female",
    category: "meditation",
    banglaCategory: "প্রফেশনাল",
    avatarText: "রু",
    description: "Calm, slow, and exceptionally soothing meditation guide voice.",
    banglaDescription: "মন শান্ত করা ইয়োগা ও মেডিটেশন গাইড কণ্ঠ। মায়াময় ও ধীরস্থির আবাহন।"
  },
  {
    id: "Pro_Male_19",
    name: "Zakir",
    banglaName: "জাকির (মাইন্ডফুলনেস ইন্সট্রাক্টর)",
    gender: "Male",
    category: "meditation",
    banglaCategory: "প্রফেশনাল",
    avatarText: "জা",
    description: "Low-pitch calming and reassuring mindfulness advisor voice.",
    banglaDescription: "মানসিক প্রশান্তি ও মেডিটেশন সেশনের আবহ তৈরির জন্য উপযোগী গভীর ধীরস্থির কণ্ঠ।"
  },
  {
    id: "Pro_Female_20",
    name: "Mimi",
    banglaName: "মিমি (কার্টুন ও রূপকথা)",
    gender: "Female",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "মি",
    description: "Expressive children storyteller and animation dubbing voice.",
    banglaDescription: "লিপ-সিঙ্ক ডাবিং, কমিক কার্টুন চরিত্র ও ছোটদের গল্পের জন্য দারুণ হাস্যোজ্জ্বল কণ্ঠ।"
  },
  {
    id: "Pro_Male_20",
    name: "Shohel",
    banglaName: "সোহেল (থ্রিলার অডিওবুক)",
    gender: "Male",
    category: "story",
    banglaCategory: "প্রফেশনাল",
    avatarText: "সো",
    description: "Low, dramatic, tense storytelling voice for audiobooks.",
    banglaDescription: "উপন্যাস পাঠ, রোমাঞ্চ ও ভৌতিক রোমাঞ্চের গল্প পাঠের জন্য রোমহর্ষক ও গম্ভীর কণ্ঠ।"
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
