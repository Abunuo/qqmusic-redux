/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import {nagivateActions} from '../../core/navigate';

export class SearchOtherItem extends Component {
	static propTypes = {
		query: PropTypes.string.isRequired
	}

	constructor() {
		super(...arguments);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {navigateToSearch, query, lastSearch} = this.props;
		navigateToSearch('song', query, lastSearch);
	}

	render() {
		const {query} = this.props;

		return (
			<li onMouseDown={this.handleClick} onTouchStart={this.handleClick}>{query}</li>
		)
	}
}

const mapDispatchToProps = {
	navigateToSearch: nagivateActions.navigateToSearch
};

export default connect(
	null,
	mapDispatchToProps
)(SearchOtherItem);

