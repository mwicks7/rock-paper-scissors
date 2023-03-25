import { useState } from 'react';
import './styles.scss';
import './App.css';

const attacks = ['rock', 'paper', 'scissor']

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [score, setScore] = useState({humans: 0, robots: 0})
  const [outCome, setOutcome] = useState('')
  const [humanAttack, setHumanAttack] = useState('')
  const [robotAttack, setRobotAttack] = useState('')

  function battle(e) {
    const hAttack = e.target.dataset.attack
    const rAttack = attacks[getRandomInt(3)]
    
    if (hAttack === rAttack) {
      setOutcome('draw')
    } else if (
      (hAttack === 'rock' && rAttack !== 'paper' ) || 
      (hAttack === 'paper' && rAttack !== 'scissor') || 
      (hAttack === 'scissor' && rAttack !== 'rock')
    ) {
      setOutcome('win')
      setScore({
        humans: score.humans + 1,
        robots: score.robots
      })
    } else {
      setOutcome('lose')
      setScore({
        humans: score.humans,
        robots: score.robots + 1
      })
    }

    setHumanAttack(hAttack)
    setRobotAttack(rAttack)
  }

  return (
    <div className="App">
      <div className="Scoreboard">
        Humans: {score.humans} <br />
        Robots: {score.robots} <br />
      </div>

      <div className="Gameboard">
        <div className={`Player Player--is-human ${humanAttack && "Player--chose-" + humanAttack}`}>
          <div className="Player__avatar"></div>
          <ul className="Player__attacks" >
            <li className="Player__attack Player__attack--is-rock">
              <button onClick={battle} data-attack="rock">Rock</button>
            </li>
            <li className="Player__attack Player__attack--is-paper">
              <button onClick={battle} data-attack="paper">Paper</button>
            </li>
            <li className="Player__attack Player__attack--is-scissor">
              <button onClick={battle} data-attack="scissor">Scissor</button>
            </li>
          </ul>
        </div>

        <div className="Outcome">Outcome: {outCome}</div>
        
        <div className={`Player Player--is-robot ${robotAttack && "Player--chose-" + robotAttack}`}>
          <div className="Player__avatar"></div>
          <ul className="Player__attacks">
            <li className="Player__attack Player__attack--is-rock">
              <span>Rock</span>
            </li>
            <li className="Player__attack Player__attack--is-paper">
              <span>Paper</span>
            </li>
            <li className="Player__attack Player__attack--is-scissor">
              <span>Scissor</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
