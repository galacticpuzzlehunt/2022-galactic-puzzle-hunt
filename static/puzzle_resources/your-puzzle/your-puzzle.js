// client side for Your Puzzle

const sleep = ms => new Promise(r => setTimeout(r, ms))

function getFormVecValidated(form) {
    const ranges = [4,5,5,5,5,4,3,5,1]
    const formData = new FormData(form)
    let formVec =  [0,0,0,0,0,0,0,0,1]

    for (const [key, value] of formData) {
        if (key.startsWith("q")) {
            if (key.startsWith("q9")) {
                continue
            }
            let i = parseInt(key.substring(1))
            if (isNaN(i)) {
                throw new Error("Invalid key: " + key)
            }
            if (isNaN(parseInt(value))) {
                throw new Error("Invalid value: " + value)
            }
            formVec[i-1] = parseInt(value)
        }
    }

    for (let i = 0; i < formVec.length; i++) {
        if (formVec[i] < 1 || formVec[i] > ranges[i]) {
            throw new Error('Invalid value for question ' + (i+1) + ': ' + formVec[i])
        }
    }

    // check specials
    if (formData.get('q9a') !== '2' || formData.get('q9b') !== '1') {
        throw new Error('Invalid value for question 9: ' + formData.get('q9a') + ' ' + formData.get('q9b'))
    }

    // check confirm
    if (!formData.get('confirm')) {
        throw new Error('Need to check confirm box')
    }

    return formVec
}

async function hideWarn(warn) {
    warn.style.opacity = 0
    await sleep(0.2)
    warn.innerHTML = ""
}

// ~~~ client-side submission ~~~

const initData = {
    'current': 0,
    'seen': 0,
    'quiz': [],
}

const puzzles = {
    1: 'alicebob',
    2: 'backsolve',
    3: 'ball',
    4: 'extract',
    5: 'frogorf',
    6: 'id',
    7: 'magic',
    8: 'masyu',
    9: 'submit',
    10: 'words',
}

function wipeData() {
    localStorage.setItem('your-puzzle', JSON.stringify(initData))
}

function getData() {
    let data = localStorage.getItem('your-puzzle')
    if (data === null) {
        wipeData()
        return initData
    }
    return JSON.parse(data)
}

function setData(key, val) {
    if (!initData.hasOwnProperty(key)) return // invalid key

    let data = getData()
    data[key] = val
    localStorage.setItem('your-puzzle', JSON.stringify(data))
}

// reset quiz
function reset() {
    // console.log('resetting')
    const data = getData()
    // console.log(getData())

    setData('current', 0)
    setData('quiz', [])
    window.location.reload()
}

// wipe quiz seen data
function wipe() {
    const txt = 'This will delete all progress, and is not necessary to solve this puzzle. If you want to resubmit the quiz, use “Reset Quiz” instead.'
    if (confirm(txt)) {
        wipeData()
        window.location.reload()
    }
}


// fill out the form and lock it
function prefillForm(form) {
    let data = getData()
    let note = document.getElementById('yp-note')

    if (data.quiz.length > 0 && data.current !== 0) {
        // prefill the form
        let vec = data.quiz
        for (let [i, val] of vec.entries()) {
            if (i+1 < 9) {
                let query = "#q" + (i+1) + " input[value='" + val + "']"
                // console.log(query)
                document.querySelector(query).checked = true
            }
        }

        // do special case 9
        document.querySelector('#q9 input[name="q9a"][value="2"]').checked = true
        document.querySelector('#q9 input[name="q9b"][value="1"]').checked = true
        document.querySelector('.confirm').checked = true

        // append lock emoji after header
        document.querySelector('.expando-header h3').innerHTML += ' 🔒'

        // disable submit button
        document.querySelector('#submit>button').classList.add('disabled')

        // disable form
        form.classList.add('disabled')

        // show wrongs
        document.querySelectorAll(".wrong").forEach(e => e.disabled = true)

        // collapse form
        document.getElementById('expando').checked = false

        note.innerHTML = "<p>Based on your answers to the quiz, we&rsquo;ve determined the perfect puzzle for you! <em>(The mapping from questions to your puzzle are not part of any puzzle content.)</em></p>During the hunt, your choices were locked for this <span class='glitch' data-text='exam session'>exam session</span>. Press &ldquo;Reset Quiz&rdquo; to simulate retaking the exam."
    } else {
        note.innerHTML = "You can only submit the quiz <span class='glitch' data-text='once'>once</span>, so we recommend getting your whole team together to answer."
    }
}

