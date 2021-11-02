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
        if (searchResults === '') setSearchResults(JSONdata)
        console.log('search submitted', selectValue, searchValue)
    }

    return (
        <section id="search">
            <form onSubmit={handleSubmit}>
                <label>
                    Filter by:
                    <select value={selectValue} onChange={handleSelect}>
                        <option value="country">Country</option>
                        <option value="state">State</option>
                        <option value="name">Name</option>
                    </select>
                </label>
                <label>
                    Search:
                    <input type="text" name="search" value={searchValue} onChange={handleChange} />
                </label>
                <input type="submit" value="Filter" />
            </form>
            <ResultsTable searchedData={searchResults} />
        </section>
    )
}

export default SearchFilter