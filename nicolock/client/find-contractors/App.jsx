import React from 'react'
import PropTypes from 'prop-types'

import Panel from './components/Panel'
import TextField from './components/TextField'
import Dropdown from '../components/Dropdown'
import mapHelpers from '../nico-map/utils/helpers'

class App extends React.Component {
  static propTypes = {
    resourceUrl: PropTypes.string.isRequired,
    authenticated: PropTypes.bool,
  }

  constructor (props) {
    super(props)

    this.state = {
      contractors: [],
      zipCode: '',
      radius: 20,
    }
  }

  getRadiusOptions () {
    return [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
    ]
  }

  zipCodeChanged = (value) => {
    this.setState({zipCode: value})
  }

  radiusChanged = (value) => {
    this.setState({radius: value})
  }

  getContractors = (e) => {
    e.preventDefault()
    if (this.state.zipCode !== '') {
      mapHelpers.getNearbyZipCodes(this.state.zipCode, this.state.radius)
        .then((zipCodes) => {
          mapHelpers.getItems(this.props.resourceUrl, zipCodes)
            .then((contractors) => {
              this.setState({contractors: contractors})
            })
        })
    }
  }

  renderContractor = (contractor) => {
    return (
      <Panel
        key={contractor.id}
        id={contractor.user_id}
        companyName={contractor.name}
        phoneNumber={contractor.phone}
        email={contractor.email}
        city={contractor.city}
        state={contractor.state}
        authenticated={this.props.authenticated}
        profileUrl={contractor.profile_url}
        certifications={contractor.certifications} />
    )
  }

  render () {
    return (
      <div className='trifold-content'>
        <div className='trifold-middle'>
          <h1 className='title'>Locate A Contractor</h1>
          <p className='subtitle'>
          Enter your zip code to find contractors in your area
          </p>
          <form onSubmit={this.getContractors} className='locate-contractor-form'>
            <TextField label='Enter zip' valueEntered={this.zipCodeChanged} />
            <Dropdown
              label='Radius'
              options={this.getRadiusOptions()}
              valueEntered={this.radiusChanged} />
            <div className='action-group'>
              <button
                className='btn btn-sm neutral-0'
                type='submit'>Go</button>
            </div>
          </form>
          {this.state.contractors.map(this.renderContractor)}
        </div>
      </div>
    )
  }
}

export default App
