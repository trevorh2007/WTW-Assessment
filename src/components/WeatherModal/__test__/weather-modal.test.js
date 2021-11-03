import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import WeatherModal from '../weather-modal'

afterEach(cleanup)

it('renders without crashing', () => {
    const data = {
        main: {
            temp: 70
        }
    }
    render(<WeatherModal data={data} />)
    const textLabel = screen.getByText(/weather/i)
    expect(textLabel).toBeInTheDocument()
})