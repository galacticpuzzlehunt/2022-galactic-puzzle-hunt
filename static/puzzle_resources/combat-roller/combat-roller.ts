// TS declaration of dependency
declare function openSocket(path: string, callback: (data: any) => void);

// JS constants
const BLOCK = 'block';
const NONE = 'none';

// HTML element constants
const PRACTICE_OUTPUT_DIV = document.getElementById('practice-output');
const PRACTICE_PROB1_TD = document.getElementById('practice-prob1');
const PRACTICE_PROB2_TD = document.getElementById('practice-prob2');
const PRACTICE_PROBDRAW_TD = document.getElementById('practice-probDraw');
const PRACTICE_RESULT_P = document.getElementById('practice-result');
const PRACTICE_ERROR_P = document.getElementById('practice-error');
const FIGHTER_1_CUSTOM = document.getElementById('fighter1-custom') as HTMLInputElement;
const FIGHTER_2_CUSTOM = document.getElementById('fighter2-custom') as HTMLInputElement;
const FIGHTER_1_RADIOS = (document.getElementById('practice-form') as HTMLFormElement).elements['fighter1'] as RadioNodeList;
const FIGHTER_2_RADIOS = (document.getElementById('practice-form') as HTMLFormElement).elements['fighter2'] as RadioNodeList;
const CAMPAIGN_OUTPUT_DIV = document.getElementById('campaign-output');
const CAMPAIGN_WORD = document.getElementById('campaign-word') as HTMLInputElement;
const CAMPAIGN_ERROR_P = document.getElementById('campaign-error');
// For statification.
const PUZTIME = document.getElementById('puztime');
const NO_TIME = document.getElementById('no-time');

// Game constants
const FIGHTER_1 = 'fighter1';
const FIGHTER_2 = 'fighter2';
const CUSTOM = 'custom';
const WORD = 'word';
const DEFAULT_ERROR_MESSAGE = 'Some error occurred. Please refresh the page and try again.';
const GOOD = 'good';
const BAD = 'bad';
const NEUTRAL = 'neutral';

// -- HTML helper functions --
function getSelectedRadioValue(inputName: string): string {
  return (document.querySelector(`input[name="${inputName}"]:checked`) as HTMLInputElement).value;
}

function normalize(s: string): string {
  return s.trim().toUpperCase().replace(/[^A-Z]/g, '')
}

function makeP(s: string): HTMLParagraphElement {
  const p = document.createElement('p');
  p.innerText = s;
  return p;
}

function makeH4(s: string): HTMLHeadingElement {
  const h4 = document.createElement('h4');
  h4.innerText = s;
  return h4;
}

function makeUl(): HTMLUListElement {
  const ul = document.createElement('ul');
  return ul;
}

function makeLi(s: string): HTMLLIElement {
  const li = document.createElement('li');
  li.innerText = s;
  return li;
}

function setVisibility(el: HTMLElement, shouldShow: boolean): void {
  el.style.display = shouldShow ? BLOCK : NONE;
}

function resetErrorDisplay(el: HTMLElement): void {
  el.innerText = DEFAULT_ERROR_MESSAGE;
  setVisibility(el, false);
}

function calculateGoodStyle(goodValue: any): string {
  return goodValue === true ? GOOD : (goodValue === false ? BAD : NEUTRAL);
}

function makePreFightAnalysis(data: any): HTMLElement {
  const prob1 = data.prob1
  const prob2 = data.prob2
  const probDraw = data.probDraw
  const outcome = data.outcome

  // Go to catch block.
  if ([prob1, prob2, probDraw, outcome].filter(el => el === undefined).length > 0) {
    throw Error();
  }

  const div = document.createElement('div');
  div.innerHTML = `<p>Pre-fight analysis:</p>`;
  const table = document.createElement('table');
  table.innerHTML = `
<tr><td>Win probability (per round): ${prob1}</td></tr>
<tr><td>Loss probability (per round): ${prob2}</td></tr>
<tr><td>Draw probability (per round): ${probDraw}</td></tr>`;
  div.appendChild(table);
  div.innerHTML += `<p class="fight-result ${calculateGoodStyle(data.good)}">${outcome}</p>`;
  return div;
}

