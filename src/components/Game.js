import React, {useState} from "react";
import Board from "./Board"
import calculateWinner from "./calculateWinner";
import { useAuth0 } from '@auth0/auth0-react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function Game(){
    const [history, setHistory] = useState(
        [{
            squares: Array(9).fill(null),
        }]
    )
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
    const {isAuthenticated} = useAuth0()

    const handleClick = (i) => {
        const currHistory = history.slice(0,stepNumber + 1)
        const current = currHistory[currHistory.length - 1]
        const currSquares = current.squares.slice()
        if (calculateWinner(currSquares) || currSquares[i] ) {
            return;
        }
        currSquares[i] = xIsNext ? 'X' : 'O'
        setXIsNext(!xIsNext)
        setStepNumber(currHistory.length)
        setHistory(currHistory.concat([{
            squares: currSquares
        }]))
    }

    const jumpTo = (step) => {
        if(isAuthenticated) {
            setStepNumber(step)
            setXIsNext((step % 2) === 0)
        } else {
            toast('Must be logged in to jump to move')
        }

    }

    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)
    const moves = history.map((step,move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start'
        return (
            <li key={move}>
                <button onClick={() => {jumpTo(move)}}>{desc}</button>
            </li>
        )
    })
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares = {current.squares}
                    onClick={(i) => {handleClick(i)}}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}