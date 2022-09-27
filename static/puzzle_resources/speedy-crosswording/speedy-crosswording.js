const OOPS = 'The crossword could not be loaded. Please refresh. If the asteroid already struck, you should reset.'

const timer = document.getElementById("puztime");
const NO_TIME_MESSAGE = 'You ran out of time! Refresh to start again.'

const messageElement = document.getElementsByClassName('html-message-content')[0];
const crosswordElement = document.getElementsByClassName('flex-container')[0];

let endTime;

let isDown = false;
let game;

function scrollClue(clue) {
  const [li] = clue;
  const [ol] = clue.parent();
  if (li.offsetTop < ol.scrollTop ||
      li.offsetTop + li.offsetHeight > ol.scrollTop + ol.clientHeight) {
    ol.scrollTop = li.offsetTop + (li.offsetHeight - ol.clientHeight) / 2;
  }
}

function selectClue(id) {
  const {status, dir, cells} = game.clues[id];
  if (!status) return false;
  if (isDown != (dir == 'down')) {
    scrollClue($(`#clue_${id}`).attr('data-sel', 'cross'));
    return false;
  }
  scrollClue($(`#clue_${id}`).attr('data-sel', 'clue'));
  for (const [y, x] of cells) {
    $(`#cell_${y}_${x}`).attr('data-sel', 'light');
  }
  return true;
}

function selectCell(y, x) {
  if (!checkCell(y, x)) return;
  const {clues} = game.cells[y][x];
  $('[data-sel]').attr('data-sel', null);
  $('[data-dir]').attr('data-dir', null);
  if (!clues.map(selectClue).some(n => n)) {
    isDown = !isDown;
    clues.forEach(selectClue);
  }
  const dirs = [];
  if (isDown) {
    if (checkCell(y - 1, x)) dirs.push('u');
    if (checkCell(y + 1, x)) dirs.push('d');
  } else {
    if (checkCell(y, x - 1)) dirs.push('l');
    if (checkCell(y, x + 1)) dirs.push('r');
  }
  $(`#cell_${y}_${x}`).attr({'data-sel': 'cell', 'data-dir': dirs.join(' ')});
  $('#keyboard').focus();
}

function checkCell(y, x) {
  if (!game.cells[y] || !game.cells[y][x]) return false;
  const {status} = game.cells[y][x];
  return status && status != 'wall';
}

function goToPrevCell(y, x) {
  let yy = y;
  let xx = x;
  if (isDown) {
    do {
      if (yy == 0) {
        if (xx > 0) {
          xx--;
          yy = game.cells.length - 1;
        }
      } else {
        yy--;
      }
    } while (game.cells[yy][xx].status == 'wall')
  } else {
    do {
      if (xx == 0) {
        if (yy > 0) {
          yy--;
          xx = game.cells[yy].length - 1;
        }
      } else {
        xx--;
      }
    } while (game.cells[yy][xx].status == 'wall')
  }
  selectCell(yy, xx);
  return;
}

function goToNextCell(y, x) {
  let yy = y;
  let xx = x;
  if (isDown) {
    do {
      if (yy == game.cells.length-1) {
        if (xx == game.cells[yy].length-1) {
          xx = 0;
        } else {
          xx++;
        }
        yy = 0;
      } else {
        yy++;
      }
    } while (game.cells[yy][xx].status == 'wall')
    return selectCell(yy, xx);
  } else {
    do {
      if (xx == game.cells[y].length-1) {
        if (yy == game.cells.length-1) {
          yy = 0;
        } else {
          yy++;
        }
        xx = 0;
      } else {
        xx++;
      }
    } while (game.cells[yy][xx].status == 'wall')
    return selectCell(yy, xx);
  }
}

