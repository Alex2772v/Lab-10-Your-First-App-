# ARCHITECTURE.md

## Project Architecture

This document describes the planned architecture for the **Rock Paper Scissors** web app.

GitHub Copilot should use this file along with `AGENTS.md` to build the application.

The app must be a simple static website that works on **GitHub Pages** and saves game stats in the browser with `localStorage`.

---

## Architecture Goals

The app should be:

- Simple enough for a beginner to understand
- Fully static and GitHub Pages compatible
- Written with plain HTML, CSS, and JavaScript
- Easy to test by opening `index.html` in a browser
- Organized into clear files
- Able to save and reload game stats using browser storage

The app should not use a backend, database, framework, server, or build tool.

---

## File Structure

Use the following structure:

```text
/
├── index.html
├── styles.css
├── script.js
├── README.md
├── AGENTS.md
└── ARCHITECTURE.md
```

### File Responsibilities

#### `index.html`

Responsible for the page structure.

It should contain:

- Main page container
- App title
- Short instructions
- Rock, Paper, and Scissors buttons
- Result display area
- Stats display area
- Optional recent game history section
- Reset stats button
- Links to `styles.css` and `script.js`

The HTML should not contain game logic.

#### `styles.css`

Responsible for all styling.

It should contain:

- Base page styling
- Main card/container layout
- Button styling
- Result message styling
- Stats section styling
- Responsive design rules
- Simple hover/focus states

The CSS should keep the app clean and readable.

#### `script.js`

Responsible for all app behavior.

It should contain:

- Game state
- Computer choice logic
- Winner decision logic
- Stat loading and saving
- DOM updates
- Event listeners
- Reset behavior

The JavaScript should be plain browser JavaScript.

---

## High-Level App Flow

The app should work like this:

```text
Page loads
    ↓
Load stats from localStorage
    ↓
Display saved stats
    ↓
User clicks Rock, Paper, or Scissors
    ↓
Computer randomly picks Rock, Paper, or Scissors
    ↓
App decides win, loss, or tie
    ↓
App updates result message
    ↓
App updates stats
    ↓
App saves stats to localStorage
    ↓
Updated stats remain after refresh
```

---

## Data Model

Use one main JavaScript object to track the game stats.

Recommended structure:

```js
const stats = {
  wins: 0,
  losses: 0,
  ties: 0,
  totalGames: 0,
  currentStreak: 0,
  bestStreak: 0,
  history: []
};
```

### Required Stats

The app must track:

- Wins
- Losses
- Ties
- Total games played

### Optional Stats

The app may also track:

- Current win streak
- Best win streak
- Recent game history
- Last player choice
- Last computer choice

---

## localStorage Design

Use `localStorage` to save stats in the browser.

Preferred approach:

Store all stats as one JSON object.

```js
localStorage.setItem("rpsStats", JSON.stringify(stats));
```

Load stats with:

```js
const savedStats = JSON.parse(localStorage.getItem("rpsStats"));
```

This is cleaner than storing each value separately.

### localStorage Key

Use this key:

```text
rpsStats
```

### Default Stats

If there is no saved data, use default stats:

```js
const defaultStats = {
  wins: 0,
  losses: 0,
  ties: 0,
  totalGames: 0,
  currentStreak: 0,
  bestStreak: 0,
  history: []
};
```

### Storage Safety

When loading saved stats, handle bad or missing data safely.

If saved data is missing or broken, reset to default stats instead of crashing the app.

---

## Game Choices

Use an array for the possible choices:

```js
const choices = ["rock", "paper", "scissors"];
```

Display choices with capitalized text for users:

```text
Rock
Paper
Scissors
```

Keep the internal JavaScript values lowercase.

---

## Game Logic

The game should use simple conditional logic.

Rules:

```text
rock beats scissors
scissors beats paper
paper beats rock
same choice equals tie
```

Recommended result values:

```js
"win"
"loss"
"tie"
```

The `determineWinner()` function should return one of those values.

---

## Main JavaScript Functions

Use clear function names.

### `loadStats()`

Purpose:

- Load stats from `localStorage`
- If no stats exist, use default stats
- If saved stats are invalid, use default stats

Returns:

```js
stats
```

---

### `saveStats()`

Purpose:

- Save the current stats object to `localStorage`

Example:

```js
localStorage.setItem("rpsStats", JSON.stringify(stats));
```

---

### `getComputerChoice()`

Purpose:

- Randomly select rock, paper, or scissors

Returns:

```js
"rock"
"paper"
```

or

```js
"scissors"
```

---

### `determineWinner(playerChoice, computerChoice)`

Purpose:

- Compare the player's choice and the computer's choice
- Return `"win"`, `"loss"`, or `"tie"`

Example:

```js
determineWinner("rock", "scissors");
```

Returns:

```js
"win"
```

---

### `playGame(playerChoice)`

Purpose:

- Run one full round of the game

Steps:

1. Get the computer choice
2. Determine the result
3. Update stats
4. Update the page display
5. Save stats to `localStorage`

---

### `updateStats(result)`

Purpose:

- Update wins, losses, ties, total games, and streaks

Rules:

- Win increases wins by 1
- Loss increases losses by 1
- Tie increases ties by 1
- Every round increases total games by 1
- Win increases current streak by 1
- Loss resets current streak to 0
- Tie should not increase the win streak

---

### `updateDisplay(playerChoice, computerChoice, result)`

Purpose:

- Update the visible page content

It should update:

