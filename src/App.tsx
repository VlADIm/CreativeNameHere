import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { render } from 'react-dom';
import logo from './logo.svg';
import linkedin from './LI-In-Bug.png';
import github from './GitHub-Mark.png';
import DrawNum from './DrawNum';
import CalculateNumber from './CalculateNumber';
import './App.css';


type Line = { x: number; y: number }[];
type Lines = Line[];

const getFlat = (a: number[][]) =>{
    // console.log(data.flat());
    // console.log(typeof(data.flat()));
    return a.flat();
}


function App() {
    const [info,setInfo] = useState<number[][]>(Array.from(Array(28), _ => Array(28).fill(0)));
    const [linear,setLinear] = useState<Lines>([]);
    const [active,setActive] = useState<boolean>(false);

    const handleLinear = (lines: Lines) => {
        setLinear(lines);
    }

    const resetData = () => {
        setLinear([]);
        setInfo(info.map((element)=>element.fill(0)));
    }

    const hasData = () => {
        return !((!Array.isArray(info) || !info.length) || (!Array.isArray(linear) || !linear.length));
    }

    useEffect(()=>{
        setActive(hasData);
    },[active]);

    return (
    <div className="App">
        <h1>What's that number?</h1>
        <h5>By Vladimir Malcevic</h5>
        <a className="linkedin" href="https://github.com/VlADIm"><img src={github} alt="GitHub Page"/></a>
        <a className="github" href="https://www.linkedin.com/in/this-is-my-url/"><img src={linkedin} alt="LinkedIn Page"/></a>
        <DrawNum data={linear} width={280} height={280} formatted_data={info} transferData={handleLinear}/>
        <Button variant="outline-dark" disabled={active} onClick={resetData}>Clear</Button>{' '}
        <CalculateNumber input={getFlat(info)} output={4}/>
    </div>
  );
}

export default App;
// {info.map(function (row, i){
//     var entry = row.map(function (element, j) {
//         return (
//             <td key={j}> {element} </td>
//         );
//     });
//     return (<tr key={i}> {entry} </tr>)
// })
// }


// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.tsx</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
