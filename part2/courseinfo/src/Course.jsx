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

const Total = ({parts}) => {
    return (
        <div>
        <p><b>Number of exercises: {parts.reduce((acc, p) => acc + p.exercises, 0)}</b></p>
        </div>
    )
}

const Course = ({course}) => {
    return(
        <div>
        <Header text={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
        </div>  
    )
}

export default Course