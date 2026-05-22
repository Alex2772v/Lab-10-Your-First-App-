# Rock Paper Scissors

A simple, beginner-friendly Rock Paper Scissors game built with vanilla HTML, CSS, and JavaScript.

## Features

- **Play against the computer** - Challenge the computer to random rounds of Rock Paper Scissors
- **Stat tracking** - Keeps track of your wins, losses, ties, and total games played
- **Win streaks** - Monitor your current win streak and personal best
- **Game history** - View your last 5 games with results
- **Browser storage** - Your stats are saved automatically using `localStorage` and persist after page refresh
- **Reset button** - Clear your stats and start fresh (with confirmation)
- **Responsive design** - Works great on desktop, tablet, and mobile devices
- **Accessible** - Keyboard-friendly controls and screen reader compatible

## How to Play

1. Click one of the three buttons: **Rock**, **Paper**, or **Scissors**
2. The computer will randomly choose one of the three options
3. The app will determine the winner based on classic rules:
   - Rock beats Scissors
   - Scissors beats Paper
   - Paper beats Rock
   - Same choice = Tie
4. Your stats update automatically after each round
5. Repeat as many times as you want!

## Browser Storage

This app uses the browser's `localStorage` feature to save your game statistics. This means:

- Your stats are saved automatically after each game
- Stats persist even after closing the browser
- Stats remain after refreshing the page
- Each browser/device has its own stats (clearing browser data will reset stats)

## GitHub Pages

This app is fully compatible with GitHub Pages and can be hosted as a static website. Simply enable GitHub Pages in your repository settings and point it to the main branch.

## Technology

- **HTML5** - Semantic markup and structure
- **CSS3** - Responsive design and styling
- **Vanilla JavaScript** - No frameworks or libraries required
- **localStorage API** - Browser-based data persistence

## Local Development

Simply open `index.html` in your browser. No server or build process required!

## Project Structure

```
/
├── index.html      # Page structure and layout
├── styles.css      # All styling and responsive design
├── script.js       # Game logic and interactions
├── README.md       # This file
├── AGENTS.md       # Project requirements
└── ARCHITECTURE.md # Technical architecture
```

## Stats Tracked

- **Wins** - Total games you've won
- **Losses** - Total games you've lost
- **Ties** - Total games that ended in a tie
- **Total Games** - Total rounds played
- **Current Streak** - Your current win streak
- **Best Streak** - Your best win streak ever
- **Recent Games** - Last 5 games with results

## Accessibility

The app includes several accessibility features:

- Real `<button>` elements for all interactive controls
- Clear text labels and descriptions
- Strong color contrast for readability
- Keyboard-navigable controls
- ARIA live regions for dynamic content updates
- Visible focus states for keyboard navigation

## License

This project is open source and available under the MIT License.
