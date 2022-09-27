// Math constants.
const MILLIS_TO_SEC = 1000;
const MIN_TO_SEC = 60;

// Word-transformation constants.
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// JS constants.
const BLOCK = 'block';
const NONE = 'none';
const POLITE = 'polite';

// Classes.
const B_CLASS = 'b';
const BUTTON_SPAN_CLASS = 'button-span';
const DISABLED_CLASS = 'disabled';
const GLOW_CLASS = 'glow';
const STATUS_CLASS = 'status';
const TIME_DISPLAY_CLASS = 'time-display';
const TIMER_CLASS = 'timer';

// Google Material status icons HTML text.
const DONE_ICON_HTML = `<img class="i" alt="done" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z'/></svg>"/>`;
const SCHEDULE_ICON_HTML = `<img class="i" alt="scheduled" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='m31.35 33.65 2.25-2.25-7.95-8V13.35h-3V24.6ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24t1.575-7.75q1.575-3.65 4.3-6.375 2.725-2.725 6.375-4.3Q19.9 4 24 4t7.75 1.575q3.65 1.575 6.375 4.3 2.725 2.725 4.3 6.375Q44 19.9 44 24t-1.575 7.75q-1.575 3.65-4.3 6.375-2.725 2.725-6.375 4.3Q28.1 44 24 44Zm0-20Zm0 17q7 0 12-5t5-12q0-7-5-12T24 7q-7 0-12 5T7 24q0 7 5 12t12 5Z'/></svg>"/>`;

// HTML Elements.
const ACTIVE_TASK_DIV = document.getElementById('active-tasks');
const COMPUTED_CONTENT_UL = document.getElementById('computed-content');
const COMPUTER_INPUT_BOX = document.getElementById('computer-input') as HTMLInputElement;
const CONTROLS_AVAILABLE_DIV = document.getElementById('b');
const CONTROLS_UNAVAILABLE_DIV = document.getElementById('a');
const DESIRED_OUTPUT_SPAN = document.getElementById('desired-output');
const FINAL_CONTENT_LISTING = document.getElementById('final-content-listing');
const MODAL_PUZZLE_CONTENT_DIV = document.getElementById('modal');
const MODAL_INSIDE_CONTENT_DIV = document.getElementById('modal-content');
const NON_MODAL_PUZZLE_CONTENT_DIV = document.getElementById('non-modal');
const PROGRAM_BUTTON = document.getElementById('program-button') as HTMLButtonElement;
const PROGRAM_BOX = document.getElementById('program-input') as HTMLInputElement;
const PROGRAM_ERROR = document.getElementById('program-error') as HTMLSpanElement;
const SUCCESSFUL_PROGRAM_COPY_BTN = document.getElementById('successful-program-copy') as HTMLButtonElement;
const SUCCESSFUL_PROGRAM_PRINT = document.getElementById('successful-program');
const TASK_BUTTONS_TABLE = document.getElementById('task-button-layout');
const GLOBAL_TIMER = document.getElementById('puztimer');
const GLOBAL_TIMER_VAL = document.getElementById('puztime');

// Game constants.
const CAPACITY = 3;
const MAX_INPUT_LENGTH = 20;
const MINUTES_UNTIL_DEATH = 4;
const COPY_PROGRAM_MESSAGE = 'Copy to clipboard'
const COPIED_PROGRAM_MESSAGE = 'Copied!'
const INPUT_INVALID_MESSAGE = 'The input must be a valid English word.'
const TASK_STARTED_MESSAGE = 'This task was already started. You cannot start it again.'
const NO_CAPACITY_MESSAGE = 'There is not enough capacity available for this task.'

enum Task {
  ALPHA = 'ALPHA',
  BETA = 'BETA',
  GAMMA = 'GAMMA',
  DELTA = 'DELTA',
  EPSILON = 'EPSILON',
  ZETA = 'ZETA',
  ETA = 'ETA',
  THETA = 'THETA',
  IOTA = 'IOTA',
  KAPPA = 'KAPPA',
  LAMBDA = 'LAMBDA',
  TFC = 'THE FINAL COMPUTATION'
}

