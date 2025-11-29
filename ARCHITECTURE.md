# DotDashLearn - Project Documentation

## Architecture Overview

DotDashLearn is a modern, fully client-side Morse code learning application built with vanilla JavaScript and Vite.

### Core Architecture

```
┌─────────────────────────────────────────────┐
│         DotDashLearnApp (main.js)           │
│  - App orchestration                        │
│  - Theme management                         │
│  - Page navigation                          │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴─────────┬────────────┬──────────────┐
       │                 │            │              │
   ┌───v────┐    ┌──────v──────┐   ┌─v────────┐  ┌──v──────────┐
   │Practice│    │KochMethod   │   │Passive   │  │Storage      │
   │Mode    │    │Learning     │   │Listening │  │Manager      │
   └────┬───┘    └──────┬──────┘   └─┬────────┘  └──┬───────────┘
        │                │            │             │
        └────────────────┴────────────┴─────────────┤
                                                    │
                                        ┌───────────v──────┐
                                        │  MorseAudio      │
                                        │  (Web Audio API) │
                                        └──────────────────┘
```

## Module Descriptions

### 1. **main.js** - Application Entry Point
**Purpose**: Initialize and orchestrate the entire application

**Key Responsibilities**:
- Create instances of all learning modes
- Manage page navigation and routing
- Handle theme switching (light/dark)
- Setup navigation event listeners
- Initialize all UI components

**Key Methods**:
- `init()`: Initialize all components
- `setupTheme()`: Setup theme switching
- `setupNavigation()`: Setup navbar navigation
- `setupModeButtons()`: Setup home page buttons
- `navigateToPage(page)`: Change current page

**Dependencies**:
- PracticeMode, KochMethod, PassiveListening
- StorageManager
- All modules

### 2. **audio.js** - Morse Audio Generation
**Purpose**: Generate Morse code audio using the Web Audio API

**Key Responsibilities**:
- Create and manage Web Audio Context
- Generate dot (dit) and dash (dah) signals
- Calculate timing based on WPM
- Play complete Morse sequences
- Handle audio envelope and frequency control

**Key Classes**:
- `MorseAudio`: Main audio generation class

**Key Methods**:
- `playDot()`: Play a short beep (dit)
- `playDash()`: Play a long beep (dah)
- `playCharacter(char)`: Play Morse for a single character
- `playWord(word)`: Play Morse for a complete word
- `playSequence(chars)`: Play multiple words
- `getMorseCode(char)`: Get Morse representation of a character
- `updateSettings(wpm, frequency)`: Update playback settings

**Morse Dictionary Includes**:
- A-Z (all letters)
- 0-9 (all numbers)
- Common punctuation

**Timing Calculations**:
- Dot duration: 1.2 / WPM seconds (PARIS standard)
- Dash duration: 3× dot duration
- Gap between dots/dashes: 1× dot duration
- Letter gap: 3× dot duration
- Word gap: 7× dot duration

### 3. **storage.js** - Local Storage Management
**Purpose**: Manage persistent data using browser localStorage

**Key Responsibilities**:
- Save and load Koch lesson progress
- Store practice scores and statistics
- Manage user settings
- Track session history
- Handle theme preferences

**Key Classes**:
- `StorageManager`: Storage abstraction layer

**Storage Prefix**:
- All data is stored with prefix `dotdashlearn_`

**Key Methods**:
- `saveKochProgress(lessonNumber, phase, completed)`: Save lesson progress
- `getKochProgress(lessonNumber)`: Retrieve lesson progress
- `savePracticeScore(score)`: Save practice attempt
- `getPracticeScores()`: Retrieve all practice scores
- `getPracticeStats()`: Calculate statistics
- `saveSettings(settings)`: Save user settings
- `getSettings()`: Get user settings
- `setTheme(theme)`: Save theme preference
- `clearAllData()`: Reset all data

**Data Structures**:
```javascript
// Koch Progress
{
  lessonNumber: 1,
  phase: 'exercise', // 'guided', 'random', 'exercise'
  completed: true,
  timestamp: 1234567890
}

// Practice Score
{
  answer: 'ABC',
  correct: true,
  expected: 'ABC',
  wpm: 20,
  frequency: 700,
  timestamp: 1234567890
}

// Settings
{
  theme: 'light', // 'light' or 'dark'
  wpm: 20,
  frequency: 700,
  volume: 0.5
}
```

