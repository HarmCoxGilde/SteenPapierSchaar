document.addEventListener('DOMContentLoaded', function() {
    updateUI();
});

let isMuted = false;

document.getElementById('muteButton').addEventListener('click', function() {
    isMuted = !isMuted;
    document.getElementById('muteButton').textContent = isMuted ? "Unmute Sound" : "Mute Sound";
});

function playSound(sound) {
    if (!isMuted) {
        const audio = document.getElementById(`${sound}Sound`);
        audio.play();
    }
}

document.querySelectorAll('.keuze').forEach(button => {
    button.addEventListener('click', function() {
        playSound('click');
        speel(button.id);
    });
});

function speel(spelerKeuze) {
    const keuzes = ['steen', 'papier', 'schaar'];
    const computerKeuze = keuzes[Math.floor(Math.random() * 3)];
    const resultaat = bepaalWinnaar(spelerKeuze, computerKeuze);
    const resultaatDiv = document.getElementById('resultaat');
    resultaatDiv.innerHTML = `Jij koos: ${spelerKeuze}<br>Computer koos: ${computerKeuze}<br>${resultaat}`;
    updateBackgroundColor(resultaat);
    
    if (resultaat === 'Jij wint!') {
        updateScore('player');
    } else if (resultaat === 'Computer wint!') {
        updateScore('computer');
    } else {
        updateScore('draw');
    }
}


function bepaalWinnaar(speler, computer) {
    switch (true) {
        case speler === computer:
            return 'Gelijkspel!';
        case (speler === 'steen' && computer === 'schaar') ||
             (speler === 'papier' && computer === 'steen') ||
             (speler === 'schaar' && computer === 'papier'):
            return 'Jij wint!';
        default:
            return 'Computer wint!';
    }
}

function updateBackgroundColor(resultaat) {
    const resultaatDiv = document.getElementById('resultaat');
    resultaatDiv.className = '';
    switch (true) {
        case resultaat.includes('Jij wint!'):
            resultaatDiv.classList.add('win');
            playSound('win');
            break;
        case resultaat.includes('Computer wint!'):
            resultaatDiv.classList.add('lose');
            break;
        default:
            resultaatDiv.classList.add('draw');
    }
}

const score = {
    player: 0,
    computer: 0,
    rounds: 0,
    currentStreak: 0,
    highScore: parseInt(localStorage.getItem('highScore')) || 0
};

function updateScore(winner) {
    score.rounds++;
    if (winner === 'player') {
        score.player++;
        score.currentStreak++;
        if (score.currentStreak > score.highScore) {
            score.highScore = score.currentStreak;
            localStorage.setItem('highScore', score.highScore.toString());
        }
    } else if (winner === 'computer') {
        score.computer++;
        score.currentStreak = 0;
    } else {
        
    }
    updateUI();
}

function updateUI() {
    document.getElementById('playerScore').textContent = `Player Score: ${score.player}`;
    document.getElementById('computerScore').textContent = `Computer Score: ${score.computer}`;
    document.getElementById('highScore').textContent = `High Score: ${score.highScore}`;
    document.getElementById('currentStreak').textContent = `Current Streak: ${score.currentStreak}`;
    document.getElementById('rounds').textContent = `Rounds Played: ${score.rounds}`;
}