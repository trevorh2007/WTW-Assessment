import { render, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import SearchFilter from '../search-filter'

afterEach(cleanup)

it('renders without crashing', () => {
    const { getByText } = render(<SearchFilter />)
    getByText(/filter by/i)
})

it('renders select input with default value and text input with no value', () => {
    const { getByTestId } = render(<SearchFilter />)
    expect(getByTestId('search-select-input')).toHaveValue('country')
    expect(getByTestId('search-text-input')).toHaveValue('')
})

it('allows inputs to be changed', () => {
    const { getByTestId } = render(<SearchFilter />)
    const selectInput = getByTestId('search-select-input')
    const textInput = getByTestId('search-text-input')

    fireEvent.change(selectInput, { target: { value: 'state' } })
    fireEvent.change(selectInput, { target: { value: 'name' } })
    fireEvent.change(textInput, { target: { value: 'US' } })
    fireEvent.change(textInput, { target: { value: 'Washington' } })
    fireEvent.click(getByTestId('submit-btn'))
})