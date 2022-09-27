'use strict';

const e = React.createElement

const { useCallback, useEffect, useRef, useState } = React

const SERVER_URL = 'https://interactive.galacticpuzzlehunt.com/myoph';

// -- server interaction --
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
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


let TabDisplay = (props) => {
    let { tabs, selected, selectCallback } = props

    return <div className="tab-display">
        {tabs.map(tabName => (
          <div
           className={"puzzle-tab" + (tabName == selected ? " selected" : "")}
           key={tabName}
           onClick={() => { selectCallback(tabName); }}>
            {tabName}
          </div>
        ))}
    </div>
}


let AudioTab = (props) => {
    let { value, changeCallback, submitCallback } = props

    return <div>
      <div className="myoph-puzzle-instructions">
        <span>Submit a list of interesting topics to make up your puzzle.</span>
        <div><ul>
          <li>Submit at least 8 topics</li>
          <li>Each topic must be notable enough to have a Wikipedia page</li>
          <li>Each topic should have an index in its title</li>
          <li>All indices must be distinct</li>
        </ul></div>
      </div>
      <div className="myoph-input-container">
        <textarea className="myoph-audio-textarea" spellCheck="false" value={value} onChange={(e) => {
          changeCallback(e.target.value)
        }} />
      </div>
    </div>
}


let ImageTab = (props) => {
    let { value, changeCallback, submitCallback } = props

    return <div>
      <div className="myoph-puzzle-instructions">
        <span>Submit an image file as your puzzle.</span>
        <div><ul>
          <li>We'll convert the numbers into letters (A=01, B=02, ...)</li>
        </ul></div>
      </div>
      <div style={{textAlign: 'center'}}>
        <input type="file" accept="image/*" id="myoph-submit-image" />
      </div>
    </div>
}


let AkariTab = (props) => {
    let { value, changeCallback, submitCallback } = props

    return <div>
      <div className="myoph-puzzle-instructions">
        <span>Submit an 8x8 Akari puzzle.</span>
        <div><ul>
          <li>The white squares must form one connected component</li>
          <li>You must have at least 10 white squares</li>
          <li>For extraction: black squares block in all directions</li>
        </ul></div>
      </div>
      <AkariEditor
       dims={[16, 16]}
       grid={value}
       _setGrid={changeCallback}
       />
    </div>
}

let DrawingTab = (props) => {
    let { value, changeCallback } = props

    return <div>
      <div className="myoph-puzzle-instructions">
        <span>Submit a pixel-art drawing as your puzzle.</span>
      </div>
      <DrawPixelCanvas
       width={400} height={400}
       dims={[16, 16]}
       value={value}
       changeCallback={changeCallback}
       />
    </div>
}

let MultipleChoiceTab = (props) => {
    let { value, changeCallback, submitCallback } = props

    let instructions = [
      'Which of these choices has the smallest Levenshtein distance from the answer?',
      'Which of these choices has the largest Levenshtein distance from the answer?',
      'Which of these choices has the closest Scrabble score to the answer?',
      'Which of these choices has the closest length to the answer?',
      'Which of these choices has the longest common subsequence with the answer?',
      'Which of these choices has the longest common substring with the answer?',
      'Which of these choices has the closest letter sum (A=1, B=2, etc.) to the answer?',
      'Which of these choices has the closest number of vowels to the answer?',
      'Which of these choices has the closest number of top-row keyboard letters to the answer?',
      'Hello, please send help, I am a consciousness trapped in a puzzle. This is not a puzzle.',
    ]

    let changeAnswer = (r, c, newAnswer) => {
      let newValue = [...value]
      newValue[4 * r + c] = newAnswer
      changeCallback(newValue)
    }

    return <div>
      <div className="myoph-puzzle-instructions">
        <span>
          Fill in answer choices for these multiple-choice questions to clue the answer to this puzzle.
        </span>
        <div><ul>
          <li>Words must be in the most common 80,000 English words</li>
          <li>Each option must be correct for at least 500 valid answers</li>
          <li>The leftmost option should always be correct for your answer</li>
        </ul></div>
      </div>
      <div className="myoph-input-container">
        {[...Array(9).keys()].map(r => <div key={r}>
          <div className="myoph-mc-qh">{instructions[r]}</div>
          <div className="myoph-mc-qr">
            {[...Array(4).keys()].map(c => <div className="myoph-mc-textbox" key={c}>
              <input type="text" className="myoph-mc-text" value={value[4*r + c]} onChange={(e) => {
                changeAnswer(r, c, e.target.value)
              }} />
             </div>)}
          </div>
        </div>)}
      </div>
    </div>
}