// Initial tasks, listed as name -> [time, capacity].
const INITIAL_TASKS: Map<string, readonly [number, number]> = new Map([
  [Task.ALPHA, [20, 2]],
  [Task.BETA, [30, 2]],
  [Task.GAMMA, [1*MIN_TO_SEC, 1]],
  [Task.DELTA, [1*MIN_TO_SEC + 15, 3]],
  [Task.EPSILON, [2*MIN_TO_SEC + 10, 1]],
  [Task.ZETA, [2*MIN_TO_SEC + 15, 2]],
  [Task.ETA, [2*MIN_TO_SEC + 25, 3]],
  [Task.THETA, [2*MIN_TO_SEC + 45, 2]],
  [Task.IOTA, [3*MIN_TO_SEC + 10, 2]],
  [Task.KAPPA, [3*MIN_TO_SEC + 50, 1]],
  [Task.LAMBDA, [4*MIN_TO_SEC, 3]],
  [Task.TFC, [6*MIN_TO_SEC, 3]]
])

// Needed because WORDS gets loaded in from a separate file.
declare const WORD_LIST: readonly string[];
const WORDS = new Set<string>();
WORD_LIST.forEach(word => WORDS.add(word));

// Has loop ended?
declare const loopEndTime: number;

declare const registerOnGlitchHook;
declare const getFrozen;
declare const doGlitch;

/**
 * @param value The value to decrease by, in seconds.
 * @returns     A function that takes in a numerical input and returns input - [value].
 */
function decreaseValue(value: number): (input: number) => number {
  return (input: number) => input - value;
}

// Which tasks affect other tasks.
const RUNTIME_EFFECTS: Map<string, Map<string, (input: number) => number>> = new Map([
  [Task.ALPHA, new Map([[Task.KAPPA, decreaseValue(1*MIN_TO_SEC + 55)], [Task.LAMBDA, decreaseValue(15)]])],
  [Task.BETA, new Map([[Task.EPSILON, decreaseValue(2*MIN_TO_SEC)], 
                      [Task.THETA, decreaseValue(2*MIN_TO_SEC)], 
                      [Task.IOTA, decreaseValue(1*MIN_TO_SEC)]])],
  [Task.GAMMA, new Map([[Task.ALPHA, decreaseValue(10)], [Task.ETA, decreaseValue(35)]])],
  [Task.DELTA, new Map([[Task.ZETA, decreaseValue(2*MIN_TO_SEC)], [Task.TFC, decreaseValue(2*MIN_TO_SEC)]])],
  [Task.ZETA, new Map([[Task.THETA, decreaseValue(30)], [Task.LAMBDA, decreaseValue(2*MIN_TO_SEC)]])],
  [Task.EPSILON, new Map([[Task.DELTA, decreaseValue(45)], [Task.IOTA, decreaseValue(1*MIN_TO_SEC)]])],
  [Task.ETA, new Map([[Task.IOTA, decreaseValue(10)], [Task.TFC, decreaseValue(3*MIN_TO_SEC)]])],
  [Task.THETA, new Map([[Task.DELTA, decreaseValue(20)], 
                      [Task.IOTA, decreaseValue(1*MIN_TO_SEC)],
                      [Task.LAMBDA, decreaseValue(10)]])],
  [Task.IOTA, new Map([[Task.GAMMA, decreaseValue(20)], 
                      [Task.KAPPA, decreaseValue(90)],
                      [Task.LAMBDA, decreaseValue(50)]])],
  [Task.KAPPA, new Map([[Task.ETA, decreaseValue(45)]])],
  [Task.LAMBDA, new Map([[Task.ETA, decreaseValue(1*MIN_TO_SEC)], [Task.TFC, decreaseValue(55)]])],
  [Task.TFC, new Map()]
]);

