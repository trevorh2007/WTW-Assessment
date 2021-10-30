import React, { useState } from 'react'
import './city-table.scss'
import JSONdata from './city-partial.json'

const CityTable = () => {
    const [cityData, setCityData] = useState(JSONdata)
    return (
        <section id="city-data" className="city-data">
            <div className='table'>
                <h2>Cities</h2>
                <table border={2} cellPadding={5}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>State</td>
                            <td>Country</td>
                            <td>Coordinates</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(cityData).map(element => {
                                return (
                                    <tr key={element}>
                                        <td>{JSONdata[element].id}</td>
                                        <td>{JSONdata[element].name}</td>
                                        <td>{JSONdata[element].state}</td>
                                        <td>{JSONdata[element].country}</td>
                                        <td>{JSONdata[element].coord.lon}, {JSONdata[element].coord.lat}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default CityTable