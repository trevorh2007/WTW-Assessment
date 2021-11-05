import { render, cleanup, fireEvent, getAllByTestId } from '@testing-library/react'
import React from 'react'
import ResultsTable from '../results-table'
import SearchFilter from '../../SearchFilter/search-filter'

afterEach(cleanup)

const data = [
    {
        "id": 4834272,
        "name": "Farmington",
        "state": "CT",
        "country": "US",
        "coord": {
            "lon": -72.832039,
            "lat": 41.719818
        }
    },
    {
        "id": 4834837,
        "name": "Gales Ferry",
        "state": "CT",
        "country": "US",
        "coord": {
            "lon": -72.082024,
            "lat": 41.429821
        }
    },
    {
        "id": 3690608,
        "name": "Zorritos",
        "state": "",
        "country": "PE",
        "coord": {
            "lon": -80.678192,
            "lat": -3.68046
        }
    }
]

it('renders without crashing', () => {
    const { getByTestId } = render(<ResultsTable data={data} />)
    getByTestId('results-header')
})

it('renders data when provided', () => {
    const { getAllByTestId } = render(<ResultsTable data={data} hasSearched={true} />)
    const citiesId = getAllByTestId('result-row').map(tr => tr.children[0].textContent)
    const mockCitiesId = data.map(c => c.id.toString())
    expect(citiesId).toEqual(mockCitiesId)
})

it('will update by country', () => {
    const { getByText, getByTestId, getAllByText } = render(<SearchFilter />)
    const selectInput = getByTestId('search-select-input')
    const textInput = getByTestId('search-text-input')

    fireEvent.change(selectInput, { target: { value: 'country' } })
    fireEvent.change(textInput, { target: { value: 'us' } })
    fireEvent.click(getByTestId('submit-btn'))
    getByText(/bay minette/i)
    expect(getAllByText(/us/i).length).toBeGreaterThan(3)
})

it('will update by state', () => {
    const { getByText, getByTestId } = render(<SearchFilter />)
    const selectInput = getByTestId('search-select-input')
    const textInput = getByTestId('search-text-input')

    fireEvent.change(selectInput, { target: { value: 'state' } })
    fireEvent.change(textInput, { target: { value: 'tx' } })
    fireEvent.click(getByTestId('submit-btn'))
    getByText(/edna/i)
    getByText(/primrose/i)
})

it('will update by name', () => {
    const { getByText, getByTestId } = render(<SearchFilter />)
    const selectInput = getByTestId('search-select-input')
    const textInput = getByTestId('search-text-input')

    fireEvent.change(selectInput, { target: { value: 'name' } })
    fireEvent.change(textInput, { target: { value: 'salt lake city' } })
    fireEvent.click(getByTestId('submit-btn'))
    getByText(/salt lake city/i)
    getByText(/5780993/i) // check id was loaded from "salt lake city" result
})