import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getSearch} from '../../core/search';
import AppHeader from './AppHeader';
import Player from '../../components/Player';

export function App({children, search}) {

    return (
        <div>
            <AppHeader
                search={search}
            />

            <main>
                {children}
            </main>

            <Player/>
        </div>
    )
}

App.propTypes = {
    children: PropTypes.element,
    search: PropTypes.object.isRequired
};

const mapStateToProps = createSelector(
    getSearch,
    search => ({
        search: search.toJS()
    })
);

export default connect(
    mapStateToProps,
    null
)(App);

