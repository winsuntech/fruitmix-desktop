import React, { Component, PureComponent } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import Radium from 'radium'

import { Avatar, IconButton, Drawer, Divider } from 'material-ui'
import FlatButton from '../common/FlatButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import SocialPerson from 'material-ui/svg-icons/social/person'
import { indigo500 } from 'material-ui/styles/colors'

import { navMap, fileNavGroup, mediaNavGroup, appifiNavGroup } from './nav'

class SubHeader extends Component {

  render() {
    return (
      <div style={{height: 48, fontSize: 14, fontWeight: 500, 
        display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.54)'}}>
        <div style={{flex: '0 0 16px'}} />
        {this.props.text}
      </div>
    )
  }
}

class MenuSpacer extends PureComponent {

  render() {
    return  <div style={{height: this.props.dense ? 4 : 8}} />
  }
}

@muiThemeable()
@Radium
class MenuItem extends Component {

  render() {

    let {icon, text, dense, primaryColor, selected, disabled} = this.props

    let iconColor = selected 
      ? this.props.primaryColor
      : (disabled ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0.54)')

    let fontColor = selected 
      ? this.props.primaryColor
      : (disabled ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0.87)')

    return (
      <div 
        style={{
          width: '100%', height: dense ? 40 : 48, display: 'flex', alignItems: 'center', 
          ':hover': { backgroundColor: '#EEEEEE' }, 
          backgroundColor: selected ? '#F5F5F5' : '#FFF'
        }}
        onTouchTap={this.props.onTouchTap}
      >
        <div style={{flex: '0 0 16px'}} />
        <this.props.icon style={{width:dense?18:24, height:dense?18:24, color:iconColor}} />
        <div style={{flex: '0 0 32px'}} />
        <div style={{flexGrow:1, fontSize:dense ? 13 : 16, fontWeight:500, color:fontColor}}>
          {text}
        </div>
        <div style={{flex: '0 0 16px'}} />
      </div>
    )
  }
}

class NavDrawer extends React.Component {

  renderGroup(group) {

    let { views, nav, navTo } = this.props

    let primaryColor = views[nav].primaryColor()

    return Object.keys(views)
      .filter(key => views[key].navGroup() === group)
      .map(key => (
        <MenuItem
          icon={views[key].menuIcon()}
          text={views[key].menuName()}
          dense={true}
          primaryColor={primaryColor}
          selected={key === nav}
          onTouchTap={() => navTo(key)}
        />
      )) 
  }

  render() {

    const { open, onRequestChange, views, nav, navTo } = this.props
    const dense = true

    let primaryColor = views[nav].primaryColor()

    return (

      <Drawer docked={false} width={240} open={open} onRequestChange={onRequestChange}>

        <div style={{
          position: 'relative',
          width: '100%',
          backgroundColor: primaryColor
        }}>
          <div style={{width: 'calc(100% - 8px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <IconButton 
              iconStyle={{width:48, height: 48, color: 'white'}}
              style={{width:80, height: 80, padding: 16}}
              onTouchTap={() => navTo('account')}
            >
              <ActionAccountCircle/>
            </IconButton>
          </div>
          <div style={{height: 56, marginLeft: 16, marginTop: -8}}>
            <div style={{fontSize: 16, fontWeight: 500, color: 'rgba(255, 255, 255, 1)'}}>Username</div>
            <div style={{fontSize: 16, fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)'}}>@Serial</div>
          </div> 
        </div>

        <Divider />

        <div style={{height: 4}}/>

        { this.renderGroup('file') }

        <div style={{height: 4}} />
        <Divider />
        <div style={{height: 4}} />

        { this.renderGroup('media') }

        <div style={{height: 4}} />
        <Divider />
        <div style={{height: 4}} />

        { this.renderGroup('settings') }

        <div style={{height: 4}} />
        <Divider />
        <div style={{height: 4}} />

        <MenuItem icon={ActionExitToApp} text="退出" dense={true} />

      </Drawer>
    )
  }
}

export default NavDrawer
