// Main Game Class - Entry point and game loop
class Game {
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d', {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
        });
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.input = new InputHandler(this.canvas);
        this.assets = new AssetLoader();

        this.currentScene = null;
        this.lastTime = 0;
        this.running = false;

        this.loadingElement = document.getElementById('loading');

        // Enable high quality rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }

    async init() {
        console.log('Initializing game...');

        // Load assets (placeholder paths for now - will work even if files don't exist)
        await Promise.all([
            // Backgrounds
            this.assets.loadImage('bg_school', 'assets/img/bg/school_gate.png'),
            this.assets.loadImage('bg_staircase', 'assets/img/bg/school_stair.png'),
            this.assets.loadImage('bg_park', 'assets/img/bg/park_night.png'),
            this.assets.loadImage('bg_room', 'assets/img/bg/final_scene.png'),

            // Character sprites
            this.assets.loadImage('player', 'assets/img/char/player.png'),
            this.assets.loadImage('crush', 'assets/img/char/crush.png'),

            // Audio (optional - will gracefully fail if not present)
            this.assets.loadAudio('bgm_main', 'assets/audio/background_song.mp3')
        ]);

        // Hide loading screen
        this.loadingElement.classList.add('hidden');

        // Start with title scene
        this.changeScene(new TitleScene(this));

        // Start game loop
        this.running = true;
        this.lastTime = performance.now();
        this.loop(this.lastTime);

        console.log('Game initialized!');
    }

    changeScene(newScene) {
        if (this.currentScene) {
            this.currentScene.exit();
        }
        this.currentScene = newScene;
        this.currentScene.enter();
    }

    loop(currentTime) {
        if (!this.running) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update
        if (this.currentScene) {
            this.currentScene.handleInput(this.input);
            this.currentScene.update(deltaTime);
        }

        // Clear and draw
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Enable high quality rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        if (this.currentScene) {
            this.currentScene.draw();
        }

        // Reset one-time key presses
        this.input.reset();

        // Continue loop
        requestAnimationFrame((time) => this.loop(time));
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    const game = new Game();
    game.init();
});
