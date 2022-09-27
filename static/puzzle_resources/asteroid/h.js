window.h = (elt, ...args) => {
  let e = document.createElement("div");
  elt
    .split(/([\.#]?[^#.]+)/)
    .forEach((p) =>
      p[0] === "."
        ? e.classList.add(p.slice(1))
        : p[0] === "#"
        ? (e.id = p.slice(1))
        : p && (e = document.createElement(p))
    );
  args
    .flat(Infinity)
    .forEach((l) =>
      l?.nodeName && l?.nodeType
        ? e.appendChild(l)
        : typeof l === "object"
        ? Object.entries(l).forEach(([k, v]) =>
            typeof v === "function"
              ? e.addEventListener(k.slice(2), v)
              : k === "style"
              ? Object.entries(v).forEach(([k, v]) => (e.style[k] = v))
              : e.setAttribute(k, v)
          )
        : (l || l === 0) && e.appendChild(document.createTextNode(l))
    );
  return e;
};
