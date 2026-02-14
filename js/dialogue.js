// Dialogue System - Typewriter effect and dialogue boxes
class DialogueBox {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.active = false;
        this.text = '';
        this.displayedText = '';
        this.charIndex = 0;
        this.speed = 50; // ms per character
        this.lastCharTime = 0;
        this.finished = false;
        this.callback = null;
        this.portrait = null;
        this.speakerName = '';
    }

    start(text, speakerName = '', portrait = null, callback = null) {
        this.active = true;
        this.text = text;
        this.displayedText = '';
        this.charIndex = 0;
        this.finished = false;
        this.lastCharTime = Date.now();
        this.callback = callback;
        this.portrait = portrait;
        this.speakerName = speakerName;
        this.speed = 30; // Faster, smoother typewriter
    }

    update(deltaTime) {
        if (!this.active || this.finished) return;

        const now = Date.now();
        if (now - this.lastCharTime > this.speed) {
            if (this.charIndex < this.text.length) {
                this.displayedText += this.text[this.charIndex];
                this.charIndex++;
                this.lastCharTime = now;
            } else {
                this.finished = true;
            }
        }
    }

    skip() {
        if (!this.active) return;

        if (!this.finished) {
            // Fast-forward to end
            this.displayedText = this.text;
            this.charIndex = this.text.length;
            this.finished = true;
        } else {
            // Close dialogue
            this.active = false;
            if (this.callback) {
                this.callback();
            }
        }
    }

    draw() {
        if (!this.active) return;

        const boxHeight = 140;
        const boxY = this.height - boxHeight - 30;
        const padding = 30;
        const borderRadius = 16;

        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.roundRect(30, boxY + 5, this.width - 60, boxHeight, borderRadius);
        this.ctx.fill();

        // Draw text box background with gradient
        const gradient = this.ctx.createLinearGradient(0, boxY, 0, boxY + boxHeight);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        gradient.addColorStop(1, 'rgba(250, 250, 255, 0.98)');
        this.ctx.fillStyle = gradient;
        this.roundRect(30, boxY, this.width - 60, boxHeight, borderRadius);
        this.ctx.fill();

        // Draw subtle border
        this.ctx.strokeStyle = 'rgba(100, 100, 150, 0.3)';
        this.ctx.lineWidth = 2;
        this.roundRect(30, boxY, this.width - 60, boxHeight, borderRadius);
        this.ctx.stroke();

        // Draw speaker name
        if (this.speakerName) {
            this.ctx.fillStyle = '#667eea';
            this.ctx.font = 'bold 16px "Quicksand"';
            this.ctx.fillText(this.speakerName, padding + 20, boxY + padding + 6);
        }

        // Draw dialogue text
        this.ctx.fillStyle = '#333';
        this.ctx.font = '18px "Quicksand"';

        // Word wrap
        const maxWidth = this.width - 120;
        const lineHeight = 26;
        let yOffset = this.speakerName ? boxY + padding + 36 : boxY + padding + 16;

        const words = this.displayedText.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = this.ctx.measureText(testLine);

            if (metrics.width > maxWidth && i > 0) {
                this.ctx.fillText(line, padding + 20, yOffset);
                line = words[i] + ' ';
                yOffset += lineHeight;
            } else {
                line = testLine;
            }
        }
        this.ctx.fillText(line, padding + 20, yOffset);

        // Draw continue indicator (modern animated dot)
        if (this.finished) {
            const pulse = Math.sin(Date.now() / 300) * 0.3 + 0.7;
            this.ctx.fillStyle = `rgba(102, 126, 234, ${pulse})`;
            this.ctx.font = '20px "Quicksand"';
            this.ctx.fillText('▼', this.width - 60, boxY + boxHeight - 30);
        }
    }

    // Helper function for rounded rectangles
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

    isActive() {
        return this.active;
    }

    isFinished() {
        return this.finished;
    }
}

