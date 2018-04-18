import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { selectImage } from '../actions/galleryActions'

class GalleryCarousel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      carouselPosition: 0,
    }

    this.slideCarousel = this.slideCarousel.bind(this)
  }

  slideCarousel (event) {
    const index = parseInt(event.target.getAttribute('data-position'))
    const position = '-' + index * 100 + '%'
    this.setState({
      carouselPosition: position,
    })
    if (this.props.galleryData.gallery_type !== 'contractor') {
      this.props.selectImage(this.props.galleryData.items[index])
    }
  }

  render () {
    return (
      <div className='gallery-wrap flex-between'>
        <div className='gallery-img-shelf'>
          {
            this.props.galleryData.items.map((item, index) => {
              return (
                <div className='img-wrap' key={item.id}>
                  <img className='img' src={item.thumbnail} data-position={index} onClick={this.slideCarousel} />
                </div>
              )
            })
          }
        </div>
        <div className='gallery-featured'>
          <div className='carousel-container'>
            <ul className='carousel' style={{ left: this.state.carouselPosition }}>
              {
                this.props.galleryData.items.map((item) => {
                  return (
                    <li className='carousel-item' key={item.id}>
                      {this.props.editable &&
                        <a className='link neutral-4 edit' href={`/galleries/items/${item.slug}/edit/`}>
                          <svg className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 528.899 528.899'>
                            <path d='M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                            c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                            C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                            L27.473,390.597L0.3,512.69z' />
                          </svg>
                        </a>
                      }
                      <img className='gallery-featured-image' src={item.original} />
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

GalleryCarousel.propTypes = {
  galleryData: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  selectImage: PropTypes.func,
}

const mapStateToProps = state => {
  return (
    {
      galleryData: state.galleryReducer.galleryData,
      selectedImage: state.galleryReducer.selectedImage,
    }
  )
}

const mapDispatchToProps = {
  selectImage,
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryCarousel)
