// Arc 1: School Gate - The Beginning
class Arc1_School extends Scene {
    constructor(game) {
        super(game);
        this.dialogue = new DialogueBox(this.ctx, this.width, this.height);
        this.choice = new ChoiceBox(this.ctx, this.width, this.height);
        this.playerX = 1100; // Start from right side
        this.playerY = 500; // Bottom of screen for 720px height
        this.walking = false;
        this.facingRight = false; // Facing left by default
        this.frame = 0;
        this.frameTime = 0;
        this.inTriggerZone = false; // Track if player is in trigger zone
        this.choiceShown = false; // Track if choice is currently shown
        this.fadeOut = false;
        this.fadeAlpha = 0;
        this.cherryBlossoms = [];

        // Initialize player sprite
        this.playerSprite = null;

        // Initialize cherry blossom particles
        for (let i = 0; i < 50; i++) {
            this.cherryBlossoms.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                speed: 0.4 + Math.random() * 0.5,
                sway: Math.random() * 3,
                size: 4 + Math.random() * 8,
                opacity: 0.3 + Math.random() * 0.5,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }

    enter() {
        super.enter();

        // Create player sprite
        const playerImage = this.game.assets.getImage('player');
        console.log('Arc1 - Player image loaded:', playerImage);
        if (playerImage) {
            this.playerSprite = new PlayerSprite(playerImage);
            console.log('Arc1 - PlayerSprite created:', this.playerSprite);
        } else {
            console.warn('Arc1 - Player image not found in assets');
        }
    }

    exit() {
        super.exit();
    }

    update(deltaTime) {
        // Update dialogue
        this.dialogue.update(deltaTime);

        // Update cherry blossoms
        this.cherryBlossoms.forEach(petal => {
            petal.y += petal.speed;
            petal.x += Math.sin(petal.y / 20) * petal.sway;
            petal.rotation += petal.rotationSpeed;

            if (petal.y > this.height + 20) {
                petal.y = -20;
                petal.x = Math.random() * this.width;
            }
        });

        // Walking animation
        if (this.walking && !this.dialogue.isActive()) {
            this.frameTime += deltaTime;
            if (this.frameTime > 150) {
                this.frame = (this.frame + 1) % 4;
                this.frameTime = 0;
            }
        }

        // Fade out transition
        if (this.fadeOut) {
            this.fadeAlpha += deltaTime / 2000;
            if (this.fadeAlpha >= 1) {
                this.game.changeScene(new Arc2_Staircase(this.game));
            }
        }
    }

    handleInput(input) {
        // Handle dialogue interaction
        if (this.dialogue.isActive()) {
            if (input.isKeyPressed(' ') || input.isKeyPressed('z') || input.isKeyPressed('Z') || input.isKeyPressed('Enter')) {
                this.dialogue.skip();
            }
            return;
        }

        // Handle choice interaction
        if (this.choice.isActive()) {
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
            return;
        }

        // Movement
        const movingRight = input.isKeyDown('ArrowRight');
        const movingLeft = input.isKeyDown('ArrowLeft');

        if (movingLeft) {
            this.walking = true;
            this.facingRight = false;
            this.playerX -= 2;

            // Check if entering trigger zone
            if (this.playerX < 600 && this.playerX > 400 && !this.inTriggerZone && !this.choiceShown) {
                this.inTriggerZone = true;
                this.walking = false;
                this.dialogue.start(
                    'Hôm nay mình lại đến trường sớm. Hi vọng Hải chưa đến trường.',
                    '',
                    null,
                    () => {
                        this.dialogue.start(
                            'Cũng phải thôi, nhà mình gần ngay trường thì kiểu gì chả đến trước.',
                            '',
                            null,
                            () => {
                                this.dialogue.start(
                                    'Mình sẽ đợi ở cầu thang để gặp Hải hí hí.',
                                    '',
                                    null,
                                    () => {
                                        // Show choice after dialogue sequence
                                        this.showEnterChoice();
                                    }
                                );
                            }
                        );
                    }
                );
            }

            // Reset trigger when leaving zone (going back right)
            if (this.playerX > 600) {
                this.inTriggerZone = false;
                this.choiceShown = false;
            }

            // Prevent going too far left
            if (this.playerX < 50) this.playerX = 50;
        } else if (movingRight) {
            this.walking = true;
            this.facingRight = true;
            this.playerX += 2;

            // Reset trigger when leaving zone
            if (this.playerX > 600) {
                this.inTriggerZone = false;
                this.choiceShown = false;
            }

            if (this.playerX > 1100) this.playerX = 1100;
        } else {
            this.walking = false;
        }
    }

    showEnterChoice() {
        this.choiceShown = true;
        this.choice.start(
            ['Vô trường', 'La cà xíu'],
            (index) => {
                if (index === 0) {
                    // Vô trường - transition to next scene
                    this.fadeOut = true;
                } else {
                    // La cà xíu - continue walking
                    this.choiceShown = false;
                    this.walking = false;
                }
            }
        );
    }

    draw() {
        // Draw background image
        const bgImage = this.game.assets.getImage('bg_school');
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
            gradient.addColorStop(0, '#FF9A8B');
            gradient.addColorStop(0.5, '#FAD0C4');
            gradient.addColorStop(1, '#2C3E50');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Draw ground
            this.ctx.fillStyle = '#95A5A6';
            this.ctx.fillRect(0, 560, this.width, this.height - 560);

            // Draw school gate silhouette
            this.ctx.fillStyle = '#2C3E50';
            this.ctx.fillRect(1000, 320, 240, 240);
            this.ctx.fillStyle = '#34495E';
            this.ctx.fillRect(1040, 360, 160, 200);
        }

        // Draw cherry blossom petals with rotation and opacity
        this.cherryBlossoms.forEach(petal => {
            this.ctx.save();
            this.ctx.translate(petal.x, petal.y);
            this.ctx.rotate(petal.rotation);
            this.ctx.globalAlpha = petal.opacity;

            // Draw petal shape
            this.ctx.fillStyle = '#FFB6C1';
            this.ctx.fillRect(-petal.size / 2, -petal.size / 2, petal.size, petal.size);

            // Add white highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fillRect(-petal.size / 4, -petal.size / 4, petal.size / 2, petal.size / 2);

            this.ctx.restore();
        });

        // Draw player using sprite
        if (this.playerSprite) {
            this.playerSprite.draw(
                this.ctx,
                this.playerX,
                this.playerY,
                0.35, // Scale: 1024x1536 down to ~256x384
                'idle',
                0,
                this.facingRight
            );
        } else {
            // Fallback to simple rectangle if sprite not loaded
            this.ctx.fillStyle = '#3498DB';
            const bobOffset = this.walking ? Math.sin(this.frame) * 4 : 0;
            this.ctx.fillRect(this.playerX, this.playerY + bobOffset, 64, 80);

            // Hair
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(this.playerX, this.playerY + bobOffset, 64, 24);

            // Face
            this.ctx.fillStyle = '#FFDAB9';
            this.ctx.fillRect(this.playerX + 8, this.playerY + 24 + bobOffset, 48, 32);

            // Uniform
            this.ctx.fillStyle = '#34495E';
            this.ctx.fillRect(this.playerX, this.playerY + 56 + bobOffset, 64, 24);
        }

        // Draw dialogue box and choice box
        this.dialogue.draw();
        this.choice.draw();

        // Draw subtle vignette effect
        const vignette = this.ctx.createRadialGradient(
            this.width / 2, this.height / 2, this.height * 0.3,
            this.width / 2, this.height / 2, this.height * 0.8
        );
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        this.ctx.fillStyle = vignette;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Fade out overlay
        if (this.fadeOut) {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        // Instructions
        if (!this.dialogueTriggered && !this.dialogue.isActive()) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            this.ctx.font = '22px "Quicksand"';
            this.ctx.textAlign = 'center';
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            this.ctx.shadowBlur = 8;
            this.ctx.fillText('Press ← to walk', this.width / 2, 50);
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
            this.ctx.textAlign = 'left';
        }
    }
}
