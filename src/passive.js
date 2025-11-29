/**
 * Passive Listening Mode - Familiarize with Morse rhythm without cognitive effort
 */
import MorseAudio from './audio.js';

export class PassiveListening {
    constructor() {
        this.morseAudio = new MorseAudio(15, 750);
        this.isPlaying = false;
        this.transcript = '';
        this.commonWords = [
            'THE', 'HELLO', 'MORSE', 'CODE', 'LEARN', 'RADIO', 'OPERATOR',
            'SIGNAL', 'TRANSMISSION', 'COMMUNICATION', 'STATION', 'ECHO',
            'ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'FOXTROT', 'NOVEMBER'
        ];
    }

    initializeUI() {
        const wpmInput = document.getElementById('passiveWpm');
        const freqInput = document.getElementById('passiveFreq');
        const modeSelect = document.getElementById('passiveMode');
        const speedInput = document.getElementById('passiveSpeed');
        const startBtn = document.getElementById('passiveStartBtn');
        const stopBtn = document.getElementById('passiveStopBtn');

        if (wpmInput) {
            wpmInput.addEventListener('input', (e) => {
                document.getElementById('passiveWpmValue').textContent = e.target.value;
                this.morseAudio.updateSettings(parseInt(e.target.value), this.morseAudio.frequency);
            });
        }

        if (freqInput) {
            freqInput.addEventListener('input', (e) => {
                document.getElementById('passiveFreqValue').textContent = e.target.value;
                this.morseAudio.updateSettings(this.morseAudio.wpm, parseInt(e.target.value));
            });
        }

        if (speedInput) {
            speedInput.addEventListener('input', (e) => {
                document.getElementById('passiveSpeedValue').textContent = e.target.value;
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startListening());
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.stopListening());
        }
    }

    async startListening() {
        this.isPlaying = true;
        this.transcript = '';
        document.getElementById('passiveTranscriptText').textContent = '';

        const startBtn = document.getElementById('passiveStartBtn');
        const stopBtn = document.getElementById('passiveStopBtn');
        if (startBtn) startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-block';

        while (this.isPlaying) {
            const mode = document.getElementById('passiveMode').value;
            const speed = parseInt(document.getElementById('passiveSpeed').value);

            let char = '';
            if (mode === 'random-letters') {
                char = this.getRandomLetter();
            } else if (mode === 'random-numbers') {
                char = this.getRandomNumber();
            } else if (mode === 'mixed') {
                char = Math.random() < 0.7 ? this.getRandomLetter() : this.getRandomNumber();
            } else if (mode === 'groups-5') {
                const group = [];
                for (let i = 0; i < 5; i++) {
                    group.push(Math.random() < 0.7 ? this.getRandomLetter() : this.getRandomNumber());
                }
                char = group.join(' ');
            } else if (mode === 'words') {
                char = this.commonWords[Math.floor(Math.random() * this.commonWords.length)];
            }

            // Update display
            const currentCharDisplay = document.getElementById('passiveCurrentChar');
            if (currentCharDisplay) {
                currentCharDisplay.textContent = char.split(' ')[0]; // Show first char of word
            }

            // Play the morse
            await this.morseAudio.playSequence(char);

            // Add to transcript
            this.transcript += char + ' ';
            const transcriptText = document.getElementById('passiveTranscriptText');
            if (transcriptText) {
                transcriptText.textContent = this.transcript;
                // Scroll to end
                transcriptText.parentElement.scrollTop = transcriptText.parentElement.scrollHeight;
            }

            // Delay based on speed setting
            const delayMs = (6 - speed) * 500; // 2500ms at speed 1, 500ms at speed 5
            await this.morseAudio.sleep(delayMs);
        }
    }

    stopListening() {
        this.isPlaying = false;
        this.morseAudio.stop();

        const startBtn = document.getElementById('passiveStartBtn');
        const stopBtn = document.getElementById('passiveStopBtn');
        if (startBtn) startBtn.style.display = 'inline-block';
        if (stopBtn) stopBtn.style.display = 'none';

        const currentCharDisplay = document.getElementById('passiveCurrentChar');
        if (currentCharDisplay) currentCharDisplay.textContent = '—';
    }

    getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 10).toString();
    }
}

export default PassiveListening;
