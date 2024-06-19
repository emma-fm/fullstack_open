import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  if (total > 0) {
    return (
      <div>
        <h1>statics</h1>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={(good - bad) / total} />
        <StatisticsLine text="positive" value={good / total} />
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

const Button = ({text, handleClick}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
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
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App