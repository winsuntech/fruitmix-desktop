import React, { PropTypes } from 'react'
import Debug from 'debug'
import { ipcRenderer } from 'electron'
import UUID from 'node-uuid'
import { Paper, CircularProgress, IconButton, SvgIcon } from 'material-ui'
import RenderToLayer from 'material-ui/internal/RenderToLayer'
import SlideToAnimate from './SlideToAnimate'
import { formatDate } from '../../utils/datetime'

const debug = Debug('component:photoApp:PhotoDetail')

const mousePosition = (ev) => {
  if (ev.pageX || ev.pageY) {
    return { x: ev.pageX, y: ev.pageY }
  }
  return {
    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: ev.clientY + document.body.scrollTop - document.body.clientTop
  }
}


class PhotoDetailInline extends React.Component {
  constructor(props) {
    super(props)

    this.currentIndex = this.props.seqIndex

    this.state = {
      direction: null
    }

    this.requestNext = (currentIndex) => {
      this.path = ''
      this.thumbPath = ''
      this.session = UUID.v4()
      this.digest = this.props.items[currentIndex].digest
      this.photo = this.props.items[currentIndex]
      debug('currentImage', this.photo, Date.parse(formatDate(this.photo.exifDateTime)))
      ipcRenderer.send('getMediaImage', this.session, this.digest)
      ipcRenderer.send('getThumb', this.session, this.digest)
      // this.setState({ direction: null })
      this.forceUpdate()
    }
    this.changeIndex = (direction) => {
      if (direction === 'right' && this.currentIndex < this.props.items.length - 1) {
        this.currentIndex += 1
      } else if (direction === 'left' && this.currentIndex > 0) {
        this.currentIndex -= 1
      } else return
      this.requestNext(this.currentIndex)
    }

    this.updatePath = (event, session, path) => {
      if (this.session === session) {
        this.path = path
        this.forceUpdate()
      }
    }

    this.updateThumbPath = (event, session, path) => {
      if (this.session === session) {
        this.thumbPath = path
        this.forceUpdate()
      }
    }
    this.calcPositon = (ev) => {
      const { x, y } = mousePosition(ev)
      const clientWidth = window.innerWidth

      if (this.currentIndex > 0 && x < clientWidth * 0.3 && y > 96) {
        this.refBackground.style.cursor = 'pointer'
        if (this.state.direction !== 'left') this.setState({ direction: 'left' })
      } else if (this.currentIndex < this.props.items.length - 1 && x > clientWidth * 0.7 && y > 96) {
        this.refBackground.style.cursor = 'pointer'
        if (this.state.direction !== 'right') this.setState({ direction: 'right' })
      } else {
        this.refBackground.style.cursor = 'default'
        if (this.state.direction !== null) this.setState({ direction: null })
      }
    }
  }

  componentWillMount() {
    this.requestNext(this.props.seqIndex)
  }

  componentDidMount() {
    ipcRenderer.on('donwloadMediaSuccess', this.updatePath)
    ipcRenderer.on('getThumbSuccess', this.updateThumbPath)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('getThumbSuccess', this.updateThumbPath)
    ipcRenderer.removeListener('donwloadMediaSuccess', this.updatePath)
  }

  renderDetail() {
    /*
    let exifOrientation = ''
    if (currentImage) {
      exifOrientation = currentImage.exifOrientation || ''
    }
    const degRotate = exifOrientation ? `rotate(${(exifOrientation - 1) * 90}deg)` : ''
              style={{ transform: degRotate, transitionDuration: '0' }}
    const thumbPath = `${mediaPath}${digest}thumb210`
    */

    return (
      <Paper
        style={{
          position: 'relative',
          backgroundColor: 'rgb(0, 0, 0)',
          width: '100%',
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ position: 'fixed', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          { this.path ? // FIXME
            <img
              height={'100%'}
              src={this.path}
              alt="DetailImage"
            /> : this.thumbPath ?
              <img
                height={'100%'}
                src={this.thumbPath}
                alt="DetailImage"
              /> : <div />
          }
        </div>
      </Paper>
    )
  }

  render() {
    // debug('render detail')
    return (
      <Paper
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          ref={ref => (this.refBackground = ref)}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: 1500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onMouseMove={this.calcPositon}
          onTouchTap={() => this.changeIndex(this.state.direction)}
        >

          {/* main image */}
          { this.renderDetail() }

          {/* close Button */}
          <IconButton
            onTouchTap={this.props.closePhotoDetail}
            style={{
              position: 'fixed',
              top: 12,
              left: 12
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="white">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </IconButton>

          {/* left Button */}
          <IconButton
            style={{
              display: this.state.direction === 'left' ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(66, 66, 66, 0.541176)',
              position: 'fixed',
              borderRadius: 28,
              width: 56,
              height: 56,
              left: '2%'
            }}
          >
            <svg width={36} height={36} viewBox="0 0 24 24" fill="white">
              <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
            </svg>
          </IconButton>

          {/* right Button */}
          <IconButton
            style={{
              display: this.state.direction === 'right' ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(66, 66, 66, 0.541176)',
              borderRadius: 28,
              position: 'fixed',
              width: 56,
              height: 56,
              right: '2%'
            }}
          >
            <svg width={36} height={36} viewBox="0 0 24 24" fill="white">
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
            </svg>
          </IconButton>
        </div>

        {/* overLay */}
        <div
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgb(0, 0, 0)',
            zIndex: 1400
          }}
          onTouchTap={this.props.closePhotoDetail}
        />
      </Paper>
    )
  }
}

/*
 * Use RenderToLayer method to move the componet to root node
*/

export default class PhotoDetail extends React.Component {
  renderLayer = () => (
    <PhotoDetailInline {...this.props} />
          );

  render() {
    return (
      <RenderToLayer render={this.renderLayer} open useLayerForClickAway={false} />
    )
  }
}

PhotoDetail.propTypes = {
  style: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  closePhotoDetail: PropTypes.func.isRequired,
  seqIndex: PropTypes.number.isRequired
}
