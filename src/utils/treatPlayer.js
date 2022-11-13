export function treatWinner(player) {
  player.wins++;
  player.locked = true;
  player.winner = true;
}
export function findWinners(players) {
  const results = players.map((p) => (p.lost ? 0 : p.totalScore));
  const maxResult = Math.max(...results);
  return players.filter((p) => p.totalScore === maxResult);
}
export function resetPlayer(player, hard = false) {
  if (hard) {
    player.lost = false;
    player.winner = false;
    player.locked = false;
    player.totalScore = 0;
  }
  player.currentScore = 0;
}
