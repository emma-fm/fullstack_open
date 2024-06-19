import { useState } from 'react'

const Statics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  if (total > 0) {
    return (
      <div>
        <h1>statics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {(good - bad) / total}</p>
        <p>positive {good / total * 100}%</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newgood = good + 1
    setGood(newgood)
  }

  const handleBad = () => {
    const newbad = bad + 1
    setBad(newbad)
  }

  const handleNeutral = () => {
    const newneutral = neutral + 1
    setNeutral(newneutral)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Statics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App