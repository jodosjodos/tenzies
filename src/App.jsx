import { useEffect, useState } from 'react';
import './App.css'
import { Die } from './components/Die'
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

function App() {
  // generate structure and value of die
  const generateDice = () => {
    const seed = Date.now(); // use the current time as a seed
    const random = Math.floor(Math.random() * 6); // generate a random integer between 0 and 5
    const value = (random + seed) % 6; // use the seed to offset the value by a different amount for each die
    return {
      value,
      isHeld: false,
      id: nanoid(),
    };
  };
  
  
  // get new dice with new values 
  const allNewDice=()=>{
    let arr=[];
    for(let i=1;i <=10;i++){
      arr.push(generateDice())
    }
    return arr
  }

  // dice variable
  const [dice,setDice]=useState(allNewDice());

  //track if user has won
  const [tenzies,setTenzies]=useState(false)
  
  useEffect(()=>{
    const allheld=dice.every(die=>die.isHeld)
    const firstValue=dice[0].value;
    const allSameValue=dice.every(die=>die.value=firstValue)
    
    if(allheld && allSameValue){
      setTenzies(true)
      console.log('u won');
    }
  },[dice])

  // hold clicked die 
  const holdDice=(id)=>{
    setDice(dice.map((die)=>{
      if(die.id===id){
        const isHelded=die.isHeld
        return {...die,isHeld:!isHelded}
      }else{
        return die
      }
    }))
  }

  // roll dice function
  const rollDice=()=>{
    if(!tenzies){
      setDice(oldDice=>oldDice.map(die=>{
        return die.isHeld ? die : generateDice()
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // renderable variable
  const showable=dice.map((eachNumber)=>{
    return (
      <Die
        key={eachNumber.id}
        value={eachNumber.value }
        isHeld={eachNumber.isHeld}
        holder={()=>{return holdDice(eachNumber.id)}}
      />
    )
  })
  
  return (
    <main>
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h1 className='title'>Tenzies</h1>
      <p className="instructions">
        Roll  until all dice are the same. Click each die to freeze it at its current value between rolls
      </p>
      <div className='dieContainer'>
        {showable}
      </div>
      <button onClick={rollDice} className='rollDice'>{tenzies?"New Game":"Roll"}</button>
    </main>
  )
}

export default App
