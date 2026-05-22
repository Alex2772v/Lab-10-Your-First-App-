# AGENTS.md

## Project Overview

Build a simple **Rock Paper Scissors** web app that can be hosted on **GitHub Pages**.

The app should be beginner-friendly, lightweight, and work entirely in the browser. It should not require a backend, database, server, login system, API key, or build process.

The app should save game information in the user's browser using `localStorage`.

## Tech Stack

Use only:

- HTML
- CSS
- JavaScript

Do not use:

- React
- Vue
- Angular
- Node.js
- Express
- Databases
- External APIs
- Backend code
- Build tools unless absolutely necessary

The app must run directly from static files on GitHub Pages.

## Recommended File Structure

Use this structure:

```text
/
├── index.html
├── styles.css
├── script.js
├── README.md
└── AGENTS.md
```

## App Requirements

The app should let the user play Rock Paper Scissors against the computer.

The user should be able to choose:

- Rock
- Paper
- Scissors

The computer should randomly choose one of the three options.

The app should then display:

- The player's choice
- The computer's choice
- Whether the player won, lost, or tied

## Game Logic Rules

Use the normal Rock Paper Scissors rules:

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Same choices result in a tie

The game logic should be clear and easy to understand. Avoid overly complicated code.

## Browser Storage Requirements

Use `localStorage` to save game information in the browser.

Save at least:

- Total wins
- Total losses
- Total ties
- Total games played

Optional but preferred:

- Recent game history
- Last player choice
- Best win streak
- Current win streak

Use clear `localStorage` keys, such as:

```js
rpsWins
rpsLosses
rpsTies
rpsTotalGames
rpsGameHistory
rpsCurrentStreak
rpsBestStreak
```

When the page reloads, the saved stats should still appear.

## Reset Feature

Include a **Reset Stats** button.

When clicked, it should:

- Clear the saved localStorage stats
- Reset the displayed stats back to zero
- Clear recent game history if game history is included

Ask for confirmation before resetting stats.

Example:

```js
confirm("Are you sure you want to reset your stats?");
```

## User Interface Requirements

The design should be clean, simple, and easy to use.

The page should include:

- A title
- Short instructions
- Three buttons for Rock, Paper, and Scissors
- A results section
- A stats section
- A reset button

The layout should work well on:

- Desktop
- Laptop
- Tablet
- Phone

Use responsive CSS.

## Suggested Page Layout

The page can be organized like this:

```text
Rock Paper Scissors

Choose your move:
[Rock] [Paper] [Scissors]

You chose: Rock
Computer chose: Scissors
Result: You win!

Stats:
Wins: 1
Losses: 0
Ties: 0
Total Games: 1

[Reset Stats]
```

## Styling Guidelines

Use a simple modern design.

Preferred style:

- Centered layout
- Clean card-style container
- Large readable buttons
- Clear result message
- Good spacing
- Mobile-friendly design

Use colors that make the app feel fun but not overwhelming.

Suggested colors:

- Dark blue or purple header/accent
- Light background
- White or light card container
- Green for wins
- Red for losses
- Gray or yellow for ties

Do not over-design the app. Keep it simple and polished.

## JavaScript Guidelines

Keep JavaScript in `script.js`.

The JavaScript should:

1. Load saved stats from `localStorage`
2. Display the saved stats when the page loads
3. Let the player select Rock, Paper, or Scissors
4. Generate a random computer choice
5. Decide the winner
6. Update the page with the result
7. Update the saved stats in `localStorage`
8. Allow the user to reset stats

Use clear function names, such as:

```js
loadStats()
saveStats()
playGame(playerChoice)
getComputerChoice()
determineWinner(playerChoice, computerChoice)
updateStats(result)
updateDisplay()
resetStats()
```

Avoid unnecessary complexity.

## Accessibility Requirements

Make the app accessible and easy to use.

Include:

- Proper button elements
- Clear text labels
- Good color contrast
- Keyboard-friendly controls
- Readable font sizes
- Helpful result messages

Do not rely only on color to explain win/loss/tie results. Always include text.

## GitHub Pages Requirements

The app must work on GitHub Pages.

Important:

- Use relative file paths
- Do not use server-side code
- Do not use environment variables
- Do not require npm install
- Do not require a local server to run

The app should work by opening `index.html` directly in a browser.

## README Requirements

Create a simple `README.md` that includes:

- Project name
- Short description
- Features
- How to play
- How browser saving works
- GitHub Pages deployment note

Example README sections:

```md
# Rock Paper Scissors

A simple browser-based Rock Paper Scissors game.

## Features

- Play against the computer
- Tracks wins, losses, ties, and total games
- Saves stats in the browser using localStorage
- Reset stats button
- Works on GitHub Pages

## How to Play

Choose Rock, Paper, or Scissors. The computer randomly chooses one too. The app shows who won and updates your stats.

## Browser Storage

This app uses localStorage to save stats in the browser. Stats stay saved after refreshing the page.
```

## Code Quality Expectations

Write clean, readable code.

Use:

- Clear variable names
- Simple functions
- Comments only where helpful
- Consistent formatting

Avoid:

- Overly advanced JavaScript
- Unnecessary libraries
- Complicated file structures
- Hidden dependencies
- Code that only works locally

## Acceptance Criteria

The project is complete when:

- The user can play Rock Paper Scissors
- The computer makes a random choice
- The app correctly decides win, loss, or tie
- Stats update after each round
- Stats save after refreshing the page
- Reset button clears the stats
- The app works on GitHub Pages
- The design is clean and responsive
- The code is easy for a beginner to understand

## Copilot Instructions

When generating code for this project:

- Follow the requirements in this file
- Keep the app static and GitHub Pages compatible
- Use plain HTML, CSS, and JavaScript
- Save data with localStorage
- Keep the code beginner-friendly
- Do not add unnecessary frameworks or backend features
- Make sure the app works before adding extra features
