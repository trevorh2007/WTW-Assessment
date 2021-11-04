import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import WeatherModal from '../weather-modal'
import Modal from 'react-modal'

afterEach(() => {
    cleanup
})

beforeEach(() => {
    //needed for the react-modal library to bind the modal to the react portal it creates
    Modal.setAppElement(document.createElement('div'));
})

describe('Weather Modal', () => {
    const weatherData = {
        current: {
            temp: 70.41,
            weather: {
                0: {
                    description: 'light intensity drizzle',
                    icon: '09n',
                    id: 300,
                    main: 'Drizzle'
                }
            }
        },
        daily: {

        }
    }
    const cityData = {
        state: 'FL'
    }

    it('renders without crashing with valid props', () => {
        render(<WeatherModal weatherData={weatherData} cityData={cityData} isOpen={true} />)
        const textLabel = screen.getByText(/today/i)
        expect(textLabel).toBeInTheDocument()
    })
    it('should show error message when weatherData is null', () => {
        render(<WeatherModal weatherData={{}} cityData={cityData} isOpen={true} />)
        const errorLabel = screen.getByText(/Something with the api call went wrong/i)
        expect(errorLabel).toBeInTheDocument()
    })
})