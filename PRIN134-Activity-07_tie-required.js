const TROPHY = "🏆";
const FIRE = "🔥";
const BASKETBALL = "🏀";
        class Player {
            constructor(name, team) {
                this.name = name;
                this.team = team;
                this.score = 0;
            }
        }
        

        let players = [
            new Player("Adonica", "Lakers"),
        ];
        
        const playerNameInput = document.getElementById("player-name");
        const playerTeamInput = document.getElementById("player-team");
        const addPlayerBtn = document.getElementById("add-player-btn");
        const startGameBtn = document.getElementById("start-game-btn");
        const resetGameBtn = document.getElementById("reset-game-btn");
        const playersBody = document.getElementById("players-body");
        const gameLog = document.getElementById("game-log");

        function initPlayersTable() {
            playersBody.innerHTML = "";
            
            players.forEach((player, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${player.name}</td>
                    <td>${player.team}</td>
                    <td id="score-${index}">${player.score}</td>
                    <td class="player-actions">
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                `;
                playersBody.appendChild(row);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    deletePlayer(index);
                });
            });
        }
        
        function addPlayer() {
            const name = playerNameInput.value.trim();
            const team = playerTeamInput.value.trim();
            
            if (name && team) {
                players.push(new Player(name, team));
                initPlayersTable();
                
                playerNameInput.value = "";
                playerTeamInput.value = "";
                
                logMessage(`Added new player: ${name} (${team})`);
            } else {
                logMessage("Please enter both player name and team.");
            }
        }

        function deletePlayer(index) {
            const playerName = players[index].name;
            players.splice(index, 1);
            initPlayersTable();
            logMessage(`Removed player: ${playerName}`);
        }

        function resetGame() {
            players.forEach(player => {
                player.score = 0;
            });
            initPlayersTable();
            
            gameLog.innerHTML = '<div class="log-item">Game has been reset. All scores are back to 0.</div>';
        }

        function logMessage(message) {
            const logItem = document.createElement("div");
            logItem.className = "log-item";
            logItem.innerHTML = message;
            gameLog.appendChild(logItem);
            gameLog.scrollTop = gameLog.scrollHeight;
        }
        
        function updateScores() {
            players.forEach((player, index) => {
                const scoreCell = document.getElementById(`score-${index}`);
                if (scoreCell) {
                    scoreCell.textContent = player.score;
                }
            });
        }
        
        function getSuccessRate() {
            return 0.6 + (Math.random() * 0.2); 
        }
        
        function simulateShots(attempts) {
            let score = 0;
            const successRate = getSuccessRate();
            
            for(let i = 0; i < attempts; i++) {
                if(Math.random() < successRate) {
                    score++;
                }
            }
 
            return Math.min(score, 3);
        }
        
        function simulateTiebreakerShots() {
            return Math.floor(Math.random() * 3) + 1;
        }
        
        function displayRankings(playersList) {
            logMessage(`${TROPHY} Rankings after this round:`);
            playersList.sort((a, b) => b.score - a.score);
            
            let rankingMessage = "<table width='100%'><tr><th>#</th><th>Player</th><th>Team</th><th>Score</th></tr>";
            
            playersList.forEach((player, index) => {
                rankingMessage += `<tr><td>${index + 1}.</td><td>${player.name}</td><td>${player.team}</td><td>${player.score}</td></tr>`;
            });
            
            rankingMessage += "</table>";
            logMessage(rankingMessage);
            updateScores();
        }
        
        function findTiedPlayers(playersList) {
            const maxScore = Math.max(...playersList.map(p => p.score));
            return playersList.filter(p => p.score === maxScore);
        }
        
        function handleTiebreaker(tiedPlayers) {
            logMessage(`${FIRE} Tiebreaker needed between: ${tiedPlayers.map(p => p.name).join(', ')}`);
            
            setTimeout(() => {
                logMessage(`${BASKETBALL} Round 2 Begins!`);
                
                tiedPlayers.forEach(player => {
                    player.score = simulateTiebreakerShots();
                    logMessage(`${player.name} scored ${player.score} successful shots.`);
                });
                
                displayRankings(tiedPlayers);
                
                const maxScore = Math.max(...tiedPlayers.map(p => p.score));
                const winners = tiedPlayers.filter(p => p.score === maxScore);
                
                if (winners.length > 1) {
                    setTimeout(() => {
                        handleTiebreaker(winners);
                    }, 1500);
                } else {
                    logMessage(`${TROPHY} The champion is ${winners[0].name} with ${winners[0].score} points!`);
                }
            }, 1500);
        }
        
        function playGame() {
            resetGame();
            
            if (players.length < 2) {
                logMessage("Need at least 2 players to start the game!");
                return;
            }
            
            logMessage("Game started! Simulating first round...");
    
            setTimeout(() => {
                players.forEach(player => {
                    player.score = simulateShots(5);
                    logMessage(`${player.name} scored ${player.score} points`);
                });
                
                updateScores();
                displayRankings(players);
                
                const tiedPlayers = findTiedPlayers(players);
                if (tiedPlayers.length > 1) {
                    setTimeout(() => {
                        handleTiebreaker(tiedPlayers);
                    }, 1500);
                } else {
                    logMessage(`${TROPHY} The champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!`);
                }
            }, 1000);
        }
        
        addPlayerBtn.addEventListener('click', addPlayer);
        startGameBtn.addEventListener('click', playGame);
        resetGameBtn.addEventListener('click', resetGame);

        document.addEventListener('DOMContentLoaded', function() {
            initPlayersTable();
        });

        initPlayersTable();