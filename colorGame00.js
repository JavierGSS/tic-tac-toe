import { checkForWinner } from "./superset.js";

const Square = ({ id, selectSquare, newState }) => {
  const palet = ['red', 'blue', 'magenta'];
  const [color, setColor] = React.useState('pink');
  const [appear, setAppear] = React.useState(true);
  const [status, setStatus] = React.useState(null); // Keeps track of the player
  const xo = ['O', 'X'];
  console.log('Status: ', status);

  // useEffect will be called every time Square is re-rendered:
  React.useEffect(() => {
    console.log(`Rendered: ${id}`);
    return () => console.log(`Unmounting square ${id}`)
  }
  )

  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];
  const appearControl = () => setAppear(!appear);

  /*if (appear === false) {
    return null;
  } else {*/
  return (
    <button style={{ fontSize: 'x-large', color: 'white' }} onClick={(e) => {

      let col = getRandomColor();
      setColor(col);
      e.target.style.backgroundColor = col;

      let nextPlayer = newState(id);
      setStatus(nextPlayer);

      alert(`I'm square ${id}; it's player ${nextPlayer}'s turn.`);
      selectSquare(`Square ${id} has been selected.`);
      appearControl();

    }}><h1><strong>{xo[status]}</strong></h1>
    </button>

  );
  //}
}

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [square, setSquare] = React.useState('No square has been selected.');
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  // we initialize state variable with an array of 9 'null' elements:
  const [state, setState] = React.useState(Array(9).fill('null'));

  let status = `Player: ${player}`;
  console.log(`Adding state ${JSON.stringify(state)}`);
  let winner = checkForWinner(state);

  if (winner != null) {
    status = `Player ${winner} wins!`;
  }

  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player; // *player* is present player (1 or 0); state array updates at index idOfSquare (0-8)
    setState(state); // we update the state variable to include the preceding modification
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    return thePlayer; // returns the present player
  }

  const reRender = () => setRandom(Math.random());

  const toggle = () => setMounted(!mounted);

  const selectSquare = (id) => {
    setSquare(id);
  }

  function renderSquare(i) {
    return <Square id={i} selectSquare={selectSquare} newState={newState}></Square>;
  }

  return (
    <div
      className="game-board" // check the style in standalone.html
    /*onClick={(e) => {
      setPlayer((player + 1) % 2);
      status = `Player ${player}`;
      // e.target.style.background = 'red';
      // e.target.style.width = '400px';
      console.log(`Status: ${status}`);
      // console.log(e.target.style.background);
    }}*/
    >
      <div className="grid-row"> {/*check the style in standalone.html*/}
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div className="grid-row"> {/*check the style in standalone.html*/}
        {mounted && renderSquare(3)}
        {mounted && renderSquare(4)}
        {mounted && renderSquare(5)}
      </div>
      <div className="grid-row"> {/*check the style in standalone.html*/}
        {mounted && renderSquare(6)}
        {mounted && renderSquare(7)}
        {mounted && renderSquare(8)}
      </div>
      <br />
      <div id="info">
        <button style={{ width: '150px' }} onClick={toggle}>Show/hide rows</button>
        <button style={{ width: '150px' }} onClick={reRender}>Re-render</button>
        <h1 style={{ color: 'white' }}>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
