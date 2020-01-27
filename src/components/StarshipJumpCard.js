import React, {useState} from 'react'

function StarshipJumpCard(props) {
    const [fullInfo, showFullInfo] = useState(false)
    const classified = 'unknown'

    const toHours = (value, type) =>
        type.startsWith('year')? toHours(value*12, 'month')
      : type.startsWith('month')? toHours(value*30, 'day')
      : type.startsWith('week')? toHours(value*7, 'day')
      : type.startsWith('day')? value*24
      : value

    const isClassified = value => value === classified

    const calcJumps = () => {
        if(isClassified(props.ship.MGLT) || isClassified(props.ship.consumables))
            return classified

        

        return Math.floor(props.distance/((+props.ship.MGLT)*toHours(...props.ship.consumables.split(' '))))
    }

    const buildContent = () => {
        const jumps = calcJumps()

        if(!fullInfo) return (
            <div>
                <span>{props.ship.name}: {jumps}</span>
            </div>
        )
        else return (
            <div>
                <span>{props.ship.model} "{props.ship.name}"</span>
                <span>Minimum stops: {jumps}</span>
                <span>Maximum speed: {isClassified(props.ship.MGLT)? classified : `${props.ship.MGLT} MGLT/h`}</span>
                <span>Able to sustain crew for: {props.ship.consumables}</span>
                <span>Minimum crew size: {isClassified(props.ship.crew)? classified : `${props.ship.crew} personnel`}</span>
            </div>
        )
    }

    return (
        <div
            className={`StarshipJumpCard${fullInfo? ' FullInfo': ''}`}
            onClick={e => showFullInfo(!fullInfo)}
        >
            {buildContent()}
        </div>
    )
}

export default StarshipJumpCard