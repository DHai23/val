# 🚀 Quick Start Guide

## Fastest Way to Get Started (3 Steps)

### Step 1: Test the Game (30 seconds)
```bash
# Just open index.html in your browser
# Double-click index.html OR right-click → Open With → Browser
```

The game works immediately with placeholder graphics!

### Step 2: Personalize It (5-10 minutes)

Open these files in any text editor (VS Code, Notepad++, or even Notepad):

1. **`js/scenes/Arc4_Laptop.js`** - Find line 11:
   ```javascript
   this.letterText = "Your personalized Valentine's message here...";
   ```

2. **Same file** - Find line 149:
   ```javascript
   "Hey [HER NAME]... I made this for you."
   ```

3. **Same file** - Find line 248 (in credits):
   ```javascript
   'Starring:',
   '[HER NAME]',
   ```

### Step 3: Share It

**Option A - Local (Easiest):**
- Send her the entire `val_proj` folder
- Tell her to open `index.html`

**Option B - Online (Cooler):**
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the entire `val_proj` folder
3. Get a shareable URL
4. Send her the link!

---

## 🎮 How to Play

- **Arrow Keys** → Move / Navigate
- **Space or Z** → Interact / Advance dialogue
- **Enter** → Confirm choices
- **Konami Code** (↑↑↓↓←→←→BA) → Easter egg on title screen

---

## 🎨 Want to Add More Polish?

### Add Custom Backgrounds (Optional)

Create or find 320x180 pixel images and save as:
- `assets/img/bg/school_gate.png`
- `assets/img/bg/staircase.png`
- `assets/img/bg/park_night.png`
- `assets/img/bg/room_meta.png`

**Where to get pixel art backgrounds:**
- [OpenGameArt.org](https://opengameart.org)
- [itch.io](https://itch.io/game-assets/free/tag-pixel-art)
- Make your own with [Piskel](https://www.piskelapp.com) or [Aseprite](https://www.aseprite.org)

### Add Music (Optional)

Add MP3 files to `assets/audio/`:
- `morning.mp3` - Arc 1 (calm, morning vibes)
- `school.mp3` - Arc 2 (playful, cute)
- `confession.mp3` - Arc 3 (emotional, romantic)
- `meta.mp3` - Arc 4 (her favorite song!)

**Where to get chiptune music:**
- [OpenGameArt.org](https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=12&sort_by=count&sort_order=DESC)
- [FreeMusicArchive](https://freemusicarchive.org/genre/Chiptune)
- Make your own with [Beepbox](https://www.beepbox.co)

---

## 📝 Full Customization?

See **CUSTOMIZATION_CHECKLIST.md** for complete guide!

---

## 🐛 Troubleshooting

**Game doesn't load?**
- Open browser console (F12) and check for errors
- Make sure all files are in the right folders
- Try a different browser (Chrome recommended)

**Black screen?**
- This is normal! The game uses procedural graphics
- Custom backgrounds are optional
- It still looks retro and charming!

**Dialogue too fast/slow?**
- Edit `js/dialogue.js` line 10: `this.speed = 50;` (lower = faster)

**Want different colors?**
- Each scene file has color codes (like `#FF9A8B`)
- Search for "fillStyle" and change hex colors
- Use [ColorPicker](https://htmlcolorcodes.com/color-picker/) to find colors

---

## ✨ Make It Special

**Personal touches that matter:**
- Use inside jokes in dialogue
- Reference specific memories in Arc 1-3
- Make the final letter deeply personal
- Add her favorite colors (change hex codes)
- Include Konami code hint if she's a gamer

**Presentation ideas:**
- Send the link on Valentine's Day morning
- Tell her "I made you something"
- Be there when she plays it (watch her reaction!)
- Have tissues ready (it's sweet!)

---

## 📁 Project Structure (Reference)

```
val_proj/
├── index.html                    ← Open this to play!
├── style.css                     ← Styling
├── README.md                     ← Full documentation
├── CUSTOMIZATION_CHECKLIST.md    ← Detailed customization
├── QUICKSTART.md                 ← You are here!
├── js/
│   ├── main.js                   ← Game engine
│   ├── input.js                  ← Keyboard controls
│   ├── assets.js                 ← Asset loader
│   ├── dialogue.js               ← Dialogue system
│   ├── scene.js                  ← Scene base class
│   └── scenes/
│       ├── TitleScene.js         ← Title screen
│       ├── Arc1_School.js        ← Opening scene
│       ├── Arc2_Staircase.js     ← First encounter
│       ├── Arc3_Park.js          ← Confession (glitch!)
│       └── Arc4_Laptop.js        ← Meta reveal ← EDIT THIS!
└── assets/
    ├── img/                      ← Add images here (optional)
    └── audio/                    ← Add music here (optional)
```

---

## 💖 Final Checklist

- [ ] Tested the game (played all 4 arcs)
- [ ] Personalized final letter
- [ ] Added her name to credits
- [ ] Customized key dialogue
- [ ] (Optional) Added backgrounds/music
- [ ] Tested on her device/browser
- [ ] Ready to make her cry happy tears!

---

**You've got this! She's going to love it! 💕**

*Any questions? Check README.md for detailed docs or CUSTOMIZATION_CHECKLIST.md for specific edits.*
