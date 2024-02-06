import React from "react";
import './CurrentRound.css'
const CurrentRoundHeader = (props)=>{
    const roundNo = props.round;
    const rounds = [
        'Preliminary Round',
        'Quater Finals',
        'Semi Final',
        'Final'
    ]

    return (
    <div className="round-name">
        {rounds[roundNo]}
    </div>
    )
}

export default CurrentRoundHeader;