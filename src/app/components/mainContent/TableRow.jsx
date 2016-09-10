import React, { findDOMNode, Component, PropTypes } from 'react';
import svg from '../../utils/SVGIcon';
class Row extends Component {
	shouldComponentUpdate(nextP) {
		// if (nextP.item.permission.name == this.props.item.permission.name && nextP.item.checked == this.props.item.checked) {
		// 	return false
		// }else {
		// 	return true
		// }
		return true
	}
	render() {
		var _this = this
		return (
			<tr onTouchTap={_this.props.selectChildren.bind(_this,this.props.index)} onDoubleClick={_this.props.enterChildren.bind(_this,this.props.index)} 
			className={this.props.item.checked==true?'tr-selected-background':''}>
				<td onClick={this.props.addBezier.bind(this,this.props.index)} data-selected={this.props.item.checked} className='first-td'>
					<div className='selectBox'>
						<div>{this.props.item.checked==false?svg.blackFrame():svg.select()}</div>
						<div className='bezierFrame' style={{width:48,height:48}}>
							<div className="bezierTransition1"></div>
							<div className="bezierTransition2"></div>
						</div>
					<div></div>
					</div>
				</td>
				<td title={this.props.item.name}>
					<div data-uuid={this.props.item.uuid}>
						<span className={'file-type-icon '+this.props.getTypeOfFile(this.props.item)}></span>
						<span className='file-name'>{this.props.item.name}</span>
					</div>
				</td>
				<td title={this.props.item.mtime}>{this.props.getTime(this.props.item.mtime)}</td>
				<td title={this.props.item.size}>{this.props.getSize(this.props.item.size)}</td>
			</tr>
			)
	}

}
export default Row;