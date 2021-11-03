import React from 'react'
import './results-table.scss'

const ResultsTable = ({ data, hasSearched }) => {
    return (
        <>
            {hasSearched && data.length === 0 && (
                <div className="no-results">No results found, check your search and try again.</div>
            )}
            {data.length > 1 && (
                <section id="city-data" className="city-data" key={data}>
                    <div className='table'>
                        <h2>Results</h2>
                        <table border={2} cellPadding={10} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>State</td>
                                    <td>Country</td>
                                    <td>Coordinates (lat, long)</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(data).map(element => {
                                        return (
                                            <tr key={element} className="result-row">
                                                <td>{data[element].id}</td>
                                                <td>{data[element].name}</td>
                                                <td>{data[element].state}</td>
                                                <td>{data[element].country}</td>
                                                <td>{data[element].coord.lat}, {data[element].coord.lon}</td>
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