import React, {useState} from 'react';
import { useEffect } from 'react';
import './App.css';
import MatchCard from './Components/MatchCard';

const gameImages=[
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards,setCards]=useState([])
  const [turns, setTurns]=useState(0)
  const [choiceOne, setChoiceOne]=useState(null)
  const [choiceTwo, setChoiceTwo]=useState(null)
  const [disabled, setDisabled]=useState(false)

  const setshuffleCards = () => {
    const shuffledCards = [...gameImages, ...gameImages]
    .sort(() => Math.random() -0.5)
    .map((card) => ({ ...card, id: Math.random() }))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  
  const mycard = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
    if (choiceOne.src === choiceTwo.src){
      setshuffleCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src){
            return {...card, matched: true}
          } else {
            return card;
          }
        })
      })
      resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
    }}
  }, [choiceOne, choiceTwo])
  
  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  useEffect(() => {
    setshuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Card Game</h1>
      <button onClick={setshuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <MatchCard key={card.id} card={card} mycard={mycard}
          flipped={card===choiceOne || card === choiceTwo || card.matched}
          disabled={disabled} 
           /> 
        ))}
      </div>
      <p>Total Count: {turns}</p>
    </div>
  );
}

export default App;