// -- server interaction --
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name: string): string {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

async function sendPostReq(endpoint: string, body: any): Promise<any|undefined> {
  try {
    const csrftoken = getCookie('csrftoken');
    const result = await fetch(endpoint, {
      method: 'POST',
      mode: 'same-origin',
      headers: { 'X-CSRFToken': csrftoken },
      body: JSON.stringify(body)
    });
    return result.json();
  } catch {}
}

// -- Game functions --
declare const words: string[];
const VALID_WORDS = new Set(words);

const PRESET_FIGHTERS = ["QkFSQUtB", "SE9UQVJV", "S0VOU0hJ", "TUFWQURP"].map((e) => atob(e));
const PRESET_IDS = [...Array(PRESET_FIGHTERS.length).keys()].slice(1);
const CAMPAIGN_FIGHTERS = ["U0VSSUVT", "TlVNQkVS", "U0VWRU5T", "VElUTEVE", "QU5TV0VS"].map((e) => atob(e));

function roundedPercent(num: number): string {
  return `${Math.round(num*1000/4.410)/1000}`
}

function probabilities(your_word: string, oppo_word: string): [number, number, number] {
  let win = 0;
  let draw = 0;
  let loss = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const your_char = your_word.charAt(i);
      const oppo_char = oppo_word.charAt(j);
      if (your_char > oppo_char) {
        win += (i+1)*(j+1);
      } else if (your_char < oppo_char) {
        loss += (i+1)*(j+1);
      } else {
        draw += (i+1)*(j+1);
      }
    }
  }
  return [win, draw, loss];
}

function getPracticeData(your_word: string, oppo_word: string): any {
  let errors = '';
  const your_word_validation_message = presetOrWordValidationMessage(your_word);
  if (your_word_validation_message) {
    errors += `Fighter 1 ${your_word_validation_message} `
  }
  const oppo_word_validation_message = presetOrWordValidationMessage(oppo_word);
  if (oppo_word_validation_message) {
    errors += `Fighter 2 ${oppo_word_validation_message}`
  }
  if (errors) {
    return {'error': errors}
  }

  const [win, draw, loss] = probabilities(
    isPreset(your_word) ? PRESET_FIGHTERS[Number.parseInt(your_word)-1] : your_word,
    isPreset(oppo_word) ? PRESET_FIGHTERS[Number.parseInt(oppo_word)-1] : oppo_word);
  const roll = Math.random() * 441;
  return {
    'prob1': roundedPercent(win),
    'prob2': roundedPercent(loss),
    'probDraw': roundedPercent(draw),
    'outcome': (roll < win) ? 'FIGHTER 1 WON!' : (roll > 441 - loss ? 'FIGHTER 2 WON!': 'DRAW!')
  }
}

function fightCampaignStage(your_word: string, oppo_word: string): [boolean, any] {
  const [win, draw, loss] = probabilities(your_word, oppo_word);
  const outcome: string[] = [];
  let own_win = 0;
  let oppo_win = 0;
  let rounds = 0;
  // First-to-3 wins
  while (own_win < 3 && oppo_win < 3) {
    rounds += 1;
    const roll = Math.random() * 441;
    if (roll < win) {
      own_win += 1;
      outcome.push(`YOU WON! Score: ${own_win}-${oppo_win}`);
    } else if (roll > 441 - loss) {
      oppo_win += 1;
      outcome.push(`YOU LOST! Score: ${own_win}-${oppo_win}`);
    } else {
      outcome.push('DRAW!');
    }
  }
  return [own_win > oppo_win, {
    'prob1': roundedPercent(win),
    'prob2': roundedPercent(loss),
    'probDraw': roundedPercent(draw),
    'outcome': (own_win > oppo_win) ? 'YOU DEFEATED THE OPPONENT!' : 'YOU ARE DEFEATED!',
    'good': own_win > oppo_win
  }]
}

function getCampaignData(word: string): any {
  const validation_message = wordValidationMessage(word);
  if (validation_message) {
    return {'error': 'Your word ' + validation_message}
  }
  const res = {'word': word}
  const stages: any[] = [];
  for (let i = 0; i < CAMPAIGN_FIGHTERS.length; i++) {
    const [win, stage_data] = fightCampaignStage(word, CAMPAIGN_FIGHTERS[i]);
    stages.push(stage_data);
    if (!win) {
      break;
    }
    if (i === CAMPAIGN_FIGHTERS.length - 1) {
      res['finalMessage'] = `Congratulations, you cleared Campaign Mode! Your prize is: ${makeHtmlBlanks()}`
    }
  }
  res['stages'] = stages;
  return res;
}

function wordValidationMessage(s: string): string|undefined {
  if (s.length !== 6) {
    return 'is not fit for combat!'
  }
  if (!VALID_WORDS.has(s.toUpperCase().trim())) {
    return 'is not a valid Scrabble word!';
  }
  return undefined;
}

function hasNumber(s: string): boolean {
  return /\d+/.test(s);
}

function isPreset(s: string): boolean {
  const regexString = `[1-${PRESET_FIGHTERS.length}]`
  return (s.trim().match(new RegExp(regexString))?.length ?? 0) > 0;
}

function presetOrWordValidationMessage(s: string): string|undefined {
  if (hasNumber(s)) {
    if (!isPreset(s)) {
      return 'is not a valid preset fighter ID!'
    }
    return undefined;
  } 
  return wordValidationMessage(s);
}