### 4. **practice.js** - Practice Mode
**Purpose**: Interactive practice for recognizing Morse code by ear

**Key Responsibilities**:
- Generate random Morse characters/words
- Play audio and collect user input
- Validate answers and track scores
- Display real-time statistics
- Handle customizable parameters

**Key Classes**:
- `PracticeMode`: Practice mode implementation

**Parameters**:
- **WPM**: 5-40 (Words Per Minute)
- **Frequency**: 400-1200 Hz
- **Content Type**: Letters, Numbers, or Mixed
- **Group Length**: 1-5 characters per exercise

**Key Methods**:
- `initializeUI()`: Setup UI event listeners
- `startPractice()`: Begin practice session
- `generateNewExercise()`: Create random exercise
- `playCurrentChar()`: Play current exercise audio
- `submitAnswer()`: Validate user input
- `stopPractice()`: End practice session

**Features**:
- Automatic score tracking
- Color-coded feedback (green for correct, red for wrong)
- Automatic progression to next exercise
- Persistent score history

### 5. **koch.js** - Koch Method Learning
**Purpose**: Implement the proven Koch Method for progressive learning

**Key Responsibilities**:
- Manage 27 progressive lessons
- Implement three-phase learning structure
- Track lesson progress
- Handle error correction
- Provide guided and random exercises

**Key Classes**:
- `KochMethod`: Koch Method implementation

**Lesson Structure**:
- **27 Total Lessons**
- **Progressive Difficulty**: Starts with 2 characters, gradually adds more
- **Each Lesson**: 30 total exercises (15 random + 15 validation)

**Three Learning Phases**:

1. **Guided Listening Phase**:
   - Play each new character 2 times
   - Display the character
   - User selects character from multiple choice
   - Ensures auditory and visual association

2. **Random Testing Phase**:
   - 15 random tests
   - User must identify characters
   - Wrong answers trigger replay and retry
   - Improves recognition accuracy

3. **Validation Exercises**:
   - 30 validation exercises
   - Tests all characters learned so far
   - Mix of new and review characters
   - Wrong answers trigger correction
   - Lesson unlocks next lesson on completion

**Key Methods**:
- `initializeUI()`: Setup UI and render lessons
- `selectLesson(lessonNumber)`: Select a specific lesson
- `startPhase()`: Begin current phase
- `runGuidedPhase()`: Execute guided listening
- `runRandomPhase()`: Execute random testing
- `runExercisePhase()`: Execute validation exercises
- `completeLesson()`: Mark lesson as complete
- `updateProgress()`: Update progress bar

**Progress Tracking**:
- Saved automatically after each phase
- Users can repeat lessons
- Next lesson unlocks automatically
- Session history maintained

### 6. **passive.js** - Passive Listening Mode
**Purpose**: Effortless learning through passive listening

**Key Responsibilities**:
- Generate random Morse sequences
- Display characters while playing
- Maintain transcript of session
- Support multiple listening modes
- Handle continuous playback

**Key Classes**:
- `PassiveListening`: Passive listening implementation

**Listening Modes**:
1. **Random Letters**: Random A-Z characters
2. **Random Numbers**: Random 0-9 characters
3. **Mixed**: Random mix of letters and numbers
4. **Groups of 5**: Groups of 5 random characters
5. **Common Words**: Pre-defined common English words

**Parameters**:
- **WPM**: 5-40 (Words Per Minute)
- **Frequency**: 400-1200 Hz
- **Speed**: 1-5 (Delay between characters)

**Key Methods**:
- `initializeUI()`: Setup UI event listeners
- `startListening()`: Begin passive listening session
- `stopListening()`: End session
- `getRandomLetter()`: Generate random letter
- `getRandomNumber()`: Generate random number

**Features**:
- Real-time transcript display
- Current character display
- Auto-scrolling transcript
- Adjustable playback speed
- No active participation required

## Data Flow

### Practice Mode Flow
```
User Opens Practice → Configure Settings → Start Exercise
→ Generate Random Char → Play Audio → User Types Answer
→ Validate → Save Score → Next Exercise
```