- Player choice text
- Computer choice text
- Result message
- Wins
- Losses
- Ties
- Total games
- Current streak if used
- Best streak if used
- Recent game history if used

---

### `resetStats()`

Purpose:

- Ask the user for confirmation
- Clear saved stats
- Reset in-memory stats
- Update the display

Use:

```js
confirm("Are you sure you want to reset your stats?");
```

Only reset stats if the user confirms.

---

## DOM Element Plan

Use clear IDs in `index.html`.

Recommended IDs:

```html
<button id="rockButton">Rock</button>
<button id="paperButton">Paper</button>
<button id="scissorsButton">Scissors</button>

<p id="playerChoice">You chose: -</p>
<p id="computerChoice">Computer chose: -</p>
<p id="resultMessage">Choose a move to start playing.</p>

<span id="wins">0</span>
<span id="losses">0</span>
<span id="ties">0</span>
<span id="totalGames">0</span>
<span id="currentStreak">0</span>
<span id="bestStreak">0</span>

<ul id="historyList"></ul>

<button id="resetButton">Reset Stats</button>
```

Do not use inline JavaScript like `onclick`.

Use event listeners in `script.js`.

---

## Event Listener Plan

In `script.js`, add event listeners after the page loads.

Example:

```js
document.addEventListener("DOMContentLoaded", () => {
  stats = loadStats();
  updateDisplay();

  document.getElementById("rockButton").addEventListener("click", () => {
    playGame("rock");
  });

  document.getElementById("paperButton").addEventListener("click", () => {
    playGame("paper");
  });

  document.getElementById("scissorsButton").addEventListener("click", () => {
    playGame("scissors");
  });

  document.getElementById("resetButton").addEventListener("click", resetStats);
});
```

---

## Recent History Design

Recent history is optional but preferred.

If included, save the most recent 5 rounds.

Each history item should include:

```js
{
  playerChoice: "rock",
  computerChoice: "scissors",
  result: "win"
}
```

When adding a new history item:

1. Add it to the beginning of the history array
2. Keep only the 5 most recent items

Example:

```js
stats.history.unshift(newRound);
stats.history = stats.history.slice(0, 5);
```

---

## User Interface Structure

The page should use a simple card layout.

Suggested structure:

```html
<main class="app">
  <section class="game-card">
    <h1>Rock Paper Scissors</h1>
    <p>Choose your move and try to beat the computer.</p>

    <div class="choice-buttons">
      <!-- buttons -->
    </div>

    <section class="results">
      <!-- result text -->
    </section>

    <section class="stats">
      <!-- stats -->
    </section>

    <section class="history">
      <!-- optional history -->
    </section>

    <button id="resetButton">Reset Stats</button>
  </section>
</main>
```

---

## Styling Architecture

The CSS should use simple class names.

Recommended class names:

```css
.app
.game-card
.choice-buttons
.choice-button
.results
.result-win
.result-loss
.result-tie
.stats
.stat-card
.history
.reset-button
```

### Responsive Design

Use a mobile-first approach.

Default layout should work on small screens.

For wider screens, buttons and stats may be displayed in rows.

Example breakpoint:

```css
@media (min-width: 700px) {
  .choice-buttons {
    flex-direction: row;
  }
}
```

---

## Accessibility Plan

The app should be usable with keyboard and screen readers.

Requirements:

- Use real `<button>` elements
- Do not use clickable `<div>` elements
- Use clear text labels
- Keep strong color contrast
- Add visible focus styles
- Do not communicate results with color alone
- Use `aria-live="polite"` on the result message area

Example:

```html
<p id="resultMessage" aria-live="polite">
  Choose a move to start playing.
</p>
```

---

## Error Handling

The app should not crash if:

- `localStorage` is empty
- Saved data is malformed
- A DOM element is missing
- The user refreshes the page
- The user resets stats before playing

Use simple defensive checks where helpful.

---

## GitHub Pages Deployment Notes

The app must be GitHub Pages friendly.

Requirements:

- Use relative paths only
- Link CSS like this:

```html
<link rel="stylesheet" href="styles.css">
```

- Link JavaScript like this:

```html
<script src="script.js" defer></script>
```

- Do not use server routes
- Do not use imports that require a bundler
- Do not require npm
- Do not require environment variables

---

## Testing Checklist

Before considering the app finished, manually test:

- Page loads without errors
- Rock button works
- Paper button works
- Scissors button works
- Computer choice changes randomly
- Win logic is correct
- Loss logic is correct
- Tie logic is correct
- Wins update correctly
- Losses update correctly
- Ties update correctly
- Total games update correctly
- Stats remain after refresh
- Reset button clears stats
- Reset button asks for confirmation
- App works on a phone-sized screen
- App works from GitHub Pages

---

## Copilot Build Instructions

When building the app, Copilot should follow this order:

1. Create the HTML structure in `index.html`
2. Add clean responsive styling in `styles.css`
3. Add the JavaScript game logic in `script.js`
4. Add localStorage loading and saving
5. Add reset stats behavior
6. Add optional recent history
7. Check that the app works on GitHub Pages
8. Keep the code simple and beginner-friendly

Do not add extra features until the core game works correctly.

---

## Definition of Done

The app is complete when:

- The project uses only static files
- The player can select rock, paper, or scissors
- The computer selects a random choice
- The app correctly shows win, loss, or tie
- Stats update after each round
- Stats save in the browser
- Stats load correctly after refresh
- Reset clears stats after confirmation
- The layout is responsive
- The code is clear and easy to understand
- The app can be deployed on GitHub Pages
