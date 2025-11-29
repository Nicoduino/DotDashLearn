# DotDashLearn - Quick Test Guide

## ✅ Testing the Application

This guide helps you verify that DotDashLearn is working correctly.

---

## 🚀 Before You Start

### Prerequisites
✅ npm installed
✅ Node.js 14+
✅ Modern web browser
✅ Working speakers/headphones

### Installation
```bash
cd /workspaces/DotDashLearn
npm install
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in 485 ms
➜  Local:   http://localhost:3000/
```

---

## 📝 Test Checklist

### Home Page Tests

#### Test 1: Page Loads
- [ ] Browser opens to http://localhost:3000
- [ ] "DotDashLearn" title visible
- [ ] Three mode cards displayed
- [ ] Navigation bar visible

#### Test 2: Navigation
- [ ] Click logo goes to home
- [ ] Click "Home" in navbar works
- [ ] Mobile menu toggle (< 768px) works
- [ ] Active page highlighted in navbar

#### Test 3: Theme Switching
- [ ] Click moon icon → dark theme
- [ ] Click sun icon → light theme
- [ ] Theme persists on refresh
- [ ] All pages work with both themes

#### Test 4: Responsive Design
- [ ] Resize to mobile (320px) → layouts stack
- [ ] Resize to tablet (768px) → 2-column layout
- [ ] Resize to desktop (1200px) → full layout
- [ ] No horizontal scrolling on any size

---

### Practice Mode Tests

#### Test 5: Practice Page Loads
- [ ] Click "Practice" button/link
- [ ] Practice page displays
- [ ] Control panel visible on left
- [ ] Exercise area visible on right

#### Test 6: Audio Playback
- [ ] Adjust WPM to 10 (slow)
- [ ] Adjust Frequency to 700 Hz
- [ ] Select "Letters" content type
- [ ] Click "Start Exercise"
- [ ] Click "Play" button
- [ ] You hear a beep/sound
- [ ] Audio stops after character

#### Test 7: Input & Validation
- [ ] Type a letter in input box
- [ ] Press Enter
- [ ] If correct: green border appears
- [ ] If wrong: red border appears
- [ ] Correct/Wrong counts update
- [ ] Auto-advances to next exercise

#### Test 8: Settings
- [ ] WPM slider changes value
- [ ] Frequency slider changes value
- [ ] Content type dropdown works
- [ ] Group length input works

#### Test 9: Multiple Exercises
- [ ] Complete 5 exercises in a row
- [ ] Scores accumulate correctly
- [ ] Different characters appear
- [ ] No obvious pattern

#### Test 10: Stop & Resume
- [ ] Start an exercise
- [ ] Navigate to different page
- [ ] Return to Practice
- [ ] Exercise resets (OK)
- [ ] Scores not lost

---

### Koch Method Tests

#### Test 11: Koch Page Loads
- [ ] Click "Koch" button/link
- [ ] Lesson 1 is selectable
- [ ] Lesson sidebar visible
- [ ] Lessons list scrollable

#### Test 12: Select Lesson
- [ ] Click on "Lesson 1: K & M"
- [ ] Lesson selected (blue highlight)
- [ ] Lesson info appears
- [ ] Phase shows "Guided Listening"
- [ ] Progress bar appears

#### Test 13: Guided Phase
- [ ] Click "Play" button
- [ ] Hear Morse for letter "K"
- [ ] Character display shows "K"
- [ ] Multiple choice buttons appear
- [ ] Click "K" button
- [ ] Feedback indicates correct
- [ ] Repeat for letter "M"

#### Test 14: Phase Progression
- [ ] Complete Guided phase (2 chars × 2 = 4 exercises)
- [ ] Auto-advance to Random phase
- [ ] Phase text changes to "Random Testing"
- [ ] Exercise counter resets

#### Test 15: Random Phase
- [ ] See 15 exercises total
- [ ] Random K or M plays
- [ ] Click correct letter
- [ ] Wrong answer plays sound again
- [ ] Correct response required
- [ ] Auto-advance to Validation

