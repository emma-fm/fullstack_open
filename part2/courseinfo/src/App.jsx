const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} - {props.part.exercises}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(p => <Part key={p.id} part={p} />)}
    </div>
  )
}

const Total = (props) => {
  let count = 0
  for (const e of props.exercises) {
    count += e
  }

  return (
    <div>
      <p>Number of exercises: {count}</p>
    </div>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header text={course.name} />
      <Content parts={course.parts}/>
      <Total exercises={course.parts.map((e) => e.exercises)} />
    </div>  
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App