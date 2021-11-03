import React, { useEffect, useState } from 'react'
import './results-table.scss'
import InfiniteScroll from 'react-infinite-scroll-component'

const ResultsTable = ({ data, hasSearched }) => {
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(100)
    const [slicedData, setSlicedData] = useState([])
    const [noMore, setNoMore] = useState(true)

    const loadMoreData = () => {
        setStart(start + 100)
        setLimit(limit + 100)
        setSlicedData([...slicedData, ...data.slice(start, limit)])
        if (data.slice(start, limit).length < 100) setNoMore(false)
    }

    useEffect(() => {
        if (data.length > 0) setSlicedData(data.slice(start, limit))
    }, [data, start, limit])

    return (
        <>
            {hasSearched && data.length === 0 && (
                <div className="no-results">No results found, check your search and try again.</div>
            )}
            {data.length > 0 && (
                <section id="results" key={data}>
                    <h2>Results</h2>
                    <InfiniteScroll
                        dataLength={limit}
                        next={loadMoreData}
                        hasMore={noMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center', fontSize: '14px' }}>All results loaded. Nothing else here.</p>
                        }
                        scrollThreshold="50px"
                        height="100%"
                    >
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
                                {Object.keys(slicedData).map(element => {
                                    return (
                                        <tr key={element} className="result-row">
                                            <td>{slicedData[element].id}</td>
                                            <td>{slicedData[element].name}</td>
                                            <td>{slicedData[element].state}</td>
                                            <td>{slicedData[element].country}</td>
                                            <td>{slicedData[element].coord.lat}, {slicedData[element].coord.lon}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </section>
            )}
        </>
    )
}

export default ResultsTable