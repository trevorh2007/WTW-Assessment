import React, { useEffect, useState } from 'react'
import './results-table.scss'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import WeatherModal from '../WeatherModal/weather-modal'

const ResultsTable = ({ data }) => {
    const [offset, setOffset] = useState(100)
    const [limit, setLimit] = useState(200)
    const [slicedData, setSlicedData] = useState([])
    const [noMore, setNoMore] = useState(true)
    const [weatherData, setWeatherData] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [cityData, setCityData] = useState({})
    const [apiError, setApiError] = useState(false)
    const [requestError, setRequestError] = useState(false)
    const [applicationError, setApplicationError] = useState(false)

    const loadMoreData = () => {
        setOffset(offset + 100)
        setLimit(limit + 100)
        console.log(offset, limit)
        setSlicedData([...slicedData, ...data.slice(offset, limit)])
        if (data.slice(offset, limit).length < 100) setNoMore(false)
    }

    const loadWeather = async (element) => {
        try {
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
                setApiError(true)
            } else if (err.request) {
                // browser was able to make a request, but it didn't see a response
                console.error("Client never received a response, or request never left")
                setRequestError(true)
            } else {
                //not an axios error, something else wrong in app. Follow stack trace
                console.error(err)
                setApplicationError(true)
            }
        }
    }

    useEffect(() => {
        if (data.length > 0) setSlicedData(data.slice(0, 100))
        if (data.length < 100) setNoMore(false)
    }, [data])

    return (
        <>
            {modalIsOpen && (
                <WeatherModal weatherData={weatherData} cityData={cityData} isOpen={modalIsOpen} toggle={setModalIsOpen} />
            )}
            {data.length > 0 && (
                <section id="results" key={data}>
                    <h2 data-testid="results-header">Results</h2>
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
                                        <tr key={element} className="result-row" onClick={() => loadWeather(slicedData[element])} data-testid="result-row">
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
            {apiError && (
                <div className="api-error">
                    Something went wrong with the api endpoint.
                </div>
            )}
            {requestError && (
                <div className="request-error">
                    Client never received a response, or request never left. Please wait and try again in a few seconds.
                </div>
            )}
            {applicationError && (
                <div className="application-error">
                    Something went wrong in the application. Follow stack trace to debug.
                </div>
            )}
        </>
    )
}

export default ResultsTable