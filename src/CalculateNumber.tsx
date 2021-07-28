import React,{useState,useEffect, useCallback} from 'react';
import * as math from 'mathjs';
import { Matrix } from 'ml-matrix';

type Network = {weights:  number[][][], biases: number[][][]};
export type CalculateNumberProps = {
    input: number[] | any;
    network?: Network;
    output?: number;
}

// function calculateOutput(input:number[],network:Network) {
//
//     const output = 10;
//
//
//     // let a = math.matrix(input);
//     //
//     // math.dot()
//     // math.add()
//     //
//     // network.forEach(layer => {
//     //     math.dot()+
//     // });
//
//     console.log(output)
//     return output;
// }

function sigmoid(layer: Matrix) {
    let temp = new Array();
    layer.to1DArray().forEach(element => {
        temp.push(1/(1+Math.pow(Math.E, -element)));
    });
    return Matrix.columnVector(temp);
}


export default function CalculateNumber({input,network={weights:[],biases:[]},output}:CalculateNumberProps) {

    const [data,setData]=useState<Network>(network);
    const [result,setResult]=useState<number>(10);
    // const getResult=()=>{
    //     console.log("START FORWARD FEEDING DEBUG STATEMENTS");
    //     console.log('input');
    //     console.log(input);
    //
    //     let value = input;
    //     if((!Array.isArray(data.biases) || !data.biases.length) || (!Array.isArray(data.weights) || !data.weights.length)){
    //         console.log('data');
    //         getData();
    //         console.log(data);
    //         console.log("DATA PROP NOT SET, ENDING FORWARD FEEDING DEBUG STATEMENTS");
    //         setResult(-1);
    //     } else {
    //         const layer = data.weights.map(function(element,i){
    //             // console.log("Inside map!");
    //             // console.log('element');
    //             // console.log(element);
    //             //
    //             // console.log('data.biases[i]');
    //             // console.log(data.biases[i]);
    //
    //             return [element,data.biases[i]];
    //         });
    //         layer.forEach(element => {
    //             console.log('In forEach Loop');
    //             console.log(value);
    //             console.log(element[0]);
    //             console.log(element[1]);
    //
    //         });
    //         console.log()
    //         console.log(value);
    //         setResult(10);
    //     }
    // }
    // // console.log(math.add(math.dot(element[0],value),element[1]));
    // // value=math.add(math.dot(element[0],value),element[1]);
    // const getData=()=>{
    //     fetch('network.json',{
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then(function(response){
    //         // console.log(response)
    //         return response.json();
    //     })
    //     .then(function(myJson) {
    //         // console.log(myJson);
    //         setData(myJson)
    //     });
    // }

    const getData = useCallback(() => {
        fetch('network.json',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            // console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
        });
    }, [],);

    const getResult = () => {
        console.log("TESTING");
        let value = Matrix.columnVector(input);

        // if(data.weights.length === data.biases.length){
        //     for (let i = 0; i < data.weights.length; i++) {
        //         console.log(data.weights[i].length);
        //         console.log(data.biases[i]);
        //     }
        // }

        console.log(typeof(data.biases[0][0][0]));
        console.log(typeof(data.biases[0][0][0]));

        const layer = data.weights.map(function(element,i){
            return [element,data.biases[i]];
        });

        layer.forEach(element => {
            console.log(Matrix.add(new Matrix(element[0]).mmul(value),new Matrix(element[1])));
            value = Matrix.add(new Matrix(element[0]).mmul(value),new Matrix(element[1]));
            value = sigmoid(value);
        });
        const val = value.to1DArray().indexOf(Math.max(...value.to1DArray()));
        console.log(value);
        console.log(val);
        setResult(val);
    }
    // let temp_weight = new Matrix(element[0]);
    // let temp_biase = new Matrix(element[1]);

    useEffect(()=>{
        getData();
        // calculateOutput(input,data);
    },[])

  return (
    <div className="CalculateNumber">
    <button onClick={getResult}>Calculate Number</button>
    {result}
    </div>
  );
}

// export default CalculateNumber;