// Choice System
class ChoiceBox {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.active = false;
        this.choices = [];
        this.selectedIndex = 0;
        this.callback = null;
    }

    start(choices, callback) {
        this.active = true;
        this.choices = choices;
        this.selectedIndex = 0;
        this.callback = callback;
    }

    moveSelection(direction) {
        if (!this.active) return;

        this.selectedIndex += direction;
        if (this.selectedIndex < 0) this.selectedIndex = this.choices.length - 1;
        if (this.selectedIndex >= this.choices.length) this.selectedIndex = 0;
    }

    select() {
        if (!this.active) return;

        this.active = false;
        if (this.callback) {
            this.callback(this.selectedIndex);
        }
    }

    handleTouch(touchX, touchY) {
        if (!this.active) return false;

        const boxWidth = 450;
        const buttonHeight = 55;
        const buttonSpacing = 16;
        const boxHeight = this.choices.length * (buttonHeight + buttonSpacing) + 50;
        const boxX = (this.width - boxWidth) / 2;
        const boxY = (this.height - boxHeight) / 2;

        // Check each choice button
        this.choices.forEach((choice, index) => {
            const btnY = boxY + 30 + (index * (buttonHeight + buttonSpacing));
            const btnX = boxX + 25;
            const btnWidth = boxWidth - 50;

            // Check if touch is within button bounds
            if (touchX >= btnX && touchX <= btnX + btnWidth &&
                touchY >= btnY && touchY <= btnY + buttonHeight) {
                this.selectedIndex = index;
                this.select();
            }
        });

        return true; // Touch was handled
    }

    draw() {
        if (!this.active) return;

        const boxWidth = 450;
        const buttonHeight = 55;
        const buttonSpacing = 16;
        const boxHeight = this.choices.length * (buttonHeight + buttonSpacing) + 50;
        const boxX = (this.width - boxWidth) / 2;
        const boxY = (this.height - boxHeight) / 2;
        const borderRadius = 20;

        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.roundRect(boxX + 2, boxY + 4, boxWidth, boxHeight, borderRadius);
        this.ctx.fill();

        // Draw background
        const gradient = this.ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        gradient.addColorStop(1, 'rgba(245, 245, 250, 0.98)');
        this.ctx.fillStyle = gradient;
        this.roundRect(boxX, boxY, boxWidth, boxHeight, borderRadius);
        this.ctx.fill();

        // Draw border
        this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
        this.ctx.lineWidth = 2;
        this.roundRect(boxX, boxY, boxWidth, boxHeight, borderRadius);
        this.ctx.stroke();

        // Draw choices as modern buttons
        this.ctx.font = '20px "Quicksand"';
        this.ctx.textAlign = 'center';

        this.choices.forEach((choice, index) => {
            const btnY = boxY + 30 + (index * (buttonHeight + buttonSpacing));
            const btnX = boxX + 25;
            const btnWidth = boxWidth - 50;
            const btnRadius = 12;

            if (index === this.selectedIndex) {
                // Selected button - gradient fill
                const btnGradient = this.ctx.createLinearGradient(btnX, btnY, btnX, btnY + buttonHeight);
                btnGradient.addColorStop(0, '#667eea');
                btnGradient.addColorStop(1, '#764ba2');
                this.ctx.fillStyle = btnGradient;
                this.roundRect(btnX, btnY, btnWidth, buttonHeight, btnRadius);
                this.ctx.fill();

                // Button border
                this.ctx.strokeStyle = '#667eea';
                this.ctx.lineWidth = 3;
                this.roundRect(btnX, btnY, btnWidth, buttonHeight, btnRadius);
                this.ctx.stroke();

                // Text
                this.ctx.fillStyle = '#fff';
                this.ctx.font = 'bold 20px "Quicksand"';
            } else {
                // Unselected button
                this.ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
                this.roundRect(btnX, btnY, btnWidth, buttonHeight, btnRadius);
                this.ctx.fill();

                this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
                this.ctx.lineWidth = 2;
                this.roundRect(btnX, btnY, btnWidth, buttonHeight, btnRadius);
                this.ctx.stroke();

                // Text
                this.ctx.fillStyle = '#667eea';
                this.ctx.font = '20px "Quicksand"';
            }

            this.ctx.fillText(choice, boxX + boxWidth / 2, btnY + 35);
        });

        this.ctx.textAlign = 'left';
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

    isActive() {
        return this.active;
    }
}
