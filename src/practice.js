/**
 * Practice Mode - Train to recognize Morse code by ear
 */
import MorseAudio from './audio.js';
import StorageManager from './storage.js';

export class PracticeMode {
    constructor() {
        this.morseAudio = new MorseAudio(20, 700);
        this.storage = new StorageManager();
        this.isActive = false;
        this.currentExercise = null;
        this.stats = {
            correct: 0,
            wrong: 0,
            currentChar: ''
        };
    }

    initializeUI() {
        const wpmInput = document.getElementById('practiceWpm');
        const freqInput = document.getElementById('practiceFreq');
        const contentTypeSelect = document.getElementById('practiceContentType');
        const groupLengthInput = document.getElementById('practiceGroupLength');
        const startBtn = document.getElementById('practiceStartBtn');
        const playBtn = document.getElementById('practicePlayBtn');
        const submitBtn = document.getElementById('practiceSubmitBtn');
        const input = document.getElementById('practiceInput');

        // WPM slider
        if (wpmInput) {
            wpmInput.addEventListener('input', (e) => {
                document.getElementById('practiceWpmValue').textContent = e.target.value;
                this.morseAudio.updateSettings(parseInt(e.target.value), this.morseAudio.frequency);
            });
        }

        // Frequency slider
        if (freqInput) {
            freqInput.addEventListener('input', (e) => {
                document.getElementById('practiceFreqValue').textContent = e.target.value;
                this.morseAudio.updateSettings(this.morseAudio.wpm, parseInt(e.target.value));
            });
        }

        // Start button
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startPractice());
        }

        // Play button
        if (playBtn) {
            playBtn.addEventListener('click', () => this.playCurrentChar());
        }

        // Submit button
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitAnswer());
        }

        // Enter key on input
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswer();
                }
            });
        }
    }

    startPractice() {
        this.isActive = true;
        this.stats = { correct: 0, wrong: 0, currentChar: '' };

        const display = document.getElementById('practiceDisplay');
        const exercise = document.getElementById('practiceExercise');
        
        if (display) display.style.display = 'none';
        if (exercise) exercise.style.display = 'block';

        this.generateNewExercise();
    }

    generateNewExercise() {
        const contentType = document.getElementById('practiceContentType').value;
        const groupLength = parseInt(document.getElementById('practiceGroupLength').value);

        let chars = '';
        if (contentType === 'letters') {
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (contentType === 'numbers') {
            chars = '0123456789';
        } else {
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        }

        let exercise = '';
        for (let i = 0; i < groupLength; i++) {
            exercise += chars[Math.floor(Math.random() * chars.length)];
        }

        this.currentExercise = exercise;
        document.getElementById('practiceCurrentChar').textContent = '?';
        document.getElementById('practiceInput').value = '';
        document.getElementById('practiceInput').focus();

        // Auto-play the first time
        this.playCurrentChar();
    }

    async playCurrentChar() {
        const btn = document.getElementById('practicePlayBtn');
        if (btn) btn.disabled = true;

        try {
            await this.morseAudio.playSequence(this.currentExercise);
        } catch (error) {
            console.error('Error playing Morse:', error);
        }

        if (btn) btn.disabled = false;
    }

    submitAnswer() {
        const input = document.getElementById('practiceInput');
        const answer = input.value.toUpperCase().trim();

        if (!answer) {
            alert('Please enter an answer');
            return;
        }

        const correct = answer === this.currentExercise;

        if (correct) {
            this.stats.correct++;
            input.classList.add('correct');
            input.classList.remove('wrong');
        } else {
            this.stats.wrong++;
            input.classList.add('wrong');
            input.classList.remove('correct');
        }

        // Update score display
        document.getElementById('practiceCorrect').textContent = this.stats.correct;
        document.getElementById('practiceWrong').textContent = this.stats.wrong;

        // Save score
        this.storage.savePracticeScore({
            answer,
            correct,
            expected: this.currentExercise,
            wpm: parseInt(document.getElementById('practiceWpm').value),
            frequency: parseInt(document.getElementById('practiceFreq').value)
        });

        // Delay before next exercise
        setTimeout(() => {
            this.generateNewExercise();
        }, 1500);
    }

    stopPractice() {
        this.isActive = false;
        this.morseAudio.stop();

        const display = document.getElementById('practiceDisplay');
        const exercise = document.getElementById('practiceExercise');
        
        if (display) display.style.display = 'block';
        if (exercise) exercise.style.display = 'none';
    }
}

export default PracticeMode;
