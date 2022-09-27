const TIME_LIMIT = 4 * 60;
let initTimeLeft = window.timeLeft;
let frozen = false;

if (getFrozen()) {
  initTimeLeft = TIME_LIMIT;
  document.getElementById("puztimer").style.display = "";
}

const covered = [];
for (let i = 0; i < 50; i++) {
  covered.push(false);
}

const main = () => {
  const data = window.lightsData;
  const timer = document.getElementById("puztime");
  const lights = data.map((_, i) => document.getElementById(`light-${i}`));
  const pointer = Array(lights.length).fill(0);
  let start = 0;

  const step = (time) => {
    if (start === 0) start = time;
    const elapsed = (time - start) / 1000;
    let timeLeft = Math.floor(initTimeLeft - elapsed);
    if (timeLeft < 0) timeLeft = 0;
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timer.innerText = `${minutes} : ${seconds}`;

    if (frozen) return;
    if (elapsed >= initTimeLeft) {
      doGlitch(false);
      return;
    }

    const done = lights
      .map((light, i) => {
        while (data[i][pointer[i]]?.time <= TIME_LIMIT - (initTimeLeft - elapsed)) pointer[i] += 1;
        const { turn_on } = data[i][pointer[i] - 1] ?? {};
        light.style.background = turn_on ? "var(--on)" : "var(--off)";
        return pointer[i] === data[i].length;
      })
      .every(Boolean);

    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);

  const coveredHTML = "<div class=\"cover\"></div>";

  window.toggleLight = (i) => {
    covered[i] = !covered[i];
    if (covered[i]) {
      lights[i].innerHTML = coveredHTML;
    }
    else {
      lights[i].innerHTML = "";
    }
  }
  window.coverAll = () => {
    for (let i = 0; i < 50; i++) {
      covered[i] = true;
      lights[i].innerHTML = coveredHTML;
    }
  };
  window.uncoverAll = () => {
    for (let i = 0; i < 50; i++) {
      covered[i] = false;
      lights[i].innerHTML = "";
    }
  };
  window.coverAll();
};

main();

registerOnGlitchHook((ex) => {
  frozen = true;
});
