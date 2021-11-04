import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import ResultsTable from '../results-table'
import renderer from 'react-test-renderer'

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
    }
]

it('renders without crashing', () => {
    render(<ResultsTable data={data} />)
    const tableHeader = screen.getByTestId('results-header')
    expect(tableHeader).toBeInTheDocument()
})

it('matches snapshot', () => {
    const tree = renderer.create(<ResultsTable data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('displays data on screen when data provided', () => {
    render(<ResultsTable data={data} hasSearched={true} />)
    const tableHeader = screen.getByText(/gales ferry/i)
    expect(tableHeader).toBeInTheDocument()
})