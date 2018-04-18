import React from 'react'
import helpers from './utils/helpers'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      videos: [],
    }
    this.filterVideos = this.filterVideos.bind(this)
  }

  componentWillMount () {
    let tagsPromise = helpers.getTags()
    let videosPromise = helpers.getVideos()
    tagsPromise.then(tags => this.setState({
      tags: tags,
    }))
    videosPromise.then(videos => this.setState({
      videos: videos,
    }))
  }

  renderTagItems (tags) {
    return tags.map((tag, id) => {
      return (
        <option key={`tag-${id}`} className='tag' value={tag.id}>{ tag.name }</option>
      )
    })
  }

  renderVideoItems (videos) {
    return videos.map((video, id) => {
      let youtubeVideoUrl = ''
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      let match = video.url.match(regExp)
      if (match && match[2].length === 11) {
        youtubeVideoUrl = match[2]
      }
      return (
        <div className='video-content' key={`video-${id}`}>
          <a className='link' href={video.slug}>
            <img className='video-img' src={`https://img.youtube.com/vi/${youtubeVideoUrl}/sddefault.jpg`} />
            <h6 className='title'>{ video.name }</h6>
          </a>
        </div>
      )
    })
  }

  filterVideos (tag) {
    let id = tag.target.value
    if (id === 'all') {
      let videosPromise = helpers.getVideos()
      videosPromise.then(videos => this.setState({
        videos: videos,
      }))
    } else {
      let videosPromise = helpers.getVideosByTag(id)
      videosPromise.then(videos => this.setState({
        videos: videos,
      }))
    }
  }

  render () {
    return (
      <div className='trifold-content'>
        <div className='trifold-middle'>
          <div className='video-filter'>
            <span>SORT BY: </span>
            <div className='filter-dropdown-wrap'>
              <div className='input-group'>
                <label className='select'>
                  <select onChange={this.filterVideos}>
                    <option className='tag' value='all'>All</option>
                    {this.renderTagItems(this.state.tags)}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className='video-wrap'>
            {this.renderVideoItems(this.state.videos)}
          </div>
        </div>
        <div className='trifold-data' />
      </div>
    )
  }
};

export default App
