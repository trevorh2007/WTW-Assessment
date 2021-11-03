import React, { useState } from 'react'
import './search-filter.scss'
import JSONdata from './city-partial.json'
import ResultsTable from '../ResultsTable/results-table'

const SearchFilter = () => {
    const [selectValue, setSelectValue] = useState('country')
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState({})

    const handleSelect = event => {
        setSelectValue(event.target.value)
    }

    const handleChange = event => {
        setSearchValue(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        filterData()
    }

    const filterData = () => {
        var filteredData
        switch (selectValue) {
            case 'country':
                filteredData = JSONdata.filter(data => data.country.toLowerCase() === searchValue.toLowerCase())
                setSearchResults(filteredData)
                break;
            case 'state':
                filteredData = JSONdata.filter(data => data.state.toLowerCase() === searchValue.toLowerCase())
                setSearchResults(filteredData)
                break;
            case 'name':
                filteredData = JSONdata.filter(data => data.name.toLowerCase().includes(searchValue.toLowerCase()))
                setSearchResults(filteredData)
                break;
            default: setSearchResults(JSONdata)
        }
    }

    return (
        <section id="search">
            <form onSubmit={handleSubmit}>
                <label>
                    Filter by:
                    <select data-testid="search-select-input" value={selectValue} onChange={handleSelect}>
                        <option value="country">Country</option>
                        <option value="state">State</option>
                        <option value="name">Name</option>
                    </select>
                </label>
                <label>
                    Search:
                    <input data-testid="search-text-input" type="text" name="search" value={searchValue} onChange={handleChange} />
                </label>
                <input type="submit" value="Filter" data-testid="submit-btn" />
            </form>
            <ResultsTable data={searchResults} />
        </section>
    )
}

export default SearchFilter