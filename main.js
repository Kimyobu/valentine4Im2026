(() => {
  const defaults = {
    recipientName: "My Love",
    mainTitle: "A Valentine Just for You",
    personalMessage: "You make my world brighter every day.",
    accentColor: "#ff4f87",
    backgroundGradientColors: ["#1a1029", "#2f193c", "#7a1f56", "#ff5f7e"],
    imagePath: "",
    backgroundMusicPath: "",
    enableMusicAutoplay: false,
    musicVolume: 0.55,
    enableLockerIntro: true,
    lockerPasscode: "140225",
    lockerPuzzleImagePath: "assets/images/locker-puzzle.jpg",
    lockerTitle: "Unlock the Love Locker",
    lockerSubtitle: "Complete the torn puzzle first, then use the 6-digit hint to unlock.",
    enableBouquetAssembly: true,
    bouquetTitle: "Assemble the Bouquet",
    bouquetSubtitle: "Place each flower in the correct spot to continue.",
    bouquetPieces: [
      { id: "rose", emoji: "🌹", label: "Rose" },
      { id: "peony", emoji: "🌸", label: "Peony" },
      { id: "tulip", emoji: "🌷", label: "Tulip" },
      { id: "daisy", emoji: "🌼", label: "Daisy" },
      { id: "ribbon", emoji: "🎀", label: "Ribbon" }
    ],
    musicPromptTitle: "Play background music?",
    musicPromptText: "Turn on BGM to make this surprise more romantic.",
    musicPromptConfirmText: "Play",
    musicPromptCancelText: "Not now",
    enableLoveVaultIntro: true,
    vaultStartPercent: 16,
    vaultClickBoost: 15,
    vaultDrainPerSecond: 6,
    vaultTitle: "A Gift Safe Awaits",
    vaultSubtitle: "Fill the love tube before it drains, then unlock your surprise.",
    vaultButtonLabel: "เติมความรัก +",
    vaultUnlockedLabel: "Unlocked! 💘",
    animationSpeed: 1,
    showLoveMeter: true,
    enableCursorHearts: true,
    surpriseLetterText: "",
    badgeLabels: ["Forever", "Sweetest Smile", "My Safe Place"],
    cuteQuotes: [
      "You are my favorite hello and my hardest goodbye.",
      "Every heartbeat whispers your name.",
      "With you, ordinary days become magic.",
      "You are my today and all my tomorrows."
    ]
  };

  const config = Object.assign({}, defaults, window.ValentineConfig || {});
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const recipientNameEl = document.getElementById("recipient-name");
  const mainTitleEl = document.getElementById("main-title");
  const messageEl = document.getElementById("personal-message");
  const heartButtonEl = document.getElementById("heart-button");
  const kissButtonEl = document.getElementById("kiss-button");
  const hugButtonEl = document.getElementById("hug-button");
  const surpriseButtonEl = document.getElementById("surprise-button");
  const roseRainButtonEl = document.getElementById("rose-rain-button");
  const cardEl = document.getElementById("valentine-card");
  const heartsLayerEl = document.getElementById("hearts-layer");
  const twinkleLayerEl = document.getElementById("twinkle-layer");
  const sparkleLayerEl = document.getElementById("sparkle-layer");
  const kissLayerEl = document.getElementById("kiss-layer");
  const foreverLayerEl = document.getElementById("forever-layer");
  const roseRainLayerEl = document.getElementById("rose-rain-layer");
  const hugLayerEl = document.getElementById("hug-layer");
  const surpriseLayerEl = document.getElementById("surprise-layer");
  const bouquetPopEl = document.getElementById("bouquet-pop");
  const photoWrapEl = document.getElementById("photo-wrap");
  const memoryImageEl = document.getElementById("memory-image");
  const backgroundMusicEl = document.getElementById("background-music");
  const musicToggleEl = document.getElementById("music-toggle");
  const musicToggleTextEl = document.getElementById("music-toggle-text");
  const musicIconEl = document.getElementById("music-icon");
  const quoteEl = document.getElementById("love-quote");
  const cuteBadgesEl = document.getElementById("cute-badges");
  const loveMeterWrapEl = document.getElementById("love-meter-wrap");
  const loveMeterFillEl = document.getElementById("love-meter-fill");
  const loveMeterValueEl = document.getElementById("love-meter-value");
  const surpriseLetterTextEl = document.getElementById("surprise-letter-text");
  const lockerIntroEl = document.getElementById("locker-intro");
  const lockerTitleEl = document.getElementById("locker-title");
  const lockerSubtitleEl = document.getElementById("locker-subtitle");
  const lockerHintEl = document.getElementById("locker-hint");
  const puzzleBoardEl = document.getElementById("puzzle-board");
  const puzzleTrayEl = document.getElementById("puzzle-tray");
  const lockerCodeDisplayEl = document.getElementById("locker-code-display");
  const lockerKeypadEl = document.getElementById("locker-keypad");
  const bouquetStageEl = document.getElementById("bouquet-stage");
  const bouquetTitleEl = document.getElementById("bouquet-title");
  const bouquetSubtitleEl = document.getElementById("bouquet-subtitle");
  const bouquetPiecesEl = document.getElementById("bouquet-pieces");
  const bouquetStatusEl = document.getElementById("bouquet-status");
  const bouquetSlotEls = Array.from(document.querySelectorAll(".bouquet-slot"));
  const loveVaultIntroEl = document.getElementById("love-vault-intro");
  const vaultTitleEl = document.getElementById("vault-title");
  const vaultSubtitleEl = document.getElementById("vault-subtitle");
  const vaultSafeEl = document.getElementById("vault-safe");
  const vaultMeterFillEl = document.getElementById("vault-meter-fill");
  const vaultMeterPercentEl = document.getElementById("vault-meter-percent");
  const vaultMeterStatusEl = document.getElementById("vault-meter-status");
  const vaultChargeButtonEl = document.getElementById("vault-charge-button");

  let hasOpened = false;
  let quoteIntervalId = 0;
  let ambientHeartIntervalId = 0;
  let typewriterTimerId = 0;
  let hugEffectTimeoutId = 0;
  let surpriseEffectTimeoutId = 0;
  let lastTrailAt = 0;
  let hasMusicSource = false;
  let musicManuallyPaused = false;
  let vaultDrainIntervalId = 0;
  let vaultDismissTimeoutId = 0;
  let lockerDismissTimeoutId = 0;
  let bouquetDismissTimeoutId = 0;
  let vaultValue = 0;
  let vaultUnlocked = false;
  let musicPromptAsked = false;
  let lockerInitialized = false;
  let bouquetInitialized = false;
  let vaultInitialized = false;
  let lockerPuzzleSolved = false;
  let lockerPassInput = "";
  let lockerPasscode = "";
  let selectedPuzzlePieceId = "";
  let puzzleSlots = [];
  let puzzlePiecesById = {};
  let puzzleSlotEls = [];
  let selectedBouquetPieceId = "";
  let bouquetPiecesById = {};
  let bouquetPlaced = 0;
  let introFlowDone = false;
  let optionalPhotoPrepared = false;
  let optionalPhotoLoaded = false;
  let optionalPhotoError = false;
  let sweetAlertLoadPromise = null;

  const clampSpeed = Number.isFinite(config.animationSpeed)
    ? Math.min(Math.max(config.animationSpeed, 0.35), 2.5)
    : defaults.animationSpeed;

  const safeQuotes = normalizeStringList(config.cuteQuotes, defaults.cuteQuotes);
  const safeBadges = normalizeStringList(config.badgeLabels, defaults.badgeLabels);

  applyTheme();
  applyContent();
  renderBadges();
  configureMedia();
  bindMusicToggle();
  seedTwinkles();
  primeAmbientHearts();
  bindInteractions();
  startIntroFlow();

  if (config.enableCursorHearts && !prefersReducedMotion) {
    attachCursorHearts();
  }

  window.addEventListener("beforeunload", cleanup);

  function startIntroFlow() {
    if (config.enableLockerIntro && lockerIntroEl) {
      startLockerIntro();
      return;
    }

    continueAfterLockerStage();
  }

  function continueAfterLockerStage() {
    if (config.enableBouquetAssembly && bouquetStageEl) {
      startBouquetAssembly();
      return;
    }

    continueAfterBouquetStage();
  }

  function continueAfterBouquetStage() {
    if (config.enableLoveVaultIntro && loveVaultIntroEl) {
      startVaultIntro();
      return;
    }

    finishIntroFlow();
  }

  function finishIntroFlow() {
    if (introFlowDone) {
      return;
    }

    introFlowDone = true;

    if (lockerIntroEl) {
      lockerIntroEl.classList.add("hidden");
    }

    if (bouquetStageEl) {
      bouquetStageEl.classList.add("hidden");
    }

    if (loveVaultIntroEl) {
      loveVaultIntroEl.classList.add("hidden");
    }

    showMusicPrompt();
  }

  function startLockerIntro() {
    if (!lockerIntroEl) {
      continueAfterLockerStage();
      return;
    }

    lockerPasscode = normalizePasscode(config.lockerPasscode, defaults.lockerPasscode);
    lockerPassInput = "";
    lockerPuzzleSolved = false;
    selectedPuzzlePieceId = "";

    if (lockerTitleEl) {
      lockerTitleEl.textContent = String(config.lockerTitle || defaults.lockerTitle);
    }

    if (lockerSubtitleEl) {
      lockerSubtitleEl.textContent = String(config.lockerSubtitle || defaults.lockerSubtitle);
    }

    if (lockerHintEl) {
      lockerHintEl.classList.remove("revealed");
      lockerHintEl.textContent = "ประกอบจิ๊กซอว์ให้ครบก่อน แล้วคำใบ้รหัส 6 หลักจะปรากฏ";
    }

    lockerIntroEl.classList.remove("hidden", "unlocking");

    if (bouquetStageEl) {
      bouquetStageEl.classList.add("hidden");
    }

    if (loveVaultIntroEl) {
      loveVaultIntroEl.classList.add("hidden");
    }

    buildLockerPuzzle();
    renderLockerCodeDisplay();
    buildLockerKeypad();
    updateLockerCodeDisplay();
    setLockerKeypadEnabled(false);
  }

  function buildLockerPuzzle() {
    if (!puzzleBoardEl || !puzzleTrayEl) {
      return;
    }

    const passDigits = lockerPasscode.split("");
    puzzleSlots = Array.from({ length: 6 }, (_, index) => ({ index, pieceId: "" }));
    puzzlePiecesById = {};
    puzzleSlotEls = [];

    for (let i = 0; i < 6; i += 1) {
      const pieceId = `piece-${i}`;
      puzzlePiecesById[pieceId] = {
        id: pieceId,
        correctSlot: i,
        digit: passDigits[i] || "",
        placed: false,
        element: null
      };
    }

    renderPuzzleBoardSlots();
    renderPuzzleTrayPieces();
    lockerInitialized = true;
  }

  function renderPuzzleBoardSlots() {
    if (!puzzleBoardEl) {
      return;
    }

    puzzleBoardEl.innerHTML = "";

    puzzleSlots.forEach((slot) => {
      const slotEl = document.createElement("button");
      slotEl.type = "button";
      slotEl.className = "puzzle-slot";
      slotEl.setAttribute("aria-label", `Puzzle slot ${slot.index + 1}`);
      slotEl.addEventListener("click", () => {
        handlePuzzleSlotClick(slot.index);
      });

      puzzleBoardEl.appendChild(slotEl);
      puzzleSlotEls.push(slotEl);
    });
  }

  function renderPuzzleTrayPieces() {
    if (!puzzleTrayEl) {
      return;
    }

    puzzleTrayEl.innerHTML = "";

    const imagePath = String(config.lockerPuzzleImagePath || "").trim();
    const shuffledPieceIds = shuffleArray(Object.keys(puzzlePiecesById));

    shuffledPieceIds.forEach((pieceId) => {
      const piece = puzzlePiecesById[pieceId];

      if (!piece) {
        return;
      }

      const pieceEl = document.createElement("button");
      const col = piece.correctSlot % 3;
      const row = Math.floor(piece.correctSlot / 3);

      pieceEl.type = "button";
      pieceEl.className = "puzzle-piece";
      pieceEl.setAttribute("aria-label", "Puzzle piece");
      pieceEl.style.setProperty("--bgx", `${col * 50}%`);
      pieceEl.style.setProperty("--bgy", `${row * 100}%`);
      pieceEl.style.transform = `rotate(${randomNumber(-5, 5).toFixed(2)}deg)`;

      if (imagePath) {
        pieceEl.style.setProperty("--puzzle-image", toCssImageUrl(imagePath));
      } else {
        pieceEl.style.backgroundImage = `
          radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.26), transparent 46%),
          linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent-color) 58%, rgba(255, 255, 255, 0.16)),
            rgba(30, 7, 26, 0.78)
          )
        `;
      }

      const digitTag = document.createElement("span");
      digitTag.className = "digit-tag";
      digitTag.textContent = piece.digit;
      pieceEl.appendChild(digitTag);

      pieceEl.addEventListener("click", () => {
        handlePuzzlePieceSelect(pieceId);
      });

      piece.element = pieceEl;
      puzzleTrayEl.appendChild(pieceEl);
    });
  }

  function handlePuzzlePieceSelect(pieceId) {
    if (!puzzlePiecesById[pieceId]) {
      return;
    }

    const selectedPiece = puzzlePiecesById[pieceId];

    if (selectedPiece.placed) {
      return;
    }

    Object.values(puzzlePiecesById).forEach((piece) => {
      if (piece.element) {
        piece.element.classList.remove("selected");
      }
    });

    if (selectedPuzzlePieceId === pieceId) {
      selectedPuzzlePieceId = "";
      return;
    }

    selectedPuzzlePieceId = pieceId;

    if (selectedPiece.element) {
      selectedPiece.element.classList.add("selected");
    }
  }

  function handlePuzzleSlotClick(slotIndex) {
    const slot = puzzleSlots[slotIndex];
    const slotEl = puzzleSlotEls[slotIndex];

    if (!slot || !slotEl) {
      return;
    }

    if (selectedPuzzlePieceId) {
      const selectedPiece = puzzlePiecesById[selectedPuzzlePieceId];

      if (!selectedPiece || selectedPiece.placed) {
        return;
      }

      if (selectedPiece.correctSlot !== slotIndex) {
        slotEl.classList.add("targeted");
        window.setTimeout(() => {
          slotEl.classList.remove("targeted");
        }, 280 / clampSpeed);
        shakeLockerAccess("ชิ้นนี้ยังไม่ใช่ตำแหน่งนั้น ลองต่อให้ภาพเนียนขึ้นอีกนิด");
        return;
      }

      slot.pieceId = selectedPiece.id;
      selectedPiece.placed = true;
      selectedPuzzlePieceId = "";

      if (selectedPiece.element) {
        selectedPiece.element.classList.remove("selected");
        selectedPiece.element.classList.add("placed");
        selectedPiece.element.style.transform = "";
        slotEl.innerHTML = "";
        slotEl.appendChild(selectedPiece.element);
      }

      slotEl.classList.add("filled");
      burstSparklesFromElement(slotEl, 5, ["✨", "💖", "💗"]);

      const allPlaced = puzzleSlots.every((item) => item.pieceId);

      if (allPlaced) {
        lockerPuzzleSolved = true;
        revealLockerHint();
      }

      return;
    }

    if (!slot.pieceId || !puzzleTrayEl) {
      return;
    }

    const piece = puzzlePiecesById[slot.pieceId];

    if (!piece || !piece.element) {
      return;
    }

    slot.pieceId = "";
    piece.placed = false;
    piece.element.classList.remove("placed", "revealed");
    piece.element.style.transform = `rotate(${randomNumber(-5, 5).toFixed(2)}deg)`;
    puzzleTrayEl.appendChild(piece.element);
    slotEl.classList.remove("filled");

    if (lockerPuzzleSolved) {
      lockerPuzzleSolved = false;
      setLockerKeypadEnabled(false);
      lockerPassInput = "";
      updateLockerCodeDisplay();

      if (lockerHintEl) {
        lockerHintEl.classList.remove("revealed");
        lockerHintEl.textContent = "จิ๊กซอว์ยังไม่ครบ ลองประกอบให้สมบูรณ์อีกครั้ง";
      }
    }
  }

  function revealLockerHint() {
    setLockerKeypadEnabled(true);

    Object.values(puzzlePiecesById).forEach((piece) => {
      if (piece.element) {
        piece.element.classList.add("revealed");
      }
    });

    if (lockerHintEl) {
      lockerHintEl.classList.add("revealed");
      lockerHintEl.textContent = "คำใบ้ปรากฏแล้ว: ดูเลขบนแต่ละชิ้น แล้วกรอกรหัส 6 ตัวด้านขวา";
    }

    burstHearts(prefersReducedMotion ? 6 : 12);
    burstSparkles(window.innerWidth * 0.5, window.innerHeight * 0.34, 18, [
      "💖",
      "✨",
      "🔐",
      "🧩"
    ]);
  }

  function renderLockerCodeDisplay() {
    if (!lockerCodeDisplayEl) {
      return;
    }

    lockerCodeDisplayEl.innerHTML = "";

    for (let i = 0; i < 6; i += 1) {
      const slotEl = document.createElement("span");
      slotEl.className = "locker-code-slot";
      slotEl.textContent = "•";
      lockerCodeDisplayEl.appendChild(slotEl);
    }
  }

  function updateLockerCodeDisplay() {
    if (!lockerCodeDisplayEl) {
      return;
    }

    const slotEls = Array.from(lockerCodeDisplayEl.querySelectorAll(".locker-code-slot"));

    slotEls.forEach((slotEl, index) => {
      const digit = lockerPassInput[index] || "";
      slotEl.textContent = digit || "•";
      slotEl.classList.toggle("filled", Boolean(digit));
    });
  }

  function buildLockerKeypad() {
    if (!lockerKeypadEl) {
      return;
    }

    const keyDefs = [
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "7" },
      { value: "8" },
      { value: "9" },
      { action: "clear", label: "Clear" },
      { value: "0" },
      { action: "backspace", label: "⌫" }
    ];

    lockerKeypadEl.innerHTML = "";

    keyDefs.forEach((def) => {
      const keyEl = document.createElement("button");
      keyEl.type = "button";
      keyEl.className = "locker-key";

      if (def.action) {
        keyEl.classList.add("action");
        keyEl.dataset.action = def.action;
        keyEl.textContent = def.label || def.action;
      } else {
        keyEl.dataset.value = def.value;
        keyEl.textContent = def.value;
      }

      keyEl.addEventListener("click", onLockerKeypadPress);
      lockerKeypadEl.appendChild(keyEl);
    });

    const unlockEl = document.createElement("button");
    unlockEl.type = "button";
    unlockEl.className = "locker-key action";
    unlockEl.dataset.action = "unlock";
    unlockEl.style.gridColumn = "1 / -1";
    unlockEl.textContent = "UNLOCK";
    unlockEl.addEventListener("click", onLockerKeypadPress);
    lockerKeypadEl.appendChild(unlockEl);
  }

  function onLockerKeypadPress(event) {
    const keyEl = event.currentTarget;

    if (!keyEl || !(keyEl instanceof HTMLElement)) {
      return;
    }

    if (!lockerPuzzleSolved) {
      shakeLockerAccess("ต่อจิ๊กซอว์ให้ครบก่อน แล้วค่อยปลดล็อก");
      return;
    }

    const action = keyEl.dataset.action;
    const value = keyEl.dataset.value;

    if (action === "clear") {
      lockerPassInput = "";
      updateLockerCodeDisplay();
      return;
    }

    if (action === "backspace") {
      lockerPassInput = lockerPassInput.slice(0, -1);
      updateLockerCodeDisplay();
      return;
    }

    if (action === "unlock") {
      checkLockerPasscode();
      return;
    }

    if (value && /^\d$/.test(value) && lockerPassInput.length < 6) {
      lockerPassInput += value;
      updateLockerCodeDisplay();
    }
  }

  function checkLockerPasscode() {
    if (!lockerPuzzleSolved) {
      shakeLockerAccess("ต่อจิ๊กซอว์ให้ครบก่อน แล้วค่อยปลดล็อก");
      return;
    }

    if (lockerPassInput.length < 6) {
      shakeLockerAccess("รหัสยังไม่ครบ 6 หลัก");
      return;
    }

    if (lockerPassInput !== lockerPasscode) {
      shakeLockerAccess("รหัสไม่ถูกต้อง ลองดูคำใบ้อีกครั้ง");
      lockerPassInput = "";
      updateLockerCodeDisplay();
      return;
    }

    unlockLockerStage();
  }

  function shakeLockerAccess(message) {
    const accessPanel = lockerIntroEl ? lockerIntroEl.querySelector(".locker-access") : null;

    if (lockerHintEl && message) {
      lockerHintEl.textContent = message;
    }

    if (!accessPanel) {
      return;
    }

    accessPanel.classList.remove("shake");
    void accessPanel.offsetWidth;
    accessPanel.classList.add("shake");
  }

  function setLockerKeypadEnabled(enabled) {
    if (!lockerKeypadEl) {
      return;
    }

    const keys = Array.from(lockerKeypadEl.querySelectorAll(".locker-key"));
    keys.forEach((key) => {
      key.disabled = !enabled;
    });
  }

  function unlockLockerStage() {
    if (!lockerIntroEl) {
      continueAfterLockerStage();
      return;
    }

    setLockerKeypadEnabled(false);

    if (lockerHintEl) {
      lockerHintEl.classList.add("revealed");
      lockerHintEl.textContent = "Unlocked! ประตูล็อกเกอร์เปิดแล้ว ไปจัดช่อดอกไม้กันต่อ 💐";
    }

    lockerIntroEl.classList.add("unlocking");
    burstHearts(prefersReducedMotion ? 6 : 13);
    burstSparkles(window.innerWidth * 0.5, window.innerHeight * 0.44, 24, [
      "🔓",
      "💖",
      "✨",
      "💘"
    ]);

    window.clearTimeout(lockerDismissTimeoutId);
    lockerDismissTimeoutId = window.setTimeout(() => {
      lockerIntroEl.classList.add("hidden");
      lockerIntroEl.classList.remove("unlocking");
      continueAfterLockerStage();
    }, prefersReducedMotion ? 420 : 980 / clampSpeed);
  }

  function startBouquetAssembly() {
    if (!bouquetStageEl) {
      continueAfterBouquetStage();
      return;
    }

    selectedBouquetPieceId = "";
    bouquetPlaced = 0;
    bouquetPiecesById = {};

    bouquetStageEl.classList.remove("hidden", "unlocking");

    if (lockerIntroEl) {
      lockerIntroEl.classList.add("hidden");
    }

    if (loveVaultIntroEl) {
      loveVaultIntroEl.classList.add("hidden");
    }

    if (bouquetTitleEl) {
      bouquetTitleEl.textContent = String(config.bouquetTitle || defaults.bouquetTitle);
    }

    if (bouquetSubtitleEl) {
      bouquetSubtitleEl.textContent = String(config.bouquetSubtitle || defaults.bouquetSubtitle);
    }

    if (bouquetStatusEl) {
      bouquetStatusEl.classList.remove("success");
      bouquetStatusEl.textContent = "เลือกชิ้นดอกไม้ แล้วแตะตำแหน่งที่ตรงกัน";
    }

    bouquetSlotEls.forEach((slotEl) => {
      slotEl.classList.remove("filled", "targeted");
      slotEl.textContent = "";
      slotEl.dataset.filled = "";
    });

    const pieces = normalizeBouquetPieces(
      config.bouquetPieces,
      defaults.bouquetPieces,
      bouquetSlotEls
    );

    pieces.forEach((piece) => {
      bouquetPiecesById[piece.id] = {
        id: piece.id,
        emoji: piece.emoji,
        label: piece.label,
        placed: false,
        element: null
      };
    });

    renderBouquetPieces();

    if (!bouquetInitialized) {
      bouquetSlotEls.forEach((slotEl) => {
        slotEl.addEventListener("click", () => {
          onBouquetSlotPress(slotEl);
        });
      });
      bouquetInitialized = true;
    }
  }

  function renderBouquetPieces() {
    if (!bouquetPiecesEl) {
      return;
    }

    bouquetPiecesEl.innerHTML = "";

    const ids = shuffleArray(Object.keys(bouquetPiecesById));

    ids.forEach((pieceId) => {
      const piece = bouquetPiecesById[pieceId];

      if (!piece) {
        return;
      }

      const pieceEl = document.createElement("button");
      pieceEl.type = "button";
      pieceEl.className = "bouquet-piece";
      pieceEl.dataset.pieceId = pieceId;
      pieceEl.innerHTML = `
        <span class="bouquet-piece-emoji">${piece.emoji}</span>
        <span>${piece.label}</span>
      `;

      pieceEl.addEventListener("click", () => {
        selectBouquetPiece(pieceId);
      });

      piece.element = pieceEl;
      bouquetPiecesEl.appendChild(pieceEl);
    });
  }

  function selectBouquetPiece(pieceId) {
    const piece = bouquetPiecesById[pieceId];

    if (!piece || piece.placed) {
      return;
    }

    Object.values(bouquetPiecesById).forEach((item) => {
      if (item.element) {
        item.element.classList.remove("selected");
      }
    });

    if (selectedBouquetPieceId === pieceId) {
      selectedBouquetPieceId = "";

      if (bouquetStatusEl) {
        bouquetStatusEl.textContent = "เลือกชิ้นดอกไม้ แล้วแตะตำแหน่งที่ตรงกัน";
      }

      return;
    }

    selectedBouquetPieceId = pieceId;

    if (piece.element) {
      piece.element.classList.add("selected");
    }

    if (bouquetStatusEl) {
      bouquetStatusEl.textContent = `กำลังวาง: ${piece.label} ${piece.emoji}`;
    }
  }

  function onBouquetSlotPress(slotEl) {
    if (!slotEl || slotEl.classList.contains("filled")) {
      return;
    }

    const expectedId = String(slotEl.dataset.slot || "").trim();

    if (!expectedId) {
      return;
    }

    if (!selectedBouquetPieceId) {
      if (bouquetStatusEl) {
        bouquetStatusEl.textContent = "เลือกดอกไม้จากด้านขวาก่อน";
      }

      slotEl.classList.add("targeted");
      window.setTimeout(() => {
        slotEl.classList.remove("targeted");
      }, 260 / clampSpeed);

      return;
    }

    const selectedPiece = bouquetPiecesById[selectedBouquetPieceId];

    if (!selectedPiece || selectedPiece.placed) {
      return;
    }

    if (selectedPiece.id !== expectedId) {
      if (bouquetStatusEl) {
        bouquetStatusEl.textContent = "ยังไม่ตรงตำแหน่ง ลองสลับดอกอื่นดู";
      }

      slotEl.classList.add("targeted");
      window.setTimeout(() => {
        slotEl.classList.remove("targeted");
      }, 320 / clampSpeed);

      return;
    }

    selectedPiece.placed = true;
    bouquetPlaced += 1;

    slotEl.classList.add("filled");
    slotEl.dataset.filled = selectedPiece.id;
    slotEl.textContent = selectedPiece.emoji;

    if (selectedPiece.element) {
      selectedPiece.element.classList.remove("selected");
      selectedPiece.element.classList.add("placed");
      selectedPiece.element.disabled = true;
    }

    selectedBouquetPieceId = "";

    burstSparklesFromElement(slotEl, 8, [selectedPiece.emoji, "✨", "💖"]);

    if (bouquetStatusEl) {
      bouquetStatusEl.textContent = `วาง ${selectedPiece.label} สำเร็จแล้ว`;
    }

    const requiredCount = bouquetSlotEls.filter((slot) => slot.dataset.slot).length;

    if (bouquetPlaced >= requiredCount) {
      completeBouquetStage();
    }
  }

  function completeBouquetStage() {
    if (!bouquetStageEl) {
      continueAfterBouquetStage();
      return;
    }

    if (bouquetStatusEl) {
      bouquetStatusEl.classList.add("success");
      bouquetStatusEl.textContent = "ช่อดอกไม้เสร็จแล้ว! ไปเปิดตู้เซฟของขวัญกัน 💝";
    }

    bouquetStageEl.classList.add("unlocking");
    showBouquet();
    burstHearts(prefersReducedMotion ? 7 : 14);
    burstSparkles(window.innerWidth * 0.5, window.innerHeight * 0.4, 24, [
      "💐",
      "✨",
      "💖",
      "🌸",
      "🎀"
    ]);

    window.clearTimeout(bouquetDismissTimeoutId);
    bouquetDismissTimeoutId = window.setTimeout(() => {
      bouquetStageEl.classList.add("hidden");
      bouquetStageEl.classList.remove("unlocking");
      continueAfterBouquetStage();
    }, prefersReducedMotion ? 420 : 980 / clampSpeed);
  }

  function startVaultIntro() {
    if (!loveVaultIntroEl) {
      finishIntroFlow();
      return;
    }

    loveVaultIntroEl.classList.remove("hidden", "unlocking");
    initLoveVaultIntro();
  }

  function showMusicPrompt() {
    if (musicPromptAsked || !hasMusicSource) {
      return;
    }

    musicPromptAsked = true;

    const title = String(config.musicPromptTitle || defaults.musicPromptTitle);
    const text = String(config.musicPromptText || defaults.musicPromptText);
    const confirmText = String(config.musicPromptConfirmText || defaults.musicPromptConfirmText);
    const cancelText = String(config.musicPromptCancelText || defaults.musicPromptCancelText);
    const fallbackPrompt = () => {
      const shouldPlay = window.confirm(`${title}\n\n${text}`);
      applyMusicPromptChoice(shouldPlay);
    };

    ensureSweetAlertLoaded()
      .then((loaded) => {
        if (!loaded || !window.Swal || typeof window.Swal.fire !== "function") {
          fallbackPrompt();
          return;
        }

        window.Swal.fire({
          title,
          text,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: confirmText,
          cancelButtonText: cancelText,
          allowOutsideClick: false,
          allowEscapeKey: true,
          customClass: {
            popup: "swal-valentine-popup",
            title: "swal-valentine-title",
            htmlContainer: "swal-valentine-text"
          }
        }).then((result) => {
          applyMusicPromptChoice(Boolean(result && result.isConfirmed));
        });
      })
      .catch(() => {
        fallbackPrompt();
      });
  }

  function applyMusicPromptChoice(shouldPlay) {
    if (shouldPlay) {
      musicManuallyPaused = false;
      playMusic({ force: true });
      return;
    }

    musicManuallyPaused = true;
    pauseMusic();
    updateMusicToggle(false);
  }

  function ensureSweetAlertLoaded() {
    if (window.Swal && typeof window.Swal.fire === "function") {
      return Promise.resolve(true);
    }

    if (sweetAlertLoadPromise) {
      return sweetAlertLoadPromise;
    }

    const cssUrl = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
    const jsUrl = "https://cdn.jsdelivr.net/npm/sweetalert2@11";

    sweetAlertLoadPromise = Promise.all([
      loadStyleAsset("swal2-style", cssUrl),
      loadScriptAsset("swal2-script", jsUrl)
    ])
      .then((results) => Boolean(results[1]))
      .catch(() => false);

    return sweetAlertLoadPromise;
  }

  function loadStyleAsset(id, href) {
    const existing = document.getElementById(id);

    if (existing) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      const linkEl = document.createElement("link");
      linkEl.id = id;
      linkEl.rel = "stylesheet";
      linkEl.href = href;
      linkEl.onload = () => resolve(true);
      linkEl.onerror = () => resolve(false);
      document.head.appendChild(linkEl);
    });
  }

  function loadScriptAsset(id, src) {
    const existing = document.getElementById(id);

    if (existing) {
      if (window.Swal && typeof window.Swal.fire === "function") {
        return Promise.resolve(true);
      }

      return new Promise((resolve) => {
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener("error", () => resolve(false), { once: true });
      });
    }

    return new Promise((resolve) => {
      const scriptEl = document.createElement("script");
      scriptEl.id = id;
      scriptEl.src = src;
      scriptEl.async = true;
      scriptEl.onload = () => resolve(true);
      scriptEl.onerror = () => resolve(false);
      document.body.appendChild(scriptEl);
    });
  }

  function bindInteractions() {
    if (heartButtonEl) {
      heartButtonEl.addEventListener("click", () => {
        revealMessage(!hasOpened);
        bounceCard();
        burstHearts(24);
        burstSparklesFromElement(heartButtonEl, 16);
        showBouquet();
        playForeverEffect();
        animateLoveMeter(100);
        startQuoteLoop();

        if (!config.enableMusicAutoplay) {
          playMusic();
        }

        hasOpened = true;
        heartButtonEl.textContent = "Forever Yours ❤️";
        heartButtonEl.setAttribute("aria-label", "Message opened");
      });
    }

    if (kissButtonEl) {
      kissButtonEl.addEventListener("click", () => {
        if (!hasOpened) {
          revealMessage(true);
          hasOpened = true;

          if (heartButtonEl) {
            heartButtonEl.textContent = "Forever Yours ❤️";
            heartButtonEl.setAttribute("aria-label", "Message opened");
          }
        }

        bounceCard();
        burstHearts(18);
        burstSparklesFromElement(kissButtonEl, 22);
        playKissEffect(kissButtonEl);
        showBouquet();
        animateLoveMeter(100);
        startQuoteLoop();
        playMusic();
        flashKissButton();
      });
    }

    if (hugButtonEl) {
      hugButtonEl.addEventListener("click", () => {
        ensureOpenedFromMiniAction();
        bounceCard();
        playHugEffect();
        burstHearts(10);
        burstSparklesFromElement(hugButtonEl, 8, ["🤍", "💞"]);
        animateLoveMeter(100);
        flashMiniButton(hugButtonEl, "Hugged! 🤗");
      });
    }

    if (surpriseButtonEl) {
      surpriseButtonEl.addEventListener("click", () => {
        ensureOpenedFromMiniAction();
        bounceCard();
        playGiftSurprise();
        burstSparklesFromElement(surpriseButtonEl, 12, ["🎁", "💌", "✨"]);
        animateLoveMeter(100);
        flashMiniButton(surpriseButtonEl, "Open! 💌");
      });
    }

    if (roseRainButtonEl) {
      roseRainButtonEl.addEventListener("click", () => {
        ensureOpenedFromMiniAction();
        bounceCard();
        startRoseRain();
        burstSparklesFromElement(roseRainButtonEl, 10, ["🌹", "✨"]);
        animateLoveMeter(100);
        flashMiniButton(roseRainButtonEl, "Petal Rain 🌹");
      });
    }
  }

  function initLoveVaultIntro() {
    if (!loveVaultIntroEl) {
      return;
    }

    if (!config.enableLoveVaultIntro) {
      window.clearInterval(vaultDrainIntervalId);
      vaultInitialized = false;
      if (vaultChargeButtonEl) {
        vaultChargeButtonEl.removeEventListener("click", onVaultChargeClick);
      }
      loveVaultIntroEl.classList.add("hidden");
      return;
    }

    if (
      !vaultChargeButtonEl ||
      !vaultMeterFillEl ||
      !vaultMeterPercentEl ||
      !vaultMeterStatusEl
    ) {
      vaultInitialized = false;
      loveVaultIntroEl.classList.add("hidden");
      return;
    }

    window.clearInterval(vaultDrainIntervalId);
    vaultChargeButtonEl.removeEventListener("click", onVaultChargeClick);

    if (vaultTitleEl) {
      vaultTitleEl.textContent = String(config.vaultTitle || defaults.vaultTitle);
    }

    if (vaultSubtitleEl) {
      vaultSubtitleEl.textContent = String(config.vaultSubtitle || defaults.vaultSubtitle);
    }

    vaultChargeButtonEl.textContent = String(config.vaultButtonLabel || defaults.vaultButtonLabel);
    vaultChargeButtonEl.disabled = false;
    vaultUnlocked = false;
    vaultValue = clampNumber(config.vaultStartPercent, 0, 90, defaults.vaultStartPercent);
    updateVaultMeter(false);
    vaultChargeButtonEl.addEventListener("click", onVaultChargeClick);

    const drainAmount = clampNumber(
      config.vaultDrainPerSecond,
      1,
      30,
      defaults.vaultDrainPerSecond
    );

    vaultDrainIntervalId = window.setInterval(() => {
      if (vaultUnlocked) {
        return;
      }

      vaultValue = Math.max(0, vaultValue - drainAmount);
      updateVaultMeter(false);
    }, 1000);
    vaultInitialized = true;
  }

  function onVaultChargeClick() {
    if (vaultUnlocked) {
      return;
    }

    const clickBoost = clampNumber(config.vaultClickBoost, 1, 50, defaults.vaultClickBoost);
    vaultValue = Math.min(100, vaultValue + clickBoost);

    updateVaultMeter(true);
    pulseVaultSafe();

    if (vaultValue >= 100) {
      unlockLoveVaultIntro();
    }
  }

  function pulseVaultSafe() {
    if (!vaultSafeEl) {
      return;
    }

    vaultSafeEl.classList.remove("charged");
    void vaultSafeEl.offsetWidth;
    vaultSafeEl.classList.add("charged");
  }

  function updateVaultMeter(justClicked) {
    if (!vaultMeterFillEl || !vaultMeterPercentEl || !vaultMeterStatusEl) {
      return;
    }

    const percent = Math.round(vaultValue);
    vaultMeterFillEl.style.width = `${percent}%`;
    vaultMeterPercentEl.textContent = `${percent}%`;

    if (vaultSafeEl) {
      vaultSafeEl.style.setProperty("--vault-wheel-rotate", `${Math.round(percent * 2.8)}deg`);
    }

    let status = "Keep charging...";

    if (percent >= 100) {
      status = String(config.vaultUnlockedLabel || defaults.vaultUnlockedLabel);
    } else if (percent >= 76) {
      status = "Almost unlocked...";
    } else if (percent <= 20) {
      status = "Drain is fast. Keep tapping!";
    }

    vaultMeterStatusEl.textContent = status;

    if (justClicked) {
      vaultMeterFillEl.classList.remove("flash");
      void vaultMeterFillEl.offsetWidth;
      vaultMeterFillEl.classList.add("flash");
    }
  }

  function unlockLoveVaultIntro() {
    if (!loveVaultIntroEl || vaultUnlocked) {
      return;
    }

    vaultUnlocked = true;
    window.clearInterval(vaultDrainIntervalId);
    vaultInitialized = false;

    vaultValue = 100;
    updateVaultMeter(false);

    if (vaultChargeButtonEl) {
      vaultChargeButtonEl.removeEventListener("click", onVaultChargeClick);
      vaultChargeButtonEl.disabled = true;
      vaultChargeButtonEl.textContent = String(config.vaultUnlockedLabel || defaults.vaultUnlockedLabel);
    }

    loveVaultIntroEl.classList.add("unlocking");
    burstSparkles(window.innerWidth * 0.5, window.innerHeight * 0.46, 26, [
      "💖",
      "✨",
      "🎉",
      "💘",
      "🫶"
    ]);
    burstHearts(prefersReducedMotion ? 7 : 14);

    const hideDelay = prefersReducedMotion ? 520 : 1800 / clampSpeed;
    vaultDismissTimeoutId = window.setTimeout(() => {
      loveVaultIntroEl.classList.add("hidden");
      loveVaultIntroEl.classList.remove("unlocking");
      finishIntroFlow();
    }, hideDelay);
  }

  function applyTheme() {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--accent-color", config.accentColor || defaults.accentColor);
    rootStyle.setProperty("--motion-scale", String(clampSpeed));

    const gradient = Array.isArray(config.backgroundGradientColors)
      ? config.backgroundGradientColors.slice(0, 4)
      : defaults.backgroundGradientColors;

    const [g1, g2, g3, g4] = [...gradient, ...defaults.backgroundGradientColors].slice(0, 4);
    rootStyle.setProperty("--gradient-1", g1);
    rootStyle.setProperty("--gradient-2", g2);
    rootStyle.setProperty("--gradient-3", g3);
    rootStyle.setProperty("--gradient-4", g4);
  }

  function applyContent() {
    if (recipientNameEl) {
      recipientNameEl.textContent = config.recipientName;
    }

    if (mainTitleEl) {
      mainTitleEl.textContent = config.mainTitle;
    }

    if (messageEl) {
      messageEl.dataset.fullMessage = String(config.personalMessage || defaults.personalMessage);
      messageEl.textContent = "";
    }

    if (surpriseLetterTextEl) {
      surpriseLetterTextEl.textContent = getSurpriseLetterText();
    }

    if (quoteEl) {
      quoteEl.textContent = safeQuotes[0] ? `\u201c${safeQuotes[0]}\u201d` : "";
    }

    if (loveMeterWrapEl && !config.showLoveMeter) {
      loveMeterWrapEl.hidden = true;
    }

    prepareOptionalPhoto();
  }

  function prepareOptionalPhoto() {
    if (!memoryImageEl || !photoWrapEl) {
      optionalPhotoPrepared = false;
      return;
    }

    const imagePath = String(config.imagePath || "").trim();

    if (!imagePath) {
      optionalPhotoPrepared = false;
      optionalPhotoLoaded = false;
      optionalPhotoError = false;
      photoWrapEl.hidden = true;
      photoWrapEl.classList.remove("visible");
      memoryImageEl.removeAttribute("src");
      return;
    }

    optionalPhotoPrepared = true;
    optionalPhotoLoaded = false;
    optionalPhotoError = false;

    memoryImageEl.dataset.src = imagePath;
    memoryImageEl.loading = "lazy";
    memoryImageEl.decoding = "async";
    memoryImageEl.fetchPriority = "low";
    photoWrapEl.hidden = true;
    photoWrapEl.classList.remove("visible");

    memoryImageEl.addEventListener(
      "load",
      () => {
        optionalPhotoLoaded = true;
        optionalPhotoError = false;
        photoWrapEl.hidden = false;

        if (messageEl && messageEl.classList.contains("visible")) {
          photoWrapEl.classList.add("visible");
        }
      },
      { once: true }
    );

    memoryImageEl.addEventListener(
      "error",
      () => {
        optionalPhotoLoaded = false;
        optionalPhotoError = true;
        photoWrapEl.hidden = true;
      },
      { once: true }
    );
  }

  function ensurePhotoLoaded() {
    if (!optionalPhotoPrepared || optionalPhotoLoaded || optionalPhotoError || !memoryImageEl) {
      return;
    }

    if (memoryImageEl.getAttribute("src")) {
      return;
    }

    const source = String(memoryImageEl.dataset.src || "").trim();

    if (!source) {
      return;
    }

    memoryImageEl.src = source;
  }

  function renderBadges() {
    if (!cuteBadgesEl) {
      return;
    }

    cuteBadgesEl.innerHTML = "";

    safeBadges.slice(0, 4).forEach((label) => {
      const badge = document.createElement("span");
      badge.className = "cute-badge";
      badge.textContent = label;
      cuteBadgesEl.appendChild(badge);
    });
  }

  function configureMedia() {
    const musicPath = String(config.backgroundMusicPath || "").trim();

    if (!backgroundMusicEl || !musicPath) {
      hasMusicSource = false;
      updateMusicToggle(false);
      return;
    }

    hasMusicSource = true;
    backgroundMusicEl.dataset.src = musicPath;
    backgroundMusicEl.preload = "none";
    backgroundMusicEl.removeAttribute("src");
    backgroundMusicEl.load();
    backgroundMusicEl.volume = normalizeVolume(config.musicVolume);

    backgroundMusicEl.addEventListener("play", () => {
      updateMusicToggle(true);
    });

    backgroundMusicEl.addEventListener("pause", () => {
      updateMusicToggle(false);
    });

    updateMusicToggle(false);
  }

  function bindMusicToggle() {
    if (!musicToggleEl) {
      return;
    }

    musicToggleEl.hidden = !hasMusicSource;

    if (!hasMusicSource) {
      return;
    }

    musicToggleEl.addEventListener("click", () => {
      if (backgroundMusicEl && !backgroundMusicEl.paused) {
        musicManuallyPaused = true;
        pauseMusic();
      } else {
        musicManuallyPaused = false;
        playMusic({ force: true });
      }
    });
  }

  function playMusic(options = {}) {
    const { force = false } = options;

    if (!backgroundMusicEl || !hasMusicSource) {
      return;
    }

    if (musicManuallyPaused && !force) {
      return;
    }

    if (!ensureMusicSourceLoaded()) {
      return;
    }

    backgroundMusicEl.play().catch(() => {
      // Browser policy can block playback until a user gesture.
      updateMusicToggle(false);
    });
  }

  function ensureMusicSourceLoaded() {
    if (!backgroundMusicEl) {
      return false;
    }

    if (backgroundMusicEl.getAttribute("src")) {
      return true;
    }

    const source = String(backgroundMusicEl.dataset.src || "").trim();

    if (!source) {
      return false;
    }

    backgroundMusicEl.src = source;
    return true;
  }

  function pauseMusic() {
    if (!backgroundMusicEl || !hasMusicSource) {
      return;
    }

    backgroundMusicEl.pause();
  }

  function updateMusicToggle(isPlaying) {
    if (!musicToggleEl) {
      return;
    }

    musicToggleEl.hidden = !hasMusicSource;

    if (!hasMusicSource) {
      return;
    }

    musicToggleEl.classList.toggle("playing", Boolean(isPlaying));
    musicToggleEl.setAttribute(
      "aria-label",
      isPlaying ? "Turn background music off" : "Turn background music on"
    );

    if (musicToggleTextEl) {
      musicToggleTextEl.textContent = isPlaying ? "BGM On" : "BGM Off";
    }

    if (musicIconEl) {
      musicIconEl.textContent = isPlaying ? "💓" : "💗";
    }
  }

  function revealMessage(withTypewriter) {
    if (!messageEl) {
      return;
    }

    messageEl.classList.add("visible");
    ensurePhotoLoaded();
    const fullMessage = messageEl.dataset.fullMessage || defaults.personalMessage;

    if (withTypewriter && !prefersReducedMotion) {
      runTypewriter(fullMessage);
    } else {
      messageEl.classList.remove("typing");
      messageEl.textContent = fullMessage;
    }

    if (optionalPhotoPrepared && optionalPhotoLoaded && photoWrapEl && !photoWrapEl.hidden) {
      photoWrapEl.classList.add("visible");
    }
  }

  function runTypewriter(text) {
    if (!messageEl) {
      return;
    }

    window.clearTimeout(typewriterTimerId);
    messageEl.classList.add("typing");
    messageEl.textContent = "";

    let index = 0;

    const step = () => {
      if (!messageEl) {
        return;
      }

      if (index >= text.length) {
        messageEl.classList.remove("typing");
        return;
      }

      const char = text[index];
      messageEl.textContent += char;
      index += 1;

      const baseDelay = /[,.!?]/.test(char) ? 70 : char === "\n" ? 85 : 26;
      typewriterTimerId = window.setTimeout(step, baseDelay / clampSpeed);
    };

    step();
  }

  function bounceCard() {
    if (!cardEl) {
      return;
    }

    cardEl.classList.remove("pulse");
    void cardEl.offsetWidth;
    cardEl.classList.add("pulse");
  }

  function createHeart() {
    if (!heartsLayerEl) {
      return;
    }

    const heart = document.createElement("span");
    const hue = randomNumber(-8, 14);
    const size = randomNumber(10, 26);
    const duration = randomNumber(4.5, 9.2) / clampSpeed;
    const left = randomNumber(2, 96);
    const drift = `${randomNumber(-130, 130)}px`;

    heart.className = "heart";
    heart.style.setProperty("--size", `${size}px`);
    heart.style.setProperty("--left", `${left}%`);
    heart.style.setProperty("--duration", `${duration}s`);
    heart.style.setProperty("--drift", drift);
    heart.style.setProperty(
      "--heart-color",
      `hsl(${340 + hue}deg 100% ${randomNumber(67, 80)}% / ${randomNumber(0.62, 0.95)})`
    );

    heart.addEventListener("animationend", () => {
      heart.remove();
    });

    heartsLayerEl.appendChild(heart);
  }

  function burstHearts(count) {
    if (prefersReducedMotion) {
      return;
    }

    for (let i = 0; i < count; i += 1) {
      window.setTimeout(createHeart, i * 75);
    }
  }

  function primeAmbientHearts() {
    if (prefersReducedMotion) {
      return;
    }

    const spawnRate = 1100 / clampSpeed;
    ambientHeartIntervalId = window.setInterval(() => {
      createHeart();
    }, spawnRate);

    burstHearts(5);
  }

  function showBouquet() {
    if (!bouquetPopEl) {
      return;
    }

    bouquetPopEl.classList.remove("visible");
    void bouquetPopEl.offsetWidth;
    bouquetPopEl.classList.add("visible");
  }

  function seedTwinkles() {
    if (!twinkleLayerEl || prefersReducedMotion) {
      return;
    }

    const twinkleCount = window.innerWidth < 768 ? 14 : 24;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < twinkleCount; i += 1) {
      const twinkle = document.createElement("span");
      twinkle.className = "twinkle";
      twinkle.style.setProperty("--size", `${randomNumber(2, 4.5)}px`);
      twinkle.style.setProperty("--left", `${randomNumber(2, 98)}%`);
      twinkle.style.setProperty("--top", `${randomNumber(2, 98)}%`);
      twinkle.style.setProperty("--duration", `${randomNumber(2.2, 5.6) / clampSpeed}s`);
      twinkle.style.setProperty("--delay", `${randomNumber(0, 2.6)}s`);
      fragment.appendChild(twinkle);
    }

    twinkleLayerEl.appendChild(fragment);
  }

  function startQuoteLoop() {
    if (!quoteEl || safeQuotes.length === 0) {
      return;
    }

    quoteEl.classList.add("visible");

    if (quoteIntervalId) {
      return;
    }

    let quoteIndex = 0;

    quoteIntervalId = window.setInterval(() => {
      quoteIndex = (quoteIndex + 1) % safeQuotes.length;
      quoteEl.classList.remove("visible");

      window.setTimeout(() => {
        quoteEl.textContent = `\u201c${safeQuotes[quoteIndex]}\u201d`;
        quoteEl.classList.add("visible");
      }, 190 / clampSpeed);
    }, Math.max(2800, 4200 / clampSpeed));
  }

  function animateLoveMeter(targetPercent) {
    if (!config.showLoveMeter || !loveMeterWrapEl || !loveMeterFillEl || !loveMeterValueEl) {
      return;
    }

    loveMeterWrapEl.classList.add("visible");
    const clampedTarget = Math.max(0, Math.min(100, Math.round(targetPercent)));

    loveMeterFillEl.style.width = `${clampedTarget}%`;

    const duration = 1200 / clampSpeed;
    const startAt = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(clampedTarget * eased);
      loveMeterValueEl.textContent = `${current}%`;

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    };

    window.requestAnimationFrame(update);
  }

  function ensureOpenedFromMiniAction() {
    if (hasOpened) {
      return;
    }

    revealMessage(true);
    hasOpened = true;
    startQuoteLoop();

    if (heartButtonEl) {
      heartButtonEl.textContent = "Forever Yours ❤️";
      heartButtonEl.setAttribute("aria-label", "Message opened");
    }

    if (!config.enableMusicAutoplay) {
      playMusic();
    }
  }

  function getSurpriseLetterText() {
    const customText = String(config.surpriseLetterText || "").trim();

    if (customText) {
      return customText;
    }

    const baseText = String(config.personalMessage || defaults.personalMessage)
      .replace(/\s+/g, " ")
      .trim();

    if (baseText.length <= 170) {
      return baseText;
    }

    return `${baseText.slice(0, 167)}...`;
  }

  function playHugEffect() {
    if (!hugLayerEl) {
      return;
    }

    window.clearTimeout(hugEffectTimeoutId);
    hugLayerEl.classList.remove("play");
    void hugLayerEl.offsetWidth;
    hugLayerEl.classList.add("play");

    burstSparkles(window.innerWidth * 0.5, window.innerHeight * 0.42, 12, ["💞", "🤍", "✨"]);

    const resetDelay = prefersReducedMotion ? 800 : 1700 / clampSpeed;
    hugEffectTimeoutId = window.setTimeout(() => {
      hugLayerEl.classList.remove("play");
    }, resetDelay);
  }

  function playGiftSurprise() {
    if (!surpriseLayerEl) {
      return;
    }

    window.clearTimeout(surpriseEffectTimeoutId);
    surpriseLayerEl.classList.remove("play");
    void surpriseLayerEl.offsetWidth;
    surpriseLayerEl.classList.add("play");

    burstSparkles(window.innerWidth * 0.5, window.innerHeight * 0.52, 16, ["🎁", "💌", "✨", "💖"]);

    const resetDelay = prefersReducedMotion ? 1400 : 5600 / clampSpeed;
    surpriseEffectTimeoutId = window.setTimeout(() => {
      surpriseLayerEl.classList.remove("play");
    }, resetDelay);
  }

  function startRoseRain() {
    if (!roseRainLayerEl) {
      return;
    }

    const petalCount = prefersReducedMotion ? 12 : 42;

    for (let i = 0; i < petalCount; i += 1) {
      window.setTimeout(createRosePetal, (i * 70) / clampSpeed);
    }
  }

  function playKissEffect(sourceButton) {
    if (!kissLayerEl || !sourceButton) {
      return;
    }

    const sourceRect = sourceButton.getBoundingClientRect();
    const sourceX = sourceRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.top + sourceRect.height / 2;

    const targetRect = cardEl
      ? cardEl.getBoundingClientRect()
      : { left: window.innerWidth * 0.3, top: window.innerHeight * 0.24, width: window.innerWidth * 0.4, height: 1 };

    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height * 0.24;

    const kissCount = prefersReducedMotion ? 4 : 9;
    const symbols = ["💋", "😘", "💌", "💗"];

    for (let i = 0; i < kissCount; i += 1) {
      const mark = document.createElement("span");
      mark.className = "kiss-mark";
      mark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      mark.style.setProperty("--x", `${sourceX}px`);
      mark.style.setProperty("--y", `${sourceY}px`);
      mark.style.setProperty("--tx", `${targetX - sourceX + randomNumber(-56, 56)}px`);
      mark.style.setProperty("--ty", `${targetY - sourceY + randomNumber(-32, 40)}px`);
      mark.style.setProperty("--size", `${randomNumber(1.05, 1.45)}rem`);
      mark.style.setProperty("--spin", `${randomNumber(-24, 24)}deg`);
      mark.style.setProperty("--delay", `${i * (40 / clampSpeed)}ms`);
      mark.style.setProperty("--duration", `${randomNumber(620, 980) / clampSpeed}ms`);

      mark.addEventListener("animationend", () => {
        mark.remove();
      });

      kissLayerEl.appendChild(mark);
    }
  }

  function playForeverEffect() {
    if (!foreverLayerEl) {
      return;
    }

    const focusRect = cardEl
      ? cardEl.getBoundingClientRect()
      : { left: window.innerWidth * 0.3, top: window.innerHeight * 0.2, width: window.innerWidth * 0.4, height: 1 };

    const centerX = focusRect.left + focusRect.width / 2;
    const centerY = focusRect.top + Math.max(52, focusRect.height * 0.2);

    const banner = document.createElement("span");
    banner.className = "forever-banner";
    banner.textContent = "Forever Yours ❤️";
    banner.addEventListener("animationend", () => {
      banner.remove();
    });
    foreverLayerEl.appendChild(banner);

    const heartCount = prefersReducedMotion ? 9 : 18;

    for (let i = 0; i < heartCount; i += 1) {
      const angle = (Math.PI * 2 * i) / heartCount + randomNumber(-0.12, 0.12);
      const radius = randomNumber(48, 138);
      const heart = document.createElement("span");
      heart.className = "forever-heart";
      heart.style.setProperty("--x", `${centerX}px`);
      heart.style.setProperty("--y", `${centerY}px`);
      heart.style.setProperty("--tx", `${Math.cos(angle) * radius}px`);
      heart.style.setProperty("--ty", `${Math.sin(angle) * radius - randomNumber(10, 34)}px`);
      heart.style.setProperty("--size", `${randomNumber(8, 16)}px`);
      heart.style.setProperty("--duration", `${randomNumber(760, 1220) / clampSpeed}ms`);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });

      foreverLayerEl.appendChild(heart);
    }
  }

  function createRosePetal() {
    if (!roseRainLayerEl) {
      return;
    }

    if (roseRainLayerEl.childElementCount > 170) {
      roseRainLayerEl.innerHTML = "";
    }

    const petal = document.createElement("span");
    petal.className = "rose-petal";
    petal.style.setProperty("--left", `${randomNumber(-4, 102)}%`);
    petal.style.setProperty("--size", `${randomNumber(10, 24)}px`);
    petal.style.setProperty("--duration", `${randomNumber(4.8, 8.8) / clampSpeed}s`);
    petal.style.setProperty("--delay", `${randomNumber(0, 0.65)}s`);
    petal.style.setProperty("--drift", `${randomNumber(-160, 160)}px`);
    petal.style.setProperty("--start-rotate", `${randomNumber(-70, 70)}deg`);
    petal.style.setProperty("--end-rotate", `${randomNumber(240, 640)}deg`);
    petal.style.setProperty("--petal-color", `hsl(${randomNumber(338, 354)}deg 85% ${randomNumber(45, 60)}%)`);

    petal.addEventListener("animationend", () => {
      petal.remove();
    });

    roseRainLayerEl.appendChild(petal);
  }

  function burstSparklesFromElement(element, count, emojis) {
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    burstSparkles(x, y, count, emojis);
  }

  function burstSparkles(x, y, count, customEmojis) {
    if (!sparkleLayerEl || prefersReducedMotion) {
      return;
    }

    const emojis = Array.isArray(customEmojis) && customEmojis.length > 0
      ? customEmojis
      : ["✨", "💖", "⭐", "💘", "🫶"];

    for (let i = 0; i < count; i += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      sparkle.style.setProperty("--x", `${x}px`);
      sparkle.style.setProperty("--y", `${y}px`);
      sparkle.style.setProperty("--dx", `${randomNumber(-130, 130)}px`);
      sparkle.style.setProperty("--dy", `${randomNumber(-120, 60)}px`);
      sparkle.style.setProperty("--size", `${randomNumber(0.9, 1.4)}rem`);
      sparkle.style.setProperty("--duration", `${randomNumber(820, 1500) / clampSpeed}ms`);

      sparkle.addEventListener("animationend", () => {
        sparkle.remove();
      });

      sparkleLayerEl.appendChild(sparkle);
    }
  }

  function flashMiniButton(button, text) {
    if (!button) {
      return;
    }

    const original = button.textContent;
    button.textContent = text;

    window.setTimeout(() => {
      button.textContent = original || text;
    }, 960 / clampSpeed);
  }

  function attachCursorHearts() {
    window.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") {
          return;
        }

        const now = performance.now();
        const throttleMs = 72 / clampSpeed;

        if (now - lastTrailAt < throttleMs) {
          return;
        }

        lastTrailAt = now;
        createTrailHeart(event.clientX, event.clientY);
      },
      { passive: true }
    );
  }

  function createTrailHeart(x, y) {
    const layer = sparkleLayerEl || heartsLayerEl;

    if (!layer) {
      return;
    }

    const trail = document.createElement("span");
    trail.className = "trail-heart";
    trail.style.setProperty("--x", `${x}px`);
    trail.style.setProperty("--y", `${y}px`);
    trail.style.setProperty("--size", `${randomNumber(8, 13)}px`);
    trail.style.setProperty("--dx", `${randomNumber(-16, 16)}px`);
    trail.style.setProperty("--dy", `${randomNumber(-30, -16)}px`);

    trail.addEventListener("animationend", () => {
      trail.remove();
    });

    layer.appendChild(trail);
  }

  function flashKissButton() {
    if (!kissButtonEl) {
      return;
    }

    const original = kissButtonEl.textContent;
    kissButtonEl.textContent = "Muah! 💋";

    window.setTimeout(() => {
      if (kissButtonEl) {
        kissButtonEl.textContent = original || "Send a Kiss 😘";
      }
    }, 1200 / clampSpeed);
  }

  function normalizePasscode(value, fallback) {
    const fallbackDigits = String(fallback || "")
      .replace(/\D/g, "")
      .padEnd(6, "0")
      .slice(0, 6);

    const digits = String(value || "")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!digits) {
      return fallbackDigits;
    }

    return `${digits}${fallbackDigits}`.slice(0, 6);
  }

  function normalizeBouquetPieces(candidate, fallback, slotElements) {
    const slotIds = Array.from(slotElements || [])
      .map((slot) => String(slot.dataset.slot || "").trim())
      .filter(Boolean);

    if (slotIds.length === 0) {
      return normalizeFallbackPieces(fallback);
    }

    const fallbackMap = {};
    normalizeFallbackPieces(fallback).forEach((item) => {
      fallbackMap[item.id] = item;
    });

    const inputMap = {};

    if (Array.isArray(candidate)) {
      candidate.forEach((item) => {
        const id = String(item && item.id ? item.id : "")
          .trim()
          .toLowerCase();

        if (!id || !slotIds.includes(id)) {
          return;
        }

        const fallbackItem = fallbackMap[id] || {};

        inputMap[id] = {
          id,
          emoji: String(item.emoji || fallbackItem.emoji || "🌸").trim() || "🌸",
          label: String(item.label || fallbackItem.label || id).trim() || id
        };
      });
    }

    return slotIds.map((id) => {
      if (inputMap[id]) {
        return inputMap[id];
      }

      if (fallbackMap[id]) {
        return fallbackMap[id];
      }

      return {
        id,
        emoji: "🌸",
        label: id.charAt(0).toUpperCase() + id.slice(1)
      };
    });
  }

  function normalizeFallbackPieces(candidate) {
    if (!Array.isArray(candidate)) {
      return [];
    }

    return candidate
      .map((item) => {
        const id = String(item && item.id ? item.id : "")
          .trim()
          .toLowerCase();

        if (!id) {
          return null;
        }

        return {
          id,
          emoji: String(item.emoji || "🌸").trim() || "🌸",
          label: String(item.label || id).trim() || id
        };
      })
      .filter(Boolean);
  }

  function shuffleArray(items) {
    const copy = Array.isArray(items) ? items.slice() : [];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function toCssImageUrl(path) {
    const normalized = String(path || "").trim();

    if (!normalized) {
      return "none";
    }

    const escaped = normalized.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `url("${escaped}")`;
  }

  function normalizeStringList(candidate, fallback) {
    if (!Array.isArray(candidate)) {
      return fallback;
    }

    const clean = candidate
      .map((item) => String(item || "").trim())
      .filter(Boolean);

    return clean.length > 0 ? clean : fallback;
  }

  function normalizeVolume(value) {
    const num = Number(value);

    if (!Number.isFinite(num)) {
      return 0.55;
    }

    return Math.min(Math.max(num, 0), 1);
  }

  function clampNumber(value, min, max, fallback) {
    const num = Number(value);

    if (!Number.isFinite(num)) {
      return fallback;
    }

    return Math.min(Math.max(num, min), max);
  }

  function cleanup() {
    window.clearInterval(ambientHeartIntervalId);
    window.clearInterval(quoteIntervalId);
    window.clearInterval(vaultDrainIntervalId);
    window.clearTimeout(typewriterTimerId);
    window.clearTimeout(hugEffectTimeoutId);
    window.clearTimeout(surpriseEffectTimeoutId);
    window.clearTimeout(lockerDismissTimeoutId);
    window.clearTimeout(bouquetDismissTimeoutId);
    window.clearTimeout(vaultDismissTimeoutId);
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
})();
