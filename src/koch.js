/**
 * Koch Method - Progressive structured learning
 * Lessons are pairs of characters with 3 phases each
 */
import MorseAudio from './audio.js';
import StorageManager from './storage.js';

export class KochMethod {
    constructor() {
        this.morseAudio = new MorseAudio(20, 700);
        this.storage = new StorageManager();
        
        // Koch lessons - groups of 2 characters per lesson
        this.lessons = [
            { number: 1, chars: ['K', 'M'], title: 'Lesson 1: K & M' },
            { number: 2, chars: ['K', 'M', 'R', 'S'], title: 'Lesson 2: + R & S' },
            { number: 3, chars: ['K', 'M', 'R', 'S', 'U', 'A'], title: 'Lesson 3: + U & A' },
            { number: 4, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T'], title: 'Lesson 4: + P & T' },
            { number: 5, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O'], title: 'Lesson 5: + L & O' },
            { number: 6, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I'], title: 'Lesson 6: + W & I' },
            { number: 7, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J'], title: 'Lesson 7: + N & J' },
            { number: 8, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J', 'E', 'F'], title: 'Lesson 8: + E & F' },
            { number: 9, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J', 'E', 'F', 'Y', 'V'], title: 'Lesson 9: + Y & V' },
            { number: 10, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J', 'E', 'F', 'Y', 'V', 'G', 'B'], title: 'Lesson 10: + G & B' },
            { number: 11, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J', 'E', 'F', 'Y', 'V', 'G', 'B', 'H', 'D'], title: 'Lesson 11: + H & D' },
            { number: 12, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J', 'E', 'F', 'Y', 'V', 'G', 'B', 'H', 'D', 'X', 'C'], title: 'Lesson 12: + X & C' },
            { number: 13, chars: ['K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', 'N', 'J', 'E', 'F', 'Y', 'V', 'G', 'B', 'H', 'D', 'X', 'C', 'Z', 'Q'], title: 'Lesson 13: + Z & Q' },
            { number: 14, chars: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], title: 'Lesson 14: All Letters' },
            { number: 15, chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], title: 'Lesson 15: Numbers 0-9' },
        ];

        this.currentLessonNumber = 1;
        this.currentPhase = 'guided'; // 'guided', 'random', 'exercise'
        this.currentLessonChars = [];
        this.exerciseIndex = 0;
        this.totalExercises = 30;
        this.newChars = [];
    }

    initializeUI() {
        this.renderLessonsList();
        this.attachEventListeners();
    }

    renderLessonsList() {
        const lessonsList = document.getElementById('kochLessonsList');
        if (!lessonsList) return;

        lessonsList.innerHTML = '';

        this.lessons.forEach(lesson => {
            const progress = this.storage.getKochProgress(lesson.number);
            const completed = progress && progress.completed;

            const div = document.createElement('div');
            div.className = 'lesson-item ' + (completed ? 'completed' : '') + (this.currentLessonNumber === lesson.number ? ' active' : '');
            div.innerHTML = `
                <span class="lesson-number">${lesson.number}</span>
                <span class="lesson-chars">${lesson.chars.join(', ')}</span>
                ${completed ? '<span class="checkmark">✓</span>' : ''}
            `;
            div.addEventListener('click', () => this.selectLesson(lesson.number));
            lessonsList.appendChild(div);
        });
    }

    selectLesson(lessonNumber) {
        this.currentLessonNumber = lessonNumber;
        const lesson = this.lessons[lessonNumber - 1];
        
        // Get new characters (2 characters added per lesson)
        if (lessonNumber === 1) {
            // First lesson: K and M
            this.newChars = lesson.chars;
        } else if (lessonNumber >= 14) {
            // Review lessons (All Letters and Numbers) - no new chars to highlight
            this.newChars = lesson.chars;
        } else {
            // Regular lessons: get the 2 new characters
            const prevLesson = this.lessons[lessonNumber - 2];
            const prevChars = prevLesson.chars;
            this.newChars = lesson.chars.filter(c => !prevChars.includes(c));
        }

        this.currentLessonChars = lesson.chars;
        
        // Skip guided phase for review lessons
        if (lessonNumber >= 14) {
            this.currentPhase = 'random';
        } else {
            this.currentPhase = 'guided';
        }
        
        this.exerciseIndex = 0;

        this.renderLessonsList();
        this.startPhase();
    }

    async startPhase() {
        const lessonInfo = document.getElementById('kochLessonInfo');
        const lessonContent = document.getElementById('kochLessonContent');
        const noSelection = document.getElementById('kochNoLessonSelected');

        if (lessonInfo) lessonInfo.style.display = 'block';
        if (noSelection) noSelection.style.display = 'none';

        const lesson = this.lessons[this.currentLessonNumber - 1];
        if (document.getElementById('kochLessonTitle')) {
            document.getElementById('kochLessonTitle').textContent = lesson.title;
        }

        this.updateProgress();

        if (this.currentPhase === 'guided') {
            await this.runGuidedPhase();
        } else if (this.currentPhase === 'random') {
            await this.runRandomPhase();
        } else if (this.currentPhase === 'exercise') {
            await this.runExercisePhase();
        }
    }

    async runGuidedPhase() {
        if (document.getElementById('kochPhase')) {
            document.getElementById('kochPhase').textContent = 'Guided Listening';
        }

        for (const char of this.newChars) {
            // Show each new character 2 times
            for (let repeat = 0; repeat < 2; repeat++) {
                await this.presentCharacter(char);
            }
        }

        // Move to random phase
        this.currentPhase = 'random';
        this.exerciseIndex = 0;
        await this.startPhase();
    }

    async presentCharacter(char) {
        const lessonContent = document.getElementById('kochLessonContent');
        
        lessonContent.innerHTML = `
            <div class="koch-exercise-box">
                <div class="listening-exercise">
                    <p>Listen carefully to this character:</p>
                    <button id="kochPlayBtn" class="btn-play btn-large">▶ Play</button>
                    <div id="kochDisplay" class="char-display" style="font-size: 3em; margin: 20px 0;">?</div>
                    <p style="color: var(--text-secondary); margin-top: 10px;">Click Play to hear it</p>
                </div>
            </div>
        `;

        // Wait for play action
        await new Promise(resolve => {
            document.getElementById('kochPlayBtn').addEventListener('click', async () => {
                document.getElementById('kochPlayBtn').disabled = true;
                
                // Show character DURING audio playback
                document.getElementById('kochDisplay').textContent = char;
                
                // Play the character audio
                await this.morseAudio.playCharacter(char);
                
                // After audio finishes, show selection interface
                const lessonContent = document.getElementById('kochLessonContent');
                lessonContent.innerHTML = `
                    <div class="koch-exercise-box">
                        <p>Which character did you hear?</p>
                        <div class="koch-choices">
                            ${this.newChars.map(c => `<button class="btn-choice" data-char="${c}">${c}</button>`).join('')}
                        </div>
                    </div>
                `;

                // Wait for choice
                let resolved = false;
                document.querySelectorAll('.btn-choice').forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (!resolved) {
                            resolved = true;
                            resolve();
                        }
                    });
                });
            }, { once: true });
        });
    }

    async runRandomPhase() {
        if (document.getElementById('kochPhase')) {
            document.getElementById('kochPhase').textContent = 'Random Testing';
        }

        const lessonContent = document.getElementById('kochLessonContent');
        this.exerciseIndex = 0;

        while (this.exerciseIndex < 15) { // 15 random exercises
            const char = this.newChars[Math.floor(Math.random() * this.newChars.length)];
            
            await new Promise(resolve => {
                lessonContent.innerHTML = `
                    <div class="koch-exercise-box">
                        <p>Which character is this?</p>
                        <button id="kochPlayBtn2" class="btn-play btn-large">▶ Play</button>
                        <p style="color: var(--text-secondary); margin-top: 10px;">Exercise ${this.exerciseIndex + 1}/15</p>
                        <div class="koch-choices">
                            ${this.newChars.map(c => `<button class="btn-choice" data-char="${c}">${c}</button>`).join('')}
                        </div>
                    </div>
                `;

                document.getElementById('kochPlayBtn2').addEventListener('click', async () => {
                    document.getElementById('kochPlayBtn2').disabled = true;
                    await this.morseAudio.playCharacter(char);
                }, { once: true });

                let answered = false;
                document.querySelectorAll('.btn-choice').forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (!answered) {
                            answered = true;
                            const selectedChar = btn.getAttribute('data-char');
                            
                            if (selectedChar === char) {
                                btn.classList.add('correct');
                                this.exerciseIndex++;
                                setTimeout(resolve, 800);
                            } else {
                                btn.classList.add('wrong');
                                // Replay and retry
                                setTimeout(async () => {
                                    await this.morseAudio.playCharacter(char);
                                    lessonContent.innerHTML += `<p style="color: red; margin-top: 10px;">Wrong! The correct answer is <strong>${char}</strong>. Try again.</p>`;
                                    answered = false;
                                }, 500);
                            }
                        }
                    });
                });

                this.updateProgress();
            });
        }

