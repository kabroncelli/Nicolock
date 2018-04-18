import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import helpers from '../utils/helpers'

import { updateImage } from '../actions/galleryActions'

class GalleryItemData extends React.Component {
  constructor (props) {
    super(props)
    let productsUsed = this.props.galleryData.products_used ? this.props.galleryData.products_used : ''
    let patternsUsed = this.props.galleryData.patterns_used ? this.props.galleryData.patterns_used : ''
    this.state = {
      galleryId: this.props.galleryData.id,
      imageId: this.props.selectedImage.id,
      notes: this.props.selectedImage.notes,
      productsUsed: productsUsed,
      patternsUsed: patternsUsed,
      message: '',
      messageVisible: false,
    }

    let cookies = new Cookies()
    this.csrfToken = cookies.get('csrftoken')

    this.handleNotes = this.handleNotes.bind(this)
    this.saveNotes = this.saveNotes.bind(this)
    this.saveGalleryField = this.saveGalleryField.bind(this)
    this.handleProducts = this.updateField.bind(this, 'productsUsed')
    this.handlePatterns = this.updateField.bind(this, 'patternsUsed')
  }

  updateField (field, event) {
    this.setState({
      [field]: event.target.value,
    })
  }

  handleNotes (event) {
    this.setState({
      notes: event.target.value,
    })
  }

  saveNotes (event) {
    const newImage = {
      id: this.props.selectedImage.id,
      thumbnail: this.props.selectedImage.thumbnail,
      large_thumbnail: this.props.selectedImage.large_thumbnail,
      name: this.props.selectedImage.name,
      color: this.props.selectedImage.color,
      notes: this.state.notes,
      original: this.props.selectedImage.original,
      slug: this.props.selectedImage.slug,
      gallery: this.props.selectedImage.gallery,
    }
    this.props.updateImage(newImage)
    let updateNotes = helpers.saveNotes(this.csrfToken, event.target.value, this.state.imageId)
    updateNotes
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            message: 'Your notes have been saved',
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        } else {
          this.setState({
            message: 'There was a problem saving your notes',
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        }
      })
  }

  saveGalleryField (event) {
    let updatedField = helpers.saveGalleryField(this.csrfToken, event.target.name, event.target.value, this.state.galleryId)
    updatedField
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            message: 'Your gallery data has been saved',
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        } else {
          this.setState({
            message: 'There was a problem saving your gallery data',
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        }
      })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      galleryId: nextProps.galleryData.id,
      imageId: nextProps.selectedImage.id,
      notes: nextProps.selectedImage.notes,
      productsUsed: nextProps.galleryData.products_used,
      patternsUsed: nextProps.galleryData.patterns_used,
      message: '',
      messageVisible: false,
    })
  }

  renderTitle () {
    if (this.props.galleryData.gallery_type === 'homeowner') {
      return 'Notes'
    } else if (this.props.galleryData.gallery_type === 'contractor') {
      return this.props.projectName + ', ' + this.props.galleryData.name
    }
  }

  renderDescription () {
    if (this.props.galleryData.gallery_type === 'homeowner') {
      return (
        <div className='input-group'>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} placeholder='My notes' name='notes' value={this.state.notes} onChange={this.handleNotes} onBlur={this.saveNotes} />
        </div>
      )
    } else if (this.props.galleryData.gallery_type === 'contractor') {
      return (
        <div>
          <div className='input-group'>
            <label className='label'>Products Used:</label>
            <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} placeholder='materials, etc...' name='products_used' value={this.state.productsUsed} onChange={this.handleProducts} onBlur={this.saveGalleryField} />
          </div>
          <div className='input-group'>
            <label className='label'>Patterns Used:</label>
            <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} placeholder='herringbone, etc...' name='patterns_used' value={this.state.patternsUsed} onChange={this.handlePatterns} onBlur={this.saveGalleryField} />
          </div>
        </div>
      )
    }
  }

  render () {
    // If homeownwer gallery and owner of gallery, display editable notes
    // If homeowner gallery and not owner, display uneditable notes
    // If contractor gallery and owner of gallery, display editable Products Used and Patterns Used
    // If contractor gallery and not owner, display uneditable Products Used and Patterns Used
    return (
      <form className='gallery-data-form'>
        <div className='gallery-title'>
          {this.renderTitle()}
        </div>
        <div className='gallery-description'>
          {this.renderDescription()}
        </div>
        <p className={'message ' + (this.state.messageVisible ? 'is-visible' : '')}>{this.state.message}</p>
      </form>
    )
  }
};

GalleryItemData.propTypes = {
  editable: PropTypes.bool,
  galleryData: PropTypes.shape({
    products_used: PropTypes.string,
    patterns_used: PropTypes.string,
    name: PropTypes.string,
    gallery_type: PropTypes.string,
    id: PropTypes.number,
  }),
  selectedImage: PropTypes.shape({
    id: PropTypes.number,
    notes: PropTypes.string,
    thumbnail: PropTypes.string,
    large_thumbnail: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    original: PropTypes.string,
    slug: PropTypes.string,
    gallery: PropTypes.string,
  }),
  updateImage: PropTypes.func,
  projectName: PropTypes.string,
}

const mapStateToProps = state => {
  return (
    {
      projectName: state.galleryReducer.projectName,
      galleryData: state.galleryReducer.galleryData,
      selectedImage: state.galleryReducer.selectedImage,
    }
  )
}

const mapDispatchToProps = {
  updateImage,
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItemData)
