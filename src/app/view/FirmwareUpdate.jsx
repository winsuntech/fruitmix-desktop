import React from 'react'
import Debug from 'debug'
import UpdateIcon from 'material-ui/svg-icons/action/system-update-alt'
import Base from './Base'
import FirmwareUpdateApp from '../control/FirmwareUpdateApp'
import FirmDetail from '../control/FirmDetail'

const debug = Debug('view:component:update')

class FirmwareUpdate extends Base {

  constructor(ctx) {
    super(ctx)

    this.state = {
      firm: null,
      rel: null
    }

    this.selectRel = (rel) => {
      debug('this.selectRel', rel)
      this.setState({ rel })
    }
  }

  willReceiveProps(nextProps) {
    // debug('FirmwareUpdate in view model', nextProps)
    if (!nextProps.apis || !nextProps.apis.firm) return
    const firm = nextProps.apis.firm
    if (firm.isPending() || firm.isRejected()) return

    const value = firm.value()

    if (value !== this.state.firm) {
      this.setState({ firm: value })
    }
  }

  navEnter() {
    this.ctx.props.apis.request('firm')
  }

  navGroup() {
    return 'update'
  }

  menuName() {
    return '固件升级'
  }

  menuIcon() {
    return UpdateIcon
  }

  quickName() {
    return '固件升级'
  }

  appBarStyle() {
    return 'colored'
  }

  hasDetail() {
    return true
  }

  detailEnabled() {
    return true
  }

  renderDetail({ style, openSnackBar }) {
    return (
      <div style={style}>
        <FirmDetail
          rel={this.state.rel}
          primaryColor={this.groupPrimaryColor()}
        />
      </div>
    )
  }

  /** renderers **/
  renderContent({ openSnackBar }) {
    return (
      <FirmwareUpdateApp
        firm={this.state.firm}
        apis={this.ctx.props.apis}
        nav={this.ctx.props.nav}
        selectedDevice={this.ctx.props.selectedDevice}
        primaryColor={this.groupPrimaryColor()}
        openSnackBar={openSnackBar}
        selectRel={this.selectRel}
      />
    )
  }
}

export default FirmwareUpdate
