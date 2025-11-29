/**
 * Morse Code Audio Generator using Web Audio API
 * Generates audio signals for dots (dits) and dashes (dahs)
 */
export class MorseAudio {
    constructor(wpm = 20, frequency = 700, farnsworth = null) {
        this.wpm = wpm;
        this.frequency = frequency;
        this.farnsworth = farnsworth || wpm; // Farnsworth WPM for spacing
        this.audioContext = null;
        this.initAudioContext();
        this.calculateTimings();
    }

    initAudioContext() {
        if (!this.audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        }
    }

    calculateTimings() {
        // Calculate timing based on WPM
        // PARIS standard: 50 dots per word
        const dotDuration = (1.2 / this.wpm) * 1000; // in milliseconds
        const dashDuration = dotDuration * 3;
        const gapDuration = dotDuration; // gap between dots/dashes within a letter
        const letterGapDuration = (dotDuration * 3);
        const wordGapDuration = (dotDuration * 7);

        // For Farnsworth timing (slower spacing, faster characters)
        const farnsworthDotDuration = (1.2 / this.farnsworth) * 1000;
        
        this.timings = {
            dot: dotDuration,
            dash: dashDuration,
            gap: gapDuration,
            letterGap: letterGapDuration,
            wordGap: wordGapDuration,
            farnsworthDot: farnsworthDotDuration
        };
    }

    updateSettings(wpm, frequency) {
        this.wpm = wpm;
        this.frequency = frequency;
        this.calculateTimings();
    }

    /**
     * Play a dot (dit) - short beep
     */
    async playDot() {
        return this.playTone(this.timings.dot);
    }

    /**
     * Play a dash (dah) - long beep
     */
    async playDash() {
        return this.playTone(this.timings.dash);
    }

    /**
     * Play a tone with given duration
     * Authentic CW (Continuous Wave) sound with proper keying
     */
    async playTone(duration) {
        return new Promise((resolve) => {
            this.initAudioContext();
            
            const now = this.audioContext.currentTime;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = this.frequency;
            oscillator.type = 'sine';

            // CW-authentic envelope with smooth keying
            const durationSec = duration / 1000;
            const riseTime = 0.003;  // 3ms rise (authentic CW keying click)
            const fallTime = 0.003;  // 3ms fall (authentic CW keying click)
            
            // Start at 0
            gainNode.gain.setValueAtTime(0, now);
            
            // Quick rise to full volume (authentic CW "click" on key down)
            gainNode.gain.linearRampToValueAtTime(0.5, now + riseTime);
            
            // Sustain at full volume
            gainNode.gain.setValueAtTime(0.5, now + durationSec - fallTime);
            
            // Quick fall to 0 (authentic CW "click" on key up)
            gainNode.gain.linearRampToValueAtTime(0, now + durationSec);

            oscillator.start(now);
            oscillator.stop(now + durationSec);

            setTimeout(resolve, duration);
        });
    }

    /**
     * Play Morse code for a single character
     */
    async playCharacter(char) {
        const morseCode = this.getMorseCode(char.toUpperCase());
        if (!morseCode) return;

        for (let i = 0; i < morseCode.length; i++) {
            if (morseCode[i] === '.') {
                await this.playDot();
            } else if (morseCode[i] === '-') {
                await this.playDash();
            }

            // Gap between dots/dashes
            if (i < morseCode.length - 1) {
                await this.sleep(this.timings.gap);
            }
        }
    }

    /**
     * Play Morse code for a word
     */
    async playWord(word) {
        for (let i = 0; i < word.length; i++) {
            await this.playCharacter(word[i]);
            
            // Gap between characters
            if (i < word.length - 1) {
                await this.sleep(this.timings.letterGap);
            }
        }
    }

    /**
     * Play multiple characters with word gaps
     */
    async playSequence(chars) {
        const words = chars.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            await this.playWord(words[i]);
            
            // Word gap
            if (i < words.length - 1) {
                await this.sleep(this.timings.wordGap);
            }
        }
    }

    /**
     * Get Morse code representation of a character
     */
    getMorseCode(char) {
        const morseCode = {
            'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
            'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
            'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
            'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
            'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
            'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
            'Y': '-.--',  'Z': '--..',
            '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.',
            '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
            '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
            '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
            '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
            '$': '...-..-', '@': '.--.-.'
        };
        
        return morseCode[char] || null;
    }

    /**
     * Get all Morse code pairs
     */
    getAllMorsePairs() {
        return {
            'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
            'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
            'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
            'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
            'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
            'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
            'Y': '-.--',  'Z': '--..',
            '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.'
        };
    }

    /**
     * Utility to sleep for given milliseconds
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Stop any currently playing audio
     */
    stop() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.initAudioContext();
        }
    }
}

export default MorseAudio;
