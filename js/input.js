// Input Handler - Keyboard state management
class InputHandler {
    constructor() {
        this.keys = {};
        this.keysPressed = {}; // For one-time key press detection

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

        // Konami code detection
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiProgress = 0;
        this.konamiActivated = false;
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
