import React from 'react'
import StarshipJumpCard from './StarshipJumpCard'
import './StarshipJumps.css'

function StarshipJumps(props) {
    const buildContent = () => {
        if (props.showPlaceholder) return props.placeholder || ""
        else {
            let cards = []
            for(const index in props.ships)
                cards.push(
                    <StarshipJumpCard
                        key={index}
                        ship={props.ships[index]}
                        distance={props.MGLT}
                    />
                )
            return cards
        }
    }

    return (
        <div className="StarshipJumps">
            {
                buildContent()
            }
        </div>
    )
}

export default StarshipJumps