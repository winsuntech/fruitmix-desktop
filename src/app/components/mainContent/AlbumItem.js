/**
  相册项
**/

import React, { Component, PropTypes } from 'react';

function getStyles () {
  return {
    root: {
      backgroundColor: '#fff',
      boxShadow: '0 1px 0 #b0b0b0',
      borderRadius: 2,
      color: '#757575',
      fontSize: 12,
      height: 290,
      margin: '0 5px 10px',
      width: 210
    },
    figure: {
      objectFit: 'cover'
    },
    inner: {
      padding: '0 20px'
    },
    caption: {
      color: '#212121',
      fontSize: 14,
      padding: '10px 0'
    },
    describe: {
      margin: 0,
      paddingBottom: 5,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    tail: {
      borderTop: '1px solid #e0e0e0',
      lineHeight: '30px'
    }
  }
}

export default class AlbumItem extends Component {
  toDate(timestamp) {
    const date = new Date();
    date.setTime(timestamp);

    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  }

  getUserName(uuid) {
    const { state: { login: { obj: { allUser } } } } = this.props;

    return allUser.find(user => user.uuid === uuid).username;
  }

  render() {
    const {
      root,
      figure,
      inner,
      caption,
      describe,
      tail
    } = getStyles();

    const { info: { doc: { ctime, contents, author } } } = this.props;
    const { state: { view: { currentMediaImage: { path } } } } = this.props

    return (
      <div className="album-item fl" style={ root }>
        <div className="album-item-figure" style={ figure }>
          <img src={ path || '' } width="100%" height="100%" />
        </div>
        <div className="album-item-inner" style={ inner }>
          <div className="caption" style={ caption }>
          武夷山 * { contents.length }张
          </div>
          <p className="describe" style={ describe }>
            这是相册的描述
          </p>
          <div className="clearfix" style={ tail }>
            <label className="fl" style={{ width: '50%', textAlign: 'left' }}>{ this.toDate(ctime) }</label>
            <label className="fr" style={{ width: '50%', textAlign: 'right' }}>{ this.getUserName(author) }</label>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    ipc.send('getAlbumThumb', this.props.info.doc.contents[0]);
  }
}

AlbumItem.propTypes = {
  /**
    相册信息
  **/
  info: PropTypes.object.isRequired
};