// These places will store information that changes throughout the game.

// Freeze the interface
let frozen: boolean = false;
let frozenStartTimestamp: number = Date.now();

// Start timestamp of the program
let startTimestamp: number|undefined;
let endTime: number|undefined;

// Keeps track of which tasks have already started -> when they started, how long they were scheduled for.
// Prevents us from running tasks again and also allows us to construct "programs".
const startedTasks = new Map<string, [number, number]>();

// Keeps track of current run time for each task.
const currentRuntimes = new Map<string, number>();
INITIAL_TASKS.forEach(([time, _], name) => {
  currentRuntimes.set(name, time);
})

// Create all the 'timers' for ongoing tasks.
let timers: [string, number, number, HTMLParagraphElement][] = [];

// The current content of the computer.
let currentComputerValue: string = '';

// Program of the computer.
const program = new Map<number, string[]>();

// Last executed step index.
let lastExecutedStep = -1;

// -- Basic string operations --

function padTwoDigits(number: number): string {
  return ('0' + Math.floor(number)).slice(-2);
}

function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / MIN_TO_SEC);
  const leftoverSeconds = seconds % MIN_TO_SEC;
  return `${padTwoDigits(minutes)}:${padTwoDigits(leftoverSeconds)}`;
}

// -- Special word transformations for the game --
/**
 * Caesar shifts a letter.
 * @param input  A letter to shift. Expected to be a single uppercase letter.
 * @param amount Amount to shift. Expected to be an integer.
 * @returns      [input], shifted by [amount] in the alphabet.
 */
function shift(input: string, amount: number): string {
  return ALPHABET.charAt((ALPHABET.indexOf(input) + amount + ALPHABET.length) % ALPHABET.length)
}

function transformation1(input: string): string {
  let res = '';
  for (let i = 0; i < input.length; i++) {
    const offset = (ALPHABET.indexOf(input.charAt(i)) % 2 == 0) ? 1 : -1;
    res += shift(input.charAt(i), offset);
  }
  return res;
}

function transformation2(input: string): string {
  let res = '';
  for (let i = 0; i < input.length; i++) {
    const idx = ALPHABET.indexOf(input.charAt(i));
    const offset = (idx >= 14) ? -14 : 0;
    res += shift(input.charAt(i), offset);
  }
  return res;
}

function transformation3(input: string): string {
  return input.replaceAll('B', 'AM');
}

function transformation4(input: string): string {
  const j = input.length - 1;
  if (input.length > 3) {
    const i = input.length - 4;
    return input.slice(0, i) + shift(input.charAt(i), -4) + input.slice(i+1, j) + shift(input.charAt(j), 6);
  } else {
    return input.slice(0, j) + shift(input.charAt(j), 6);
  }
}

const TASK_TO_TRANSFORM: Map<string, (input: string) => string> = new Map([
  [Task.DELTA, transformation1],
  [Task.LAMBDA, transformation2],
  [Task.ETA, transformation3],
  [Task.TFC, transformation4]
]);

// -- Game state helpers --
function getTimeUsed(): number {
  return Math.floor((Math.min(Date.now(), endTime) - startTimestamp) / MILLIS_TO_SEC);
}

function calculateRemainingCapacity(): number {
  return CAPACITY - timers.map(([name, time, capacity, p]) => capacity).reduce((prev, curr) => prev + curr, 0);
}

function wasTaskStarted(name: string): boolean {
  return startedTasks.has(name);
}

function isCapacityAvailable(name: string): boolean {
  const [_, capacity] = INITIAL_TASKS.get(name);
  return capacity <= calculateRemainingCapacity();
}

function hasValidInput(): boolean {
  const currInput = COMPUTER_INPUT_BOX.value;
  return currInput.length > 0 && WORDS.has(currInput.toLowerCase());
}

function canProgramStart(): boolean {
  return hasValidInput() && PROGRAM_BOX.value.length > 0;
}

