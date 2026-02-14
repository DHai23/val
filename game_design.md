Valentine Pixel Story - Game Design Document
1. Game Overview Checklist
 Engine: Custom build (HTML5 Canvas + Vanilla JS). Lightweight, no external libraries needed.
 Resolution: 320x180 (upscaled to full screen with image-rendering: pixelated).
 Input: Arrow keys (Movement), Space/Z (Interact), Enter (Start).
 Audio: Web Audio API with fade-in/out support.
 Text: Typewriter effect with character portraits.
2. Emotional Design & Tone
Goal: Make her feel nostalgic -> tense/shy -> loved -> surprised/meta-aware.
Key Mechanic: Walking triggers implicit narrative pacing. Stopping/interacting triggers explicit story beats.
3. Technical Architecture
Folder Structure
/
├── index.html
├── style.css
├── js/
│   ├── main.js       # Entry point, loop
│   ├── input.js      # Keyboard handler
│   ├── assets.js     # Image/Audio loader
│   ├── dialogue.js   # Typewriter system
│   ├── scene.js      # Scene manager base class
│   └── scenes/       # Individual scene logic
│       ├── TitleScene.js
│       ├── Arc1_School.js
│       ├── Arc2_Staircase.js
│       ├── Arc3_Park.js
│       └── Arc4_Laptop.js
└── assets/
    ├── img/
    │   ├── char/     # Spritesheets
    │   ├── bg/       # Backgrounds
    │   └── ui/       # Text box, icons
    └── audio/        # BGM, SFX
State Management
Simple Object-Oriented State Machine:

javascript
class Game {
    changeScene(newScene) {
        this.currentScene.exit();
        this.currentScene = newScene;
        this.currentScene.enter();
    }
}
4. Detailed Arc Breakdown
ARC 1: School Gate (The Beginning)
Concept: A quiet, beautiful morning. The start of the journey.
Visuals:
Background: High contrast school gate, sun rising on the horizon (gradient orange to blue sky), cherry blossom petals falling slowly.
Palette: #FF9A8B (Sunrise Peach), #2C3E50 (Deep Blue Shadows), #FAD0C4 (Soft Pink).
Lighting: "God rays" overlay (simple semi-transparent white beams).
Audio:
BGM: Early Morning Breeze (Lo-fi piano, slow BPM ~70).
SFX: Birds chirping (random interval), footsteps on pavement (light tap).
Assets:
bg_school_gate.png (640x360 - parallax layers if possible: sky, gate, foreground fence).
spr_heroine_uniform.png (32x48px per frame, Idle/Walk Right).
Interaction:
Walk Right -> Trigger monologue: "Another day... surely nothing special will happen."
Reach gate -> Fade out -> Go to Arc 2.
ARC 2: Staircase Encounter (The Crush)
Concept: The classic anime trope interaction.
Visuals:
Background: Indoor school hallway/stair landing. Lockers in background. Looking out window to bright day.
Palette: #EAEAEA (White walls), #89CFF0 (Sky blue window), #D3D3D3 (Shadows).
Camera: Static side view.
Audio:
BGM: Heartbeat Skip (Playful pizzicato strings, slightly faster BPM ~95). transition from Arc 1.
SFX: School bell ringing (start), Heartbeat thud (when Crush appears).
Assets:
bg_staircase.png (320x180).
spr_crush_uniform.png (32x48px).
ui_emote_heart.png (16x16px floating above head).
Interaction:
Walk to marked spot -> "He's late..."
Timer/Trigger -> Crush enters.
Dialogue Choice: "Ask about English" vs "Say Hello". (Both lead to same cute outcome).
"See you later!" -> Blush animation.
ARC 3: The Confession (4 Years Later)
Concept: The climax. Time skip implied by outfit change.
Visuals:
Background: Park bench, evening/sunset or night with streetlamps. Fireflies.
Palette: #2C5364 (Night Blue), #F6D365 (Lamp warmth), #203A43 (Dark foliage).
Effects: Firefly particles (simple yellow pixels fading in/out).
Audio:
BGM: Confession (Emotional strings/piano, swelling, BPM ~60).
SFX: Crickets, Night ambience.
Assets:
bg_park.png.
spr_heroine_adult.png (Casual cute outfit).
spr_crush_adult.png (Casual cool outfit).
Mechanic (The Glitch):
Choice: [Accept] | [Decline]
If [Decline] selected: Screen shakes, CRT chromatic aberration effect, audio glitches/screeches for 0.5s.
Text changes to: "I can't let you do that." or "Error: Heart.exe not found."
Button moves back to [Accept].
Upon [Accept]: Kiss animation triggers (screen connects).
ARC 4: Meta Ending (The Reveal)
Concept: Breaking the fourth wall.
Visuals:
Background: A pixel art version of HER actual room/desk. A laptop on the desk is glowing.
Character: A pixel sprite of HER (as she looks now) sitting at the desk.
Audio:
BGM: Your Favorite Song (A chiptune cover of a song she likes).
SFX: Typing sounds.
Interaction:
The character on the laptop screen turns around and looks at the "Camera" (Screen).
A dialogue box appears NOT in the game style, but as a "System Notification".
"Hey [NaME]... I made this for you."
5. Ending & Transition Effects
Transition Style: "Pixel Dissolve". The scene breaks into square chunks and flies off or fades.
Final Sequence:
The screen fades to black.
Scrolling Credits (Star Wars style or simple vertical scroll):
"Code by: Your Boyfriend"
"Art by: Also me (tried my best)"
"Starring: You"
The Letter: A final message types out letter by letter in the center of the screen. Content: "In every universe, in every timeline, whether pixel or reality... I choose you. Happy Valentine's Day." (Adjust to personal nickname).
Easter Egg: Konami Code (Up Up Down Down Left Right Left Right B A) on title screen plays a funny sound or shows a goofy photo of you two.
6. Asset List Summary (For Production)
Asset Name	Type	Size (px)	Notes
spr_hero_atlas.png	Sprite	128x128	4x4 Grid (Idle/Walk), separate rows for outfits
spr_crush_atlas.png	Sprite	128x64	Walk/Idle frames
bg_school.png	BG	320x180	Pixel art resolution
bg_staircase.png	BG	320x180	
bg_park_night.png	BG	320x180	
bg_room_meta.png	BG	320x180	
ui_textbox.png	UI	300x50	9-slice scalable border style
ui_font.png	Font	N/A	Use 'Press Start 2P' or '04b03' Google Font
7. Implementation Plan
Setup: Create index.html with <canvas id="game" width="320" height="180"></canvas>.
CSS: Center canvas, black background, image-rendering: pixelated; width: 100%; height: 100vh; object-fit: contain;.
Loop: requestAnimationFrame. Update(), Draw().
Input: Simple interaction listeners.
Build Scenes: One by one, starting with Arc 1.