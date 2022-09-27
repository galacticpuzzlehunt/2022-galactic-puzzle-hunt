var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Please don't look at the source code.
var DISABLED_CLASS = 'disabled';
var TRUE = 'true';
var PAGE_ID = 'page';
var PAGE_CONTENT_DIV = document.getElementById('page-content');
var PUZZLE_CONTENT_DIV = document.getElementById('puzzle-content');
var HEADER = document.getElementById('page-header');
// For statification.
var PUZTIME = document.getElementById('puztime');
var NO_TIME = document.getElementById('no-time');
function disableLink(link) {
    link.onclick = function (e) { return e.preventDefault(); };
    link.classList.add(DISABLED_CLASS);
    link.ariaDisabled = TRUE;
}
function disableAllLinks() {
    for (var _i = 0, _a = Array.from(PUZZLE_CONTENT_DIV.getElementsByTagName('a')); _i < _a.length; _i++) {
        var link = _a[_i];
        disableLink(link);
    }
}
function rewriteHeader(newHeader) {
    HEADER.innerHTML = newHeader;
}
function rewritePageContent(newPageContent) {
    var content = "<p>".concat(newPageContent.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>"), "</p>");
    PAGE_CONTENT_DIV.innerHTML = content;
    processLinks();
}
// function getPageNumberFromUrl(): number {
//   const maybePageString = new URLSearchParams(window.location.search).get(PAGE_ID);
//   return maybePageString == null ? 1 : Number.parseInt(maybePageString);
// }
// -- server interaction --
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
    var cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
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
function sendGetReq(endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var csrftoken, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    csrftoken = getCookie('csrftoken');
                    return [4 /*yield*/, fetch(endpoint, {
                            mode: 'same-origin',
                            headers: { 'X-CSRFToken': csrftoken }
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result.json()];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function sendPageReq(page) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = getPage(page);
            rewriteHeader(data.header);
            rewritePageContent(data.pageContent);
            return [2 /*return*/];
        });
    });
}
function processLinks() {
    var _loop_1 = function (link) {
        var maybePageString = link.dataset.page;
        if (!maybePageString)
            return "continue";
        link.href = '?';
        link.setAttribute('role', 'link');
        link.onclick = function (e) {
            e.preventDefault();
            sendPageReq(maybePageString);
        };
    };
    for (var _i = 0, _a = Array.from(PAGE_CONTENT_DIV.getElementsByTagName('a')); _i < _a.length; _i++) {
        var link = _a[_i];
        _loop_1(link);
    }
}
registerOnGlitchHook(function () {
    disableAllLinks();
});
// Get started!
sendPageReq('3a206f57243bc1d35b8f4d16664b16516db33e24e536628eb7403b62adef5b99');
// Statification.
var startTime = new Date();
var numberOfMlSeconds = startTime.getTime();
var endTime = new Date(startTime.getTime() + 4 * 60 * 1000);
function calculateTimeRemaining() {
    if (endTime === undefined)
        return;
    var timeLeft = Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000));
    var minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    var seconds = (timeLeft % 60).toString().padStart(2, '0');
    PUZTIME.innerText = "".concat(minutes, " : ").concat(seconds);
    if (timeLeft == 0) {
        disableAllLinks();
        NO_TIME.style.display = 'block';
    }
}
setInterval(calculateTimeRemaining, 1000);
window.addEventListener('focus', calculateTimeRemaining);
