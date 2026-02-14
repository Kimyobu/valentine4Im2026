window.ValentineConfig = Object.freeze({
  // Name shown in the "To ..." line.
  recipientName: "ที่รักอิม",

  // Main hero title inside the card.
  mainTitle: "Valentine's Day Just for You",

  // Message revealed after clicking the button. Use \n for line breaks.
  personalMessage: "ทุกช่วงเวลาที่ได้อยู่กับอิมเค้ามีความสุขมากๆ มันเหมือนกับอยู่ในฝัน ตื่นมาก็คิดถึงอิมตลอด เวลาที่ได้กอดถึงจะหายคิดถึง อยากเจอหน้าทุกๆวัน เพราะมันทำให้รู้สึกมีความสุขที่เจอพบเธอ",

  // Optional text shown in the Little Surprise letter popup.
  // Leave empty ("") to auto-use your personalMessage.
  surpriseLetterText: "เค้ารักอิมมากๆๆๆ รักที่สูดดดดดดดดดดด",

  // Accent used for highlights, button glow, and special text.
  accentColor: "#ff4f87",

  // Four colors used by the animated page background gradient.
  backgroundGradientColors: ["#1a1029", "#2f193c", "#7a1f56", "#ff5f7e"],

  // Optional image revealed after clicking the button.
  imagePath: "assets/images/valentine-photo.svg",

  // Optional background music path (mp3 recommended).
  backgroundMusicPath: "assets/audio/love-theme-lite.mp3",

  // Background music volume (0 to 1).
  musicVolume: 0.55,

  // If true, BGM can start from scripted interactions.
  enableMusicAutoplay: false,

  // Popup texts for SweetAlert "play music?" question.
  musicPromptTitle: "เปิดเพลงประกอบไหม?",
  musicPromptText: "เปิด BGM แล้วความน่ารักจะเพิ่มขึ้นอีกนะ 💞",
  musicPromptConfirmText: "เปิดเพลงเลย",
  musicPromptCancelText: "ไว้ก่อน",

  // Step 1: locker intro with puzzle + 6-digit passcode.
  enableLockerIntro: true,
  lockerPasscode: "140225",
  lockerPuzzleImagePath: "assets/images/locker-puzzle.svg",
  lockerTitle: "Unlock the Love Locker",
  lockerSubtitle: "ต่อจิ๊กซอว์ภาพขาดให้เสร็จ แล้วใช้คำใบ้รหัส 6 ตัวเพื่อปลดล็อก",

  // Step 2: bouquet assembly challenge.
  enableBouquetAssembly: true,
  bouquetTitle: "ประกอบช่อดอกไม้ของเรา",
  bouquetSubtitle: "วางดอกไม้ให้ตรงตำแหน่ง แล้วไปเปิดตู้เซฟของขวัญ",
  bouquetPieces: [
    { id: "rose", emoji: "🌹", label: "Rose" },
    { id: "peony", emoji: "🌸", label: "Peony" },
    { id: "tulip", emoji: "🌷", label: "Tulip" },
    { id: "daisy", emoji: "🌼", label: "Daisy" },
    { id: "ribbon", emoji: "🎀", label: "Ribbon" }
  ],

  // Show an intro "gift safe" challenge before entering the main page.
  enableLoveVaultIntro: true,

  // Intro meter starting percent.
  vaultStartPercent: 16,

  // Love gained per click in intro challenge.
  vaultClickBoost: 7,

  // Love drained every second in intro challenge.
  vaultDrainPerSecond: 14,

  // Intro screen title.
  vaultTitle: "ของขวัญรออยู่ในนี้นะ",

  // Intro screen subtitle.
  vaultSubtitle: "เติมความรักเข้ามาสิ แล้วเค้าจะบอกให้รู้ว่ามีอะไร",

  // Intro button label.
  vaultButtonLabel: "เติมความรัก +",

  // Text shown when intro challenge is completed.
  vaultUnlockedLabel: "Unlocked! 💘",

  // Global animation speed multiplier (0.35 to 2.5 works best).
  animationSpeed: 1,

  // Show the love meter bar after interacting.
  showLoveMeter: true,

  // Tiny hearts follow the cursor (desktop).
  enableCursorHearts: true,

  // Small cute labels shown under the main title.
  badgeLabels: ["รักนิรันด์", "คนสวย", "อิมน่ารัก", "สุดที่รัก"],

  // Rotating quote lines shown after opening the message.
  cuteQuotes: [
    "อิมคือคนที่เค้าอยากเจอที่สุด และไม่อยากจากมากที่สุด",
    "ขอให้อิมมีความสุขมากๆ กับทุกสิ่งที่อิมทำ และเค้าจะอวยพรด้วยรักให้อิม",
    "แค่มีอิมอยู่ ในทุกๆวันก็เหมือนวันพิเศษ",
    "อิมคือทุกอย่างของเค้า และเค้าจะรักอิมตลอดไป"
  ]
});