let wasLastShiftWithTab = false;
function handleKey(evt) {
  if (frozen) {
    return;
  }
  wasLastShiftWithTab = false;
  const [td] = $('[data-sel=cell]');
  if (!td || evt.altKey || evt.ctrlKey || evt.metaKey) return;
  let [_, y, x] = td.id.split('_').map(Number);
  const key = evt.key || evt.originalEvent.data;
  const [_2, id] = $('[data-sel=clue]').attr('id').split('_');
  if (/^[a-z]$/i.test(key)) {
    const {status, guess} = game.cells[y][x];
    if (status == 'blank') {
      socket.send(JSON.stringify({'key': [{y, x, key, shiftOn: evt.shiftKey}]}));
    } else if (guess != key.toUpperCase()) {
      return;
    }
    if (evt.shiftKey) {
      // If shift is used, stay on the same cell.
      return selectCell(y, x);
    } else {
      return goToNextCell(y, x);
    }
  }
  switch (evt.key) {
    case 'ArrowUp':
      evt.preventDefault(); // No scrolling!
      isDown = true;
      return goToPrevCell(y, x);
    case 'ArrowDown':
      evt.preventDefault(); // No scrolling!
      isDown = true;
      return goToNextCell(y, x);
    case 'ArrowLeft':
      evt.preventDefault(); // No scrolling!
      isDown = false;
      return goToPrevCell(y, x);
    case 'ArrowRight':
      evt.preventDefault(); // No scrolling!
      isDown = false;
      return goToNextCell(y, x);
  }
  if (evt.key === 'Tab') {
    evt.preventDefault();
    const thisClue = game.clues[id];
    if (evt.shiftKey) {
      wasLastShiftWithTab = true;
      let hasFoundSelf = false;
      for (let i = game.clues.length - 1; i >= 0; i--) {
        if (game.clues[i].dir == thisClue.dir) {
          if (hasFoundSelf) {
            const [nextY, nextX] = game.clues[i].cells[0];
            return selectCell(nextY, nextX);
          } else if (game.clues[i].index === thisClue.index) {
            hasFoundSelf = true;
          }
        }
      }
      // Otherwise, just do the last clue.
      for (let i = game.clues.length - 1; i >= 0; i--) {
        if (game.clues[i].dir === thisClue.dir) {
          const [nextY, nextX] = game.clues[i].cells[0];
          return selectCell(nextY, nextX);
        }
      }
    } else {
      let hasFoundSelf = false;
      for (let i = 0; i < game.clues.length; i++) {
        if (game.clues[i].dir == thisClue.dir) {
          if (hasFoundSelf) {
            const [nextY, nextX] = game.clues[i].cells[0];
            return selectCell(nextY, nextX);
          } else if (game.clues[i].index === thisClue.index) {
            hasFoundSelf = true;
          }
        }
      }
      for (let i = 0; i < game.clues.length; i++) {
        if (game.clues[i].dir == thisClue.dir) {
          const [nextY, nextX] = game.clues[i].cells[0];
          return selectCell(nextY, nextX);
        }
      }
    }
    return;
  }
  if (evt.key === ' ') {
    isDown = !isDown;
  }
  if (evt.key === 'Backspace' || evt.key === 'Delete') {
    socket.send(JSON.stringify({'key': [{y, x, key, shiftOn: false}]}));
    return goToPrevCell(y, x);
  }
  selectCell(y, x);
  evt.preventDefault();
}

$(document).on('mousedown', 'td', evt => {
  const [_, y, x] = evt.currentTarget.id.split('_').map(Number);
  if ($(`#cell_${y}_${x}[data-sel=cell]`).length) isDown = !isDown;
  selectCell(y, x);
  evt.preventDefault();
}).on('mousedown', 'li', evt => {
  const [_, id] = evt.currentTarget.id.split('_');
  const {dir, cells} = game.clues[id];
  if (!cells || !cells.length) return;
  evt.preventDefault();
  isDown = dir == 'down';
  for (const [y, x] of cells) {
    if ($(`#cell_${y}_${x}[data-sel=cell]`).length) return selectCell(y, x);
  }
  for (const [y, x] of cells) {
    if (game.cells[y][x].status == 'blank') return selectCell(y, x);
  }
  selectCell(...cells[0]);
}).on('keydown', evt => {
  evt.keyCode == 229 ? $(document).one('textInput', handleKey) : handleKey(evt);
}).on('keyup', evt => {
  handleKeyUp(evt);
});