### Koch Method Flow
```
Select Lesson → Guided Phase (2 repetitions per char)
→ Random Phase (15 random tests) → Exercise Phase (30 exercises)
→ Lesson Complete → Progress Saved → Unlock Next Lesson
```

### Passive Listening Flow
```
Select Mode → Start Listening → Generate Random Char
→ Play Audio → Display Character → Add to Transcript
→ Continue until Stop Clicked
```

## Browser Storage

### LocalStorage Keys
```
dotdashlearn_koch_lesson_1       → Lesson 1 progress
dotdashlearn_koch_lesson_2       → Lesson 2 progress
...
dotdashlearn_practice_score      → Array of all practice scores
dotdashlearn_settings            → User settings (theme, WPM, etc.)
dotdashlearn_session_history     → Array of session records
```

### Storage Limits
- Modern browsers: 5-10 MB per domain
- Application uses: <1 MB typical
- Old scores automatically pruned (max 100)
- Old sessions automatically pruned (max 50)

## CSS Architecture

### Theme Variables
```css
--primary-color: #6366f1 (Indigo)
--secondary-color: #ec4899 (Pink)
--success-color: #10b981 (Green)
--error-color: #ef4444 (Red)
--background: #ffffff (White - light theme)
--surface: #f9fafb (Off-white)
--text-primary: #1f2937 (Dark gray)
--text-secondary: #6b7280 (Medium gray)
```

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### CSS Features
- CSS Custom Properties (Variables)
- Grid and Flexbox layouts
- CSS Transitions and Animations
- Dark theme support
- Mobile-first design

## Performance Optimizations

1. **Audio Generation**:
   - Efficient Web Audio API usage
   - No unnecessary audio context creation
   - Proper cleanup after use

2. **DOM Manipulation**:
   - Minimal DOM updates
   - Efficient event delegation
   - CSS animations for performance

3. **Storage**:
   - Automatic data pruning
   - Efficient JSON serialization
   - Lazy loading of lessons

4. **Build**:
   - Vite for fast development
   - Tree-shaking for unused code
   - Minification for production

## Testing Checklist

- [ ] Audio plays correctly in all browsers
- [ ] Practice mode calculates scores accurately
- [ ] Koch method progresses through phases correctly
- [ ] Passive listening maintains transcript
- [ ] Local storage saves/loads data properly
- [ ] Theme switching works smoothly
- [ ] Mobile layout is responsive
- [ ] Navigation works on all pages
- [ ] Input validation prevents errors
- [ ] Performance is smooth on older devices

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | Latest  | ✅     |
| Firefox | Latest  | ✅     |
| Edge    | Latest  | ✅     |
| Safari  | Latest  | ✅     |
| Mobile  | Modern  | ✅     |

## Future Enhancements

1. **Statistics Dashboard**:
   - Detailed progress charts
   - Learning analytics
   - Speed progression tracking

2. **Advanced Features**:
   - QSO (conversation) mode
   - Callsign generation
   - CW abbreviations
   - Morse test simulations

3. **Social Features**:
   - Leaderboards (localStorage only)
   - Achievement badges
   - Progress sharing

4. **Content Expansion**:
   - Prosigns (special signals)
   - Standard sentences
   - News headlines

5. **Accessibility**:
   - Screen reader optimization
   - Voice input support
   - Keyboard-only navigation

## Deployment

### Building for Production
```bash
npm run build
```

### Output
- Optimized files in `dist/` folder
- Can be deployed to any static hosting
- No server required
- Works offline after initial load

### Hosting Options
- GitHub Pages
- Netlify
- Vercel
- Any static host

## Development

### Project Structure
```
/src
  /styles
    main.css           # All styling
  audio.js             # Audio generation
  storage.js           # Storage management
  practice.js          # Practice mode
  koch.js              # Koch method
  passive.js           # Passive listening
  main.js              # App entry point
index.html             # Main HTML
vite.config.js         # Vite config
package.json           # Dependencies
```

### Development Commands
```bash
npm run dev            # Start dev server
npm run build          # Build for production
npm run preview        # Preview production build
```

---

**Last Updated**: 2024
**Version**: 1.0.0
