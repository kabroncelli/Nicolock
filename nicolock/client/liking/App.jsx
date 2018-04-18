import React from 'react'
import PropTypes from 'prop-types'
import helpers from './utils/helpers'

class Like extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: this.props.count,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    if (typeof (Storage) !== 'undefined') {
      let likeStatus = localStorage.getItem('nicolock_' + this.props.type + this.props.id)
      if (!likeStatus) {
        localStorage.setItem('nicolock_' + this.props.type + this.props.id, true)
        let liked = helpers.addLike(this.props.url)
        liked
          .then((respons) => {
            this.setState({
              count: parseInt(this.state.count) + 1,
            })
          })
      }
    }
  }

  render () {
    return (
      <a className='link like-number-link' href='#' onClick={this.handleClick}>
        <svg className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
          viewBox='0 0 492.719 492.719'>
          <path className='path' d='M492.719,166.008c0-73.486-59.573-133.056-133.059-133.056c-47.985,0-89.891,25.484-113.302,63.569
            c-23.408-38.085-65.332-63.569-113.316-63.569C59.556,32.952,0,92.522,0,166.008c0,40.009,17.729,75.803,45.671,100.178
            l188.545,188.553c3.22,3.22,7.587,5.029,12.142,5.029c4.555,0,8.922-1.809,12.142-5.029l188.545-188.553
            C474.988,241.811,492.719,206.017,492.719,166.008z' />
        </svg>
        <span className='like-wrap'>Like<br />
          <span className='like-count'>
            <span className='like-number'>{this.state.count}</span> Likes
          </span>
        </span>
      </a>
    )
  }
};

Like.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
}

export default Like
