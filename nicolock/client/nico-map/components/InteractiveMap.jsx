import React from 'react'
import PropTypes from 'prop-types'
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

class InteractiveMap extends React.Component {
  constructor (props) {
    super(props)
    this.markerIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }

  markerClicked (dealerId) {
    this.props.markerClicked(dealerId)
  }

  mapClicked (e) {
    this.props.onClick(e)
  }

  render () {
    let listLength = this.props.items.length

    let zoom
    if (listLength === 0) {
      zoom = 4
    } else if (listLength === 1) {
      zoom = 13
    } else {
      zoom = undefined
    }

    let position
    if (listLength === 0) {
      position = [37.09024, -95.712891]
    } else if (listLength === 1) {
      position = [this.props.items[0].lat, this.props.items[0].lng]
    } else {
      position = undefined
    }

    let bounds = []
    if (listLength > 1) {
      const coords = this.props.items.map(dealer => [dealer.lat, dealer.lng])
      coords.forEach((coord) => {
        // Include the coord in the final bounds
        // if it is only found once in the array
        const coordCount = bounds.reduce((count, c) => {
          return count + (c[0] === coord[0] && c[1] === coord[1])
        }, 0)
        if (coordCount === 0) {
          bounds.push(coord)
        }
      })

      // After filtering if there is only one bound we have to
      // use position and zoom instead
      if (bounds.length === 1) {
        position = bounds[0]
        zoom = 13
        bounds = undefined
      }
    } else {
      bounds = undefined
    }

    return (
      <div className='nico-map'>
        <Map
          center={position}
          zoom={zoom}
          bounds={bounds}
          onClick={() => this.mapClicked()}
          animate >
          <TileLayer
            url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>' />
          {this.props.items.map((item) => {
            return (
              <Marker
                icon={this.markerIcon}
                position={[item.lat, item.lng]}
                key={`${item.id}${item.lat}${item.lng}`}
                onClick={() => this.markerClicked(item.id)} />
            )
          })}
        </Map>
      </div>
    )
  }
};

InteractiveMap.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  markerClicked: PropTypes.func,
}

export default InteractiveMap