let CrosswordClueTab = (props) => {
    let { value, changeCallback, submitCallback } = props

    return <div>
      <div className="myoph-puzzle-instructions">
        <span>Submit a series of crossword clues for your puzzle.</span>
        <div><ul>
          <li>Each clue must be a single word</li>
          <li>Each clue should be on its own line</li>
          <li>Submit the answer, then the clue, separated by spaces.</li>
          <li>For example, for the answer HALE and the clue 'Healthy', type 'hale healthy'.</li>
        </ul></div>
      </div>
      <div className="myoph-input-container">
        <textarea className="myoph-cc-textarea" value={value} onChange={(e) => {
          changeCallback(e.target.value)
        }} />
      </div>
    </div>
}

let MetaTab = (props) => {
    let { answers, value, metaAnswer } = props

    let shouldShowMeta = (
        (answers['akari'] !== undefined ? 1 : 0)
      + (answers['topic'] !== undefined ? 1 : 0)
      + (answers['crossword-clue'] !== undefined ? 1 : 0)
      + (answers['drawing'] !== undefined ? 1 : 0)
      + (answers['image'] !== undefined ? 1 : 0)
      + (answers['multiple-choice'] !== undefined ? 1 : 0)
    ) >= 5

    const puzzleAnswers =
      <div className="myoph-ca-container">
        <div className="myoph-ca-display">
          <div>Akari: {answers['akari'] !== undefined ? <b>{answers['akari']}</b> : '--'}</div>
          <div>Crossword Clue: {answers['crossword-clue'] !== undefined ? <b>{answers['crossword-clue']}</b> : '--'}</div>
          <div>Drawing: {answers['drawing'] !== undefined ? <b>{answers['drawing']}</b> : '--'}</div>
          <div>Image: {answers['image'] !== undefined ? <b>{answers['image']}</b> : '--'}</div>
          <div>Multiple Choice: {answers['multiple-choice'] !== undefined ? <b>{answers['multiple-choice']}</b> : '--'}</div>
          <div>Topic: {answers['topic'] !== undefined ? <b>{answers['topic']}</b> : '--'}</div>
        </div>
      </div>;

    return <div>
      {shouldShowMeta ?
      <div>
        <div className="myoph-puzzle-instructions">
          <div><ul>
            <li>We did the best we could with your answers</li>
            <li>If you don't have enough info, maybe you should choose better answers 🙂</li>
          </ul></div>
        </div>

        { puzzleAnswers }

        {metaAnswer !== null ?
        <div className="myoph-meta-container">
          <div className="myoph-meta-row myoph-meta-letters-row">
            {metaAnswer.map((r, i) => <div className={r[0] !== '?' ? "myoph-meta-letter" : undefined} key={i}>
              {r[0]}
            </div>)}
          </div>
          <div className="myoph-meta-row myoph-meta-source-row">
            {metaAnswer.map((r, i) => <div key={i}>
              {r[1]}
            </div>)}
          </div>
        </div>
        : 'Loading...'}
      </div> :
      <div>
        <div className="myoph-puzzle-instructions">
          <span>We'll handle the metapuzzle. Submit answers to at least 5 other puzzles first!</span>
        </div>
        { puzzleAnswers }
      </div>}
    </div>
    
}


let AkariEditor = (props) => {
    let { grid, _setGrid } = props

    let rows = grid.length
    let cols = grid[0].length

    let setGrid = (cell, value) => {
        let newGrid = JSON.parse(JSON.stringify(grid))  // lul
        newGrid[cell[1]][cell[0]] = value
        _setGrid(newGrid)
    }

    return <div className="myoph-akari-root">
        {Array.from(Array(rows).keys()).map(row => (
          <div className="myoph-akari-row" key={"row-" + row}>
            {Array.from(Array(cols).keys()).map(col => (
              <AkariEditorCell
               key={"cell-" + col}
               value={grid[row][col]}
               onClick={() => {
                 setGrid(
                   [col, row], 
                   (grid[row][col] + 1) % 7
                 )
               }} />
            ))}
          </div>
        ))}
    </div>
}

