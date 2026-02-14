// Base Scene Class - All scenes inherit from this
class Scene {
    constructor(game) {
        this.game = game;
        this.ctx = game.ctx;
        this.width = game.width;
        this.height = game.height;
    }

    // Called when entering this scene
    enter() {
        console.log(`Entering ${this.constructor.name}`);
    }

    // Called when exiting this scene
    exit() {
        console.log(`Exiting ${this.constructor.name}`);
    }

    // Update logic (called every frame)
    update(deltaTime) {
        // Override in child classes
    }

    // Render graphics (called every frame)
    draw() {
        // Override in child classes
    }

    // Handle input
    handleInput(input) {
        // Override in child classes
    }
}

// Transition Effects
class Transition {
    static fadeOut(ctx, width, height, progress) {
        ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
        ctx.fillRect(0, 0, width, height);
    }

    static fadeIn(ctx, width, height, progress) {
        ctx.fillStyle = `rgba(0, 0, 0, ${1 - progress})`;
        ctx.fillRect(0, 0, width, height);
    }

    static pixelDissolve(ctx, width, height, progress) {
        const blockSize = 8;
        const cols = Math.ceil(width / blockSize);
        const rows = Math.ceil(height / blockSize);
        const totalBlocks = cols * rows;
        const blocksToShow = Math.floor(totalBlocks * progress);

        ctx.fillStyle = '#000';
        for (let i = 0; i < blocksToShow; i++) {
            const x = (i % cols) * blockSize;
            const y = Math.floor(i / cols) * blockSize;
            ctx.fillRect(x, y, blockSize, blockSize);
        }
    }
}
