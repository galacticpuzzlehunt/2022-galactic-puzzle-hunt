// Math constants.
const c7b6 = 1000;
const b48f = 60;
// Word-transformation constants.
const e905 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// JS constants.
const a617 = 'BLOCK';
const z4252 = 'NONE';
const d8569 = 'polite';
// Classes.
const be31 = 'a';
const b4730 = 'b';
const a1c6 = 'c';
const a8ac = 'd';
const c7e7 = 'e';
const b40c = 'f';
const e729 = 'g';
// Google Material status icons HTML text.
const c704 = `<img class="i" alt="done" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z'/></svg>"/>`;
const dd2e = `<img class="i" alt="scheduled" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='m31.35 33.65 2.25-2.25-7.95-8V13.35h-3V24.6ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24t1.575-7.75q1.575-3.65 4.3-6.375 2.725-2.725 6.375-4.3Q19.9 4 24 4t7.75 1.575q3.65 1.575 6.375 4.3 2.725 2.725 4.3 6.375Q44 19.9 44 24t-1.575 7.75q-1.575 3.65-4.3 6.375-2.725 2.725-6.375 4.3Q28.1 44 24 44Zm0-20Zm0 17q7 0 12-5t5-12q0-7-5-12T24 7q-7 0-12 5T7 24q0 7 5 12t12 5Z'/></svg>"/>`;
// HTML Elements.
const b447 = document.getElementById('nvu7');
const a978 = document.getElementById('m9jf');
const dcd9 = document.getElementById('gr2d');
const f24a = document.getElementById('b');
const e7ae = document.getElementById('a');
const f92f = document.getElementById('d3l4s');
const e4dg = document.getElementById('ymzd');
const dba8 = document.getElementById('z2n0');
const h5p5 = document.getElementById('wwyt');
const tlxc = document.getElementById('iv8r');
const p6mj = document.getElementById('fayx');
const h8gd = document.getElementById('c87wl');
const a6bi = document.getElementById('ankf');
const rdep = document.getElementById('dzla');
const au2c = document.getElementById('e6gf');
const og41 = document.getElementById('k07vm');
const GLOBAL_TIMER = document.getElementById('puztimer');
const GLOBAL_TIMER_VAL = document.getElementById('puztime');
// Game constants.
const d7zm = 3;
const rit7 = 'Copy to clipboard';
const sxeh = 'Copied!';
const n000 = 'The input must be a valid English word.';
const k0i7 = 'This task was already started. You cannot start it again.';
const jo73 = 'There is not enough capacity available for this task.';
var Task;
(function (Task) {
    Task["ALPHA"] = "ALPHA";
    Task["BETA"] = "BETA";
    Task["GAMMA"] = "GAMMA";
    Task["DELTA"] = "DELTA";
    Task["EPSILON"] = "EPSILON";
    Task["ZETA"] = "ZETA";
    Task["ETA"] = "ETA";
    Task["THETA"] = "THETA";
    Task["IOTA"] = "IOTA";
    Task["KAPPA"] = "KAPPA";
    Task["LAMBDA"] = "LAMBDA";
    Task["TFC"] = "THE FINAL COMPUTATION";
})(Task || (Task = {}));
const z76a = new Set();
r9a2.forEach(word => z76a.add(word));
/**
 * @param value The value to decrease by, in seconds.
 * @returns     A function that takes in a numerical input and returns input - [value].
 */
