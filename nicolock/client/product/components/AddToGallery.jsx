import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import helpers from '../utils/helpers'

class AddToGallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      galleryId: '',
      imageId: this.props.imageId,
      imageUrl: this.props.imageUrl,
      notes: '',
      message: '',
      messageVisible: false,
    }

    let cookies = new Cookies()
    this.csrfToken = cookies.get('csrftoken')

    this.handleSelectedGallery = this.handleSelectedGallery.bind(this)
    this.handleNotes = this.handleNotes.bind(this)
    this.saveImage = this.saveImage.bind(this)
  }

  handleSelectedGallery (event) {
    this.setState({
      galleryId: event.target.value,
      imageId: parseInt(document.getElementById('featured-product-image').getAttribute('data-id')),
      imageUrl: document.getElementById('featured-product-image').getAttribute('src'),
    })
  }

  handleNotes (event) {
    this.setState({
      notes: event.target.value,
    })
  }

  saveImage (event) {
    event.preventDefault()
    if (!this.state.galleryId) {
      this.setState({
        error: 'Please select a gallery',
        messageVisible: true,
      })
    } else {
      let saveImage = helpers.saveImage(this.csrfToken, this.state.imageId, this.state.galleryId, this.state.imageUrl, this.state.notes)
      saveImage
        .then((response) => {
          if (response.success) {
            this.setState({
              galleryId: '',
              imageId: '',
              imageUrl: '',
              notes: '',
              message: 'The image has been added to your gallery',
              messageVisible: true,
            })
            setTimeout(() => {
              this.setState({
                messageVisible: false,
              })
              document.querySelector('.add-gallery-modal-wrap').classList.toggle('is-visible')
            }, 2000)
          } else {
            this.setState({
              error: 'There was a problem saving the image to your gallery',
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
  }

  renderGalleryOptions (galleries) {
    return galleries.map((gallery, id) => {
      return (
        <label key={gallery.id} className='radio'>
          <input type='radio' name='gallery' value={gallery.id} onChange={this.handleSelectedGallery} />
          <span />
          { gallery.name }
        </label>
      )
    })
  }

  render () {
    let location = window.location.href
    return (
      <form>
        <h4 className='title'>Add To Gallery</h4>
        <div className='input-group'>
          <p className='paragraph pad-half--bottom'>Select One</p>
          {this.state.error
            ? <p className='paragraph' style={{ color: '#d0021b', margin: '10px 0' }}>{this.state.error}</p>
            : ''
          }
          {this.renderGalleryOptions(this.props.galleries)}
        </div>
        <a className='link neutral-0 link-new-gallery' href={`/galleries/add/?from=${location}`}>Or create a new gallery</a>
        <hr className='divider' />
        <div className='input-group'>
          <fieldset>
            <legend>Notes</legend>
            <textarea className='textarea' onChange={this.handleNotes} value={this.state.notes} />
          </fieldset>
        </div>
        <button className='btn btn-md neutral-0' onClick={this.saveImage}>ADD</button>
        <p className={'message ' + (this.state.messageVisible ? 'is-visible' : '')}>{this.state.message}</p>
      </form>
    )
  }
};

AddToGallery.propTypes = {
  galleries: PropTypes.array,
  imageId: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export default AddToGallery