function handleKeyUp(evt) {
  if (evt.key === 'Shift') {
    if (wasLastShiftWithTab) return;
    try {
      const [td] = $('[data-sel=cell]');
      let [_, y, x] = td.id.split('_').map(Number);
      goToNextCell(y, x);
    } catch {}
  }
}

function makeCell(y, x) {
  const {status, index, guess,} = game.cells[y][x];
  const td = $(`#cell_${y}_${x}`).attr('class', status || '');
  td.find('sup').text(index || '');
  td.find('div').text(guess || '');
}

function makeClue(id) {
  const {status, text} = game.clues[id];
  $(`#clue_${id}`).attr('class', status || '').html(text || '');
}

function loadGame(data) {
  game = data;
  const table = $('#puztable').empty();
  game.cells.forEach((row, y) => {
    const tr = $('<tr>').appendTo(table);
    row.forEach((cell, x) => {
      $('<td>').attr('id', `cell_${y}_${x}`).append($('<sup>'), $('<div>'))
          .appendTo(tr);
      makeCell(y, x);
    });
  });
  $('ol').empty();
  game.clues.forEach((clue, id) => {
    $('<li>').attr('id', `clue_${id}`).attr('value', clue.index)
        .appendTo(`#${clue.dir}`);
    makeClue(id);
  });
}

function onUpdate(events) {
  for (const {type, y, x, cell} of events) {
    if (type === 'cell') game.cells[y][x] = cell; makeCell(y, x);
  }
}

function onHtmlMessage(data) {
  messageElement.innerHTML = data;
  messageElement.style.display = 'block';
  crosswordElement.style.display = 'none';
}

function onData(data) {
  data = JSON.parse(data);
  if (data.message !== undefined) {
    // Message takes first priority!
    onHtmlMessage(data.message);
  }
  if (data.endTime !== undefined) {
    endTime = new Date(data.endTime);
    setInterval(calculateTimeRemaining, 1000);
  }
  if (data.game !== undefined) {
    if (data.game.message !== undefined) {
      // Message takes first priority!
      onHtmlMessage(data.game.message);
    } else {
      messageElement.style.display = 'none';
      crosswordElement.style.display = 'flex';
      loadGame(data.game);
    }
  } else if (data.updates !== undefined) {
    messageElement.style.display = 'none';
    crosswordElement.style.display = 'flex';
    onUpdate(data.updates);
  }
}

function showOopsMessage() {
  onHtmlMessage(OOPS);
}

function calculateTimeRemaining() {
  if (endTime === undefined) return;
  const timeLeft = Math.max(0, Math.floor((endTime - Date.now())/1000));
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timer.innerText = `${minutes} : ${seconds}`;
  if (timeLeft == 0) {
    frozen = true;
    onData(JSON.stringify({message: NO_TIME_MESSAGE}))
  }
}

const socket = new WebSocket('wss://interactive.galacticpuzzlehunt.com/speedy-crosswording');

function handleBadAuth() {
  let team = null;

  while (team == null) {
    team = prompt('Enter team name (max 256 chars). Make sure this is the same for everyone in your team! You can change this later in the URL.');
  }
  if (window.location.href.includes('?')) {
    window.location.href = `${window.location.href}&token=${encodeURIComponent(team)}`;
  } else {
    window.location.href = `${window.location.pathname}?token=${encodeURIComponent(team)}`;
  }
}

socket.onopen = (e) => {
  const urlParams = new URLSearchParams(window.location.search);
  let token = '';
  try {
    token = decodeURIComponent(urlParams.get('token'));
  } catch (e) {
    handleBadAuth();
  }
  if (token == '' || token == null || token == 'null') {
    handleBadAuth();
  }

  socket.send(JSON.stringify({'type': 'AUTH', 'data': token}));
};

socket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  onData(data);
}

socket.onclose = (e) => {
  console.error('Socket closed unexpectedly');
};

let frozen = false;

registerOnGlitchHook((ex) => {
  frozen = true;
});

window.addEventListener('focus', calculateTimeRemaining)