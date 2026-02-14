// Input Handler - Keyboard and Touch state management
class InputHandler {
    constructor(canvas) {
        this.keys = {};
        this.keysPressed = {}; // For one-time key press detection
        this.canvas = canvas;
        this.touchAction = null; // For touch/click actions
        this.lastTouchX = 0;
        this.lastTouchY = 0;

        window.addEventListener('keydown', (e) => {
            if (!this.keys[e.key]) {
                this.keysPressed[e.key] = true;
            }
            this.keys[e.key] = true;

            // Prevent default for game keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'z', 'Z', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Touch and click support for mobile
        const handleTouch = (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;

            const touch = e.touches ? e.touches[0] : e;
            this.lastTouchX = (touch.clientX - rect.left) * scaleX;
            this.lastTouchY = (touch.clientY - rect.top) * scaleY;

            // Simulate Space/Enter press for advancing dialogue
            this.keysPressed[' '] = true;
            this.keysPressed['Enter'] = true;
            this.touchAction = 'tap';
        };

        this.canvas.addEventListener('touchstart', handleTouch, { passive: false });
        this.canvas.addEventListener('click', handleTouch);
        this.canvas.addEventListener('touchend', (e) => e.preventDefault(), { passive: false });

        // Konami code detection
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiProgress = 0;
        this.konamiActivated = false;
    }

    getTouchPosition() {
        return { x: this.lastTouchX, y: this.lastTouchY };
    }

    clearTouchAction() {
        this.touchAction = null;
    }

    isKeyDown(key) {
        return this.keys[key] === true;
    }

    isKeyPressed(key) {
        const pressed = this.keysPressed[key];
        this.keysPressed[key] = false; // Clear after reading
        return pressed === true;
    }

    checkKonami(key) {
        if (key === this.konamiCode[this.konamiProgress]) {
            this.konamiProgress++;
            if (this.konamiProgress === this.konamiCode.length) {
                this.konamiActivated = true;
                this.konamiProgress = 0;
                return true;
            }
        } else {
            this.konamiProgress = 0;
        }
        return false;
    }

    reset() {
        this.keysPressed = {};
    }
}