/** @returns Whether the program was parsed successfully. */
function parseProgram(): boolean {
  try {
    const json = JSON.parse(atob(PROGRAM_BOX.value.trim()));
    for (const [startTime, names] of json) {
      for (const name of names) {
        const startTimeInt = Number.parseInt(startTime);
        const tasksAtTime = program.get(startTimeInt) ?? [];
        tasksAtTime.push(name);
        program.set(startTimeInt, tasksAtTime);
        getStatusTd(name).innerHTML = SCHEDULE_ICON_HTML;
      }
    }
    start();
    INITIAL_TASKS.forEach(([_, capacity], name) => {
      if (program.get(0)?.includes(name)) {
        startTask(name, capacity, 0);
      }
    });
    return true;
  } catch (_) {
    return false;
  }
}

function calculateTooltipMessage(name: string): string {
  if (wasTaskStarted(name)) {
    return TASK_STARTED_MESSAGE
  } else if (!isCapacityAvailable(name)) {
    return NO_CAPACITY_MESSAGE;
  } else {
    return INPUT_INVALID_MESSAGE;
  }
}

function setButtonState(button: HTMLButtonElement, enabled: boolean): void {
  if (enabled) {
    button.classList.remove(DISABLED_CLASS);
    button.ariaDisabled = 'false';
  } else {
    button.classList.add(DISABLED_CLASS);
    button.ariaDisabled = 'true';
  }
}

function updateButtonsDisabledState(): void {
  const buttonSpans = Array.from(TASK_BUTTONS_TABLE.getElementsByClassName(BUTTON_SPAN_CLASS));
  if (buttonSpans) {
    buttonSpans.forEach((span) => {
      const button = getButton(span as HTMLSpanElement);
      const name = button.innerText;
      const enabled = !wasTaskStarted(name) && isCapacityAvailable(name) && hasValidInput();
      setButtonState(button, enabled);
    });
  }
}

/**
 * @param currentGlowing The names of the tasks whose runtimes were changed by the most recent task completion.
 */
function updateTimeGlows(currentGlowing: string[]): void {
  INITIAL_TASKS.forEach((_, name) => {
    const classList = getTimeTd(name).classList;
    if (currentGlowing.includes(name)) {
      classList.add(GLOW_CLASS);
    } else {
      classList.remove(GLOW_CLASS);
    }
  });
}

function updateTaskTime(name: string, newTime: number): void {
  currentRuntimes.set(name, newTime);
  const timeTd = getTimeTd(name);
  timeTd.innerText = formatSeconds(newTime);
}

// -- callback methods --

function confirmCopy(button: HTMLButtonElement): void {
  button.innerText = COPIED_PROGRAM_MESSAGE;
  setTimeout(() => button.innerText = COPY_PROGRAM_MESSAGE, 1000);
}

/**
 * Copies the current contents of the program to clipboard.
 * 
 * @param button The button that the user clicked. Must update with confirmation message.
 */
function copyProgram(button: HTMLButtonElement): void {
  if ("navigator" in window && navigator.clipboard) {
    // Modern navigator API, supports writing text.
    navigator.clipboard.writeText(PROGRAM_BOX.value).then(() => confirmCopy(button));
  } else {
    // Handle selection.
    PROGRAM_BOX.select(); 
    PROGRAM_BOX.setSelectionRange(0, 99999);
    document.execCommand('copy');
    PROGRAM_BOX.blur();
    if (window.getSelection()) window.getSelection().removeAllRanges();
    confirmCopy(button);
  }
}

/** 
 * Helper function: runs [f] every 1 second.
 * 
 * @param f The callback function to run.
 */
 function oneSecondTimer(f: Function): void {
  setTimeout(() => {
    f();
    oneSecondTimer(f);
  }, 1*MILLIS_TO_SEC)
}

/**
 * @param timeIdx Integer time step.
 * @return tasks whose runtimes were affected
 */
