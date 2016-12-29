import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getSearch} from '../../core/search';
import AppHeader from './AppHeader';
import Player from '../../components/Player';

export class App extends Component {
	render() {
		const {children, search} = this.props;
		return (
            <div className="data-reactroot">
                <AppHeader
                    search={search}
                />

	            {children}

                <Player/>
            </div>
		)
	}
}

App.propTypes = {
    children: PropTypes.element,
    search: PropTypes.object.isRequired
};

const mapStateToProps = createSelector(
    getSearch,
    search => ({
        search: search
    })
);

export default connect(
    mapStateToProps,
    null
)(App);

