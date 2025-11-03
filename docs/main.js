const correctText = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
const inputEl = document.getElementById('input');
const timerEl = document.getElementById('timer');
const rankingEl = document.getElementById('ranking');

let startTime = null;
let timerInterval = null;

function startTimer() {
  startTime = performance.now();
  timerInterval = setInterval(() => {
    const currentTime = (performance.now() - startTime) / 1000;
    timerEl.textContent = `タイム: ${currentTime.toFixed(3)} 秒`;
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
  const finalTime = (performance.now() - startTime) / 1000;
  timerEl.textContent = `タイム: ${finalTime.toFixed(3)} 秒`;
  return finalTime;
}

function saveRanking(time) {
  const ranking = JSON.parse(localStorage.getItem('typingRanking')) || [];
  ranking.push(time);
  ranking.sort((a, b) => a - b);
  const top10 = ranking.slice(0, 10);
  localStorage.setItem('typingRanking', JSON.stringify(top10));
  displayRanking();
}

function displayRanking() {
  const ranking = JSON.parse(localStorage.getItem('typingRanking')) || [];
  rankingEl.innerHTML = '';
  ranking.forEach((time, index) => {
    const li = document.createElement('li');
    li.textContent = `${(index + 1)}位: ${time.toFixed(3)} 秒`;
    rankingEl.appendChild(li);
  });
}

inputEl.addEventListener('input', () => {
  const value = inputEl.value.toUpperCase();

  if (value.length === 1 && !startTime) {
    startTimer();
  }

  if (value === correctText) {
    const time = stopTimer();
    saveRanking(time);
    inputEl.disabled = true;
  }
});

window.addEventListener('load', displayRanking);
