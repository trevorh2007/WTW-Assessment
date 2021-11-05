import React, { useState } from 'react'
import './search-filter.scss'
import JSONdata from './city-partial.json'
import ResultsTable from '../ResultsTable/results-table'

const SearchFilter = () => {
    const [selectValue, setSelectValue] = useState('country')
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState({})
    const [hasSearched, setHasSearched] = useState(false)

    const handleSelect = event => {
        setSelectValue(event.target.value)
    }

    const handleChange = event => {
        setSearchValue(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        filterData(JSONdata)
        setHasSearched(true)
    }

    const filterData = (cityData) => {
        var filteredData
        setSearchResults(undefined)
        switch (selectValue) {
            case 'country':
                filteredData = cityData.filter(data => data.country.toLowerCase() === searchValue.toLowerCase())
                setSearchResults(filteredData)
                break;
            case 'state':
                filteredData = cityData.filter(data => data.state.toLowerCase() === searchValue.toLowerCase())
                setSearchResults(filteredData)
                break;
            case 'name':
                filteredData = cityData.filter(data => data.name.toLowerCase().includes(searchValue.toLowerCase()))
                setSearchResults(filteredData)
                break;
            default: setSearchResults(cityData)
        }
    }

    return (
        <section id="search">
            <div className="search-container">
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
                {hasSearched && searchResults.length === 0 && (
                    <div className="no-results" data-testid="no-results-found">No results found, check your search and try again.</div>
                )}
                {searchResults.length > 0 && (
                    <ResultsTable data={searchResults} hasSearched={hasSearched} />
                )}
            </div>
        </section>
    )
}

export default SearchFilter