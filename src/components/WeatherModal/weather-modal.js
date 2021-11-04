import React, { useState } from 'react'
import './weather-modal.scss'
import Modal from 'react-modal'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const WeatherModal = ({ weatherData, cityData, isOpen, toggle }) => {
    const [showHourly, setShowHourly] = useState(false)
    const [hourlyData, setHourlyData] = useState({})

    function afterOpenModal() {
        if (!weatherData) {

        }
        console.log('after open modal func')
        console.log(weatherData)
        console.log(cityData)
    }

    const getFullCity = () => {
        if (cityData.state) {
            return `${cityData.name}, ${cityData.state}`
        } else {
            return `${cityData.name}`
        }
    }

    const getDayOfWeek = (timestamp) => {
        var date = new Date(timestamp * 1000)
        const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        return weekday[date.getDay()]
    }

    const getHourlyWeather = (element) => {
        setShowHourly(true)
        setHourlyData(element)
        console.log('clicked', element)
    }

    return (
        <section id="weather-modal">
            {isOpen && !weatherData.current && (
                <div className="weather-api-error">
                    Something with the api call went wrong, try clicking a city again to refetch data.
                </div>
            )}
            {isOpen && weatherData.current && (
                <Modal
                    isOpen={isOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={() => toggle(false)}
                    contentLabel="Example Modal"
                >
                    <div className="current" data-testid="current-weather">
                        <h2>Today</h2>
                        <div className="city-info">
                            {getFullCity()}
                        </div>
                        <div className="date">
                            {new Date().toDateString()}
                        </div>
                        <div className="icon-and-text">
                            {Math.round(weatherData.current.temp)}{'\xB0'}
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                                className="current-icon"
                                alt="daily weather"
                            />
                        </div>
                        <div className="feels-like">
                            Feels like {Math.round(weatherData.current.feels_like)}{'\xB0'}
                        </div>
                        <div className="current-description">
                            {weatherData.current.weather[0].description.toUpperCase()}
                        </div>
                    </div>
                    <div className="weekly">
                        <h2>This Week</h2>
                        <div className="weekly-cards">
                            {Object.values(weatherData.daily).map((element, index) => {
                                return (
                                    <div className="weekly-card" key={index} onClick={() => getHourlyWeather(element)}>
                                        <div className="weekly-date">
                                            {getDayOfWeek(element.dt)}
                                        </div>
                                        <img
                                            src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                                            className="weekly-icon"
                                            alt="weekly weather"
                                        />
                                        <div className="day-and-night-temp">
                                            <div className="weekly-day-temp">
                                                {Math.round(element.temp.day)}{'\xB0'}
                                            </div>
                                            <div className="weekly-night-temp">
                                                {Math.round(element.temp.night)}{'\xB0'}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {showHourly && (
                        <div className="hourly-weather">
                            Hourly data will populate here.
                            {hourlyData.temp.day}
                        </div>
                    )
                    }
                    <div className="close-btn" onClick={() => toggle(false)} data-testid="modal-close">x</div>
                </Modal>
            )}
        </section>
    )
}

export default WeatherModal