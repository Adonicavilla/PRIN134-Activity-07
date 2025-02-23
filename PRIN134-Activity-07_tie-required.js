
// ====================== Activity 7 ==========================
class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.score = 0;
    }
}

const TROPHY = String.fromCodePoint(0x1F3C6);
const FIRE = String.fromCodePoint(0x1F525);
const BASKETBALL = String.fromCodePoint(0x1F3C0);

const players = [
    new Player("Curry", "Warriors"),
    new Player("Jordan", "Bulls"),
    new Player("Bryant", "Lakers"),
    new Player("James", "Lakers"),
    new Player("Durant", "Suns")
];

function getSuccessRate() {
    // make ties more likely
    return 0.6 + (Math.random() * 0.2); // it Returns between 0.6 and 0.8
}
function simulateShots(attempts) {
    let score = 0;
    const successRate = getSuccessRate();
    
    for(let i = 0; i < attempts; i++) {
        if(Math.random() < successRate) {
            score++;
        }
    }
    
    //make ties more common
    return Math.min(score, 3);
}
function simulateTiebreakerShots() {
    return Math.floor(Math.random() * 3) + 1; // Returns 1, 2, or 3
}
function displayRankings(playersList) {
    console.log(`${TROPHY} Rankings after this round:`);
    playersList.sort((a, b) => b.score - a.score);
    
    playersList.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - ${player.score} points`);
    });
    console.log();
}

function findTiedPlayers(playersList) {
    const maxScore = Math.max(...playersList.map(p => p.score));
    return playersList.filter(p => p.score === maxScore);
}

function handleTiebreaker(tiedPlayers) {
    console.log(`${FIRE} Tiebreaker needed between: ${tiedPlayers.map(p => p.name).join(', ')}`);
    console.log();
    console.log(`${BASKETBALL} Round 2 Begins!`);
    tiedPlayers.forEach(player => {
        player.score = simulateTiebreakerShots();
        console.log(`${player.name} scored ${player.score} successful shots.`);
    });
    
    console.log();
    displayRankings(tiedPlayers);
    
    const maxScore = Math.max(...tiedPlayers.map(p => p.score));
    const winners = tiedPlayers.filter(p => p.score === maxScore);
    
    if (winners.length > 1) {
        return handleTiebreaker(winners);
    }
    
    return winners[0];
}


function playGame() {
    // First round
    for (let i = 0; i < players.length; i++) {
        if (i < 3) {
            players[i].score = 3;
        } else {
            players[i].score = Math.floor(Math.random() * 1);
        }
    }
    
    displayRankings(players);

    const tiedPlayers = findTiedPlayers(players);
    if (tiedPlayers.length > 1) {
        const winner = handleTiebreaker(tiedPlayers);
        console.log(`${TROPHY} The champion is ${winner.name} with ${winner.score} points!`);
    }
}


playGame();


//  sir I required the tie breaker because u said that it sme with your output but if not sir, I create another file for that sir