        // Move to exercise phase
        this.currentPhase = 'exercise';
        this.exerciseIndex = 0;
        await this.startPhase();
    }

    async runExercisePhase() {
        if (document.getElementById('kochPhase')) {
            document.getElementById('kochPhase').textContent = 'Validation Exercises';
        }

        const lessonContent = document.getElementById('kochLessonContent');
        this.exerciseIndex = 0;

        while (this.exerciseIndex < 30) { // 30 validation exercises (15 per new char)
            const char = this.currentLessonChars[Math.floor(Math.random() * this.currentLessonChars.length)];
            
            await new Promise(resolve => {
                lessonContent.innerHTML = `
                    <div class="koch-exercise-box">
                        <p>Validate your learning - which character is this?</p>
                        <button id="kochPlayBtn3" class="btn-play btn-large">▶ Play</button>
                        <p style="color: var(--text-secondary); margin-top: 10px;">Exercise ${this.exerciseIndex + 1}/30</p>
                        <div class="koch-choices">
                            ${this.currentLessonChars.map(c => `<button class="btn-choice" data-char="${c}">${c}</button>`).join('')}
                        </div>
                    </div>
                `;

                document.getElementById('kochPlayBtn3').addEventListener('click', async () => {
                    document.getElementById('kochPlayBtn3').disabled = true;
                    await this.morseAudio.playCharacter(char);
                }, { once: true });

                let answered = false;
                document.querySelectorAll('.btn-choice').forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (!answered) {
                            answered = true;
                            const selectedChar = btn.getAttribute('data-char');
                            
                            if (selectedChar === char) {
                                btn.classList.add('correct');
                                this.exerciseIndex++;
                                setTimeout(resolve, 800);
                            } else {
                                btn.classList.add('wrong');
                                setTimeout(async () => {
                                    await this.morseAudio.playCharacter(char);
                                    lessonContent.innerHTML += `<p style="color: red; margin-top: 10px;">Wrong! The correct answer is <strong>${char}</strong>. Try again.</p>`;
                                    answered = false;
                                }, 500);
                            }
                        }
                    });
                });

                this.updateProgress();
            });
        }

        // Lesson completed!
        this.completeLesson();
    }

    completeLesson() {
        this.storage.saveKochProgress(this.currentLessonNumber, 'exercise', true);

        const lessonContent = document.getElementById('kochLessonContent');
        lessonContent.innerHTML = `
            <div class="koch-completion-box">
                <h2>🎉 Lesson Completed!</h2>
                <p>You have successfully completed lesson ${this.currentLessonNumber}!</p>
                <p>You can now move to the next lesson or practice this one again.</p>
                <button id="nextLessonBtn" class="btn-primary btn-large">Next Lesson</button>
                <button id="repeatLessonBtn" class="btn-secondary btn-large">Repeat This Lesson</button>
            </div>
        `;

        document.getElementById('nextLessonBtn').addEventListener('click', () => {
            if (this.currentLessonNumber < this.lessons.length) {
                this.selectLesson(this.currentLessonNumber + 1);
            }
        });

        document.getElementById('repeatLessonBtn').addEventListener('click', () => {
            this.selectLesson(this.currentLessonNumber);
        });

        this.renderLessonsList();
    }

    updateProgress() {
        const total = this.currentPhase === 'guided' ? this.newChars.length * 2 : 
                      this.currentPhase === 'random' ? 15 : 30;
        const progressBar = document.getElementById('kochProgressBar');
        const progressText = document.getElementById('kochProgressText');

        const percent = (this.exerciseIndex / total) * 100;
        if (progressBar) progressBar.style.width = percent + '%';
        if (progressText) progressText.textContent = `${this.exerciseIndex}/${total}`;
    }

    attachEventListeners() {
        // Lessons list is already handled in renderLessonsList
    }
}

export default KochMethod;