#### Test 16: Validation Phase
- [ ] See 30 exercises total
- [ ] All learned characters available
- [ ] Completing all 30 unlocks lesson
- [ ] Congratulations screen appears

#### Test 17: Lesson Completion
- [ ] See "🎉 Lesson Completed!"
- [ ] Options to continue or repeat
- [ ] Lesson 1 marked as completed (✓)
- [ ] Can select Lesson 2

#### Test 18: Progress Persistence
- [ ] Complete Lesson 1
- [ ] Refresh page (F5)
- [ ] Lesson 1 shows as completed
- [ ] Can continue to Lesson 2

---

### Passive Listening Tests

#### Test 19: Passive Page Loads
- [ ] Click "Listen" button/link
- [ ] Passive page displays
- [ ] Control panel visible
- [ ] Large character display visible
- [ ] Transcript area visible

#### Test 20: Mode Selection
- [ ] Select "Random Letters"
- [ ] Click "Start Listening"
- [ ] Characters display and play
- [ ] Transcript shows characters
- [ ] Characters visible in large display

#### Test 21: Multiple Modes
- [ ] Click "Stop"
- [ ] Select "Random Numbers"
- [ ] Click "Start Listening"
- [ ] Only 0-9 display
- [ ] Stop and try "Mixed"
- [ ] Letters and numbers mix

#### Test 22: Transcript
- [ ] Start listening for 30 seconds
- [ ] Transcript fills with characters
- [ ] Scroll auto-maintains bottom position
- [ ] Stop button works
- [ ] Transcript visible for review

#### Test 23: Speed Control
- [ ] Set Speed to 1 (slowest)
- [ ] Start listening
- [ ] Note character gaps are large
- [ ] Stop
- [ ] Set Speed to 5 (fastest)
- [ ] Start listening
- [ ] Character gaps are small

---

### Data Persistence Tests

#### Test 24: LocalStorage Saving
- [ ] Complete one Koch lesson
- [ ] Open DevTools (F12)
- [ ] Application → Local Storage
- [ ] Look for entries starting with "dotdashlearn_"
- [ ] Should see lesson progress

#### Test 25: Progress After Refresh
- [ ] Complete Lesson 1 of Koch
- [ ] Refresh page (F5 or Ctrl+R)
- [ ] Lesson 1 still shows as completed
- [ ] No data lost

#### Test 26: Settings Persistence
- [ ] Set WPM to 30
- [ ] Set Frequency to 900
- [ ] Switch to dark theme
- [ ] Refresh page
- [ ] Settings restored

---

### Browser Console Tests

#### Test 27: No Errors
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] No red error messages
- [ ] No warning messages expected

#### Test 28: Audio Context
- [ ] In console, type: `window.dotDashLearn`
- [ ] Should show DotDashLearnApp object
- [ ] Type: `window.dotDashLearn.practiceMode.morseAudio`
- [ ] Should show MorseAudio object

---

### Performance Tests

#### Test 29: Load Time
- [ ] Open DevTools → Network tab
- [ ] Reload page
- [ ] Full load should complete < 2 seconds
- [ ] Main files should be small (<100 KB total)

#### Test 30: Responsiveness
- [ ] Start playing audio
- [ ] UI should remain responsive
- [ ] Buttons should click instantly
- [ ] No freezing or lag

---

### Accessibility Tests

#### Test 31: Keyboard Navigation
- [ ] Press Tab key repeatedly
- [ ] Focus moves through buttons
- [ ] Can reach all interactive elements
- [ ] Focus indicators visible

#### Test 32: Keyboard Input
- [ ] In Practice mode, type answer
- [ ] Press Enter (not just click Submit)
- [ ] Should submit and advance

#### Test 33: Screen Reader (if available)
- [ ] Enable screen reader (Mac: Cmd+F5, Windows: check browser)
- [ ] Buttons should be read with descriptions
- [ ] Links should be announced

---

### Cross-Browser Tests

#### Test 34: Chrome
- [ ] [ ] All tests pass in Chrome
- [ ] [ ] Audio works
- [ ] [ ] Theme switching works

#### Test 35: Firefox
- [ ] [ ] All tests pass in Firefox
- [ ] [ ] Audio works
- [ ] [ ] LocalStorage works

