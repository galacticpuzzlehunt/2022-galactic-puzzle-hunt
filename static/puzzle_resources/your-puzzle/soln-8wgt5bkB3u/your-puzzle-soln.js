const puzzles = [
  '.alicebob',
  '.backsolve',
  '.ball',
  '.extract',
  '.frogorf',
  '.id',
  '.magic',
  '.masyu',
  '.submit',
  '.words',
]

document.addEventListener('DOMContentLoaded', async () => {
  // kill copyjack
  document.querySelectorAll('.clipboard-button').forEach(e => {
    e.parentNode.removeChild(e)
  })

  onHashChange()
})

window.addEventListener('hashchange', onHashChange)

function onHashChange() {
  
  hideSolns()

  let puzzle = window.location.hash.slice(1)
  let selector = '.'+puzzle
  if (puzzles.includes(selector)) {
    let btn = document.querySelector('#toggle-'+puzzle)
    toggleSoln(btn, selector)
  }
}

function hideSolns() {
  // remove .selected from all 
  document.querySelectorAll('.selected').forEach(e => {
    e.classList.remove('selected')
  })
  for (let selector of puzzles) {
    let el = document.querySelector(selector)
    el.style.display = 'none'
  }
}

function toggleSoln(btn, selector, force=false) {
  let el = document.querySelector(selector)
  if (force || el.style.display == 'none') { // show
    hideSolns()

    el.style.display = 'block'
    document.querySelector(selector+'.nested-puzzle').style.display = 'none'

    btn.classList.add('selected')
    window.location.hash = selector.slice(1)
  } else { // hide
    hideSolns()
    btn.classList.remove('selected')
    // window.location.hash = ''
    // console.log(window.location)
    history.pushState({}, '', window.location.href.replace(window.location.hash, '#'))
  }
  
  if (force) {
    window.scrollTo(0, 0)
  }
  // pause frogorf soln
  document.querySelector('#frogorf-soln-video').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

}

function togglePuzzle(btn, selector) {
  let el = document.querySelector(selector+'.nested-puzzle')
  if (el.style.display == 'none') {
    el.style.display = 'block'
    btn.classList.add('selected')
  } else {
    el.style.display = 'none'
    btn.classList.remove('selected')
  }
}

// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
  var cookieValue = null;
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

const sleep = ms => new Promise(r => setTimeout(r, ms))