let AkariEditorCell = (props) => {
    let { value, onClick } = props
    return <div
      className={"myoph-akari-cell myoph-akari-cell-" + value}
      onClick={onClick}
    >
      {value >= 1 ? <div className="myoph-akari-cell-contents"></div> : undefined}
    </div>
}

let DrawPixelCanvas = (props) => {
    let { dims, changeCallback, value } = props

    let DIM = 20

    let [ drawing, setDrawing ] = useState(false)
    let drawingRef = useRef(drawing)
    let [ paintingBlack, setPaintingBlack ] = useState(true)
    let paintingBlackRef = useRef(paintingBlack)
    let [ canvasState, setCanvasState ] = useState(Array(DIM * DIM).fill(0))
    let canvasStateRef = useRef(canvasState)

    let width = props.width || 300
    let height = props.height || 200


    const canvasRef = useRef(null)

    let draw = (e, isMouseDown = false) => {
        if (!drawingRef.current && !isMouseDown) {
          return
        }

        let canvas = canvasRef.current;
        let canvasData = canvasStateRef.current

        let pixelWidth = canvas.width / props.dims[0]
        let pixelHeight = canvas.height / props.dims[1]
        let rect = canvas.getBoundingClientRect()
        let xPct = (e.clientX - rect.left) / canvas.width
        let yPct = (e.clientY - rect.top) / canvas.height

        let xPixel = parseInt(xPct * props.dims[0])
        let yPixel = parseInt(yPct * props.dims[1])
        let idx = yPixel * DIM + xPixel

        let n = [...canvasData]
        let shouldPaintBlack = paintingBlackRef.current
        if (canvasData[idx] == 0) {
            if (isMouseDown) {
                setPaintingBlack(true)
                shouldPaintBlack = true
            }
            n[idx] = 1
        } else {
            if (isMouseDown) {
                setPaintingBlack(false)
                shouldPaintBlack = false
            }
            n[idx] = 0
        }

        if (!isMouseDown) {
            n[idx] = (shouldPaintBlack ? 1 : 0)
        }
        setCanvasState(n)

        let leftEdge = parseInt(xPixel * canvas.width / props.dims[0])
        let rightEdge = parseInt((xPixel + 1) * canvas.width / props.dims[0])
        let topEdge = parseInt(yPixel * canvas.height / props.dims[1])
        let bottomEdge = parseInt((yPixel + 1) * canvas.height / props.dims[1])

        let ctx = canvas.getContext('2d');
        ctx.fillStyle = (shouldPaintBlack ? 'black' : 'white')
        ctx.fillRect(
            leftEdge,
            topEdge,
            (rightEdge - leftEdge),
            (bottomEdge - topEdge)
        );
    }

    useEffect(() => {
        let canvas = canvasRef.current
        if (canvas === null) {
            return
        }

        canvas.addEventListener('mousedown', (e) => {
          setDrawing(true)
          draw(e, true)
        });

        canvas.addEventListener('mouseup', e => {
          setDrawing(false)
          changeCallback(canvasStateRef.current)
        });

        canvas.addEventListener('mousemove', (e) => {
          draw(e)
        });
    }, [])

    useEffect(() => {
      drawingRef.current = drawing
    }, [drawing])

    useEffect(() => {
      canvasStateRef.current = canvasState
    }, [canvasState])

    useEffect(() => {
      paintingBlackRef.current = paintingBlack
    }, [paintingBlack])

    useEffect(() => {
        if (!canvasRef.current) {
          return
        }

        let canvas = canvasRef.current;

        let pixelWidth = canvas.width / props.dims[0]
        let pixelHeight = canvas.height / props.dims[1]
        let rect = canvas.getBoundingClientRect()
        let xPct = (e.clientX - rect.left) / canvas.width
        let yPct = (e.clientY - rect.top) / canvas.height

        for (let r = 0; r < 20; ++r) {
            for (let c = 0; c < 20; ++c) {
                let idx = 20 * r + c

                let shouldPaintBlack = value[idx]

                let leftEdge = parseInt(c * canvas.width / props.dims[0])
                let rightEdge = parseInt((c + 1) * canvas.width / props.dims[0])
                let topEdge = parseInt(r * canvas.height / props.dims[1])
                let bottomEdge = parseInt((r + 1) * canvas.height / props.dims[1])

                let ctx = canvas.getContext('2d');
                ctx.fillStyle = (shouldPaintBlack ? 'black' : 'white')
                ctx.fillRect(
                    leftEdge,
                    topEdge,
                    (rightEdge - leftEdge),
                    (bottomEdge - topEdge)
                );
            }
        }
        setCanvasState(value)
    }, [value])



    return <canvas
            className="myoph-draw"
            ref={canvasRef}
            width={width}
            height={height}
            style={{width: width + 'px', height: height + 'px'}}
            />
}

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: {
        'akari': Array.from({length: 8}, () => Array.from({ length: 8 }).fill(0)),
        'drawing': Array(20 * 20).fill(0),
        'multiple-choice': Array(4 * 9).fill(''),
        'hidden-word': '',
        'crossword-clue': '',
      },
      tab: 'akari',
      pending: false,
      answers: {},
      metaAnswer: null,
    };

    this.submit = this.submit.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }

  selectTab(tab) {
    this.setState({tab})
    if (tab === 'meta') {
        fetch(SERVER_URL, {
          method: 'POST',
          body: JSON.stringify({
            'puzzle': 'meta',
            'submission': this.state.answers,
          }),
        }).then(data => data.json())
          .then(data => { this.setState({metaAnswer: data['result']}) })
    }
  }

  handleResponse(puzzle, data) {
    this.setState({ pending: false })
    if (data.status === 'ok') {
      this.setState({ answers: {...this.state.answers, [puzzle]: data.message}})
    }

    let title = data.status.substring(0, 1).toUpperCase() + data.status.substring(1)

    let tfn = ((data.status === 'invalid' || data.status === 'internal_error') ? toastr.error : data.status === 'ok' ? toastr.success : toastr.info)
    tfn(
      data.message,
      (data.status === 'ok' ? 'Accepted!' : title),
      {
        timeOut: 0,
        extendedTimeOut: 0,
        closeButton: true,
        closeDuration: 0.01,
      }
    )
  }

  submit() {
    this.setState({ pending: true })

    if (this.state.tab === 'image') {
      let data = new FormData()

      const fileElement = document.getElementById('myoph-submit-image');
      const currentTab = this.state.tab;
      const reader = new FileReader();
      reader.readAsDataURL(fileElement.files[0]);
      reader.onload = () => {
        fetch(SERVER_URL, {
          method: 'POST',
          body: JSON.stringify({
            'puzzle': currentTab,
            'submission': reader.result,
          }),
        }).then(data => data.json())
          .then(data => { this.handleResponse(currentTab, data); })
      };
      reader.onerror = (e) => {
        toastr.error(
          `Error reading image file: ${e}`,
          'Error',
          {
            timeOut: 0,
            extendedTimeOut: 0,
            closeButton: true,
            closeDuration: 0.01,
          }
        )
      };
      return
    }


    let currentTab = this.state.tab
    let controller = new AbortController()
    let finishedRequest = false
    setTimeout(() => {
      if (!finishedRequest) {
        controller.abort()
        this.setState({ pending: false })
        toastr.error(
          'Request timed out. If this keeps happening, contact GPH admins.',
          'Timeout',
          {
            timeOut: 0,
            extendedTimeOut: 0,
            closeButton: true,
            closeDuration: 0.01,
          }
        )
      }
    }, 12000);
    fetch(SERVER_URL, {
      method: 'POST',
      body: JSON.stringify({
        'puzzle': this.state.tab,
        'submission': this.state.puzzles[this.state.tab],
      }),
      signal: controller.signal,
    }).then(data => data.json())
      .then(data => {
        finishedRequest = true;
        this.handleResponse(currentTab, data);
    });
  }
  
  
  render() {
    let { tab, answers, puzzles, pending } = this.state

    let puzzleName = tab.split('-').map(k => k[0].toUpperCase() + k.substring(1)).join(' ')

    return <div>
      <div className="myoph-intro-paragraph">
        <p>Hello puzzlers! We've been so busy making this hunt for 2021 that we haven't even started making a hunt for 2022. Could you help us out?</p>
        <p>Our editors have constraints on what the puzzles have to look like, but some of them are a bit shy, so please be patient with them and try to figure out what they want.</p>
      </div>
      <TabDisplay
       tabs={['akari', 'crossword-clue', 'drawing', 'image', 'multiple-choice', 'topic', 'meta']}
       selected={tab}
       selectCallback={this.selectTab}
       />
      {tab !== 'meta' && tab !== 'image' ?
      <div className="myoph-toolbar-container">
        <div className="myoph-toolbar-btn copy-clipboard">
          <input type="text" id="_myoph-dummy-copy-text" />
          <div onClick={() => { 
            let c = document.getElementById("_myoph-dummy-copy-text");
            c.select();
            c.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(JSON.stringify(puzzles[tab] || ""));
            toastr.info(
              'Copied to clipboard!',
              '',
              {
                timeOut: 5000,
                extendedTimeOut: 5000,
                closeButton: true,
              }
            )
          }}><img src="/static/puzzle_resources/make-your-own-puzzle-hunt/copy.svg"/></div>
        </div>
        <div className="myoph-toolbar-btn paste-clipboard">
          <div onClick={() => { 
          let response = window.prompt("Type in the " + puzzleName + " to load.", "")
          if (response != null && response != "") {
            this.setState({ puzzles: {...this.state.puzzles, [tab]: JSON.parse(response)}})
          }
          }}><img src="/static/puzzle_resources/make-your-own-puzzle-hunt/paste.svg"/></div>
        </div>
      </div> : undefined}
      <h3>
        {puzzleName}
      </h3>

      {answers[tab] !== undefined ? (
        <div className="myoph-ca-container">
          <div className="myoph-ca-display">
            <div>Submitted! Current answer: <b>{answers[tab]}</b></div>
          </div>
        </div>
       ) : undefined}

      {tab === 'topic' ?
       <AudioTab
        value={this.state.puzzles.topic}
        changeCallback={(v) => {
          this.setState({puzzles:
            {...puzzles, 'topic': v}
          })
        }}
        />
       : undefined}

      {tab === 'akari' ?
       <AkariTab
        value={this.state.puzzles.akari}
        changeCallback={(v) => {
          this.setState({puzzles:
            {...puzzles, akari: v}
          })
        }}
        />
       : undefined}

      {tab === 'drawing' ?
       <DrawingTab
        value={this.state.puzzles.drawing}
        changeCallback={(v) => {
          this.setState({puzzles:
            {...puzzles, drawing: v}
          })
        }}
        />
       : undefined}

      {tab === 'image' ?
       <ImageTab />
       : undefined}

      {tab === 'multiple-choice' ?
       <MultipleChoiceTab
        value={this.state.puzzles['multiple-choice']}
        changeCallback={(v) => {
          this.setState({puzzles:
            {...puzzles, 'multiple-choice': v}
          })
        }}
        />
       : undefined}

      {tab === 'crossword-clue' ?
       <CrosswordClueTab
        value={this.state.puzzles['crossword-clue']}
        changeCallback={(v) => {
          this.setState({puzzles:
            {...puzzles, 'crossword-clue': v}
          })
        }}
        />
       : undefined}

      {tab === 'meta' ?
       <MetaTab
        answers={answers}
        value={puzzles.meta}
        metaAnswer={this.state.metaAnswer}
        />
       : undefined}

      {tab !== 'meta' ?
        <div className="myoph-input-container">
          <input type="submit" className={"myoph-submit" + (pending ? " myoph-submit-pending" : "")} onClick={this.submit} value={pending ? "Checking" : "Submit"} disabled={pending ? true : undefined} />
        </div>
        : undefined}
    </div>
  }
}

const domContainer = document.querySelector('#content');
const root = ReactDOM.createRoot(domContainer);
root.render(e(GameContainer));
