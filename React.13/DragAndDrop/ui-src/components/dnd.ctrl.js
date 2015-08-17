import React, {Component} from 'react';
import _ld from 'lodash';

import DList from './dnd.list';
import DiList from './dndi.list';

var DndCtrlSty = {
	padding: '0 10px 0 30px'
}

var list = [
	{id: 'l1', label: 'first of list'},
	{id: 'l2', label: 'second line of list'},
	{id: 'l3', label: 'third line of list'},
	{id: 'l4', label: 'fourth line of list'},
	{id: 'l5', label: 'fifth line of list'},
	{id: 'l6', label: 'sixth line of list'}
]

class DndCtrlRender extends Component {
	binder(...methods) { methods.forEach( (method) => this[method] = this[method].bind(this) ); }

	render() {
		var isMobile = this.props.isMobile;
		return (
			<div id='DndCtrlSty' className='FlexBox' style={DndCtrlSty}>
				<DiList data={list} isMobile={isMobile} />
				<DiList data={this.state.list} dndDone={this.dndDone} />
				<DList data={list} isMobile={isMobile} />
				<DList data={this.state.list} dndDone={this.dndDone} />
			</div>
		);
	}
}

export default class DndCtrl extends DndCtrlRender {
	constructor() {
	  super();
		this.state = {list: _ld.cloneDeep(list)};
		this.binder('dndDone');
	}
	dndDone(startID, endID) {
		var newList = this.state.list;
		var startObj = _ld.findWhere(newList, {id: startID});
		var startIndex = _ld.indexOf(newList, startObj);
		newList.splice(startIndex, 1);
		var endObj = _ld.findWhere(newList, {id: endID});
		var endIndex = _ld.indexOf(newList, endObj) + 1;
		newList.splice(endIndex, 0, startObj);
		this.setState.list = newList;
	}
}
