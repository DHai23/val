// Arc 3: Park Confession - The Glitch
class Arc3_Park extends Scene {
    constructor(game) {
        super(game);
        this.dialogue = new DialogueBox(this.ctx, this.width, this.height);
        this.choice = new ChoiceBox(this.ctx, this.width, this.height);

        this.state = 'intro'; // intro -> confession -> choice -> glitch/accept -> kiss -> fade
        this.playerX = 400;
        this.playerY = 300; // Moved up from 380
        this.crushX = 720;
        this.crushY = 250; // Crush positioned higher than player
        this.fireflies = [];
        this.playerSprite = null;
        this.crushSprite = null;
        this.glitchEffect = false;
        this.glitchTime = 0;
        this.glitchAttempts = 0;
        this.kissing = false;
        this.fadeOut = false;
        this.fadeAlpha = 0;

        // Initialize fireflies
        for (let i = 0; i < 40; i++) {
            this.fireflies.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                alpha: Math.random(),
                fadeSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }

    enter() {
        super.enter();

        // Create player sprite
        const playerImage = this.game.assets.getImage('player');
        if (playerImage) {
            this.playerSprite = new PlayerSprite(playerImage);
        }

        // Create crush sprite
        const crushImage = this.game.assets.getImage('crush');
        if (crushImage) {
            this.crushSprite = new Sprite(crushImage);
        }

        // Start intro dialogue
        setTimeout(() => {
            this.dialogue.start(
                'Bốn năm đã trôi qua...',
                '',
                null,
                () => {
                    this.dialogue.start(
                        'Có điều gì đó tôi muốn nói với bà...',
                        'Hải',
                        null,
                        () => {
                            this.dialogue.start(
                                'Anh yêu em. Em sẽ ở bên anh mãi mãi chứ?',
                                'Hải',
                                null,
                                () => {
                                    this.state = 'choice';
                                    this.showChoice();
                                }
                            );
                        }
                    );
                }
            );
        }, 1000);
    }

    exit() {
        super.exit();
    }

    showChoice() {
        this.choice.start(
            ['Đồng ý', 'Từ chối'],
            (index) => {
                this.handleChoice(index);
            }
        );
    }

    handleChoice(choiceIndex) {
        if (choiceIndex === 1) {
            // DECLINE - Trigger glitch!
            this.glitchEffect = true;
            this.glitchTime = 0;
            this.glitchAttempts++;

            // Glitch audio/screen shake happens in update()
            setTimeout(() => {
                this.glitchEffect = false;

                const glitchMessages = [
                    'Babe wtf, em chọn cái gì đấy',
                    'Lỗi: Không thể thao tác',
                    'Anh kí đầu em đấy :)'
                ];

                this.dialogue.start(
                    glitchMessages[Math.min(this.glitchAttempts - 1, glitchMessages.length - 1)],
                    'HỆ THỐNG',
                    null,
                    () => {
                        this.showChoice();
                    }
                );
            }, 500);
        } else {
            // ACCEPT
            this.state = 'accept';
            this.dialogue.start(
                'Vâng! Mãi mãi bên anh!',
                'Bạn',
                null,
                () => {
                    this.kissing = true;
                    setTimeout(() => {
                        this.fadeOut = true;
                    }, 2000);
                }
            );
        }
    }

    update(deltaTime) {
        this.dialogue.update(deltaTime);

        // Firefly animation
        this.fireflies.forEach(firefly => {
            firefly.alpha += firefly.fadeSpeed;
            if (firefly.alpha > 1 || firefly.alpha < 0) {
                firefly.fadeSpeed *= -1;
            }
            firefly.alpha = Math.max(0, Math.min(1, firefly.alpha));
        });

        // Glitch effect timer
        if (this.glitchEffect) {
            this.glitchTime += deltaTime;
        }

        // Fade out transition
        if (this.fadeOut) {
            this.fadeAlpha += deltaTime / 2000;
            if (this.fadeAlpha >= 1) {
                this.game.changeScene(new Arc4_Laptop(this.game));
            }
        }
    }

    handleInput(input) {
        // Handle dialogue
        if (this.dialogue.isActive()) {
            if (input.isKeyPressed(' ') || input.isKeyPressed('z') || input.isKeyPressed('Z') || input.isKeyPressed('Enter')) {
                this.dialogue.skip();
            }
            return;
        }

        // Handle choice
        if (this.choice.isActive()) {
            // Touch/click support
            if (input.touchAction === 'tap') {
                const pos = input.getTouchPosition();
                if (this.choice.handleTouch(pos.x, pos.y)) {
                    input.clearTouchAction();
                    return;
                }
            }

            if (input.isKeyPressed('ArrowUp')) {
                this.choice.moveSelection(-1);
                // this.game.assets.playSound('sfx_select', 0.2);
            }
            if (input.isKeyPressed('ArrowDown')) {
                this.choice.moveSelection(1);
                // this.game.assets.playSound('sfx_select', 0.2);
            }
            if (input.isKeyPressed(' ') || input.isKeyPressed('z') || input.isKeyPressed('Z') || input.isKeyPressed('Enter')) {
                // this.game.assets.playSound('sfx_select', 0.3);
                this.choice.select();
            }
        }
    }

    draw() {
        // Draw background image
        const bgImage = this.game.assets.getImage('bg_park');
        if (bgImage && bgImage.complete) {
            // Enable smooth scaling
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';

            // Draw background scaled to cover entire canvas
            const bgRatio = bgImage.width / bgImage.height;
            const canvasRatio = this.width / this.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (bgRatio > canvasRatio) {
                // Background is wider
                drawHeight = this.height;
                drawWidth = this.height * bgRatio;
                offsetX = (this.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Background is taller
                drawWidth = this.width;
                drawHeight = this.width / bgRatio;
                offsetX = 0;
                offsetY = (this.height - drawHeight) / 2;
            }

            this.ctx.drawImage(bgImage, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Fallback gradient background
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
            gradient.addColorStop(0, '#2C5364');
            gradient.addColorStop(1, '#203A43');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Ground
            this.ctx.fillStyle = '#1A252F';
            this.ctx.fillRect(0, 560, this.width, this.height - 560);
        }

        // Fireflies
        this.fireflies.forEach(firefly => {
            this.ctx.fillStyle = `rgba(255, 255, 0, ${firefly.alpha})`;
            this.ctx.fillRect(firefly.x, firefly.y, 6, 6);
        });

        // Apply glitch effect
        if (this.glitchEffect) {
            // Screen shake
            const shakeX = (Math.random() - 0.5) * 10;
            const shakeY = (Math.random() - 0.5) * 10;
            this.ctx.save();
            this.ctx.translate(shakeX, shakeY);

            // Chromatic aberration (simple red/blue shift)
            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            this.ctx.fillRect(-5, 0, this.width, this.height);
            this.ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
            this.ctx.fillRect(5, 0, this.width, this.height);
            this.ctx.globalCompositeOperation = 'source-over';

            this.ctx.restore();
        }

        // Draw player character using sprite
        if (this.playerSprite) {
            this.playerSprite.draw(
                this.ctx,
                this.playerX,
                this.playerY,
                1.55, // Scale: larger for park scene
                'idle',
                0,
                true // facing right to look at crush
            );
        } else {
            this.drawAdultCharacter(this.playerX, 400, '#E74C3C', false);
        }

        // Draw crush using sprite
        if (this.crushSprite) {
            this.crushSprite.draw(
                this.ctx,
                this.crushX,
                this.crushY, // Use separate Y position for crush
                1.55, // Scale: match player size
                false // facing left to look at player
            );
        } else {
            this.drawAdultCharacter(this.crushX, 400, '#27AE60', false);
        }

        // Kiss animation
        if (this.kissing) {
            // Draw hearts
            this.ctx.fillStyle = '#FF69B4';
            this.ctx.font = '36px Arial';
            this.ctx.textAlign = 'center';
            for (let i = 0; i < 8; i++) {
                const offsetX = (Math.random() - 0.5) * 120;
                const offsetY = Math.random() * 120;
                this.ctx.globalAlpha = Math.random() * 0.8 + 0.2;
                this.ctx.fillText('♥', 560 + offsetX, 240 - offsetY);
            }
            this.ctx.globalAlpha = 1;
            this.ctx.textAlign = 'left';
        }

        // Draw dialogue and choices
        this.dialogue.draw();
        this.choice.draw();

        // Glitch overlay text
        if (this.glitchEffect) {
            this.ctx.fillStyle = '#FF0000';
            this.ctx.font = 'bold 48px "Quicksand"';
            this.ctx.textAlign = 'center';
            this.ctx.shadowColor = '#000';
            this.ctx.shadowBlur = 16;
            if (Math.random() > 0.5) {
                this.ctx.fillText('ERROR', this.width / 2, this.height / 2);
            }
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
            this.ctx.textAlign = 'left';
        }

        // Fade out overlay
        if (this.fadeOut) {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    drawAdultCharacter(x, y, color, blush = false) {
        // Body (casual outfit)
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y + 80, 64, 96);

        // Hair
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(x, y + 80, 64, 32);

        // Face
        this.ctx.fillStyle = '#FFDAB9';
        this.ctx.fillRect(x + 8, y + 104, 48, 40);

        // Blush
        if (blush) {
            this.ctx.fillStyle = '#FF69B4';
            this.ctx.fillRect(x + 8, y + 128, 12, 8);
            this.ctx.fillRect(x + 44, y + 128, 12, 8);
        }
    }
}
