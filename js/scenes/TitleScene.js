// Title Scene - Modern Romantic Opening
class TitleScene extends Scene {
    constructor(game) {
        super(game);
        this.alpha = 0;
        this.fadeIn = true;
        this.time = 0;
        this.konamiActivated = false;
        this.hearts = [];

        // Initialize floating hearts
        for (let i = 0; i < 15; i++) {
            this.hearts.push({
                x: Math.random() * this.width,
                y: this.height + Math.random() * 200,
                speed: 0.5 + Math.random() * 0.6,
                size: 20 + Math.random() * 20,
                opacity: 0.3 + Math.random() * 0.4,
                sway: Math.random() * Math.PI * 2
            });
        }
    }

    enter() {
        super.enter();
        this.alpha = 0;
        this.fadeIn = true;
        this.time = 0;
    }

    update(deltaTime) {
        this.time += deltaTime;

        // Fade in effect
        if (this.fadeIn && this.alpha < 1) {
            this.alpha += deltaTime / 2000;
            if (this.alpha >= 1) {
                this.alpha = 1;
                this.fadeIn = false;
            }
        }

        // Update floating hearts
        this.hearts.forEach(heart => {
            heart.y -= heart.speed;
            heart.sway += 0.02;
            heart.x += Math.sin(heart.sway) * 0.5;

            if (heart.y < -20) {
                heart.y = this.height + 20;
                heart.x = Math.random() * this.width;
            }
        });
    }

    handleInput(input) {
        // Check for Konami code
        for (let key in input.keysPressed) {
            if (input.keysPressed[key] && input.checkKonami(key)) {
                this.konamiActivated = true;
                // this.game.assets.playSound('sfx_select', 0.3);
                console.log('🎮 Konami Code Activated!');
            }
        }

        // Press Enter or Space to start
        if (input.isKeyPressed('Enter') || input.isKeyPressed(' ') || input.isKeyPressed('z') || input.isKeyPressed('Z')) {
            // this.game.assets.playSound('sfx_select', 0.3);

            // Start background music (will loop throughout entire game)
            this.game.assets.playMusic('bgm_main', 0.4, true);

            this.game.changeScene(new Arc1_School(this.game));
        }
    }

    draw() {
        // Modern gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#ffecd2');
        gradient.addColorStop(0.5, '#fcb69f');
        gradient.addColorStop(1, '#ff9a9e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Set global alpha for fade in
        this.ctx.globalAlpha = this.alpha;

        // Draw floating hearts
        this.hearts.forEach(heart => {
            this.ctx.globalAlpha = heart.opacity * this.alpha;
            this.ctx.fillStyle = '#fff';
            this.ctx.font = `${heart.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('♥', heart.x, heart.y);
        });

        this.ctx.globalAlpha = this.alpha;

        // Title with modern elegant font
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 80px "Playfair Display"';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 4;
        this.ctx.fillText('Valentine', this.width / 2, this.height / 2 - 40);

        this.ctx.font = '50px "Playfair Display"';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('A story of u and me ;)', this.width / 2, this.height / 2 + 30);

        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;

        // Subtitle
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.font = '22px "Quicksand"';
        this.ctx.fillText('A Journey Through Memories', this.width / 2, this.height / 2 + 80);

        // Decorative line
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.width / 2 - 150, this.height / 2 + 105);
        this.ctx.lineTo(this.width / 2 + 150, this.height / 2 + 105);
        this.ctx.stroke();

        // Blinking "Press Enter" with modern pulse effect
        const pulse = Math.sin(this.time / 500) * 0.3 + 0.7;
        this.ctx.globalAlpha = pulse * this.alpha;

        // Draw button-like prompt
        const btnWidth = 280;
        const btnHeight = 60;
        const btnX = this.width / 2 - btnWidth / 2;
        const btnY = this.height / 2 + 140;

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.roundRect(btnX, btnY, btnWidth, btnHeight, 30);
        this.ctx.fill();

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.lineWidth = 3;
        this.roundRect(btnX, btnY, btnWidth, btnHeight, 30);
        this.ctx.stroke();

        this.ctx.globalAlpha = this.alpha;
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 24px "Quicksand"';
        this.ctx.fillText('PRESS ENTER', this.width / 2, btnY + 40);

        // Konami easter egg message
        if (this.konamiActivated) {
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '18px "Quicksand"';
            this.ctx.fillText('✨ Easter Egg Found! ✨', this.width / 2, this.height - 60);
            this.ctx.font = '16px "Quicksand"';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.fillText('Made with love for you', this.width / 2, this.height - 30);
        }

        // Credits at bottom
        if (!this.konamiActivated) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.font = '16px "Quicksand"';
            this.ctx.fillText('Created with ❤️', this.width / 2, this.height - 30);
        }

        // Reset text align and alpha
        this.ctx.textAlign = 'left';
        this.ctx.globalAlpha = 1;
    }

    // Helper for rounded rectangles
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
}