function executeStep(timeIdx: number): string[] {
  const newTimers: [string, number, number, HTMLParagraphElement][] = [];
  // Keep track of which tasks' runtimes were affected.
  const affectedTasks: string[] = [];
  timers.forEach(([name, time, capacity, p], idx) => {
    const [startTime, originalRunTime] = startedTasks.get(name);
    const newTime = originalRunTime - (timeIdx - startTime);
    if (newTime > 0) {
      getTimer(p).innerText = formatSeconds(newTime);
      newTimers.push([name, newTime, capacity, p]);
    } else {
      // Task is done, so...
      // Change the runtimes of all the tasks it affects.
      RUNTIME_EFFECTS.get(name)?.forEach((f, affectedTask) => {
        affectedTasks.push(affectedTask);
        updateTaskTime(affectedTask, f(currentRuntimes.get(affectedTask)));
      });
      getStatusTd(name).innerHTML = DONE_ICON_HTML;
      // Remove it from the active tasks.
      p.remove();
      // Update the computed content, if applicable.
      const transformer = TASK_TO_TRANSFORM.get(name);
      if (transformer) {
        currentComputerValue = transformer(currentComputerValue);
        addComputedOutputListing();
      }
      if (name === Task.TFC) {
        win();
      }
    }
  });
  timers = newTimers;
  // After all timers have been updated, start new tasks.
  const tasksToStart = program.get(timeIdx);
  if (tasksToStart !== undefined) {
    INITIAL_TASKS.forEach(([_, capacity], name) => {
      if (tasksToStart.includes(name)) {
        // If task has not started and there is available capacity,
        if ((startedTasks.get(name) === undefined) && isCapacityAvailable(name)) {
          startTask(name, capacity, timeIdx);
          console.log(`start task ${name} at time ${timeIdx}, ${Date.now()}`)
        }
      }
    });
  }
  return affectedTasks;
}

function updateGlobalTimer(): void {
  let timeUsed = (Date.now() - frozenStartTimestamp) / MILLIS_TO_SEC;
  if (timeUsed > 240) {
    doGlitch(false);
    timeUsed = 240;
  }
  GLOBAL_TIMER_VAL.innerText = formatSeconds(240 - timeUsed);
  if (frozen) return;
  requestAnimationFrame(updateGlobalTimer);
}
if (getFrozen()) {
  requestAnimationFrame(updateGlobalTimer);
}

function doStep(): void {
  const timeUsed = getTimeUsed();
  let affectedTasks = [];
  for (let i = lastExecutedStep+1; i <= timeUsed; i++) {
    affectedTasks = executeStep(i);
  }
  lastExecutedStep = timeUsed;
  updateButtonsDisabledState();
  if (affectedTasks.length > 0) {
    updateTimeGlows(affectedTasks);
  }
  if (endTime < Date.now()) {
    startTimestamp = undefined;
  }
  if (frozen || startTimestamp === undefined) {
    return;
  }
}

function start(): void {
  startTimestamp = Date.now();
  if (endTime === undefined) {
    endTime = loopEndTime;
  }
  PROGRAM_BOX.readOnly = true;
  setButtonState(PROGRAM_BUTTON, true);
  PROGRAM_BUTTON.onclick = () => copyProgram(PROGRAM_BUTTON);
  PROGRAM_BUTTON.innerText = COPY_PROGRAM_MESSAGE;
  COMPUTER_INPUT_BOX.readOnly = true;
  currentComputerValue = COMPUTER_INPUT_BOX.value.trim().toUpperCase();
  addComputedOutputListing();
}

function startProgram(): void {
  const successfullyParsed = parseProgram();
  if (successfullyParsed) {
    PROGRAM_ERROR.style.display = NONE;
  } else {
    PROGRAM_ERROR.style.display = BLOCK;
  }
}

/** 
 * timeIdx is required so we use the time upon function call -- avoid edge case where time changes
 * between caller time and runtime of this.
 */