function makeHtmlBlanks(): string {
  return '<span style="font-family: Times New Roman">___ ___ ___</span>'
}

// Button functions
function practice(e: SubmitEvent): void {
  if (frozen) return;
  e.preventDefault();
  resetErrorDisplay(PRACTICE_ERROR_P);
  const fighter1 = getSelectedRadioValue(FIGHTER_1);
  const fighter2 = getSelectedRadioValue(FIGHTER_2);
  const data = getPracticeData(fighter1 === CUSTOM ? normalize(FIGHTER_1_CUSTOM.value) : fighter1,
    fighter2 === CUSTOM ? normalize(FIGHTER_2_CUSTOM.value) : fighter2);
  try {
    const prob1 = data.prob1
    const prob2 = data.prob2
    const probDraw = data.probDraw
    const outcome = data.outcome

    // Go to catch block.
    if ([prob1, prob2, probDraw, outcome].filter(el => el === undefined).length > 0) {
      throw Error();
    }

    setVisibility(PRACTICE_OUTPUT_DIV, true);

    for (const [el, innerText] of [
        [PRACTICE_PROB1_TD, prob1], 
        [PRACTICE_PROB2_TD, prob2], 
        [PRACTICE_PROBDRAW_TD, probDraw],
        [PRACTICE_RESULT_P, outcome]]) {
      el.innerText = innerText
    }
  } catch {
    setVisibility(PRACTICE_ERROR_P, true);
    try {
      PRACTICE_ERROR_P.innerText = data.error;
    } catch {}
  }
}

function campaign(e: SubmitEvent): void {
  if (frozen) return;
  e.preventDefault();
  CAMPAIGN_OUTPUT_DIV.innerHTML = '';
  resetErrorDisplay(CAMPAIGN_ERROR_P);
  const data = getCampaignData(normalize(CAMPAIGN_WORD.value));
  try {
    if (data.error !== undefined) {
      setVisibility(CAMPAIGN_ERROR_P, true);
      CAMPAIGN_ERROR_P.innerText = data.error;
    } else {
      onCampaignBroadcast(data);
    }
  } catch {
    setVisibility(CAMPAIGN_ERROR_P, true);
  }
  // Don't do anything--wait for the campaign result to be broadcasted.
}

function onCampaignBroadcast(message: any): void {
  let data = message;
  if (typeof(message) == 'string') {
    data = JSON.parse(message)
  }
  try {
    // If nothing failed, expect data of the form
    // {
    //   word: string,
    //   stages: [
    //     {
    //       prob1: float,
    //       prob2: float,
    //       probDraw: float,
    //       rounds: [round1 message, round2 message, round3 message...],
    //       good: true if good, false if bad, None if neutral
    //     },
    //     ... etc for other stages
    //   ],
    //   finalMessage: string <- may or may not exist
    // }
    CAMPAIGN_OUTPUT_DIV.appendChild(makeP(`Your word: ${data.word!}`));
    for (let i = 0; i < data.stages!.length; i++) {
      CAMPAIGN_OUTPUT_DIV.appendChild(makeH4(`Stage ${i+1}:`))
      const stage = data.stages[i];
      CAMPAIGN_OUTPUT_DIV.appendChild(makePreFightAnalysis(stage));
    }
    if (data.finalMessage !== undefined) {
      CAMPAIGN_OUTPUT_DIV.innerHTML += `<p class="fight-result good">${data.finalMessage}</p>`;
    }
    setVisibility(CAMPAIGN_OUTPUT_DIV, true);
  } catch {
    setVisibility(CAMPAIGN_ERROR_P, true);
    try {
      // Also be able to parse JSON objects that contain 'error' field.
      if (data.error !== undefined) {
        CAMPAIGN_ERROR_P.innerText = data.error;
      }
    } catch {}
  }
}

// Statification.
let frozen = false;
const startTime = new Date();
var numberOfMlSeconds = startTime.getTime();
const endTime = new Date(startTime.getTime() + 4*60*1000);

function calculateTimeRemaining(): void {
  if (endTime === undefined) return;
  const timeLeft = Math.max(0, Math.floor((endTime.getTime() - Date.now())/1000));
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  PUZTIME.innerText = `${minutes} : ${seconds}`;
  if (timeLeft == 0) {
    frozen = true;
    NO_TIME.style.display = 'block';
  }
}

// -- 'main', where we call our functions.
FIGHTER_1_CUSTOM.onfocus = () => {
  FIGHTER_1_RADIOS.value = CUSTOM;
}

FIGHTER_2_CUSTOM.onfocus = () => {
  FIGHTER_2_RADIOS.value = CUSTOM;
}

setInterval(calculateTimeRemaining, 1000);
window.addEventListener('focus', calculateTimeRemaining)