# 🎨 Customization Checklist

Quick checklist for personalizing your Valentine Pixel Story!

## ✏️ Essential Personalizations

### 1. Final Letter (MOST IMPORTANT!)
- [ ] **File**: `js/scenes/Arc4_Laptop.js` (Line 11)
- [ ] Change: `this.letterText = "Your message here..."`
- [ ] Add: Her name, personal message, special date

### 2. Meta Reveal Message
- [ ] **File**: `js/scenes/Arc4_Laptop.js` (Line 149)
- [ ] Change: `"Hey [HER NAME]... I made this for you."`

### 3. Credits
- [ ] **File**: `js/scenes/Arc4_Laptop.js` (Lines 238-260)
- [ ] Update: "Starring: [HER NAME]"
- [ ] Add: Your name, inside jokes, special thanks

### 4. Dialogue Personalization
- [ ] **Arc 1** (`Arc1_School.js` Line 41): Opening thoughts
- [ ] **Arc 2** (`Arc2_Staircase.js` Lines 39, 56, 83): Conversation
- [ ] **Arc 3** (`Arc3_Park.js` Lines 37, 43, 69, 78): Confession dialogue
- [ ] **Arc 4** (`Arc4_Laptop.js` Line 150): System messages

## 🎨 Optional Enhancements

### Visual Assets
- [ ] Add background image: `assets/img/bg/school_gate.png`
- [ ] Add background image: `assets/img/bg/staircase.png`
- [ ] Add background image: `assets/img/bg/park_night.png`
- [ ] Add background image: `assets/img/bg/room_meta.png`
- [ ] Add character sprites (optional - game has default shapes)

### Audio Assets
- [ ] Add music: `assets/audio/morning.mp3`
- [ ] Add music: `assets/audio/school.mp3`
- [ ] Add music: `assets/audio/confession.mp3`
- [ ] Add music: `assets/audio/meta.mp3` (her favorite song chiptune!)
- [ ] Add SFX: `assets/audio/select.mp3`
- [ ] Add SFX: `assets/audio/heartbeat.mp3`

### Easter Eggs
- [ ] Customize Konami code message (`TitleScene.js` Line 66)
- [ ] Add hidden messages in dialogue
- [ ] Add personal references she'll recognize

## 🎯 Quick Personalization (5 Minutes)

If you're short on time, JUST do these:

1. **Change the final letter** → Arc4_Laptop.js, Line 11
2. **Add her name to credits** → Arc4_Laptop.js, Line 248
3. **Personalize the reveal message** → Arc4_Laptop.js, Line 149
4. **Test it!** → Open index.html

## 🔍 Where to Find Specific Lines

**To edit dialogue:**
```javascript
this.dialogue.start(
    'Text goes here',  // ← Change this
    'Speaker Name',    // ← Change this
    null,
    callback
);
```

**To edit the letter:**
```javascript
// In Arc4_Laptop.js constructor
this.letterText = "Your personalized romantic message...";
```

**To edit credits:**
```javascript
// In Arc4_Laptop.js, drawCredits method
const credits = [
    'Title',
    'Code by: Your Name',
    'Starring: Her Name',
    // Add more lines...
];
```

## 🚀 Testing Checklist

- [ ] Open `index.html` in browser
- [ ] Play through all 4 arcs
- [ ] Test Konami code on title screen
- [ ] Verify all dialogue appears correctly
- [ ] Check final letter displays properly
- [ ] Try to "Decline" in Arc 3 (should glitch!)
- [ ] Verify credits scroll smoothly
- [ ] Test on her likely device/browser

## 💡 Pro Tips

1. **Use Ctrl+F** to find dialogue quickly
2. **Test after each change** - reload browser
3. **Keep it personal** - inside jokes, memories, nicknames
4. **Font is small** - keep dialogue concise
5. **No coding experience needed** - just edit the text in quotes!

## 📱 Before You Share

- [ ] All personalization complete
- [ ] Tested on target device
- [ ] Audio works (if added)
- [ ] No placeholder text remaining
- [ ] Ready to melt her heart! ❤️

---

**Remember:** The most important part is the final letter. Make it count! 💕
