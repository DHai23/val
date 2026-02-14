// Arc 4: Meta Ending - The Reveal
class Arc4_Laptop extends Scene {
    constructor(game) {
        super(game);
        this.dialogue = new DialogueBox(this.ctx, this.width, this.height);

        this.state = 'intro'; // intro -> reveal -> message -> credits -> letter -> end
        this.fadeIn = true;
        this.fadeAlpha = 1;
        this.characterTurning = false;
        this.turnProgress = 0;
        this.showingMessage = false;
        this.creditsScroll = 0;
        this.creditsStarted = false;
        this.letterTyping = false;
        this.letterText = "Trong mọi vũ trụ, mọi dòng thời gian, dù là trong game hay trong thực tại... Anh sẽ luôn chọn em. Chúc em Valentine vui vẻ.";
        this.letterDisplayed = '';
        this.letterIndex = 0;
        this.letterSpeed = 100;
        this.lastLetterTime = 0;
        this.stateTimer = 0;
    }

    enter() {
        super.enter();

        // Start sequence
        setTimeout(() => {
            this.state = 'reveal';
            this.characterTurning = true;
        }, 2000);
    }

    exit() {
        super.exit();
    }

    update(deltaTime) {
        this.stateTimer += deltaTime;
        this.dialogue.update(deltaTime);

        // Fade in
        if (this.fadeIn && this.fadeAlpha > 0) {
            this.fadeAlpha -= deltaTime / 2000;
            if (this.fadeAlpha <= 0) {
                this.fadeAlpha = 0;
                this.fadeIn = false;
            }
        }

        // Character turning animation
        if (this.characterTurning) {
            this.turnProgress += deltaTime / 1000;
            if (this.turnProgress >= 1) {
                this.turnProgress = 1;
                this.characterTurning = false;
                this.showSystemMessage();
            }
        }

        // Credits scrolling
        if (this.creditsStarted) {
            this.creditsScroll += deltaTime / 50;
        }

        // Letter typing
        if (this.letterTyping) {
            const now = Date.now();
            if (now - this.lastLetterTime > this.letterSpeed && this.letterIndex < this.letterText.length) {
                this.letterDisplayed += this.letterText[this.letterIndex];
                this.letterIndex++;
                this.lastLetterTime = now;
            }
        }
    }

    showSystemMessage() {
        this.showingMessage = true;
        setTimeout(() => {
            // Show system notification style message
            this.dialogue.start(
                'Babe thân mến, đây là món quà valentine anh đã làm cho em.',
                'HỆ THỐNG',
                null,
                () => {
                    this.dialogue.start(
                        'Từng pixel, từng dòng code, từng khoảnh khắc... tất cả đều để bày tỏ suy nghĩ của anh cho em.',
                        'HỆ THỐNG',
                        null,
                        () => {
                            this.state = 'credits';
                            this.creditsStarted = true;

                            setTimeout(() => {
                                this.state = 'letter';
                                this.creditsStarted = false;
                                this.letterTyping = true;
                                this.lastLetterTime = Date.now();
                            }, 8000);
                        }
                    );
                }
            );
        }, 500);
    }

    handleInput(input) {
        // Handle dialogue
        if (this.dialogue.isActive()) {
            if (input.isKeyPressed(' ') || input.isKeyPressed('z') || input.isKeyPressed('Z') || input.isKeyPressed('Enter')) {
                this.dialogue.skip();
            }
        }

        // Skip credits
        if (this.creditsStarted && (input.isKeyPressed(' ') || input.isKeyPressed('Enter'))) {
            this.state = 'letter';
            this.creditsStarted = false;
            this.letterTyping = true;
            this.lastLetterTime = Date.now();
        }
    }

