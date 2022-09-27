const gid = (id) => document.getElementById(id);
const render = (id, ...nodes) => gid(id).replaceWith(h(`#${id}`, ...nodes));

function setOpacity(id, num) {
  gid(`opacities-${id}`).style.opacity = num;
}

let extractCorrect = [0, 0, 0, 0, 0];
function setExtract(id, val) {
  const correct = "CLEAR";
  gid(`concatenated-extract-${id}`).innerHTML = val;
  gid(`concatenated-correct-${id}`).innerHTML = val === correct[id] ? "✓" : "✗";
  if (val === correct[id]) {
    extractCorrect[id] = 1;
  }
}

let quads = [0, 0, 0, 0];
function resetPoints() {
  quads = [0, 0, 0, 0];
  Array.from(gid("memory-1").children)
    .filter((e) => e.tagName === "line")
    .map((e) => e.remove());
  [0, 1, 2, 3].forEach((id) => setOpacity(id, 0));
}

function addPoint(x2, y2) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", "line");
  Object.entries({
    x1: 0,
    y1: 0,
    x2,
    y2,
    stroke: "black",
    "stroke-width": "3",
  }).forEach(([k, v]) => e.setAttribute(k, v));
  gid("memory-1").appendChild(e);
}

let extract = "";
function resetExtract() {
  extractCorrect = [0, 0, 0, 0, 0];
  extract = "";
  [0, 1, 2, 3, 4].forEach((id) => {
    gid(`concatenated-extract-${id}`).innerHTML = "·";
    gid(`concatenated-correct-${id}`).innerHTML = "&nbsp;";
  });
}

function solve(answer) {
  const now = Date.now();
  const sec = Math.floor(now / 1000);
  const msec = now % 1000;
  const quad = Math.floor(sec / 15) % 4;
  const theta = ((sec + msec / 1000) / 60) * 2 * Math.PI;
  quads[quad] += 1;
  addPoint(90 * Math.sin(theta), -90 * Math.cos(theta));
  setOpacity(quad, quads[quad] >= 5 ? 1 : quads[quad] / 10);
  extract += answer.replace(/[^A-Z]/g, "");
  [7, 19, 27, 39, 53].forEach(
    (ind, id) => extract[ind] && setExtract(id, extract[ind])
  );
}

let unlockedRound = "";
let solved = {};
function reset() {
  unlockedRound = "";
  solved = {};
  resetPoints();
  resetExtract();
  gid("status").innerHTML = "";
}

function renderTable() {
  const solveThis = (e, name, answer) => {
    e.preventDefault();
    if (unlockedRound !== "") {
      // do nothing
      return;
    }
    solved[name] = answer;
    if (name === "The Line") {
      // lock the 2021 round
      unlockedRound = "Forward";
      if (extractCorrect.every((x) => x === 1)) {
        unlockedRound = "World's End Concert";
      } else if (quads[0] >= 5) {
        unlockedRound = "Spring season of the Hibernating and Flying South";
      } else if (quads[1] >= 5) {
        unlockedRound = "Summer season of the Hibernating and Flying South";
      } else if (quads[2] >= 5) {
        unlockedRound = "Autumn season of the Hibernating and Flying South";
      } else if (quads[3] >= 5) {
        unlockedRound = "Winter season of the Hibernating and Flying South";
      }
      gid("gadget-1").classList.add("disabled-gadget");
      gid("gadget-2").classList.add("disabled-gadget");
      gid("status").innerHTML =
        answer === "MORE TIME"
          ? "The exam would now reset, which you can simulate by refreshing the page."
          : `The wormhole would now be available, and would lead to the ${unlockedRound} round.`;
    } else {
      solve(answer);
    }
    renderTable();
  };
  render(
    "exam-table",
    h(
      "table",
      { style: { margin: "auto" } },
      h(
        "tr",
        h("th", "Puzzle Name"),
        h("th", "Answer", { width: "200px" }),
        h("th", "Alternate answer", { width: "200px" })
      ),
      intro_puzzles.map(({ name, answer, alternate }) =>
        h(
          "tr",
          h("td", { style: { maxWidth: "300px" } }, name),
          solved[name]
            ? [
                h(
                  "td",
                  { colspan: 2 },
                  "Solved! Answer: ",
                  h("span.solved-title-answer", solved[name])
                ),
              ]
            : [
                h(
                  "td.spoiler",
                  {
                    style: {
                      fontFamily: "Recursive, monospace",
                      cursor: "pointer",
                    },
                  },
                  { onclick: (e) => solveThis(e, name, answer) },
                  answer
                ),
                h(
                  "td.spoiler",
                  {
                    style: {
                      fontFamily: "Recursive, monospace",
                      cursor: "pointer",
                    },
                  },
                  { onclick: (e) => solveThis(e, name, alternate) },
                  h("span.glitch", { "data-text": alternate }, alternate)
                ),
              ]
        )
      )
    )
  );
}

reset();
renderTable();
