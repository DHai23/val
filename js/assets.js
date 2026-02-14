// Asset Loader - Handles loading images and audio
class AssetLoader {
    constructor() {
        this.images = {};
        this.sounds = {};
        this.music = {};
        this.loaded = 0;
        this.total = 0;
    }

    loadImage(name, path) {
        this.total++;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(`Successfully loaded image: ${name} (${path})`);
                this.images[name] = img;
                this.loaded++;
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`Failed to load image: ${path}`);
                // Create a placeholder colored rectangle
                const canvas = document.createElement('canvas');
                canvas.width = 320;
                canvas.height = 180;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#333';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#666';
                ctx.font = '10px Arial';
                ctx.fillText(`Missing: ${name}`, 10, 90);
                this.images[name] = canvas;
                this.loaded++;
                resolve(canvas);
            };
            img.src = path;
        });
    }

    loadAudio(name, path) {
        this.total++;
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.addEventListener('canplaythrough', () => {
                this.sounds[name] = audio;
                this.loaded++;
                resolve(audio);
            }, { once: true });
            audio.addEventListener('error', () => {
                console.warn(`Failed to load audio: ${path}`);
                this.loaded++;
                resolve(null);
            });
            audio.src = path;
        });
    }

    getProgress() {
        return this.total === 0 ? 1 : this.loaded / this.total;
    }

    getImage(name) {
        return this.images[name];
    }

    getSound(name) {
        return this.sounds[name];
    }

    playSound(name, volume = 1.0) {
        const sound = this.sounds[name];
        if (sound) {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play().catch(e => console.warn('Audio play failed:', e));
        }
    }

    playMusic(name, volume = 0.5, loop = true) {
        const music = this.sounds[name];
        if (music) {
            music.volume = volume;
            music.loop = loop;
            music.play().catch(e => console.warn('Music play failed:', e));
        }
    }

    stopMusic(name, fadeOut = false) {
        const music = this.sounds[name];
        if (music) {
            if (fadeOut) {
                const fadeInterval = setInterval(() => {
                    if (music.volume > 0.05) {
                        music.volume -= 0.05;
                    } else {
                        music.pause();
                        music.currentTime = 0;
                        clearInterval(fadeInterval);
                    }
                }, 100);
            } else {
                music.pause();
                music.currentTime = 0;
            }
        }
    }
}
