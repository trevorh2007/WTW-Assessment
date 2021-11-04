import React, { useEffect, useState } from 'react'
import './results-table.scss'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import WeatherModal from '../WeatherModal/weather-modal'

const ResultsTable = ({ data, hasSearched }) => {
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(100)
    const [slicedData, setSlicedData] = useState([])
    const [noMore, setNoMore] = useState(true)
    const [weatherData, setWeatherData] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [cityData, setCityData] = useState({})

    const loadMoreData = () => {
        setOffset(offset + 100)
        setLimit(limit + 100)
        setSlicedData([...slicedData, ...data.slice(offset, limit)])
        if (data.slice(offset, limit).length < 100) setNoMore(false)
    }

    const loadWeather = async (element) => {
        try {
            // normally I would store the api key using dotenv, but since it's a semi-public api key I figured that
            // doing so would require the additional effort of anyone cloning the project to add a .env file
            const current = await axios(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${element.coord.lat}&lon=${element.coord.lon}&appid=cf53893d93414d0e98cabc620021f64f&units=imperial`
            )
            await setWeatherData(current.data)
            setCityData(element)
            setModalIsOpen(true)
        } catch (err) {
            if (err.response) {
                // do things like show custom 5xx/4xx error from api
                console.error("Client received an error response, (5xx, 4xx)")
            } else if (err.request) {
                // browser was able to make a request, but it didn't see a response
                console.error(
                    "Client never received a response, or request never left"
                )
            } else {
                //not an axios error, something else wrong in app. Follow stack trace
                console.error(err)
            }
        }
    }

    useEffect(() => {
        if (data.length > 0) setSlicedData(data.slice(offset, limit))
    }, [data, offset, limit])

    return (
        <>
            {hasSearched && data.length === 0 && (
                <div className="no-results">No results found, check your search and try again.</div>
            )}
            {modalIsOpen && (
                <WeatherModal weatherData={weatherData} cityData={cityData} isOpen={modalIsOpen} toggle={setModalIsOpen} />
            )}
            {data.length > 0 && (
                <section id="results" key={data}>
                    <h2>Results</h2>
                    <InfiniteScroll
                        dataLength={limit + 1}
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
                                        <tr key={element} className="result-row" onClick={() => loadWeather(slicedData[element])}>
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