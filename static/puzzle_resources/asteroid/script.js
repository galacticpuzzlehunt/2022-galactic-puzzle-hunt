const createAsteroidButton = (onClick) => {
  const e = document.createElement("button");
  e.className = "btn asteroid-btn";
  e.style = `
    display: inline-block;
    font-size: 1.5rem;
    padding: 0 0.5rem;
    height: 2.6rem;
    line-height: 2.6rem;
    margin: 0
  `;
  e.innerHTML = `<svg width="27" height="27" viewBox="-10 -10 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="6" stroke="#222" fill="none" stroke-width="1.5"/>
      <line x1="0" y1="3" x2="0" y2="8" stroke="#222" fill="none" stroke-width="1.5"/>
      <line x1="0" y1="-3" x2="0" y2="-8" stroke="#222" fill="none" stroke-width="1.5"/>
      <line x1="3" y1="0" x2="8" y2="0" stroke="#222" fill="none" stroke-width="1.5"/>
      <line x1="-3" y1="0" x2="-8" y2="0" stroke="#222" fill="none" stroke-width="1.5"/>
    </svg>`;
  e.addEventListener("click", onClick);
  return e;
};

const coins = [
  ["S", 1, 3, 7, 0],
  ["S", 1, 3, 7, 1],
  ["E", 1, 1, 7, 2],
  ["M", 1, 1, 12, 3],
  ["E", 8, 3, 7, 4],
  ["E", 1, 7, 3, 5],
  ["I", 1, 10, 8, 6],
  ["V", 1, 10, 3, 7],
  ["E", 8, 3, 3, 8],
  ["A", 7, 1, 12, 9],
  ["N", 7, 1, 1, 10],
  ["C", 7, 10, 8, 11],
  ["D", 8, 7, 3, 12],
  ["E", 7, 10, 1, 13],
];

const loc = [1, 3, 7];

const foundCoin = coins.map(() => false);
foundCoin[0] = true;
foundCoin[1] = true;

let fuelLeft = 100;

const updateFoundCoins = () =>
  coins.forEach(([_, x, y, z, i]) => {
    const [lx, ly, lz] = loc;
    const dist = [lx - x, ly - y, lz - z]
      .map(Math.abs)
      .reduce((x, y) => x + y, 0);
    if (dist === 0) foundCoin[i] = true;
  });

const allFound = () => foundCoin.every((x) => x);

const gid = (id) => document.getElementById(id);
const render = (id, ...nodes) => gid(id).replaceWith(h(`#${id}`, ...nodes));

const solve = (puzzle) => {
  const coord = [
    "World's End Concert",
    "Hibernating and Flying South",
    "Forward",
  ].indexOf(puzzle.round);
  const old = loc[coord];
  const now = puzzle.coordinate;
  if (now !== 0) fuelLeft -= Math.abs(old - now);
  if (fuelLeft >= 0) {
    if (now !== 0) loc[coord] = now;
    updateFoundCoins();
  }
  renderCoins();
  renderFuel();
};

let currentRound = "Forward";
const renderRound = () => {
  render(
    "endgame-table",
    { style: { marginTop: "1em" } },
    h(
      "div",
      { style: { margin: "auto", width: "fit-content" } },
      asteroidData
        .map((puzzle) => puzzle.round)
        .filter((v, i, s) => s.indexOf(v) === i)
        .map((round) =>
          h("button.btn", { style: { marginRight: "1em" } }, round, {
            onclick: () => {
              currentRound = round;
              renderRound();
            },
          })
        )
    ),
    h(
      "table",
      { style: { margin: "auto" } },
      asteroidData
        .filter((puzzle) => puzzle.round === currentRound)
        .map((puzzle) =>
          h(
            "tr",
            h("td", puzzle.name),
            h(
              "td",
              createAsteroidButton(() => solve(puzzle))
            )
          )
        )
    )
  );
};
renderRound();

const renderCoins = () => {
  render(
    "radar",
    h("div", "Radar:"),
    h(
      "div",
      { style: { display: "flex" } },
      [coins.slice(0, 5), coins.slice(5, 10), coins.slice(10, 15)].map((cs) =>
        h(
          "table",
          cs.map(([letter, x, y, z, i]) => {
            const [lx, ly, lz] = loc;
            const dist = [lx - x, ly - y, lz - z]
              .map(Math.abs)
              .reduce((x, y) => x + y, 0);
            return h(
              "tr",
              h(
                "td",
                h(
                  `.coin${dist === 0 ? ".active" : ""}`,
                  foundCoin[i] ? letter : "?"
                )
              ),
              h("td", dist)
            );
          })
        )
      )
    )
  );
};

const renderFuel = () => {
  render(
    "fuel",
    h(
      "#fuel-outer",
      h("#fuel-inner", {
        style: { width: `calc(${(fuelLeft / 100) * 100}% - 10px)` },
      }),
      h(
        "#fuel-text",
        "Fuel: ",
        h("span", `${Math.max(0, fuelLeft)} / 100`, {
          style: { fontWeight: "bold" },
        })
      )
    )
  );
};

const renderEndgame = () => {
  gid("puz-extra-text").style.display = allFound() ? "block" : "none";
  render(
    "endgame-holder",
    h(
      ".content",
      h(
        "div#endgame",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        h(
          "div",
          { style: { marginRight: "1em" } },
          h("div", "Map:"),
          h(
            ".cube-container",
            h(
              ".cube",
              ["front", "back", "right", "left", "top", "bottom"].map((face) =>
                h(`.face.${face}`)
              )
            )
          ),
          h("#fuel")
        ),
        h("#radar")
      )
    )
  );
  renderCoins();
  renderFuel();
};

renderEndgame();