    draw() {
        // Draw background image
        const bgImage = this.game.assets.getImage('bg_room');
        if (bgImage && bgImage.complete && this.state !== 'credits' && this.state !== 'letter') {
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
            this.ctx.fillStyle = '#1A1A2E';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.drawRoom();
        }

        // Draw dialogue (for all states except letter)
        if (this.state !== 'letter') {
            this.dialogue.draw();

            // System notification overlay
            if (this.showingMessage) {
                this.drawSystemNotification();
            }
        }

        // Credits scene
        if (this.state === 'credits') {
            this.drawCredits();
        }

        // Letter scene
        if (this.state === 'letter') {
            this.drawLetter();
        }

        // Fade in overlay
        if (this.fadeIn) {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    drawRoom() {
        // Desk
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(320, 480, 640, 240);

        // Laptop
        this.ctx.fillStyle = '#2C3E50';
        this.ctx.fillRect(560, 400, 240, 160);

        // Laptop screen (glowing)
        const screenGradient = this.ctx.createLinearGradient(580, 420, 580, 540);
        screenGradient.addColorStop(0, '#3498DB');
        screenGradient.addColorStop(1, '#2980B9');
        this.ctx.fillStyle = screenGradient;
        this.ctx.fillRect(580, 420, 200, 120);

        // Laptop glow
        this.ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
        this.ctx.fillRect(540, 380, 280, 200);

        // Wall decorations
        this.ctx.fillStyle = '#E74C3C';
        this.ctx.fillRect(80, 120, 120, 160); // Picture frame

        this.ctx.fillStyle = '#16A085';
        this.ctx.fillRect(1080, 160, 100, 140); // Another frame
    }

    drawCharacterAtDesk() {
        const x = 640;
        const y = 360;

        // Character sitting
        this.ctx.fillStyle = '#9B59B6';
        this.ctx.fillRect(x - 32, y, 64, 80);

        // Hair
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(x - 32, y, 64, 24);

        // Face (turning effect)
        if (this.turnProgress > 0) {
            const faceWidth = 48 + (16 * this.turnProgress);
            this.ctx.fillStyle = '#FFDAB9';
            this.ctx.fillRect(x - 24, y + 24, faceWidth, 32);

            // Eyes looking at camera
            if (this.turnProgress > 0.5) {
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(x - 16, y + 32, 8, 8);
                this.ctx.fillRect(x + 8, y + 32, 8, 8);
            }
        } else {
            // Face looking at screen
            this.ctx.fillStyle = '#FFDAB9';
            this.ctx.fillRect(x - 24, y + 24, 48, 32);
        }
    }

    drawSystemNotification() {
        const boxWidth = 240;
        const boxHeight = 55;
        const boxX = (this.width - boxWidth) / 2;
        const boxY = 30;
        const radius = 8;

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.roundRect(boxX + 2, boxY + 2, boxWidth, boxHeight, radius);
        this.ctx.fill();

        // Notification background with gradient
        const gradient = this.ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        this.ctx.fillStyle = gradient;
        this.roundRect(boxX, boxY, boxWidth, boxHeight, radius);
        this.ctx.fill();

        // Border
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.roundRect(boxX, boxY, boxWidth, boxHeight, radius);
        this.ctx.stroke();

        // Title
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 13px "Quicksand"';
        this.ctx.fillText('💌 Tin nhắn hệ thống', boxX + 15, boxY + 20);

        // Divider line
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(boxX + 15, boxY + 26);
        this.ctx.lineTo(boxX + boxWidth - 15, boxY + 26);
        this.ctx.stroke();
    }

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

    drawCredits() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Credits box
        const boxWidth = 700;
        const boxHeight = 550;
        const boxX = (this.width - boxWidth) / 2;
        const boxY = (this.height - boxHeight) / 2;
        const borderRadius = 20;

        // Box shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.roundRect(boxX + 5, boxY + 5, boxWidth, boxHeight, borderRadius);
        this.ctx.fill();

        // Box background with gradient
        const boxGradient = this.ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
        boxGradient.addColorStop(0, 'rgba(102, 126, 234, 0.95)');
        boxGradient.addColorStop(1, 'rgba(118, 75, 162, 0.95)');
        this.ctx.fillStyle = boxGradient;
        this.roundRect(boxX, boxY, boxWidth, boxHeight, borderRadius);
        this.ctx.fill();

        // Box border
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 3;
        this.roundRect(boxX, boxY, boxWidth, boxHeight, borderRadius);
        this.ctx.stroke();

        // Credits content
        const credits = [
            'Valentine Pixel Story (Supported with AI)',
            '',
            'Lập trình bởi:',
            'Người yêu em',
            '',
            'Đồ họa bởi:',
            'Cũng anh luôn',
            '(Anh đã cố gắng hết sức)',
            '',
            'Vai chính:',
            'Em',
            '',
            'Cảm ơn đặc biệt:',
            'Mọi khoảnh khắc chúng mình đã chia sẻ',
            '',
            'Cảm ơn em đã chơi'
        ];

        this.ctx.textAlign = 'center';

        // Calculate starting Y position to center credits in box
        const lineHeight = 32;
        const totalHeight = credits.length * lineHeight;
        const startY = boxY + (boxHeight - totalHeight) / 2 + 20;

        credits.forEach((line, index) => {
            const y = startY + (index * lineHeight);

            // Determine font style based on content
            if (line.includes('Valentine Pixel Story')) {
                this.ctx.font = 'bold 32px "Playfair Display"';
                this.ctx.fillStyle = '#fff';
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                this.ctx.shadowBlur = 8;
            } else if (line.includes(':')) {
                this.ctx.font = 'bold 22px "Quicksand"';
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.shadowBlur = 0;
            } else if (line.includes('(')) {
                this.ctx.font = '16px "Quicksand"';
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                this.ctx.shadowBlur = 0;
            } else {
                this.ctx.font = '20px "Quicksand"';
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.shadowBlur = 0;
            }

            this.ctx.fillText(line, this.width / 2, y);
        });

        this.ctx.shadowBlur = 0;
        this.ctx.textAlign = 'left';

        // Skip instruction at bottom of box
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.font = '18px "Quicksand"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Nhấn ENTER để tiếp tục', this.width / 2, boxY + boxHeight - 25);
        this.ctx.textAlign = 'left';
    }