#### Test 36: Edge
- [ ] [ ] All tests pass in Edge
- [ ] [ ] Page layout correct
- [ ] [ ] Animations smooth

#### Test 37: Safari (if available)
- [ ] [ ] All tests pass in Safari
- [ ] [ ] Audio quality acceptable
- [ ] [ ] Responsive design works

---

### Mobile Tests

#### Test 38: Mobile View (DevTools)
- [ ] Open DevTools
- [ ] Click device toggle (Ctrl+Shift+M)
- [ ] Select iPhone 12
- [ ] Page adapts to mobile
- [ ] Touch buttons work with pointer

#### Test 39: Actual Mobile Device
- [ ] Open on actual smartphone
- [ ] Page loads properly
- [ ] Touch interaction works
- [ ] Audio plays
- [ ] Theme toggle works
- [ ] Menu toggle works

---

## 🎯 Test Scenarios

### Scenario 1: First-Time User
1. Open application
2. See home page with 3 modes
3. Click "Practice"
4. Adjust WPM to 15
5. Start exercise
6. Type answer
7. Get feedback

**Expected Result**: ✅ Smooth, intuitive experience

### Scenario 2: Koch Learner
1. Click "Koch"
2. Select Lesson 1
3. Go through all 3 phases
4. See lesson complete
5. Refresh page
6. Lesson still completed

**Expected Result**: ✅ Progress saved, learner encouraged

### Scenario 3: Passive Listener
1. Click "Listen"
2. Select "Random Letters"
3. Start listening
4. Let it play for 5 minutes
5. See long transcript
6. Stop listening

**Expected Result**: ✅ Effortless background learning

### Scenario 4: Theme Toggle
1. Start in light theme
2. Click theme toggle
3. Switch to dark
4. Navigate to all pages
5. All pages show dark theme
6. Refresh page
7. Dark theme persists

**Expected Result**: ✅ Consistent, persistent theme

### Scenario 5: Audio Customization
1. Set WPM to 8 (very slow)
2. Play character
3. Clearly hear slow morse
4. Set WPM to 35 (fast)
5. Play same character
6. Much faster morse

**Expected Result**: ✅ WPM correctly affects speed

---

## 🐛 Bug Report Template

If you find an issue, use this format:

```
Title: [Brief description]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [Expected result]

Actual Result:
[What actually happened]

Browser: [Chrome/Firefox/Edge/Safari]
Version: [Browser version]
OS: [Windows/Mac/Linux/iOS/Android]

Console Errors: [Any errors visible in DevTools]
```

---

## 📊 Test Results

### Summary Checklist

Total Tests: 39
- [ ] Passed: ___
- [ ] Failed: ___
- [ ] Not Applicable: ___

### Overall Status
- [ ] Production Ready
- [ ] Minor Issues
- [ ] Major Issues

### Notes
```
[Space for notes and observations]
```

---

## 🎓 Learning During Tests

### Test Practice Mode
- Notice how the WPM affects playback speed
- Try reducing WPM when stuck
- See improvement with repetition

### Test Koch Method
- Experience structured learning
- Notice error correction system
- Feel progress with completed lessons

### Test Passive Listening
- Let it play for a while
- Notice natural rhythm absorption
- Don't force attention

---

## 💡 Tips

### For Testers
- Test on actual device if possible
- Try extreme settings (WPM 5 vs 40)
- Listen carefully to audio quality
- Check all keyboard interactions

### For Users
- If audio doesn't work, check browser volume
- If theme doesn't save, check if localStorage is enabled
- If stuck, try reducing WPM
- Take breaks during learning

---

## ✅ Final Verification

### Before Declaring Ready
- [ ] All 39 tests passed
- [ ] No console errors
- [ ] Audio working on multiple browsers
- [ ] Mobile layout responsive
- [ ] Data persists correctly
- [ ] All themes work

### Sign-Off
- [ ] Ready for Deployment
- [ ] Ready for End Users
- [ ] Ready for Production

---

**Test Version**: 1.0
**Last Updated**: November 2024

Happy testing! 🚀
