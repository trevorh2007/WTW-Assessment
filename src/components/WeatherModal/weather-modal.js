import React from 'react'
import './weather-modal.scss'

const WeatherModal = ({ data }) => {

    return (
        <>
            Weather info will go here. {data.main.temp}
        </>
    )
}

export default WeatherModal