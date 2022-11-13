export function treatWinner(player, state) {
  player.wins++;
  //player.locked = false;
  player.winner = true;
  /*
  for (const p of state.players) {
    p.lost = p !== player;
    p.isPlaying = p === player;
  }
  */
  //state.playerIndex = player.playerNum;

  console.log(`Player ${state.playerIndex + 1} won!`);
}
export function treatLoser(player /*,state*/) {
  player.lost = true;
  player.isPlaying = false;
  /*
  const otherPlaying = state.players.filter((p) => p.isPlaying && !p.locked);
  if (otherPlaying.length > 1) {
    state.playerIndex = otherPlaying[0].playerNum;
  } else if (otherPlaying.length === 1) {
    //otherPlaying[0].locked = true;
    //calculate max score from all not losers:
    const scoresToCompare = state.players.map((p) =>
      p.isplaying ? p.totalScore : 0
    );
    const winnerScore = Math.max(scoresToCompare);
    const winners = state.players.filter((p) => p.totalScore === winnerScore);
    for (const winner of winners) {
      treatWinner(winner, state);
    }
    
    //treatWinner(otherPlaying[0], state);
  }
  */
}
export function findWinners(players) {
  const results = players.map((p) => (p.lost ? 0 : p.totalScore));
  const maxResult = Math.max(...results);
  const winners = players.filter((p) => p.totalScore === maxResult);
  return winners;
}
export function resetPlayer(player, hard = false) {
  if (hard) {
    player.lost = false;
    player.winner = false;
    player.locked = false;
    //player.isPlaying = true;
    player.totalScore = 0;
  }
  player.currentScore = 0;
}
