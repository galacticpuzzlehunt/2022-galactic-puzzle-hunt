// Please don't look at the source code.
const DISABLED_CLASS = 'disabled';
const TRUE = 'true';
const PAGE_ID = 'page';

const PAGE_CONTENT_DIV = document.getElementById('page-content') as HTMLDivElement;
const PUZZLE_CONTENT_DIV = document.getElementById('puzzle-content') as HTMLDivElement;
const HEADER = document.getElementById('page-header') as HTMLHeadingElement;

// For statification.
const PUZTIME = document.getElementById('puztime');
const NO_TIME = document.getElementById('no-time');

function disableLink(link: HTMLAnchorElement): void {
  link.onclick = (e) => e.preventDefault();
  link.classList.add(DISABLED_CLASS);
  link.ariaDisabled = TRUE;
}

function disableAllLinks(): void {
  for (const link of Array.from(PUZZLE_CONTENT_DIV.getElementsByTagName('a'))) {
    disableLink(link);
  }
}

function rewriteHeader(newHeader: string) {
  HEADER.innerHTML = newHeader;
}

function rewritePageContent(newPageContent: string) {
  const content = `<p>${newPageContent.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`;
  PAGE_CONTENT_DIV.innerHTML = content;
  processLinks();
}

// function getPageNumberFromUrl(): number {
//   const maybePageString = new URLSearchParams(window.location.search).get(PAGE_ID);
//   return maybePageString == null ? 1 : Number.parseInt(maybePageString);
// }

// -- server interaction --
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name: string): string {
  let cookieValue = '';
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

// async function sendPostReq(endpoint: string, body: any): Promise<any|undefined> {
//   try {
//     const csrftoken = getCookie('csrftoken');
//     const result = await fetch(endpoint, {
//       method: 'POST',
//       mode: 'same-origin',
//       headers: { 'X-CSRFToken': csrftoken },
//       body: JSON.stringify(body)
//     });
//     return result.json();
//   } catch {}
// }

async function sendGetReq(endpoint: string): Promise<any|undefined> {
  try {
    const csrftoken = getCookie('csrftoken');
    const result = await fetch(endpoint, {
      mode: 'same-origin',
      headers: { 'X-CSRFToken': csrftoken },
    });
    return result.json();
  } catch {}
}

declare function getPage(pageId: string);

async function sendPageReq(page: string) : Promise<any|undefined> {
  const data = getPage(page);
  rewriteHeader(data.header);
  rewritePageContent(data.pageContent);
}

function processLinks() {
  for (const link of Array.from(PAGE_CONTENT_DIV.getElementsByTagName('a'))) {
    const maybePageString = link.dataset.page;
    if (!maybePageString) continue;
    link.href = '?';
    link.setAttribute('role', 'link');
    link.onclick = (e) => {
      e.preventDefault();
      sendPageReq(maybePageString);
    }
  }
}

declare const registerOnGlitchHook: (_: () => void) => void;
registerOnGlitchHook(() => {
  disableAllLinks();
})

// Get started!
sendPageReq('3a206f57243bc1d35b8f4d16664b16516db33e24e536628eb7403b62adef5b99')

// Statification.
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
    disableAllLinks();
    NO_TIME.style.display = 'block';
  }
}

setInterval(calculateTimeRemaining, 1000);
window.addEventListener('focus', calculateTimeRemaining)