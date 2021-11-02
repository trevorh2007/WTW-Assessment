import React from 'react'
import './results-table.scss'

const ResultsTable = (data) => {
    return (
        <>
            {data.searchedData.length > 1 && (
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
                                    Object.keys(data.searchedData).map(element => {
                                        return (
                                            <tr key={element}>
                                                <td>{data.searchedData[element].id}</td>
                                                <td>{data.searchedData[element].name}</td>
                                                <td>{data.searchedData[element].state}</td>
                                                <td>{data.searchedData[element].country}</td>
                                                <td>{data.searchedData[element].coord.lon}, {data.searchedData[element].coord.lat}</td>
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