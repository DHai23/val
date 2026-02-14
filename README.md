# Valentine Pixel Story 💖

A romantic narrative game built with vanilla JavaScript and HTML5 Canvas, featuring Vietnamese dialogue and modern romantic aesthetics.

## 🎮 How to Play

1. Open `index.html` in a modern web browser (Chrome, Firefox, Edge recommended)
2. Use keyboard controls:
   - **Arrow Keys**: Move character / Navigate menus
   - **Space / Z / Enter**: Interact / Advance dialogue / Confirm choices
3. Follow the story through 4 romantic arcs

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── style.css          # Fullscreen styling
├── js/
│   ├── main.js        # Game loop and entry point
│   ├── input.js       # Keyboard input handler
│   ├── assets.js      # Asset loader (images & audio)
│   ├── dialogue.js    # Dialogue and choice systems
│   ├── sprite.js      # Character sprite rendering
│   ├── scene.js       # Base scene class
│   └── scenes/        # Individual story arcs
│       ├── TitleScene.js
│       ├── Arc1_School.js
│       ├── Arc2_Staircase.js
│       ├── Arc3_Park.js
│       └── Arc4_Laptop.js
└── assets/
    ├── img/
    │   ├── bg/        # Background images
    │   └── char/      # Character sprites
    └── audio/
        └── background_song.mp3  # BGM (loops throughout game)
```

## 🎨 Game Features

### Arcs Overview
- **Arc 1**: School Morning - Player arrives early hoping to see Hải
- **Arc 2**: Staircase Encounter - The exam confession trick 💕
- **Arc 3**: Park Night - Four years later confession
- **Arc 4**: Meta Ending - The reveal

### Technical Features
- ✅ Vietnamese dialogue with romantic tone
- ✅ Character sprites with horizontal flipping
- ✅ Modern UI with gradients and smooth animations
- ✅ Choice-based interactions
- ✅ **Exam popup mechanic** (Arc 2) - Valentine confession disguised as English test
- ✅ **"Glitch" mechanic** (Arc 3) - System prevents declining the confession
- ✅ Enhanced particle effects (hearts, sparkles, cherry blossoms)
- ✅ Background music loop
- ✅ Fullscreen responsive design (1280x720 base resolution)
- ✅ Credits and final letter

## 🎯 Key Game Mechanics

### Arc 1: School Gate
- Player spawns from right side
- Walk left to trigger dialogue
- Choice-based entry: "Vô trường" or "La cà xíu"
- Dialogue can be re-triggered by moving away

### Arc 2: Staircase
- Player waits, crush enters from left
- Two dialogue paths both lead to exam popup
- **Exam paper popup** with MCQ:
  - Question: "Will you become my valentine? 💕"
  - Options: A. Có | B. Đương nhiên rồi | C. Tất cả đáp án trên
- All answers lead to happy ending

### Arc 3: Park Confession
- Both characters using sprites
- System blocks declining confession with glitch effect
- Vietnamese error messages
- Kiss animation on acceptance

### Arc 4: Meta Reveal
- Background image showing final scene
- System dialogue in Vietnamese
- Static centered credits
- Typewriter letter effect

## 🛠 Technical Details

- **Engine**: Pure vanilla JavaScript (no frameworks)
- **Resolution**: 1280x720 (fullscreen responsive)
- **Rendering**: HTML5 Canvas with high-quality smoothing
- **Fonts**: Quicksand (dialogue) + Playfair Display (titles)
- **Language**: Vietnamese dialogue
- **Compatibility**: Modern browsers with HTML5 Canvas support

## 🎨 Asset Requirements

### Images (Required)
- `assets/img/bg/school_gate.png` - School morning scene
- `assets/img/bg/school_stair.png` - Staircase background
- `assets/img/bg/park_night.png` - Night park scene
- `assets/img/bg/final_scene.png` - Final meta scene
- `assets/img/char/player.png` - Player character sprite
- `assets/img/char/crush.png` - Crush character sprite (Hải)

### Audio
- `assets/audio/background_song.mp3` - Loops throughout entire game (required)

## 🚀 Deployment

### Local Testing
Simply open `index.html` in your browser.

### GitHub Pages Deployment
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Valentine Pixel Story"

# Add remote
git remote add origin https://github.com/DHai23/val.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Other Hosting Options
- **Netlify**: Drag and drop the entire folder
- **Vercel**: Deploy with one command
- **Neocities**: Upload files via web interface

## 💡 Customization Tips

### Dialogue
All dialogue is in Vietnamese. Edit in scene files:
- `Arc1_School.js` - Line ~44+
- `Arc2_Staircase.js` - Line ~44+, ~121+
- `Arc3_Park.js` - Line ~51+
- `Arc4_Laptop.js` - Line ~16, ~84+, ~318+

### Character Names
Update speaker labels in dialogue.start() calls:
- 'Bạn' - Player
- 'Hải' - Crush
- 'HỆ THỐNG' - System messages

### Sprites
Replace `player.png` and `crush.png` with your own character sprites.
Both should face left by default (will auto-flip for right).

### Background Music
Replace `background_song.mp3` with your preferred track.
Starts on title screen when player presses Enter.

## 🐛 Troubleshooting

**No music?**
- Music starts when you press Enter on title screen (browser autoplay policy)
- Check if `background_song.mp3` exists in `assets/audio/`

**Sprites not showing?**
- Check browser console (F12) for errors
- Verify image paths in `assets/img/char/`
- Make sure sprites face left

**Dialogue not advancing?**
- Press Space, Z, or Enter
- Click on screen first to focus the game

## 📝 License

This is a personal Valentine's Day project. Feel free to customize and share! ❤️

## 💕 Credits

Made with love for someone special.

Vietnamese dialogue and romantic story arcs.

---

**Happy Valentine's Day! 💝**
