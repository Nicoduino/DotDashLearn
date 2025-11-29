# DotDashLearn - Learn Morse Code the Modern Way

A complete, modern web application for learning Morse code easily with interactive learning methods.

## Features

### 1. **Practice Mode**
- Train your ears to recognize Morse code by listening
- Customizable speed (WPM), frequency, and content type
- Automatic validation and score tracking
- Practice with letters, numbers, or mixed content

### 2. **Koch Method**
- Progressive, structured learning following the proven Koch Method
- 27 lessons starting with pairs of characters
- Three-phase learning: Guided Listening → Random Testing → Validation Exercises
- Automatic progress saving
- 30 exercises per lesson (15 random + 15 validation)

### 3. **Passive Listening**
- Effortless learning through passive listening
- Multiple modes:
  - Random letters
  - Random numbers
  - Mixed content
  - Groups of 5 characters
  - Common words
- Adjustable speed and display frequency

## Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **Audio Generation**: Web Audio API
- **Styling**: Modern CSS3 with CSS Variables
- **Storage**: Browser localStorage
- **Design**: Mobile-first, responsive

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone or navigate to the project directory**
   ```bash
   cd DotDashLearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will open automatically at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   
   The built files will be in the `dist/` folder.

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
DotDashLearn/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.js             # Application entry point
│   ├── audio.js            # Morse code audio generation (Web Audio API)
│   ├── storage.js          # LocalStorage management
│   ├── practice.js         # Practice mode implementation
│   ├── koch.js             # Koch Method learning system
│   ├── passive.js          # Passive listening mode
│   └── styles/
│       └── main.css        # Complete styling (light/dark theme)
└── dist/                   # Production build (generated)
```

## How to Use

### Home Page
- Select from three learning methods
- Easy navigation with the top menu

### Practice Mode
1. Adjust settings (WPM, frequency, content type)
2. Click "Start Exercise"
3. Listen to the Morse code
4. Type your answer
5. Get immediate feedback

### Koch Method
1. Select a lesson from the sidebar
2. Follow the three-phase approach:
   - **Phase 1**: Listen to new characters with guidance
   - **Phase 2**: Random testing (you must get 15 correct)
   - **Phase 3**: 30 validation exercises
3. Progress is automatically saved
4. Unlock new lessons as you complete them

### Passive Listening
1. Choose a listening mode
2. Adjust WPM and frequency
3. Click "Start Listening"
4. Characters will play automatically with display
5. Click "Stop" to end session

## Morse Code Dictionary

The application includes Morse code for:
- **A-Z** (All letters)
- **0-9** (All numbers)
- **Punctuation**: . , ? ' ! / ( ) & : ; = + - _ " $ @

## Features

### Dark/Light Theme
- Toggle with the moon/sun icon in the navbar
- Theme preference is saved

### Responsive Design
- Mobile-first design
- Optimized for phones, tablets, and desktops
- Touch-friendly interface

### Progressive Learning
- Start with easy characters
- Gradually increase difficulty
- Regular review of previous content

### Performance
- Entire application runs in the browser
- No internet connection required after initial load
- Fast audio generation using Web Audio API

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast support
- Reduced motion support

## Audio Settings

### WPM (Words Per Minute)
- Range: 5-40 WPM
- Standard PARIS method for timing
- Default: 20 WPM

### Frequency
- Range: 400-1200 Hz
- Standard: 700-800 Hz
- Adjustable per mode

### Timing
- Dot duration: 1.2 / WPM seconds
- Dash duration: 3× dot
- Gaps automatically calculated

## Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Local Storage Data

The application saves:
- Koch lesson progress and phase completion
- Practice scores and statistics
- User settings (theme, WPM, frequency)
- Session history

All data is stored locally in the browser and never sent to a server.

## Tips for Learning

1. **Start with the Koch Method** - It's designed for optimal learning progression
2. **Consistent practice** - 10-15 minutes daily is more effective than occasional long sessions
3. **Adjust speed gradually** - Start slower and increase WPM as you improve
4. **Use passive listening** - Background listening helps your brain recognize patterns
5. **Take breaks** - Don't overwhelm yourself; give your brain time to process

## Common Morse Code

| Letter | Code  | Letter | Code  |
|--------|-------|--------|-------|
| A      | .-    | N      | -.    |
| B      | -...  | O      | ---   |
| C      | -.-.  | P      | .--.  |
| D      | -..   | Q      | --.-  |
| E      | .     | R      | .-.   |
| S      | ...   | T      | -     |
| I      | ..    | U      | ..-   |
| M      | --    | W      | .--   |

## Troubleshooting

### No sound
- Check browser volume
- Check system volume
- Ensure audio context is initialized (interact with the page first)
- Try a different browser

### Slow audio generation
- Reduce WPM for faster playback
- Close other CPU-intensive applications
- Try a different browser

### Settings not saving
- Enable localStorage in browser settings
- Check browser privacy settings
- Try incognito/private mode

## Development

### Architecture

The application follows a modular architecture:
- **main.js**: Application orchestration and routing
- **audio.js**: Web Audio API wrapper for Morse generation
- **storage.js**: LocalStorage abstraction layer
- **practice.js, koch.js, passive.js**: Mode implementations

### Code Style
- ES6+ modern JavaScript
- Clear variable and function names
- Comprehensive comments
- Modular, reusable components

### Adding New Features

1. Create a new module in `src/`
2. Export a class with `initializeUI()` method
3. Import in `main.js`
4. Initialize in the `DotDashLearnApp` constructor

## Performance Optimization

- Lazy loading of modes
- Efficient audio synthesis
- Minimal DOM manipulation
- CSS animations with GPU acceleration
- Debounced event handlers

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork, modify, and improve this project!

## Support

For issues, suggestions, or improvements:
1. Review the code comments
2. Check the README
3. Test in multiple browsers
4. Clear browser cache if needed

---

Happy learning!
