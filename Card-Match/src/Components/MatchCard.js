import './MatchCard.css'
export default function SingleCard({ card, mycard, flipped, disabled }) {

    const clickHandler= () => {
        if (!disabled){
        mycard(card)
    }
}

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt="card front" />
                <img className='back' src="/img/cover.png" onClick={clickHandler} alt="card back" />
            </div>
        </div>
    )
}