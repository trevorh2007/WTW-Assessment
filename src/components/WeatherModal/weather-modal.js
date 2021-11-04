import React, { useState } from 'react'
import './weather-modal.scss'
import Modal from 'react-modal'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const WeatherModal = ({ weatherData, cityData, isOpen, toggle }) => {
    const [showHourly, setShowHourly] = useState(false)
    const [selectedDay, setSelectedDay] = useState(0)

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

    const getHourlyData = (element) => {
        var date = new Date(element.dt * 1000)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ampm;
        return (
            `${date.getMonth() + 1}/${date.getDay()} ${strTime} ` + Math.round(element.temp) + '\xB0'
        )
    }

    const weekClick = (dayIndex) => {
        setShowHourly(true)
        setSelectedDay(dayIndex)
    }

    const isSameDay = (date1, date2) => {
        var firstDate = new Date(date1 * 1000)
        var secondDate = new Date(date2 * 1000)
        return firstDate.toDateString() === secondDate.toDateString()
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
                                    <div className="weekly-card" key={index} onClick={() => weekClick(index)}>
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
                                        <div className="weekly-day-description">
                                            {element.weather[0].main}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {showHourly && (
                        <div className="hourly">
                            <h2>Hourly</h2>
                            <p>(Hourly information only available for future 48 hours)</p>
                            <div className="hourly-weather">
                                {Object.values(weatherData.hourly).map((element, index) => {
                                    if (isSameDay(element.dt, weatherData.daily[selectedDay].dt)) {
                                        return (
                                            <div className="hourly-card" key={index}>
                                                <div className="hourly-text-and-icon">
                                                    {getHourlyData(element)}
                                                    <img
                                                        src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                                                        className="hourly-icon"
                                                        alt="hourly weather"
                                                    />
                                                </div>
                                                <div>
                                                    {element.weather[0].description.toUpperCase()}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return ''
                                    }
                                })}
                            </div>
                        </div>
                    )}
                    <div className="close-btn" onClick={() => toggle(false)} data-testid="modal-close">x</div>
                </Modal>
            )}
        </section>
    )
}

export default WeatherModal