function startTask(name: string, capacity: number, timeIdx: number): void {
  const time = currentRuntimes.get(name); // Get most updated time as of when the callback is called.
  const taskTracker = makeTaskTracker(name, time, capacity);
  timers.push([name, time, capacity, taskTracker]);
  startedTasks.set(name, [timeIdx, time]);
  ACTIVE_TASK_DIV.appendChild(taskTracker);
  const td = getStatusTd(name);
  td.innerHTML = SCHEDULE_ICON_HTML;
  const tasksAtTime = program.get(timeIdx) ?? [];
  if (!tasksAtTime.includes(name)) tasksAtTime.push(name);
  program.set(timeIdx, tasksAtTime);
  PROGRAM_BOX.value = btoa(JSON.stringify(Array.from(program.entries())));
}

function win(): void {
  NON_MODAL_PUZZLE_CONTENT_DIV.ariaHidden = "true";
  MODAL_PUZZLE_CONTENT_DIV.style.display = BLOCK;
  for (const li of Array.from(COMPUTED_CONTENT_UL.getElementsByTagName('li'))) {
    FINAL_CONTENT_LISTING.appendChild(li);
  }
  SUCCESSFUL_PROGRAM_COPY_BTN.onclick = () => copyProgram(SUCCESSFUL_PROGRAM_COPY_BTN);
  SUCCESSFUL_PROGRAM_PRINT.innerText = PROGRAM_BOX.value;
  DESIRED_OUTPUT_SPAN.innerText = atob('QUxGQUxGQSBBTUFMR0FNUw==');
}

// -- HTML element util functions --

function makeTaskTracker(name: string, time: number, capacity: number): HTMLParagraphElement {
  const p = document.createElement('p');
  p.innerText += `${name} (Capacity: ${capacity}) `;
  const span = document.createElement('span');
  span.className = TIMER_CLASS;
  span.innerText = formatSeconds(time);
  p.appendChild(span);
  return p;
}

function makeButtonWithTooltipSpan(name: string, capacity: number): HTMLSpanElement {
  const span = document.createElement('span');
  span.classList.add('button-span')
  const button = document.createElement('button');
  button.classList.add(B_CLASS);
  button.innerText = name;
  button.onclick = () => {
    if (button.ariaDisabled === "true") { // === "true" necessary because ariaDisabled is a string not bool
      const name = button.innerText;
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.innerText = calculateTooltipMessage(name);
      button.parentElement.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 1000);
    } else {
      // Start game if it's not already started. This has to happen before the task is started.
      if (startTimestamp === undefined) {
        start();
      }
      startTask(name, capacity, getTimeUsed());
    }
    updateButtonsDisabledState();
  }
  span.appendChild(button);
  return span;
}

function calculateTaskStatusTdId(name: string): string {
  return `${name}-task-status`;
}

function calculateTaskTimeTdId(name: string): string {
  return `${name}-task-time`;
}

function addTaskTableRow(name: string, capacity: number): void {
  const time = currentRuntimes.get(name);

  const tr = document.createElement('tr');

  const statusTd = document.createElement('td');
  statusTd.id = calculateTaskStatusTdId(name);
  statusTd.classList.add(STATUS_CLASS);

  const buttonTd = document.createElement('td');
  buttonTd.appendChild(makeButtonWithTooltipSpan(name, capacity));

  const capacityTd = document.createElement('td');
  capacityTd.innerText = `${capacity}`;

  const timeTd = document.createElement('td');
  timeTd.id = calculateTaskTimeTdId(name);
  timeTd.classList.add(TIME_DISPLAY_CLASS);
  timeTd.innerText = formatSeconds(time);

  [statusTd, buttonTd, capacityTd, timeTd].forEach((child) => tr.appendChild(child));
  TASK_BUTTONS_TABLE.getElementsByTagName('tbody')[0].appendChild(tr);
}

function addComputedOutputListing(): void {
  COMPUTED_CONTENT_UL.innerHTML += `<li>${currentComputerValue}</li>`
}