    drawLetter() {
        // Romantic gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#ffecd2');
        gradient.addColorStop(0.5, '#fcb69f');
        gradient.addColorStop(1, '#ff9a9e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Letter paper effect
        const paperWidth = 280;
        const paperHeight = 150;
        const paperX = (this.width - paperWidth) / 2;
        const paperY = (this.height - paperHeight) / 2;

        // Paper shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(paperX + 3, paperY + 3, paperWidth, paperHeight);

        // Paper background
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fillRect(paperX, paperY, paperWidth, paperHeight);

        // Paper border
        this.ctx.strokeStyle = 'rgba(200, 150, 150, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(paperX, paperY, paperWidth, paperHeight);

        // Letter content
        this.ctx.fillStyle = '#333';
        this.ctx.font = '13px "Quicksand"';
        this.ctx.textAlign = 'center';

        // Word wrap the letter
        const maxWidth = paperWidth - 40;
        const lineHeight = 18;
        const words = this.letterDisplayed.split(' ');
        let line = '';
        let y = paperY + 35;

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = this.ctx.measureText(testLine);

            if (metrics.width > maxWidth && i > 0) {
                this.ctx.fillText(line, this.width / 2, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        this.ctx.fillText(line, this.width / 2, y);

        // Heart decoration
        if (this.letterIndex >= this.letterText.length) {
            this.ctx.fillStyle = '#ff6b9d';
            this.ctx.font = '24px Arial';
            this.ctx.fillText('♥', this.width / 2, y + 35);
        }

        this.ctx.textAlign = 'left';
    }

    drawCharacterAtDesk() {
        const x = 640;
        const y = 360;

        // Character sitting
        this.ctx.fillStyle = '#9B59B6';
        this.ctx.fillRect(x - 32, y, 64, 80);

        // Hair
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(x - 32, y, 64, 24);

        // Face (turning effect)
        if (this.turnProgress > 0) {
            const faceWidth = 48 + (16 * this.turnProgress);
            this.ctx.fillStyle = '#FFDAB9';
            this.ctx.fillRect(x - 24, y + 24, faceWidth, 32);

            // Eyes looking at camera
            if (this.turnProgress > 0.5) {
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(x - 16, y + 32, 8, 8);
                this.ctx.fillRect(x + 8, y + 32, 8, 8);
            }
        } else {
            // Face looking at screen
            this.ctx.fillStyle = '#FFDAB9';
            this.ctx.fillRect(x - 24, y + 24, 48, 32);
        }
    }
}
