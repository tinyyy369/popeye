const scoreEl = document.getElementById('score');
const leaderboardEl = document.getElementById('leaderboard');
const nicknameEl = document.getElementById('nicknameDisplay');
const sound = document.getElementById('popSound');
const body = document.getElementById('main');

// ชื่อเล่น
let nickname = localStorage.getItem('nickname');
if (!nickname) {
  nickname = prompt("กรุณาใส่ชื่อเล่น (ตั้งได้ครั้งเดียว):").trim();
  if (!nickname) nickname = "Guest";
  localStorage.setItem('nickname', nickname);
}
nicknameEl.textContent = `ชื่อ: ${nickname}`;

// คะแนน
let score = parseInt(localStorage.getItem('score')) || 0;
updateScoreDisplay();
updateLeaderboard();

// คลิกพื้นหลัง
document.body.addEventListener('click', () => {
  addScore(1);
});

// มือถือ รองรับแค่ 1 จุดสัมผัส
document.body.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    addScore(1);
  }
});

function addScore(points) {
  score += points;
  localStorage.setItem('score', score);
  updateScoreDisplay();
  playSound();
  updateLeaderboard();
  flashBackground();
}

function updateScoreDisplay() {
  scoreEl.textContent = score;

  if (score >= 1_000_000_000) {
    scoreEl.style.color = 'darkgreen';
  } else if (score >= 1_000_000) {
    scoreEl.style.color = 'red';
  } else if (score >= 100_000) {
    scoreEl.style.color = 'yellow';
  } else if (score >= 10_000) {
    scoreEl.style.color = 'blue';
  } else if (score >= 1_000) {
    scoreEl.style.color = 'lightgreen';
  } else {
    scoreEl.style.color = 'black';
  }
}

function playSound() {
  const newSound = sound.cloneNode();
  newSound.play().catch(() => {});
}

function updateLeaderboard() {
  let board = JSON.parse(localStorage.getItem('leaderboard')) || {};
  board[nickname] = score;
  localStorage.setItem('leaderboard', JSON.stringify(board));

  const sorted = Object.entries(board)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  leaderboardEl.innerHTML = `<h3>Leaderboard</h3><ul>${
    sorted.map(([name, sc]) => `<li>${name}: ${sc}</li>`).join('')
  }</ul>`;
}

function flashBackground() {
  body.classList.add('clicked');
  setTimeout(() => body.classList.remove('clicked'), 150);
}