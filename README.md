# Valentine4Im2026

Premium Valentine's Day static website (GitHub Pages ready) with multi-stage surprise flow:

- Locker challenge (jigsaw + 6-digit passcode)
- Bouquet assembly stage
- Love vault charge challenge
- Main romantic page with interactive effects, music toggle, and configurable content

## Project Structure

```text
valentine/
├── index.html
├── style.css
├── main.js
├── config.js
└── assets/
    ├── images/
    └── audio/
```

## Quick Start

Open `index.html` directly in your browser, or run a simple static server.

Example:

```bash
cd valentine
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Customize (`config.js`)

Edit `config.js` to personalize content and behavior.

Key fields:

- `recipientName`
- `mainTitle`
- `personalMessage`
- `accentColor`
- `backgroundGradientColors`
- `imagePath`
- `backgroundMusicPath`
- `musicVolume`
- `musicPromptTitle`, `musicPromptText`
- `enableLockerIntro`, `lockerPasscode`, `lockerPuzzleImagePath`
- `enableBouquetAssembly`, `bouquetPieces`
- `enableLoveVaultIntro`, `vaultStartPercent`, `vaultClickBoost`, `vaultDrainPerSecond`
- `animationSpeed`

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to `Settings` -> `Pages`.
3. Under **Build and deployment** choose **Deploy from a branch**.
4. Select your branch (for example `master` or `main`) and root folder (`/`).
5. Save and wait for the Pages URL.

## License

This project is **not open source**.

Use, copying, modification, redistribution, or commercialization is not allowed without explicit written permission from the copyright owner.
See `LICENSE` for full terms.
