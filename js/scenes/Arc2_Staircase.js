// Arc 2: Staircase Encounter - The Crush
class Arc2_Staircase extends Scene {
    constructor(game) {
        super(game);
        this.dialogue = new DialogueBox(this.ctx, this.width, this.height);
        this.choice = new ChoiceBox(this.ctx, this.width, this.height);

        this.state = 'waiting'; // waiting -> crush_enters -> dialogue -> choice -> blush -> fade
        this.playerX = 500; // Moved to the right
        this.playerY = 380; // Add Y position for sprite rendering
        this.crushX = -120;
        this.crushEntering = false;
        this.crushFacingRight = true; // Crush faces right while walking
        this.showHeart = false;
        this.heartY = 240;
        this.heartTime = 0;
        this.heartParticles = []; // Array for multiple heart effects
        this.sparkles = []; // Sparkle particles
        this.blushTime = 0;
        this.fadeOut = false;
        this.fadeAlpha = 0;
        this.stateTimer = 0;

        // Exam popup state
        this.showingExam = false;
        this.examSelected = 0; // 0, 1, or 2 for A, B, C

        // Initialize player sprite
        this.playerSprite = null;
        this.crushSprite = null;
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

        // Auto-start the sequence after a brief pause
        setTimeout(() => {
            this.dialogue.start(
                'Sắp đánh trống vào lớp rồi mà Hải vẫn chưa đến, cậu ấy sắp đi muộn rồi.',
                '',
                null,
                () => {
                    this.state = 'crush_enters';
                    this.crushEntering = true;
                }
            );
        }, 1000);
    }

    exit() {
        super.exit();
    }

    update(deltaTime) {
        this.stateTimer += deltaTime;
        this.dialogue.update(deltaTime);

        // Crush entrance animation
        if (this.crushEntering) {
            this.crushX += 2;
            if (this.crushX > 720) {
                this.crushX = 720;
                this.crushEntering = false;

                // Turn to face left after stopping
                setTimeout(() => {
                    this.crushFacingRight = false;
                }, 300);

                // this.game.assets.playSound('sfx_heartbeat', 0.5);
                this.showHeart = true;

                // Create heart particles
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        this.heartParticles.push({
                            x: this.playerX + 64,
                            y: this.heartY, // Moved down 20px (was -20)
                            velocityY: -0.5 - Math.random() * 0.5,
                            velocityX: (Math.random() - 0.5) * 1.5,
                            opacity: 1,
                            scale: 0.8 + Math.random() * 0.4,
                            life: 0
                        });
                    }, i * 200);
                }

