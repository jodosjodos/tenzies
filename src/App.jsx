import { useEffect, useState } from 'react';
import './App.css'
import { Die } from './components/Die'
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

function App() {

//  generate random numbers

  const generateNumbers=()=>{
    return{
      value:Math.floor(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }

// get random numbers 

  const allDice=()=>{
    let arr=[]
    for(let i=1;i<=10;i++){
     arr.push(generateNumbers())
    }
    return arr

  }

// initialization

  const [dice,setDice]=useState(allDice())
  const [tenzies,setTenzies]=useState(false);
  
//  check if dice is helded

  const holded=(id)=>{
 
      setDice(dice.map((die)=>{
       if(die.id===id){
         return {...die,isHeld:!die.isHeld}
       }else{
         return die
       }
      }))
    
  }

// maintaing state

  useEffect(()=>{
    const isHelded=dice.every(die=>die.isHeld)
   const firstValue=dice[0].value;
   const samValue=dice.every(die=>die.value==firstValue)
   if(isHelded && samValue){
    setTenzies(true)
    console.log('u won');
   }
   
  },[dice])

//  change values if u haven't win

const rollDice=()=>{
if(!tenzies){
  setDice(oldDice=>

    oldDice.map((die)=>{
     return die.isHeld?die:generateNumbers()
    })
  )
}else{
  setTenzies(false)
  setDice(allDice())
}
}

  

//  render components

   const showable=dice.map((eachDice)=>{
    
    return <Die 
    key={eachDice.id}
    isHeld={eachDice.isHeld}
    value={eachDice.value} 
    holder={()=>{return holded(eachDice.id)}}
    />
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
     <button className='rollDice' onClick={rollDice}>{tenzies?"New game":"roll"}</button>
    </main>
  )
}

export default App