function getTimer(p: HTMLParagraphElement): HTMLSpanElement {
  return p.getElementsByClassName(TIMER_CLASS)[0] as HTMLSpanElement;
}

function getButton(buttonSpan: HTMLSpanElement): HTMLButtonElement {
  return buttonSpan.getElementsByTagName('button')[0];
}

function getStatusTd(name: string): HTMLTableCellElement {
  return document.getElementById(calculateTaskStatusTdId(name)) as HTMLTableCellElement;
}

function getTimeTd(name: string): HTMLTableCellElement {
  return document.getElementById(calculateTaskTimeTdId(name)) as HTMLTableCellElement;
}

function setControlsVisible(controlsVisible: boolean) {
  CONTROLS_AVAILABLE_DIV.style.display = controlsVisible ? BLOCK : NONE;
  CONTROLS_UNAVAILABLE_DIV.style.display = controlsVisible ? NONE : BLOCK;
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

async function submitProgram(): Promise<void> {
  try {
    const csrftoken = getCookie('csrftoken');
    const result = await fetch('/puzzle/babysit-the-supercomputer/submit-program', {
      method: 'POST',
      headers: { 'X-CSRFToken': csrftoken },
      body: JSON.stringify(PROGRAM_BOX.value)
    });
    const data = await result.json();
    if (!result.ok) {
      // Expect this to be JSON with an 'error' field.
      MODAL_INSIDE_CONTENT_DIV.innerHTML = data.error ?? 'An error occurred';
    } else {
      DESIRED_OUTPUT_SPAN.innerText = data.message;
    }
  } catch (e) {
  }
}

// -- 'main', the place where we call all our functions --

// Limit the input to 20 characters; no bee movie script, please, thanks.
COMPUTER_INPUT_BOX.addEventListener('change', (e) => {
  if (frozen) return;
  COMPUTER_INPUT_BOX.value = COMPUTER_INPUT_BOX.value.slice(0, 20);
  const validInput = hasValidInput();
  updateButtonsDisabledState();
  PROGRAM_BOX.disabled = !validInput;
  setButtonState(PROGRAM_BUTTON, canProgramStart());
  setControlsVisible(hasValidInput());
});
// There's a bug with trying to carry over a word after a refresh, so just don't support it for now
COMPUTER_INPUT_BOX.value = '';

// Initially, the computer program box is disabled.
PROGRAM_BOX.disabled = true;
setButtonState(PROGRAM_BUTTON, false);
PROGRAM_BOX.addEventListener('keypress', (e) => {
  if (frozen) return;
  if (e.key === 'Enter') {
    startProgram();
  }
});
PROGRAM_BOX.addEventListener('change', (e) => {
  if (frozen) return;
  PROGRAM_BOX.value = PROGRAM_BOX.value.slice(0, 500);
  setButtonState(PROGRAM_BUTTON, canProgramStart());
})

INITIAL_TASKS.forEach(([_, capacity], name) => {
  addTaskTableRow(name, capacity);
});

// Step step step
oneSecondTimer(doStep);

// Update when user revisits the page.
window.addEventListener('focus', doStep);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') doStep() });

// Make all buttons have the right state.
updateButtonsDisabledState();

if (getFrozen()) {
  frozenStartTimestamp = Date.now();
  endTime = Date.now() + 240 * MILLIS_TO_SEC;
  document.getElementById('puztimer').style.display = 'inline-block';
}

registerOnGlitchHook((ex) => {
  frozen = true;
  Array.from(document.getElementsByClassName(B_CLASS) as HTMLCollectionOf<HTMLElement>).forEach((el) => {
    el.style.pointerEvents = 'none';
  });
  COMPUTER_INPUT_BOX.readOnly = true;
  if (startTimestamp === undefined) {
    PROGRAM_BUTTON.classList.add('glitchy-no-hover');
    PROGRAM_BUTTON.classList.add('disabled');
  }
});
