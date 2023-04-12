import { useState } from 'react';
import './styles.scss';
import './App.css';

const attacks = ['rock', 'paper', 'scissor']
let battleTimeout

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [score, setScore] = useState({humans: 0, robots: 0})
  const [outCome, setOutcome] = useState('')
  const [humanAttack, setHumanAttack] = useState('')
  const [robotAttack, setRobotAttack] = useState('')
  const [animateScore, setAnimateScore] = useState('')
  const [animateOutcome, setAnimateOutcome] = useState(false)

  function handleScoreUpdate(humanScore, robotScore, winner, outcome) {
    setAnimateScore(winner)
    setOutcome(outcome)
    setAnimateOutcome(true)

    setTimeout(() => {
      setScore({
        humans: humanScore,
        robots: robotScore
      })
      setAnimateOutcome('')
      setAnimateScore('')
      setHumanAttack('')
      setRobotAttack('')
    }, 1000)
  }

  function handleBattle(e) {
    const hAttack = e.target.dataset.attack
    const rAttack = attacks[getRandomInt(3)]
    setHumanAttack(hAttack)
    setRobotAttack(rAttack)
    
    battleTimeout = setTimeout(() => {
      if (hAttack === rAttack) {
        handleScoreUpdate(score.humans, score.robots, null, 'draw')      
      } else if (
        (hAttack === 'rock' && rAttack !== 'paper' ) || 
        (hAttack === 'paper' && rAttack !== 'scissor') || 
        (hAttack === 'scissor' && rAttack !== 'rock')
      ) {
        handleScoreUpdate(score.humans + 1, score.robots, 'humans', 'win')      
      } else {
        handleScoreUpdate(score.humans, score.robots  + 1, 'robots', 'loss')      
      }
    }, 500)
  }

  return (
    <div className="App">
      <div className="Header">
        <h1>Rock, Paper, Scissors!</h1>
      </div>
      <div className="Scoreboard">
        <table>
          <thead>
            <tr>
              <th className="Scoreboard__column">Humans</th>
              <th className="Scoreboard__column">Robots</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="Scoreboard__column">
                <div className={`Scoreboard__score ${animateScore === 'humans' && "Scoreboard__score--update"}`}>
                  <div className="Scoreboard__next">
                    {score.humans + 1}
                  </div>
                  <div className="Scoreboard__current">
                    {score.humans}
                  </div>
                </div>
              </td>
              <td className="Scoreboard__column">
                <div className={`Scoreboard__score ${animateScore === 'robots' && "Scoreboard__score--update"}`}>
                  <div className="Scoreboard__next">
                    {score.robots + 1}
                  </div>
                  <div className="Scoreboard__current">
                    {score.robots}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="Gameboard">
        <div className={`Player Player--is-human ${humanAttack && "Player--chose-" + humanAttack}`}>
          <div className="Player__avatar">&#128512;</div>
          <ul className="Player__attacks" >
            <li className="Player__attack Player__attack--is-rock">
              <button className="Player__card" onClick={handleBattle} data-attack="rock">&#9994;</button>
            </li>
            <li className="Player__attack Player__attack--is-paper">
              <button className="Player__card" onClick={handleBattle} data-attack="paper">&#9995;</button>
            </li>
            <li className="Player__attack Player__attack--is-scissor">
              <button className="Player__card" onClick={handleBattle} data-attack="scissor">&#9996;</button>
            </li>
          </ul>
        </div>

        
        <div className={`Player Player--is-robot ${robotAttack && "Player--chose-" + robotAttack}`}>
          <div className="Player__avatar">&#129302;</div>
          <ul className="Player__attacks">
            <li className="Player__attack Player__attack--is-rock">
              <span className="Player__card">&#9994;</span>
            </li>
            <li className="Player__attack Player__attack--is-paper">
              <span className="Player__card">&#9995;</span>
            </li>
            <li className="Player__attack Player__attack--is-scissor">
              <span className="Player__card">&#9996;</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={`Outcome  ${animateOutcome && "Outcome--show"}`}>{outCome} &#128165;</div>
    </div>
  );
}

export default App;
