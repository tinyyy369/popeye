let score = parseInt(localStorage.getItem("score")) || 0;
let isBg2 = false;
let bg = document.getElementById("bg");
let scoreDisplay = document.getElementById("score");
let latestDisplay = document.getElementById("latest");
let clickSound = document.getElementById("clickSound");

updateScoreUI();

document.body.addEventListener("click", (e) => {
  if (e.target !== bg) return;

  // เพิ่มคะแนน
  score += 1;
  localStorage.setItem("score", score);
  updateScoreUI();

  // เล่นเสียงเฉพาะตอนคลิกครั้งแรก (เปลี่ยน bg)
  if (!isBg2) {
    bg.style.backgroundImage = "url('bg2.jpg')";
    isBg2 = true;
    clickSound.currentTime = 0;
    clickSound.play();

    // กลับไป bg เดิมหลัง 150ms
    setTimeout(() => {
      bg.style.backgroundImage = "url('bg1.jpg')";
      isBg2 = false;
    }, 150);
  }
});

function updateScoreUI() {
  scoreDisplay.textContent = score;
  latestDisplay.textContent = `แก่`;
  scoreDisplay.style.color = getScoreColor(score);
}

function getScoreColor(score) {
  if (score < 1000) return getRainbowColor(score);
  else if (score < 10000) return "lightgreen";
  else if (score < 100000) return "blue";
  else if (score < 1000000) return "yellow";
  else if (score < 1000000000) return "red";
  else return "darkgreen";
}

// สุ่มสีเรนโบว
function getRainbowColor(score) {
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  return colors[score % colors.length];
}