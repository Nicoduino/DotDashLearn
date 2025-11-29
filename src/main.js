/**
 * DotDashLearn Main Application
 * Learn Morse code with modern interactive methods
 */
import MorseAudio from './audio.js';
import StorageManager from './storage.js';
import PracticeMode from './practice.js';
import KochMethod from './koch.js';
import PassiveListening from './passive.js';

class DotDashLearnApp {
    constructor() {
        this.storage = new StorageManager();
        this.practiceMode = new PracticeMode();
        this.kochMethod = new KochMethod();
        this.passiveListening = new PassiveListening();
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupModeButtons();
        this.practiceMode.initializeUI();
        this.kochMethod.initializeUI();
        this.passiveListening.initializeUI();
        this.setupPageNavigation();
    }

    /**
     * Setup theme switching
     */
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = this.storage.getTheme();
        
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
                this.storage.setTheme(newTheme);
            });
        }
    }

    /**
     * Setup main navigation
     */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.navbar-menu');

        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
                
                // Close mobile menu
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    /**
     * Setup mode card buttons on home page
     */
    setupModeButtons() {
        const modeCards = document.querySelectorAll('.mode-card');
        
        modeCards.forEach(card => {
            const btn = card.querySelector('.mode-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const mode = card.getAttribute('data-mode');
                    this.navigateToPage(mode);
                });
            }
        });
    }

    /**
     * Navigate to a page
     */
    navigateToPage(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => {
            p.style.display = 'none';
        });

        // Show selected page
        let pageElement = null;
        switch(page) {
            case 'home':
                pageElement = document.getElementById('home-page');
                break;
            case 'practice':
                pageElement = document.getElementById('practice-page');
                this.practiceMode.stopPractice(); // Reset practice mode
                break;
            case 'koch':
                pageElement = document.getElementById('koch-page');
                break;
            case 'passive':
                pageElement = document.getElementById('passive-page');
                this.passiveListening.stopListening(); // Stop listening
                break;
            default:
                pageElement = document.getElementById('home-page');
        }

        if (pageElement) {
            pageElement.style.display = 'block';
            this.currentPage = page;
        }

        // Update nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Setup additional page navigation
     */
    setupPageNavigation() {
        // This is called after initializing all modes
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dotDashLearn = new DotDashLearnApp();
});

export default DotDashLearnApp;