                // Create sparkles
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        this.sparkles.push({
                            x: this.playerX + 32 + (Math.random() - 0.5) * 100,
                            y: this.heartY + 20 + (Math.random() - 0.5) * 60, // Moved down 20px
                            velocityY: -0.3 - Math.random() * 0.3,
                            velocityX: (Math.random() - 0.5) * 0.8,
                            opacity: 1,
                            size: 2 + Math.random() * 3,
                            life: 0
                        });
                    }, i * 100);
                }

                // Show dialogue after crush enters
                setTimeout(() => {
                    this.dialogue.start(
                        'A đây rồi.',
                        '',
                        null,
                        () => {
                            this.dialogue.start(
                                'Hải vẫn đẹp trai như mọi khi. :)))',
                                '',
                                null,
                                () => {
                                    this.dialogue.start(
                                        'Phải giả vờ act cool đến nói chuyện cậu ấy mới được.',
                                        '',
                                        null,
                                        () => {
                                            this.dialogue.start(
                                                'Ơ! Chào bà!',
                                                'Hải',
                                                null,
                                                () => {
                                                    this.state = 'choice';
                                                    this.choice.start(
                                                        ['Hỏi về bài thi tiếng Anh', 'Chào hỏi'],
                                                        (index) => {
                                                            this.handleChoice(index);
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }, 500);
            }
        }

        // Floating heart animation
        if (this.showHeart) {
            this.heartTime += deltaTime;
            this.heartY = 240 + Math.sin(this.heartTime / 200) * 6;

            // Update heart particles
            for (let i = this.heartParticles.length - 1; i >= 0; i--) {
                const heart = this.heartParticles[i];
                heart.y += heart.velocityY;
                heart.x += heart.velocityX;
                heart.life += deltaTime;
                heart.opacity = Math.max(0, 1 - heart.life / 2000);

                // Remove dead particles
                if (heart.opacity <= 0) {
                    this.heartParticles.splice(i, 1);
                }
            }

            // Update sparkles
            for (let i = this.sparkles.length - 1; i >= 0; i--) {
                const sparkle = this.sparkles[i];
                sparkle.y += sparkle.velocityY;
                sparkle.x += sparkle.velocityX;
                sparkle.life += deltaTime;
                sparkle.opacity = Math.max(0, 1 - sparkle.life / 1500);

                // Remove dead sparkles
                if (sparkle.opacity <= 0) {
                    this.sparkles.splice(i, 1);
                }
            }
        }

        // Blush effect
        if (this.state === 'blush') {
            this.blushTime += deltaTime;
            if (this.blushTime > 2000) {
                this.state = 'fade';
                this.fadeOut = true;
            }
        }

        // Fade out transition
        if (this.fadeOut) {
            this.fadeAlpha += deltaTime / 2000;
            if (this.fadeAlpha >= 1) {
                this.game.changeScene(new Arc3_Park(this.game));
            }
        }
    }

    handleChoice(choiceIndex) {
        if (choiceIndex === 0) {
            // Ask about English exam - player asks Hai for help
            this.dialogue.start(
                'Hải ơi, tôi có câu hỏi khó về bài thi tiếng Anh, ông giúp tôi được không?',
                'Bạn',
                null,
                () => {
                    this.dialogue.start(
                        'Ừm được chứ, để tôi xem nào.',
                        'Hải',
                        null,
                        () => {
                            this.showingExam = true;
                        }
                    );
                }
            );
        } else {
            // Say Hello - leads to asking about exam
            this.dialogue.start(
                'Chào Hải! Hôm nay trông ông vui vẻ nhỉ~',
                'Bạn',
                null,
                () => {
                    this.dialogue.start(
                        'Chào bà! Hehe có gì vui đâu~',
                        'Hải',
                        null,
                        () => {
                            this.dialogue.start(
                                'À mà này, tôi có câu hỏi khó về bài thi tiếng Anh, ông giúp tôi được không?',
                                'Bạn',
                                null,
                                () => {
                                    this.dialogue.start(
                                        'Ồ được chứ, để tôi xem.',
                                        'Hải',
                                        null,
                                        () => {
                                            this.showingExam = true;
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    }

    handleExamChoice(answer) {
        this.showingExam = false;
        // All answers lead to same outcome - confession accepted!
        const responses = [
            'Vậy là bà có câu trả lời rồi nhé 💕',
            'Vậy là bà có câu trả lời rồi nhé 💕',
            'Vậy là bà có câu trả lời rồi nhé 💕'
        ];

        this.dialogue.start(
            responses[Math.floor(Math.random() * responses.length)],
            'Hải',
            null,
            () => {
                this.dialogue.start(
                    'E hehe... >//<',
                    'Bạn',
                    null,
                    () => {
                        this.state = 'blush';
                    }
                );
            }
        );
    }

    handleInput(input) {
        // Handle exam popup
        if (this.showingExam) {
            if (input.isKeyPressed('ArrowUp')) {
                this.examSelected = Math.max(0, this.examSelected - 1);
                // this.game.assets.playSound('sfx_select', 0.2);
            }
            if (input.isKeyPressed('ArrowDown')) {
                this.examSelected = Math.min(2, this.examSelected + 1);
                // this.game.assets.playSound('sfx_select', 0.2);
            }
            if (input.isKeyPressed(' ') || input.isKeyPressed('z') || input.isKeyPressed('Z') || input.isKeyPressed('Enter')) {
                // this.game.assets.playSound('sfx_select', 0.3);
                this.handleExamChoice(this.examSelected);
            }
            return;
        }

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
        const bgImage = this.game.assets.getImage('bg_staircase');
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
            // Fallback background
            this.ctx.fillStyle = '#EAEAEA';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Floor
            this.ctx.fillStyle = '#D3D3D3';
            this.ctx.fillRect(0, 560, this.width, this.height - 560);
        }

        // Draw player using sprite
        if (this.playerSprite) {
            this.playerSprite.draw(
                this.ctx,
                this.playerX,
                this.playerY,
                0.65, // Scale: 1024x1536 down to ~256x384
                'idle',
                0,
                true // facing left (default)
            );

            // Draw blush effect if needed
            if (this.state === 'blush') {
                this.ctx.fillStyle = 'rgba(255, 105, 180, 0.6)';
                // Adjusted position: left blush right 3px, both down 5px
                this.ctx.fillRect(this.playerX + 38, this.playerY + 55, 20, 12);
                this.ctx.fillRect(this.playerX + 95, this.playerY + 55, 20, 12);
            }
        } else {
            // Fallback to original character drawing
            this.drawCharacter(this.playerX, 400, '#3498DB', this.state === 'blush');
        }

        // Draw crush (if entered)
        if (this.crushX > -120) {
            if (this.crushSprite) {
                this.crushSprite.draw(
                    this.ctx,
                    this.crushX,
                    this.playerY,
                    0.65, // Scale: match player size
                    this.crushFacingRight // Changes from right to left after walking
                );
            } else {
                this.drawCharacter(this.crushX, 400, '#2ECC71', false);
            }
        }

        // Draw enhanced heart effect
        if (this.showHeart) {
            // Draw main floating heart with pulse effect
            const pulseScale = 1 + Math.sin(this.heartTime / 150) * 0.15;
            this.ctx.save();
            this.ctx.translate(this.playerX + 64, this.heartY + 20); // Moved down 20px
            this.ctx.scale(pulseScale, pulseScale);
            this.ctx.fillStyle = '#FF1493';
            this.ctx.font = 'bold 48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Glow effect
            this.ctx.shadowColor = '#FF69B4';
            this.ctx.shadowBlur = 20;
            this.ctx.fillText('♥', 0, 0);

            // Inner highlight
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = '#FFB6C1';
            this.ctx.font = 'bold 36px Arial';
            this.ctx.fillText('♥', 0, 0);
            this.ctx.restore();

            // Draw heart particles
            this.heartParticles.forEach(heart => {
                this.ctx.save();
                this.ctx.globalAlpha = heart.opacity;
                this.ctx.translate(heart.x, heart.y);
                this.ctx.scale(heart.scale, heart.scale);
                this.ctx.fillStyle = '#FF69B4';
                this.ctx.font = 'bold 32px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('♥', 0, 0);
                this.ctx.restore();
            });

            // Draw sparkles
            this.sparkles.forEach(sparkle => {
                this.ctx.save();
                this.ctx.globalAlpha = sparkle.opacity;
                this.ctx.fillStyle = '#FFD700';
                this.ctx.shadowColor = '#FFF';
                this.ctx.shadowBlur = 8;
                this.ctx.beginPath();
                this.ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
                this.ctx.fill();

                // Star sparkle
                this.ctx.fillStyle = '#FFF';
                this.ctx.fillRect(sparkle.x - sparkle.size * 1.5, sparkle.y - 0.5, sparkle.size * 3, 1);
                this.ctx.fillRect(sparkle.x - 0.5, sparkle.y - sparkle.size * 1.5, 1, sparkle.size * 3);
                this.ctx.restore();
            });

            // Reset text align
            this.ctx.textAlign = 'left';
            this.ctx.shadowBlur = 0;
        }

        // Draw dialogue and choices
        this.dialogue.draw();
        this.choice.draw();

        // Draw exam popup
        if (this.showingExam) {
            this.drawExamPopup();
        }

        // Fade out overlay
        if (this.fadeOut) {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    drawExamPopup() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Paper background
        const paperX = this.width / 2 - 300;
        const paperY = this.height / 2 - 250;
        const paperWidth = 600;
        const paperHeight = 500;

        // Paper shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(paperX + 8, paperY + 8, paperWidth, paperHeight);

        // Paper
        this.ctx.fillStyle = '#F5F5DC'; // Beige paper color
        this.ctx.fillRect(paperX, paperY, paperWidth, paperHeight);

        // Paper lines (notebook style)
        this.ctx.strokeStyle = '#E0E0E0';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 15; i++) {
            const lineY = paperY + 80 + i * 30;
            this.ctx.beginPath();
            this.ctx.moveTo(paperX + 40, lineY);
            this.ctx.lineTo(paperX + paperWidth - 40, lineY);
            this.ctx.stroke();
        }

        // Red margin line
        this.ctx.strokeStyle = '#FF6B6B';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(paperX + 60, paperY + 40);
        this.ctx.lineTo(paperX + 60, paperY + paperHeight - 40);
        this.ctx.stroke();

        // Header
        this.ctx.fillStyle = '#2C3E50';
        this.ctx.font = 'bold 28px "Quicksand"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BÀI KIỂM TRA TIẾNG ANH', this.width / 2, paperY + 50);

        // Underline
        this.ctx.strokeStyle = '#2C3E50';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(paperX + 150, paperY + 60);
        this.ctx.lineTo(paperX + paperWidth - 150, paperY + 60);
        this.ctx.stroke();

        // Question
        this.ctx.fillStyle = '#E74C3C';
        this.ctx.font = 'bold 32px "Quicksand"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Will you become my valentine? 💕', this.width / 2, paperY + 140);

        // Answer choices
        const choices = [
            'A. Có',
            'B. Đương nhiên rồi',
            'C. Tất cả đáp án trên'
        ];

        this.ctx.font = '24px "Quicksand"';
        choices.forEach((choice, index) => {
            const choiceY = paperY + 220 + index * 60;
            const isSelected = this.examSelected === index;

            // Choice background (if selected)
            if (isSelected) {
                this.ctx.fillStyle = 'rgba(255, 182, 193, 0.3)';
                this.ctx.fillRect(paperX + 80, choiceY - 30, paperWidth - 160, 50);
            }

            // Checkbox
            this.ctx.strokeStyle = '#2C3E50';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(paperX + 100, choiceY - 20, 30, 30);

            // Checkmark (if selected)
            if (isSelected) {
                this.ctx.strokeStyle = '#E74C3C';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.moveTo(paperX + 105, choiceY - 5);
                this.ctx.lineTo(paperX + 112, choiceY + 5);
                this.ctx.lineTo(paperX + 125, choiceY - 10);
                this.ctx.stroke();
            }

            // Choice text
            this.ctx.fillStyle = isSelected ? '#E74C3C' : '#2C3E50';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(choice, paperX + 145, choiceY);
        });

        // Instructions
        this.ctx.fillStyle = '#7F8C8D';
        this.ctx.font = '18px "Quicksand"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('↑↓ để chọn | Space/Enter để xác nhận', this.width / 2, paperY + paperHeight - 30);

        // Heart doodles
        this.ctx.fillStyle = '#FF69B4';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('♥', paperX + 50, paperY + 150);
        this.ctx.fillText('♥', paperX + paperWidth - 50, paperY + 150);
        this.ctx.fillText('♥', paperX + paperWidth - 70, paperY + 450);

        this.ctx.textAlign = 'left';
    }

    drawCharacter(x, y, color, blush = false) {
        // Body
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y + 80, 64, 80);

        // Hair
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(x, y + 80, 64, 24);

        // Face
        this.ctx.fillStyle = '#FFDAB9';
        this.ctx.fillRect(x + 8, y + 104, 48, 32);

        // Blush
        if (blush) {
            this.ctx.fillStyle = '#FF69B4';
            this.ctx.fillRect(x + 8, y + 120, 12, 8);
            this.ctx.fillRect(x + 44, y + 120, 12, 8);
        }

        // Uniform
        this.ctx.fillStyle = '#34495E';
        this.ctx.fillRect(x, y + 136, 64, 24);
    }
}
