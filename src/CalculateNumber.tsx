import React,{useState,useEffect, useCallback} from 'react';
import * as math from 'mathjs';
import { Matrix } from 'ml-matrix';

type Network = {weights:  number[][][], biases: number[][][]};
export type CalculateNumberProps = {
    input: number[] | any;
    network?: Network;
    output?: number;
}

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

        let value = Matrix.columnVector(input);

        const newArr = [];
        while(input.length) newArr.push(input.splice(0,28));
        console.log(newArr);


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
