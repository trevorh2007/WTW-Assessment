import React from 'react'
import './results-table.scss'

const ResultsTable = ({ data }) => {
    return (
        <>
            {data.length > 1 && (
                <section id="city-data" className="city-data" key={data}>
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
                                    Object.keys(data).map(element => {
                                        return (
                                            <tr key={element}>
                                                <td>{data[element].id}</td>
                                                <td>{data[element].name}</td>
                                                <td>{data[element].state}</td>
                                                <td>{data[element].country}</td>
                                                <td>{data[element].coord.lon}, {data[element].coord.lat}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </>
    )
}

export default ResultsTable