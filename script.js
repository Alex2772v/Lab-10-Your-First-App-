// Game state
let stats = {};

const choices = ["rock", "paper", "scissors"];
const choiceEmojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

// Load stats from localStorage
function loadStats() {
  const defaultStats = {
    wins: 0,
    losses: 0,
    ties: 0,
    totalGames: 0,
    currentStreak: 0,
    bestStreak: 0,
    history: []
  };

  try {
    const savedStats = localStorage.getItem("rpsStats");
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      return { ...defaultStats, ...parsedStats };
    }
  } catch (error) {
    console.error("Error loading stats:", error);
  }

  return defaultStats;
}

// Save stats to localStorage
function saveStats() {
  try {
    localStorage.setItem("rpsStats", JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving stats:", error);
  }
}

// Get random computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Determine winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    return "win";
  }

  return "loss";
}

// Update stats
function updateStats(result) {
  stats.totalGames++;

  if (result === "win") {
    stats.wins++;
    stats.currentStreak++;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  } else if (result === "loss") {
    stats.losses++;
    stats.currentStreak = 0;
  } else if (result === "tie") {
    stats.ties++;
  }

  saveStats();
}

// Update display
function updateDisplay(playerChoice, computerChoice, result) {
  // Update choices
  const playerChoiceEl = document.getElementById("playerChoice");
  const computerChoiceEl = document.getElementById("computerChoice");
  const resultMessageEl = document.getElementById("resultMessage");

  if (playerChoice && computerChoice) {
    playerChoiceEl.textContent = `You chose: ${choiceEmojis[playerChoice]} ${capitalize(playerChoice)}`;
    computerChoiceEl.textContent = `Computer chose: ${choiceEmojis[computerChoice]} ${capitalize(computerChoice)}`;

    // Update result message
    let resultText = "";
    resultMessageEl.className = "result-message";

    if (result === "win") {
      resultText = "🎉 You win!";
      resultMessageEl.classList.add("win");
    } else if (result === "loss") {
      resultText = "😢 You lose!";
      resultMessageEl.classList.add("loss");
    } else if (result === "tie") {
      resultText = "🤝 It's a tie!";
      resultMessageEl.classList.add("tie");
    }

    resultMessageEl.textContent = resultText;

    // Add to history
    addToHistory(playerChoice, computerChoice, result);
  }

  // Update stats display
  document.getElementById("wins").textContent = stats.wins;
  document.getElementById("losses").textContent = stats.losses;
  document.getElementById("ties").textContent = stats.ties;
  document.getElementById("totalGames").textContent = stats.totalGames;
  document.getElementById("currentStreak").textContent = stats.currentStreak;
  document.getElementById("bestStreak").textContent = stats.bestStreak;
}

// Add to history
function addToHistory(playerChoice, computerChoice, result) {
  const newRound = {
    playerChoice,
    computerChoice,
    result
  };

  stats.history.unshift(newRound);
  stats.history = stats.history.slice(0, 5);

  displayHistory();
}

// Display history
function displayHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  stats.history.forEach((round) => {
    const li = document.createElement("li");
    li.className = `history-item ${round.result}`;
    
    const choices = `${choiceEmojis[round.playerChoice]} vs ${choiceEmojis[round.computerChoice]}`;
    const resultText = round.result.charAt(0).toUpperCase() + round.result.slice(1);
    
    li.innerHTML = `
      <span>${choices}</span>
      <span class="history-badge ${round.result}">${resultText}</span>
    `;
    
    historyList.appendChild(li);
  });
}

// Play game
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  
  updateStats(result);
  updateDisplay(playerChoice, computerChoice, result);
}

// Reset stats
function resetStats() {
  if (confirm("Are you sure you want to reset your stats?")) {
    stats = {
      wins: 0,
      losses: 0,
      ties: 0,
      totalGames: 0,
      currentStreak: 0,
      bestStreak: 0,
      history: []
    };

    saveStats();
    updateDisplay();
    displayHistory();
    
    const resultMessageEl = document.getElementById("resultMessage");
    resultMessageEl.className = "result-message";
    resultMessageEl.textContent = "Stats reset! Choose a move to start playing.";
  }
}

// Helper function to capitalize strings
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  stats = loadStats();
  updateDisplay();
  displayHistory();

  // Add event listeners
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
