import React from 'react'
import PropTypes from 'prop-types'
import Card from './components/Card'
import InteractiveMap from './components/InteractiveMap'
import IntegerTextField from './components/IntegerTextField'
import Dropdown from '../components/Dropdown'
import helpers from './utils/helpers'

class App extends React.Component {
  static propTypes = {
    resourceUrl: PropTypes.string.isRequired,
    resourceType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authenticated: PropTypes.bool,
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedItem: null,
      items: [],
      zipCode: null,
      distance: null,
    }
  }

  markerClicked = (itemId) => {
    this.state.selectedItem = this.state.items.find(items => items.id === itemId)
    this.setState(this.state)
  }

  mapClicked = (e) => {
    this.dismissCard(e)
  }

  dismissCard = (e) => {
    this.state.selectedItem = null
    this.setState(this.state)
  }

  search = (e) => {
    e.preventDefault()
    helpers.getNearbyZipCodes(this.state.zipCode, this.state.distance)
      .then((zipCodes) => {
        helpers.getItems(this.props.resourceUrl, zipCodes)
          .then((items) => {
            this.state.items = items
            this.setState(this.state)
          })
      })
  }

  zipCodeEntered = (zipCode) => {
    this.state.zipCode = zipCode
    this.setState(this.state)
  }

  distanceEntered = (distance) => {
    this.state.distance = distance
    this.setState(this.state)
  }

  getDistanceOptions () {
    return [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
    ]
  }

  render () {
    return (
      <div className='trifold-content has-map'>
        <div className='trifold-middle'>
          <InteractiveMap
            items={this.state.items}
            markerClicked={this.markerClicked}
            onClick={this.mapClicked} />
          {this.state.selectedItem &&
            <Card
              id={this.state.selectedItem.id ? this.state.selectedItem.id : undefined}
              name={this.state.selectedItem.name}
              city={this.state.selectedItem.city}
              state={this.state.selectedItem.state}
              phone={this.state.selectedItem.phone}
              address={this.state.selectedItem.address}
              email={this.state.selectedItem.email ? this.state.selectedItem.email : undefined}
              imageUrl={this.state.selectedItem.thumbnail ? this.state.selectedItem.thumbnail : undefined}
              galleryUrl={this.state.selectedItem.gallery ? this.state.selectedItem.gallery : undefined}
              dismissCard={this.dismissCard}
              authenticated={this.props.authenticated} />
          }
        </div>
        <div className='trifold-data'>
          <h4 className='title'>Locate a {this.props.resourceType}</h4>
          <p className='paragraph'>{this.props.description}</p>
          <form onSubmit={this.search}>
            <div className='pad-half--ends'>
              <IntegerTextField
                label='zipcode'
                valueEntered={this.zipCodeEntered} />
            </div>
            <div className='pad-half--ends'>
              <Dropdown
                label='distance'
                options={this.getDistanceOptions()}
                valueEntered={this.distanceEntered} />
            </div>
            <div className='push--ends'>
              <button className='btn btn-sm neutral-0' type='submit'>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default App
