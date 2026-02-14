// Simple Sprite Renderer - Static images with horizontal flipping
class PlayerSprite {
    constructor(image) {
        this.image = image;
        console.log('PlayerSprite loaded:', image.width, 'x', image.height);
    }

    draw(ctx, x, y, scale = 1, state = 'idle', deltaTime = 0, facingRight = true) {
        if (!this.image || !this.image.complete) {
            console.warn('Sprite image not ready');
            return;
        }

        const width = this.image.width * scale;
        const height = this.image.height * scale;

        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Both images face left by default
        // Flip horizontally when facing right
        if (facingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, -x - width, y, width, height);
        } else {
            ctx.drawImage(this.image, x, y, width, height);
        }

        ctx.restore();
    }
}

// Simple sprite class for other characters (crush, etc.)
class Sprite {
    constructor(image) {
        this.image = image;
    }

    draw(ctx, x, y, scale = 1, facingRight = false) {
        if (!this.image || !this.image.complete) return;

        const width = this.image.width * scale;
        const height = this.image.height * scale;

        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Both images face left by default
        // Flip horizontally when facing right
        if (facingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, -x - width, y, width, height);
        } else {
            ctx.drawImage(this.image, x, y, width, height);
        }

        ctx.restore();
    }
}
