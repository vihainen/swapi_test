import React, {useEffect, useState} from 'react'
import MGLTInput from './components/MGLTInput'
import StarshipJumps from './components/StarshipJumps'
import './App.css'

function App() {
    const defaultMGLTValue = 1000000
    const [MGLT, setMGLT] = useState(defaultMGLTValue)
    const [data, setData] = useState({ships: [], isFetching: false})

    useEffect(() => {
        const API_URL = 'https://swapi.co/api/starships/'

        const fetchAllPages = async () => {
            let ships = [], response = {}
            do {
                response = await (await fetch(response.next || API_URL)).json()
                ships = [...ships, ...response.results]
            } while (response.next)
            
            return ships
        }
        
        const fetchShipData = async () => {
            try {
                setData({ships: [], isFetching: true})
                const ships = await fetchAllPages()
                setData({ships, isFetching: false})
            } catch (e) {
                console.error(e)
                setData({ships: data.ships, isFetching: false})
            }
        }
        
        fetchShipData()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <p className='mute'>
                    Welcome, traveler. Here you can check the minimum number of stops you will need to do for resupplying before reaching your destination, traveling at maximum speed, using each ship available in the galactic database.
                </p>
                <p>
                    How far is your destination, traveler?
                </p>
                <MGLTInput
                    defaultValue={defaultMGLTValue}
                    onChange={setMGLT}
                />
                <p className='mute'>
                    Click on any ship for more info.
                </p>
                <StarshipJumps
                    ships={data.ships}
                    MGLT={MGLT}
                    placeholder="Querying galactic database..."
                    showPlaceholder={data.isFetching}
                />
            </header>
        </div>
    )
}

export default App;