function w7xpz(value) {
    return (input) => input - value;
}
// These places will store information that changes throughout the game.
// Freeze the interface
let cu83 = false;
let frozenStartTimestamp = Date.now();
// Start timestamp of the program
let l81pq;
let r2ci;
// Keeps track of which tasks have already started -> when they started, how long they were scheduled for.
// Prevents us from running tasks again and also allows us to construct "programs".
const o4tyr = new Map();
// Create all the 'timers' for ongoing tasks.
let g2u7 = [];
// The current content of the computer.
let sh1z = '';
// Program of the computer.
const wgs0 = new Map();
// Last executed step index.
let ufts = -1;
// -- Basic string operations --
function t8opn(g) {
    return ('0' + Math.floor(g)).slice(-2);
}
function kihe(seconds) {
    const i = Math.floor(seconds / b48f);
    const e = seconds % b48f;
    return `${t8opn(i)}:${t8opn(e)}`;
}
// -- Special word transformations for the game --
function g9qgm(s, a) {
    return e905.charAt((e905.indexOf(s) + a + e905.length) % e905.length);
}
function jybv(k) {
    let res = '';
    for (let i = 0; i < k.length; i++) {
        const z = (e905.indexOf(k.charAt(i)) % 2 == 0) ? 1 : -1;
        res += g9qgm(k.charAt(i), z);
    }
    return res;
}
function d5490(c) {
    let a = '';
    for (let i = 0; i < c.length; i++) {
        const p = e905.indexOf(c.charAt(i));
        const q = (p >= 14) ? -14 : 0;
        a += g9qgm(c.charAt(i), q);
    }
    return a;
}
function ttla(h) {
    return h.replaceAll('B', 'AM');
}
function zwqq(n) {
    const j = n.length - 1;
    if (n.length > 3) {
        const i = n.length - 4;
        return n.slice(0, i) + g9qgm(n.charAt(i), -4) + n.slice(i + 1, j) + g9qgm(n.charAt(j), 6);
    }
    else {
        return n.slice(0, j) + g9qgm(n.charAt(j), 6);
    }
}
const x8og = new Map([
    [Task.DELTA, jybv],
    [Task.LAMBDA, d5490],
    [Task.ETA, ttla],
    [Task.TFC, zwqq]
]);
function ohrv() {
    return Math.floor((Math.min(Date.now(), r2ci) - l81pq) / c7b6);
}
function er7d() {
    return d7zm - g2u7.map(([a, b, c, p]) => c).reduce((prev, curr) => prev + curr, 0);
}
function goh3(l) {
    return o4tyr.has(l);
}
function p8ga(o) {
    const [_, v] = fcm6.get(o);
    return v <= er7d();
}
// Initial tasks, listed as name -> [time, capacity].
const fcm6 = new Map([
    [Task.ALPHA, [20, 2]],
    [Task.BETA, [30, 2]],
    [Task.GAMMA, [1 * b48f, 1]],
    [Task.DELTA, [1 * b48f + 15, 3]],
    [Task.EPSILON, [2 * b48f + 10, 1]],
    [Task.ZETA, [2 * b48f + 15, 2]],
    [Task.ETA, [2 * b48f + 25, 3]],
    [Task.THETA, [2 * b48f + 45, 2]],
    [Task.IOTA, [3 * b48f + 10, 2]],
    [Task.KAPPA, [3 * b48f + 50, 1]],
    [Task.LAMBDA, [4 * b48f, 3]],
    [Task.TFC, [6 * b48f, 3]]
]);
function h2zhy() {
    const j = dcd9.value;
    return j.length > 0 && z76a.has(j.toLowerCase());
}
function ns3t() {
    return h2zhy() && h8gd.value.length > 0;
}
function r2cs() {
    return document.createElement('td');
}
function r57s() {
    try {
        const b = JSON.parse(atob(h8gd.value.trim()));
        for (const [w, d] of b) {
            for (const name of d) {
                const m = Number.parseInt(w);
                const s = wgs0.get(m) ?? [];
                s.push(name);
                wgs0.set(m, s);
                fsnt(name).innerHTML = dd2e;
            }
        }
        jyqv();
        fcm6.forEach(([_, z], f) => {
            if (wgs0.get(0)?.includes(f)) {
                t12o(f, z, 0);
            }
        });
        return true;
    }
    catch (_) {
        return false;
    }
}
// Keeps track of current run time for each task.
const u1j9 = new Map();
fcm6.forEach(([u7fv, _], pafw) => {
    u1j9.set(pafw, u7fv);
});
function kf5s(k) {
    if (goh3(k)) {
        return k0i7;
    }
    else if (!p8ga(k)) {
        return jo73;
    }
    else {
        return n000;
    }
}
function c0n2(y, r) {
    if (r) {
        y.classList.remove(a1c6);
        y.ariaDisabled = 'false';
    }
    else {
        y.classList.add(a1c6);
        y.ariaDisabled = 'true';
    }
}
function cidq() {
    const g = Array.from(og41.getElementsByClassName(be31));
    if (g) {
        g.forEach((q) => {
            const l = h2xv4(q);
            const f = l.innerText;
            const w = !goh3(f) && p8ga(f) && h2zhy();
            c0n2(l, w);
        });
    }
}
function yrd0(h) {
    fcm6.forEach((_, q) => {
        const n = ii73(q).classList;
        if (h.includes(q)) {
            n.add(a8ac);
        }
        else {
            n.remove(a8ac);
        }
    });
}
function wfea(p, l) {
    u1j9.set(p, l);
    const timeTd = ii73(p);
    timeTd.innerText = kihe(l);
}
// -- callback methods --
function sou0(b) {
    b.innerText = sxeh;
    setTimeout(() => b.innerText = rit7, 1000);
}
// Which tasks affect other tasks.
const m80lz = new Map([
    [Task.ALPHA, new Map([[Task.KAPPA, w7xpz(1 * b48f + 55)], [Task.LAMBDA, w7xpz(15)]])],
    [Task.BETA, new Map([[Task.EPSILON, w7xpz(2 * b48f)],
            [Task.THETA, w7xpz(2 * b48f)],
            [Task.IOTA, w7xpz(1 * b48f)]])],
    [Task.GAMMA, new Map([[Task.ALPHA, w7xpz(10)], [Task.ETA, w7xpz(35)]])],
    [Task.DELTA, new Map([[Task.ZETA, w7xpz(2 * b48f)], [Task.TFC, w7xpz(2 * b48f)]])],
    [Task.EPSILON, new Map([[Task.DELTA, w7xpz(45)], [Task.IOTA, w7xpz(1 * b48f)]])],
    [Task.ZETA, new Map([[Task.THETA, w7xpz(30)], [Task.LAMBDA, w7xpz(2 * b48f)]])],
    [Task.ETA, new Map([[Task.IOTA, w7xpz(10)], [Task.TFC, w7xpz(3 * b48f)]])],
    [Task.THETA, new Map([[Task.DELTA, w7xpz(20)],
            [Task.IOTA, w7xpz(1 * b48f)],
            [Task.LAMBDA, w7xpz(10)]])],
    [Task.IOTA, new Map([[Task.GAMMA, w7xpz(20)],
            [Task.KAPPA, w7xpz(90)],
            [Task.LAMBDA, w7xpz(50)]])],
    [Task.KAPPA, new Map([[Task.ETA, w7xpz(45)]])],
    [Task.LAMBDA, new Map([[Task.ETA, w7xpz(1 * b48f)], [Task.TFC, w7xpz(55)]])],
    [Task.TFC, new Map()]
]);
function qdpy(e) {
    if ("navigator" in window && navigator.clipboard) {
        // Modern navigator API, supports writing text.
        navigator.clipboard.writeText(h8gd.value).then(() => sou0(e));
    }
    else {
        // Handle selection.
        h8gd.select();
        h8gd.setSelectionRange(0, 99999);
        document.execCommand('copy');
        h8gd.blur();
        if (window.getSelection())
            window.getSelection().removeAllRanges();
        sou0(e);
    }
}
function a55c(f) {
    setTimeout(() => {
        f();
        a55c(f);
    }, 1 * c7b6);
}
function o58xh(s) {
    const x1ybrs = [];
    // Keep track of which tasks' runtimes were affected.
    const w8km = [];
    g2u7.forEach(([a, b, c, p]) => {
        const [egzr, d7nu] = o4tyr.get(a);
        const x1yb = d7nu - (s - egzr);
        if (x1yb > 0) {
            y4pgt(p).innerText = kihe(x1yb);
            x1ybrs.push([a, x1yb, c, p]);
        }
        else {
            // Task is done, so...
            // Change the runtimes of all the tasks it affects.
            m80lz.get(a)?.forEach((f, z) => {
                w8km.push(z);
                wfea(z, f(u1j9.get(z)));
            });
            fsnt(a).innerHTML = c704;
            // Remove it from the active tasks.
            p.remove();
            // Update the computed content, if applicable.
            const y34ji = x8og.get(a);
            if (y34ji) {
                sh1z = y34ji(sh1z);
                smnj();
            }
            if (a === Task.TFC) {
                kz8g();
            }
        }
    });
    g2u7 = x1ybrs;
    const m = wgs0.get(s);
    if (m !== undefined) {
        fcm6.forEach(([_, q], v) => {
            if (m.includes(v)) {
                // If task has not started and there is available capacity,
                if ((o4tyr.get(v) === undefined) && p8ga(v)) {
                    t12o(v, q, s);
                }
            }
        });
    }
    return w8km;
}
function updateGlobalTimer() {
    let s9ff = (Date.now() - frozenStartTimestamp) / c7b6;
    if (s9ff > 240) {
        doGlitch(false);
        s9ff = 240;
    }
    GLOBAL_TIMER_VAL.innerText = kihe(240 - s9ff);
    if (cu83)
        return;
    requestAnimationFrame(updateGlobalTimer);
}
if (getFrozen()) {
    requestAnimationFrame(updateGlobalTimer);
}
function jqwb() {
    const s = ohrv();
    let w8km = [];
    for (let i = ufts + 1; i <= s; i++) {
        w8km = o58xh(i);
    }
    ufts = s;
    cidq();
    if (w8km.length > 0) {
        yrd0(w8km);
    }
    if (r2ci < Date.now()) {
        l81pq = undefined;
    }
    if (cu83 || l81pq === undefined) {
        return;
    }
}
function jyqv() {
    l81pq = Date.now();
    if (r2ci === undefined) {
        r2ci = loopEndTime;
    }
    h8gd.readOnly = true;
    c0n2(p6mj, true);
    p6mj.onclick = () => qdpy(p6mj);
    p6mj.innerText = rit7;
    dcd9.readOnly = true;
    sh1z = dcd9.value.trim().toUpperCase();
    smnj();
}
function g49oh() {
    const w = r57s();
    if (w) {
        a6bi.style.display = z4252;
    }
    else {
        a6bi.style.display = a617;
    }
}
function t12o(x, u, s) {
    const b = u1j9.get(x);
    const c = qno1(x, b, u);
    g2u7.push([x, b, u, c]);
    o4tyr.set(x, [s, b]);
    b447.appendChild(c);
    const td = fsnt(x);
    td.innerHTML = dd2e;
    const e = wgs0.get(s) ?? [];
    if (!e.includes(x))
        e.push(x);
    wgs0.set(s, e);
    h8gd.value = btoa(JSON.stringify(Array.from(wgs0.entries())));
}
function kz8g() {
    tlxc.ariaHidden = "true";
    dba8.style.display = a617;
    for (const li of Array.from(a978.getElementsByTagName('li'))) {
        e4dg.appendChild(li);
    }
    rdep.onclick = () => qdpy(rdep);
    au2c.innerText = h8gd.value;
    f92f.innerText = atob('QUxGQUxGQSBBTUFMR0FNUw==');
}
// -- HTML element util functions --
function qno1(w, o, k) {
    const p = document.createElement('p');
    p.innerText += `${w} (Capacity: ${k}) `;
    const span = document.createElement('span');
    span.className = e729;
    span.innerText = kihe(o);
    p.appendChild(span);
    return p;
}
function sc7n(u, m) {
    const c = document.createElement('span');
    c.classList.add(be31);
    const g = document.createElement('button');
    g.classList.add(b4730);
    g.innerText = u;
    g.onclick = () => {
        if (g.ariaDisabled === "true") { // === "true" necessary because ariaDisabled is a string not bool
            const u = g.innerText;
            const l = document.createElement('span');
            l.className = 'wyy8';
            l.innerText = kf5s(u);
            g.parentElement.appendChild(l);
            setTimeout(() => l.remove(), 1000);
        }
        else {
            // Start game if it's not already started.
            if (l81pq === undefined) {
                jyqv();
            }
            t12o(u, m, ohrv());
        }
        cidq();
    };
    c.appendChild(g);
    return c;
}
function e0v2w(s) {
    return `${s}-task-status`;
}
function scyp(s) {
    return `${s}-task-time`;
}
function mtl7(p, v) {
    const c = u1j9.get(p);
    const r = document.createElement('tr');
    const g = r2cs();
    g.id = e0v2w(p);
    g.classList.add(c7e7);
    const l = r2cs();
    l.appendChild(sc7n(p, v));
    const f = r2cs();
    f.innerText = `${v}`;
    const y = r2cs();
    y.id = scyp(p);
    y.classList.add(b40c);
    y.innerText = kihe(c);
    [g, l, f, y].forEach((w) => r.appendChild(w));
    og41.getElementsByTagName('tbody')[0].appendChild(r);
}
function smnj() {
    a978.innerHTML += `<li>${sh1z}</li>`;
}
function y4pgt(p) {
    return p.getElementsByClassName(e729)[0];
}
function h2xv4(s) {
    return s.getElementsByTagName('button')[0];
}
function fsnt(n) {
    return document.getElementById(e0v2w(n));
}
function ii73(d) {
    return document.getElementById(scyp(d));
}
function d98m1(k) {
    f24a.style.display = k ? a617 : z4252;
    e7ae.style.display = k ? z4252 : a617;
}
// -- server interaction --
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function ue4w(b) {
    let v = null;
    if (document.cookie && document.cookie !== '') {
        const j = document.cookie.split(';');
        for (let i = 0; i < j.length; i++) {
            const u = j[i].trim();
            // Does this cookie string begin with the name we want?
            if (u.substring(0, b.length + 1) === (b + '=')) {
                v = decodeURIComponent(u.substring(b.length + 1));
                break;
            }
        }
    }
    return v;
}
async function t7bm() {
    try {
        const e = ue4w('csrftoken');
        const h = await fetch('/puzzle/babysit-the-supercomputer/submit-program', {
            method: 'POST',
            headers: { 'X-CSRFToken': e },
            body: JSON.stringify(h8gd.value)
        });
        const p = await h.json();
        if (!h.ok) {
            // Expect this to be JSON with an 'error' field.
            h5p5.innerHTML = p.error ?? 'An error occurred';
        }
        else {
            f92f.innerText = p.message;
        }
    }
    catch (e) {
    }
}
// -- 'main', the place where we call all our functions --
// Limit the input to 20 characters; no bee movie script, please, thanks.
dcd9.addEventListener('change', () => {
    if (cu83)
        return;
    dcd9.value = dcd9.value.slice(0, 20);
    const a = h2zhy();
    cidq();
    h8gd.disabled = !a;
    c0n2(p6mj, ns3t());
    d98m1(h2zhy());
});
// There's a bug with trying to carry over a word after a refresh, so just don't support it for now
dcd9.value = '';
// Initially, the computer wgs0 box is disabled.
h8gd.disabled = true;
c0n2(p6mj, false);
h8gd.addEventListener('keypress', (e) => {
    if (cu83)
        return;
    if (e.key === 'Enter') {
        g49oh();
    }
});
h8gd.addEventListener('change', () => {
    if (cu83)
        return;
    h8gd.value = h8gd.value.slice(0, 500);
    c0n2(p6mj, ns3t());
});
fcm6.forEach(([_, w], h) => {
    mtl7(h, w);
});
// Step step step
a55c(jqwb);
// Update when user revisits the page.
window.addEventListener('focus', jqwb);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible')
    jqwb(); });
// Make all buttons have the right state.
cidq();
if (getFrozen()) {
    frozenStartTimestamp = Date.now();
    r2ci = Date.now() + 240 * c7b6;
    document.getElementById('puztimer').style.display = 'inline-block';
}
registerOnGlitchHook((ex) => {
    cu83 = true;
    Array.from(document.getElementsByClassName(b4730)).forEach((el) => {
        el.style.pointerEvents = 'none';
    });
    dcd9.readOnly = true;
    if (l81pq === undefined) {
        p6mj.classList.add('glitchy-no-hover');
        p6mj.classList.add('c');
    }
});
