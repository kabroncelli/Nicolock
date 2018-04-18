import React from 'react'

import helpers from './utils/helpers'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchResults: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    let searchResultsPromise = helpers.getSearchResults(this.state.searchTerm)
    searchResultsPromise.then(searchResults => this.setState({
      searchResults: searchResults,
    }))
  }

  renderSearchResults (results) {
    return Object.keys(results).map((keyName, id) => {
      if (results[keyName].length > 0) {
        return (
          <div className='search-group' key={`result-group-${id}`}>
            <h4 className='title'>{ keyName }</h4>
            <div className='search-result-wrapper'>
              {
                results[keyName].map((result, key) => {
                  if (keyName.toLocaleLowerCase() === 'products') {
                    return (
                      <div className='search-result' key={key}>
                        <a className='link' href={result.url}>
                          <img className='img' src={result.images[0].thumbnail} />
                          <span className='result-title'>{result.name}</span>
                        </a>
                      </div>
                    )
                  } else if (keyName.toLocaleLowerCase() === 'images') {
                    return (
                      <div className='search-result' key={key}>
                        <a className='link' href={result.url}>
                          <img className='img' src={result.thumbnail} />
                          <span className='result-title'>{result.name}</span>
                        </a>
                      </div>
                    )
                  } else if (keyName.toLocaleLowerCase() === 'specs') {
                    return (
                      <div className='search-result is-specs' key={key}>
                        <a className='link' target='_blank' href={result.file}>
                          <img className='img' src={result.icon} />
                          <span className='result-title'>{result.label}</span>
                        </a>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        )
      }
    })
  }

  render () {
    return (
      <div className='search-container'>
        <form className='seach-page-form' onSubmit={this.handleSubmit}>
          <div className='input-group'>
            <label htmlFor='q' className='label'>Search:</label>
            <input className='input' id='id_q' name='q' type='text' onChange={this.handleChange} />
          </div>
        </form>
        {this.renderSearchResults(this.state.searchResults)}
      </div>
    )
  }
};

export default App
