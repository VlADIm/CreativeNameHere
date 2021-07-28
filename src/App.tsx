import React, {useState,useEffect} from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import DrawNum from './DrawNum';
import CalculateNumber from './CalculateNumber';
import './App.css';



function App() {
    const [data,setData] = useState<number[][]>(Array.from(Array(28), _ => Array(28).fill(0)));
    const [linear,setLinear] = useState<number[]>([]);
    // const getData=()=>{
    //     setData(data);
    // }
    // useEffect(()=>{
    //     getData();
    //     // calculateOutput(input,data);
    // },[])

    const getData = () =>{
        // console.log(data.flat());
        // console.log(typeof(data.flat()));
        return data.flat();
    }

    useEffect(()=>{
        setLinear(getData());
        // calculateOutput(input,data);
    },[])


    return (
    <div className="App">
        <div>
        {data.map(function (row, i){
            var entry = row.map(function (element, j) {
                return (
                    <td key={j}> {element} </td>
                );
            });
            return (<tr key={i}> {entry} </tr>)
        })
        }
        </div>
        <DrawNum width={280} height={280} formatted_data={data} transferData={(currDraw)=>{setData(currDraw);}}/>
        <CalculateNumber input={getData()} output={4}/>
    </div>
  );
}

export default App;


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
