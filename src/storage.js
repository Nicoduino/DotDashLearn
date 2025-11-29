/**
 * Storage manager for localStorage persistence
 * Handles saving and loading progress, scores, and settings
 */
export class StorageManager {
    constructor() {
        this.prefix = 'dotdashlearn_';
    }

    /**
     * Save Koch lesson progress
     */
    saveKochProgress(lessonNumber, phase, completed) {
        const key = `${this.prefix}koch_lesson_${lessonNumber}`;
        const data = {
            lessonNumber,
            phase, // 'guided', 'random', 'exercise'
            completed,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Get Koch lesson progress
     */
    getKochProgress(lessonNumber) {
        const key = `${this.prefix}koch_lesson_${lessonNumber}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Get all Koch lessons progress
     */
    getAllKochProgress() {
        const progress = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(`${this.prefix}koch_lesson_`)) {
                const data = JSON.parse(localStorage.getItem(key));
                progress[data.lessonNumber] = data;
            }
        }
        return progress;
    }

    /**
     * Save practice score
     */
    savePracticeScore(score) {
        const key = `${this.prefix}practice_score`;
        const scores = this.getPracticeScores() || [];
        scores.push({
            ...score,
            timestamp: Date.now()
        });
        
        // Keep only last 100 scores
        if (scores.length > 100) {
            scores.shift();
        }
        
        localStorage.setItem(key, JSON.stringify(scores));
    }

    /**
     * Get practice scores
     */
    getPracticeScores() {
        const key = `${this.prefix}practice_score`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Get practice statistics
     */
    getPracticeStats() {
        const scores = this.getPracticeScores();
        if (scores.length === 0) {
            return {
                totalAttempts: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
                accuracy: 0,
                averageWPM: 0
            };
        }

        const totalAttempts = scores.length;
        const correctAnswers = scores.filter(s => s.correct).length;
        const wrongAnswers = totalAttempts - correctAnswers;
        const accuracy = (correctAnswers / totalAttempts) * 100;
        const averageWPM = scores.reduce((sum, s) => sum + (s.wpm || 0), 0) / totalAttempts;

        return {
            totalAttempts,
            correctAnswers,
            wrongAnswers,
            accuracy: Math.round(accuracy * 100) / 100,
            averageWPM: Math.round(averageWPM * 100) / 100
        };
    }

    /**
     * Save user settings
     */
    saveSettings(settings) {
        const key = `${this.prefix}settings`;
        localStorage.setItem(key, JSON.stringify(settings));
    }

    /**
     * Get user settings
     */
    getSettings() {
        const key = `${this.prefix}settings`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {
            theme: 'light',
            wpm: 20,
            frequency: 700,
            volume: 0.5
        };
    }

    /**
     * Save theme preference
     */
    setTheme(theme) {
        const settings = this.getSettings();
        settings.theme = theme;
        this.saveSettings(settings);
    }

    /**
     * Get theme preference
     */
    getTheme() {
        return this.getSettings().theme;
    }

    /**
     * Clear all data (for reset)
     */
    clearAllData() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    /**
     * Save session history
     */
    saveSessionHistory(sessionData) {
        const key = `${this.prefix}session_history`;
        const history = this.getSessionHistory() || [];
        history.push({
            ...sessionData,
            timestamp: Date.now()
        });
        
        // Keep only last 50 sessions
        if (history.length > 50) {
            history.shift();
        }
        
        localStorage.setItem(key, JSON.stringify(history));
    }

    /**
     * Get session history
     */
    getSessionHistory() {
        const key = `${this.prefix}session_history`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
}

export default StorageManager;