// calculate perfect puzzle from form
//   return puzzle id 1-10
function getPuzzle(quiz) {
    const weights = [
        [
            [0,2,0,0,0,0,0,0,0,0],
            [0,0,0,0,2,0,2,0,0,0],
            [0,0,0,0,1,2,0,0,1,0],
            [0,0,0,1,1,0,1,0,0,1],
        ],
        [
            [0,0,0,1,1,0,1,1,1,1],
            [0,0,0,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,1,1,1],
            [1,0,1,1,1,0,0,1,0,1],
        ],
        [
            [0,0,0,0,0,0,0,0,0,4],
            [0,0,0,0,0,0,0,4,0,0],
            [0,0,0,2,0,1,0,0,0,0],
            [0,0,0,0,1,2,0,0,0,0],
            [0,0,1,0,0,0,0,0,2,0],
        ],
        [
            [2,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,0,0],
            [0,0,0,0,2,0,0,0,0,0],
            [2,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,0,1,1],
        ],
        [
            [1,0,1,0,1,0,0,1,1,0],
            [0,0,0,0,0,0,4,0,0,0],
            [0,0,0,2,0,0,0,0,0,0],
            [0,0,0,1,0,1,1,1,0,1],
            [0,0,0,0,0,0,0,0,2,0],
        ],
        [
            [0,4,0,0,0,0,0,0,0,0],
            [0,0,4,0,0,0,0,0,0,0],
            [1,0,0,1,0,1,0,1,0,0],
            [2,0,1,0,0,0,0,0,0,0],
        ],
        [
            [1,0,0,0,1,0,1,1,0,0],
            [0,0,1,1,0,0,1,0,1,1],
            [0,0,0,1,0,1,0,0,1,0],
        ],
        [
            [0,0,1,0,0,0,0,0,2,0],
            [0,0,0,0,0,0,0,0,0,2],
            [2,0,0,0,0,0,0,0,1,0],
            [0,0,0,0,2,0,2,0,0,0],
            [0,0,0,0,0,2,0,1,0,0],
        ],
        [
            [0,0,0,0,0,0,0,0,0,0],
        ],
    ]

    // assume quiz is validated
    let vec = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (const [q, a] of quiz.entries()) {
        let weight = weights[q][a-1]
        vec = vec.map((v, i) => v + weight[i])
    }

    // argmax
    return vec.indexOf(Math.max(...vec)) + 1
}

document.addEventListener('DOMContentLoaded', async () => {
    // disable copyjack on the whole puzzle
    let puzzleClasses = document.getElementsByClassName("puzzle-main")[0].classList
    puzzleClasses.remove("clipboard-container")
    puzzleClasses.add("no-copy")

    document.querySelectorAll(".wrong").forEach(e => {
        e.addEventListener('click', f=> {
            // disable input
            e.checked = false
            e.disabled = true
        })
    })

    // initialize data and get
    let data = getData() 
    // console.log(data)

    // show content
    const wipeBtn = document.querySelector('#yp-wipe')
    const resetBtn = document.querySelector('#yp-reset')
    const staticBtns = document.querySelector('#static-buttons')
    if (data.current !== 0) {
        // only show reset button if quiz submitted
        staticBtns.style.display = 'flex'
        resetBtn.style.visibility = 'visible'
        document.querySelector('#sec2 .text').style.display = 'none'

        // show puzzle
        const puzz = document.querySelector(`#sec2 .puzzle.${puzzles[data.current]}`)
        puzz.style.display = 'block'

        // delete other puzzles
        document.querySelectorAll('#sec2 .puzzle').forEach(e => {
            if (e !== puzz) e.remove()
        })

        // show copyjack
        if (puzz.classList.contains('copy')) {
            const copyjack = document.getElementById('copyjack')
            copyjack.style.display = 'inline-block'
            // add class
            copyjack.classList.add('clipboard-button')
        }

    } else {
        resetBtn.style.visibility = 'hidden'
    }

    // only show wipe button if there is data to wipe
    if (data.seen !== 0 || data.current !== 0 || data.quiz.length !== 0) {
        staticBtns.style.display = 'flex'
        wipeBtn.style.visibility = 'visible'
    } else {
        wipeBtn.style.visibility = 'hidden'
    }

    
    let form = document.getElementById("your-puzzle-form")
    let warn = document.getElementById("warn")

    prefillForm(form)

    // given form data, return if puzzle to show has been seen before
    function presubmit(formVec) {
        let data = getData() // reget data in case things changed

        let res = {}
        if (data.current !== 0) 
            return {'warning': '<strong>Warning:</strong><br>You cannot resubmit the quiz. Try refreshing the page.'}

        let p = getPuzzle(formVec)
        if (p < 1 || p > puzzles.length) return {}

        let warning = "<strong>Warning:</strong><br>You've already seen this puzzle before!"

        // how many seen: count number of 1s in binary representation
        let seenCount = data.seen.toString(2).split('').filter(x => x === '1').length

        if (seenCount > 5)
            warning += "<br>Total puzzles seen: " + seenCount.toString() + "/10"

        // check if puzzle p has been seen
        if (data.seen & (1 << p))
            return {'warning': warning}

        return {}
    }

    // on form change
    form.addEventListener('input', async e => {
        let formVec
        try {
            formVec = getFormVecValidated(form)
        } catch (e) {
            // console.log(e)
            hideWarn(warn)
            // grey submit button, but allow clicking for client-side validation
            document.querySelector('#submit>button').classList.add('incomplete')
            return
        }

        //ungrey submit button
        document.querySelector('#submit>button').classList.remove('incomplete')
        // console.log(formVec)
        // form is valid, presubmit
        let res = presubmit(formVec)

        // console.log(res)

        // retrieve error message from server 
        if ('warning' in res && res.warning) {
            warn.innerHTML = res.warning
            warn.style.opacity = 0.8
        } else {
            hideWarn(warn)
        }

    })

    // submit
    form.addEventListener('submit', async e => {
        e.preventDefault()

        let data = getData() // reget data in case things changed

        // can't resubmit
        if (data.current !== 0) return

        let formVec
        try {
            formVec = getFormVecValidated(form)
        } catch (e) {
            // console.log(e)
            return
        }

        let p = getPuzzle(formVec)
        if (p < 1 || p > puzzles.length) return

        setData('current', p)
        setData('seen', data.seen | (1 << p))
        setData('quiz', formVec)

        // prevent FF form resubmission
        window.location.reload(true)
    })
})



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

registerOnGlitchHook((ex) => {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.remove('incomplete');
    submitBtn.classList.remove('disabled');
    submitBtn.classList.add('glitchy');
    submitBtn.classList.add('btn-disabled');
    submitBtn.style.pointerEvents = 'none';
});
